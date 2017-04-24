// Copyright 2013-2015, University of Colorado Boulder

//TOOD #78 implement dispose
/**
 * Tool that displays the (x,y) coordinates of a grid-point on the graph.
 * Origin is at the tip of the tool (bottom center.)
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var pointUnknownString = require( 'string!GRAPHING_LINES/point.unknown' );
  var pointXYString = require( 'string!GRAPHING_LINES/point.XY' );

  // images
  var bodyImage = require( 'image!GRAPHING_LINES/point_tool_body.png' );
  var tipImage = require( 'image!GRAPHING_LINES/point_tool_tip.png' );

  // constants
  var NUMBER_OF_DECIMAL_PLACES = 0;
  var VALUE_WINDOW_CENTER_X = 44; // center of the value window relative to the left edge of point_tool_body.png

  /**
   * @param {PointTool} pointTool
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Graph} graph
   * @param {Property.<Boolean>} linesVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function PointToolNode( pointTool, modelViewTransform, graph, linesVisibleProperty, options ) {

    options = _.extend( {
      cursor: 'pointer',
      backgroundNormalColor: 'white',
      foregroundNormalColor: 'black',
      foregroundHighlightColor: 'white'
    }, options );

    var self = this;

    this.bodyNode = new Image( bodyImage ); // @private body of the tool

    /*
     * @private
     * Pointy tip, separate from the body and not pickable.
     * Because picking bounds are rectangular, making the tip pickable made it difficult
     * to pick a line manipulator when the tip and manipulator were on the same grid point.
     * Making the tip non-pickable was determined to be an acceptable and 'natural feeling' solution.
     */
    this.tipNode = new Image( tipImage, { pickable: false } );

    // @private background behind the displayed value, shows through a transparent hole in the display area portion of the body image
    var BACKGROUND_MARGIN = 5;
    this.backgroundNode = new Rectangle( 0, 0,
      this.bodyNode.width - ( 2 * BACKGROUND_MARGIN ), this.bodyNode.height - ( 2 * BACKGROUND_MARGIN ),
      { pickable: false } );

    // @private displayed value
    this.valueNode = new Text( '?', {
      font: new GLFont( { size: 15, weight: 'bold' } ),
      pickable: false,
      maxWidth: 60 // constrain width, determined empirically, dependent on bodyImage
    } );

    // orientation
    if ( pointTool.orientation === 'down' ) {
      this.tipNode.centerX = 0;
      this.tipNode.bottom = 0;
      this.bodyNode.left = this.tipNode.left - ( 0.1 * this.bodyNode.width );
      this.bodyNode.bottom = this.tipNode.top;
      this.backgroundNode.centerX = this.bodyNode.centerX;
      this.backgroundNode.top = this.bodyNode.top + BACKGROUND_MARGIN;
      this.valueNode.centerY = this.backgroundNode.centerY;
    }
    else if ( pointTool.orientation === 'up' ) {
      this.tipNode.setScaleMagnitude( 1, -1 ); // reflect around x-axis, so that lighting will be correct
      this.tipNode.centerX = 0;
      this.tipNode.top = 0;
      this.bodyNode.left = this.tipNode.left - ( 0.1 * this.bodyNode.width );
      this.bodyNode.top = this.tipNode.bottom;
      this.backgroundNode.centerX = this.bodyNode.centerX;
      this.backgroundNode.top = this.bodyNode.top + BACKGROUND_MARGIN;
      this.valueNode.centerY = this.backgroundNode.centerY;
    }
    else {
      throw new Error( 'unsupported point tool orientation: ' + pointTool.orientation );
    }

    options.children = [
      this.backgroundNode,
      this.bodyNode,
      this.tipNode,
      this.valueNode
    ];
    Node.call( this, options );

    // initial state
    this.setCoordinatesVector2( pointTool.locationProperty.get() );
    this.setBackground( options.backgroundNormalColor );

    // location and display, unmultilink in dispose
    var updateMultilink = Property.multilink( [ pointTool.locationProperty, pointTool.onLineProperty, linesVisibleProperty ],
      function() {

        // move to location
        var location = pointTool.locationProperty.get();
        self.translation = modelViewTransform.modelToViewPosition( location );

        // display value and highlighting
        if ( graph.contains( location ) ) {
          self.setCoordinatesVector2( location );
          if ( linesVisibleProperty.get() ) {
            // use the line's color to highlight
            self.setForeground( !pointTool.onLineProperty.get() ? options.foregroundNormalColor : options.foregroundHighlightColor );
            self.setBackground( !pointTool.onLineProperty.get() ? options.backgroundNormalColor : pointTool.onLineProperty.get().color );
          }
          else {
            self.setForeground( options.foregroundNormalColor );
            self.setBackground( options.backgroundNormalColor );
          }
        }
        else {
          self.setCoordinatesString( pointUnknownString );
          self.setForeground( options.foregroundNormalColor );
          self.setBackground( options.backgroundNormalColor );
        }
      } );

    // interactivity
    this.addInputListener( new PointToolDragHandler( pointTool, modelViewTransform, graph ) );

    // @private called by dispose
    this.disposePointToolNode = function() {
      Property.unmultilink( updateMultilink );
    };
  }

  graphingLines.register( 'PointToolNode', PointToolNode );

  inherit( Node, PointToolNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposePointToolNode();
      Node.prototype.dispose.call( this );
    },

    // @private Sets the displayed value to a point
    setCoordinatesVector2: function( p ) {
      this.setCoordinatesString( StringUtils.format( pointXYString, Util.toFixed( p.x, NUMBER_OF_DECIMAL_PLACES ), Util.toFixed( p.y, NUMBER_OF_DECIMAL_PLACES ) ) );
    },

    // @private Sets the displayed value to an arbitrary string
    setCoordinatesString: function( s ) {
      this.valueNode.text = s;
      this.valueNode.centerX = this.bodyNode.left + VALUE_WINDOW_CENTER_X;  // centered
    },

    // @private Sets the foreground, the color of the displayed value
    setForeground: function( color ) {
      this.valueNode.fill = color;
    },

    // @private Sets the background, the color of the display area behind the value
    setBackground: function( color ) {
      this.backgroundNode.fill = color;
    }
  } );

  /**
   * Drag handler for the pointer tool.
   * @param {PointTool} pointTool
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Graph} graph
   * @constructor
   */
  function PointToolDragHandler( pointTool, modelViewTransform, graph ) {

    var startOffset; // where the drag started, relative to the tool's origin, in parent view coordinates

    var constrainBounds = function( point, bounds ) {
      if ( !bounds || bounds.containsPoint( point ) ) {
        return point;
      }
      else {
        return new Vector2( Util.clamp( point.x, bounds.minX, bounds.maxX ), Util.clamp( point.y, bounds.minY, bounds.maxY ) );
      }
    };

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      // note where the drag started
      start: function( event ) {
        // Note the mouse-click offset when dragging starts.
        var location = modelViewTransform.modelToViewPosition( pointTool.locationProperty.get() );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
        // Move the tool that we're dragging to the foreground.
        event.currentTarget.moveToFront();
      },

      drag: function( event ) {
        var parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        var location = modelViewTransform.viewToModelPosition( parentPoint );
        location = constrainBounds( location, pointTool.dragBounds );
        if ( graph.contains( location ) ) {
          // snap to the graph's grid
          location = new Vector2( Util.toFixedNumber( location.x, 0 ), Util.toFixedNumber( location.y, 0 ) );
        }
        pointTool.locationProperty.set( location );
      }
    } );
  }

  inherit( SimpleDragHandler, PointToolDragHandler );

  graphingLines.register( 'PointToolNode.PointToolDragHandler', PointToolDragHandler );

  return PointToolNode;
} );