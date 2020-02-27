// Copyright 2013-2020, University of Colorado Boulder

/**
 * Tool that displays the (x,y) coordinates of a grid-point on the graph.
 * Origin is at the tip of the tool (bottom center.)
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import SimpleDragHandler from '../../../../scenery/js/input/SimpleDragHandler.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import bodyImage from '../../../images/point_tool_body_png.js';
import tipImage from '../../../images/point_tool_tip_png.js';
import graphingLinesStrings from '../../graphing-lines-strings.js';
import graphingLines from '../../graphingLines.js';
import GLFont from '../GLFont.js';

const pointUnknownString = graphingLinesStrings.point.unknown;
const pointXYString = graphingLinesStrings.point.XY;


// constants
const NUMBER_OF_DECIMAL_PLACES = 0;
const VALUE_WINDOW_CENTER_X = 44; // center of the value window relative to the left edge of point_tool_body.png

/**
 * @param {PointTool} pointTool
 * @param {ModelViewTransform2} modelViewTransform
 * @param {Graph} graph
 * @param {Property.<Boolean>} linesVisibleProperty
 * @param {Object} [options]
 * @constructor
 */
function PointToolNode( pointTool, modelViewTransform, graph, linesVisibleProperty, options ) {

  options = merge( {
    cursor: 'pointer',
    backgroundNormalColor: 'white',
    foregroundNormalColor: 'black',
    foregroundHighlightColor: 'white'
  }, options );

  const self = this;

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
  const BACKGROUND_MARGIN = 5;
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
  this.setCoordinatesVector2( pointTool.positionProperty.get() );
  this.setBackground( options.backgroundNormalColor );

  // position and display, unmultilink in dispose
  const updateMultilink = Property.multilink( [ pointTool.positionProperty, pointTool.onLineProperty, linesVisibleProperty ],
    function() {

      // move to position
      const position = pointTool.positionProperty.get();
      self.translation = modelViewTransform.modelToViewPosition( position );

      // display value and highlighting
      if ( graph.contains( position ) ) {
        self.setCoordinatesVector2( position );
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
    this.setCoordinatesString( StringUtils.format( pointXYString, Utils.toFixed( p.x, NUMBER_OF_DECIMAL_PLACES ), Utils.toFixed( p.y, NUMBER_OF_DECIMAL_PLACES ) ) );
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

  let startOffset; // where the drag started, relative to the tool's origin, in parent view coordinates

  const constrainBounds = function( point, bounds ) {
    if ( !bounds || bounds.containsPoint( point ) ) {
      return point;
    }
    else {
      return new Vector2( Utils.clamp( point.x, bounds.minX, bounds.maxX ), Utils.clamp( point.y, bounds.minY, bounds.maxY ) );
    }
  };

  SimpleDragHandler.call( this, {

    allowTouchSnag: true,

    // note where the drag started
    start: function( event ) {
      // Note the mouse-click offset when dragging starts.
      const position = modelViewTransform.modelToViewPosition( pointTool.positionProperty.get() );
      startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( position );
      // Move the tool that we're dragging to the foreground.
      event.currentTarget.moveToFront();
    },

    drag: function( event ) {
      const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
      let position = modelViewTransform.viewToModelPosition( parentPoint );
      position = constrainBounds( position, pointTool.dragBounds );
      if ( graph.contains( position ) ) {
        // snap to the graph's grid
        position = new Vector2( Utils.toFixedNumber( position.x, 0 ), Utils.toFixedNumber( position.y, 0 ) );
      }
      pointTool.positionProperty.set( position );
    }
  } );
}

inherit( SimpleDragHandler, PointToolDragHandler );

export default PointToolNode;