// Copyright 2002-2013, University of Colorado Boulder

/**
 * Tool that displays the (x,y) coordinates of a grid-point on the graph.
 * Origin is at the tip of the tool (bottom center.)
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var strings = require( 'GRAPHING_LINES/graphing-lines-strings' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // images
  var bodyImage = require( 'image!GRAPHING_LINES/../images/point_tool_body.png' );
  var tipImage = require( 'image!GRAPHING_LINES/../images/point_tool_tip.png' );

  // constants
  var NUMBER_OF_DECIMAL_PLACES = 0;

  /**
   * Drag handler for the pointer tool.
   * @param {PointTool} pointTool
   * @param {ModelViewTransform2} mvt
   * @param {Graph} graph
   * @constructor
   */
  function PointToolDragHandler( pointTool, mvt, graph ) {

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
        var location = mvt.modelToViewPosition( pointTool.location );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
        // Move the tool that we're dragging to the foreground.
        event.currentTarget.moveToFront();
      },

      drag: function( event ) {
        var parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        var location = mvt.viewToModelPosition( parentPoint );
        location = constrainBounds( location, pointTool.dragBounds );
        if ( graph.contains( location ) ) {
          // snap to the graph's grid
          location = new Vector2( Util.toFixed( location.x, 0 ), Util.toFixed( location.y, 0 ) );
        }
        pointTool.location = location;
      },

      translate: function() { /* override default behavior, do nothing. */ }
    } );
  }

  inherit( SimpleDragHandler, PointToolDragHandler );

  /**
   * @param {PointTool} pointTool
   * @param {ModelViewTransform2} mvt
   * @param {Graph} graph
   * @param {Property<Boolean>} linesVisibleProperty
   * @param {*} options
   * @constructor
   */
  function PointToolNode( pointTool, mvt, graph, linesVisibleProperty, options ) {

    var thisNode = this;
    Node.call( thisNode );

     // tool body
    var bodyNode = new Image( bodyImage );

    /*
     * Pointy tip, separate from the body and not pickable.
     * Because picking bounds are rectangular, making the tip pickable made it difficult
     * to pick a line manipulator when the tip and manipulator were on the same grid point.
     * Making the tip non-pickable was determined to be an acceptable and "natural feeling" solution.
     */
    var tipNode = new Image( tipImage, { pickable: false } );

    // background behind the displayed value, shows through a transparent hole in the display area portion of the body image
    var BACKGROUND_MARGIN = 5;
    var backgroundNode = new Rectangle( 0, 0, bodyNode.width - ( 2 * BACKGROUND_MARGIN ), bodyNode.height - ( 2 * BACKGROUND_MARGIN ), { pickable: false } );

    // displayed value
    var valueNode = new Text( "?", { font: new PhetFont( { size: 15, weight: 'bold' } ), pickable: false } );

    // rendering order
    thisNode.addChild( tipNode );
    thisNode.addChild( backgroundNode );
    thisNode.addChild( bodyNode );
    thisNode.addChild( valueNode );

    // orientation
    if ( pointTool.orientation === 'down' ) {
      tipNode.centerX = 0;
      tipNode.bottom = 0;
      bodyNode.centerX = tipNode.centerX;
      bodyNode.bottom = tipNode.top;
      backgroundNode.centerX = bodyNode.centerX;
      backgroundNode.top = bodyNode.top + BACKGROUND_MARGIN;
      valueNode.centerX = backgroundNode.centerX;
      valueNode.centerY = backgroundNode.centerY;
    }
    else if ( pointTool.orientation === 'up' ) {
      tipNode.rotation = Math.PI;
      tipNode.centerX = 0;
      tipNode.top = 0;
      bodyNode.centerX = tipNode.centerX;
      bodyNode.top = tipNode.bottom;
      backgroundNode.centerX = bodyNode.centerX;
      backgroundNode.top = bodyNode.top + BACKGROUND_MARGIN;
      valueNode.centerX = backgroundNode.centerX;
      valueNode.centerY = backgroundNode.centerY;
    }
    else {
      throw new Error( 'unsupported point tool orientation: ' + pointTool.orientation );
    }

    // things needed by prototype functions
    this._bodyNode = bodyNode;
    this._backgroundNode = backgroundNode;
    this._valueNode = valueNode;

    // initial state
    this._setCoordinatesVector2( pointTool.location );
    this._setBackground( GLColors.POINT_TOOL_BACKGROUND_NORMAL_COLOR );

    // location and display
    var update = function() {

      // move to location
      var location = pointTool.location;
      thisNode.translation = mvt.modelToViewPosition( location );

      // display value and highlighting
      if ( graph.contains( location ) ) {
        thisNode._setCoordinatesVector2( location );
        if ( linesVisibleProperty.get() ) {
          // use the line's color to highlight
          thisNode._setForeground( !pointTool.onLine ? GLColors.POINT_TOOL_FOREGROUND_NORMAL_COLOR : GLColors.POINT_TOOL_FOREGROUND_HIGHLIGHT_COLOR );
          thisNode._setBackground( !pointTool.onLine ? GLColors.POINT_TOOL_BACKGROUND_NORMAL_COLOR : pointTool.onLine.color );
        }
        else {
          thisNode._setForeground( GLColors.POINT_TOOL_FOREGROUND_NORMAL_COLOR );
          thisNode._setBackground( GLColors.POINT_TOOL_BACKGROUND_NORMAL_COLOR );
        }
      }
      else {
        thisNode._setCoordinatesString( strings["point.unknown"] );
        thisNode._setForeground( GLColors.POINT_TOOL_FOREGROUND_NORMAL_COLOR );
        thisNode._setBackground( GLColors.POINT_TOOL_BACKGROUND_NORMAL_COLOR );
      }
    };
    pointTool.locationProperty.link( update.bind( thisNode ) );
    pointTool.onLineProperty.link( update.bind( thisNode ) );
    linesVisibleProperty.link( update.bind( thisNode ) );

    // interactivity
    thisNode.cursor = 'pointer';
    thisNode.addInputListener( new PointToolDragHandler( pointTool, mvt, graph ) );

    thisNode.mutate( options );
  }

  return inherit( Node, PointToolNode, {

    // Sets the displayed value to a point
    _setCoordinatesVector2: function( p ) {
      this._setCoordinatesString( StringUtils.format( strings["point.xy"], Util.toFixed( p.x, NUMBER_OF_DECIMAL_PLACES ), Util.toFixed( p.y, NUMBER_OF_DECIMAL_PLACES ) ) );
    },

    // Sets the displayed value to an arbitrary string
    _setCoordinatesString: function( s ) {
      this._valueNode.text = s;
      this._valueNode.centerX = this._bodyNode.centerX;  // horizontally centered
    },

    // Sets the foreground, the color of the displayed value
    _setForeground: function( color ) {
      this._valueNode.fill = color;
    },

    // Sets the background, the color of the display area behind the value
    _setBackground: function( color ) {
      this._backgroundNode.fill = color;
    }
  } );
} );