// Copyright 2013-2021, University of Colorado Boulder

/**
 * Tool that displays the (x,y) coordinates of a grid-point on the graph.
 * Origin is at the tip of the tool (bottom center.)
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import bodyImage from '../../../images/pointToolBody_png.js';
import tipImage from '../../../images/pointToolTip_png.js';
import graphingLines from '../../graphingLines.js';
import graphingLinesStrings from '../../graphingLinesStrings.js';

// constants
const NUMBER_OF_DECIMAL_PLACES = 0;
const VALUE_WINDOW_CENTER_X = 44; // center of the value window relative to the left edge of pointToolBody.png

class PointToolNode extends Node {

  /**
   * @param {PointTool} pointTool
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Graph} graph
   * @param {Property.<Boolean>} linesVisibleProperty
   * @param {Object} [options]
   */
  constructor( pointTool, modelViewTransform, graph, linesVisibleProperty, options ) {

    options = merge( {
      cursor: 'pointer',
      backgroundNormalColor: 'white',
      foregroundNormalColor: 'black',
      foregroundHighlightColor: 'white'
    }, options );

    super();

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
      font: new PhetFont( { size: 15, weight: 'bold' } ),
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
      throw new Error( `unsupported point tool orientation: ${pointTool.orientation}` );
    }

    options.children = [
      this.backgroundNode,
      this.bodyNode,
      this.tipNode,
      this.valueNode
    ];

    this.mutate( options );

    // initial state
    this.setCoordinatesVector2( pointTool.positionProperty.get() );
    this.setBackground( options.backgroundNormalColor );

    // position and display, unmultilink in dispose
    const updateMultilink = Property.multilink(
      [ pointTool.positionProperty, pointTool.onLineProperty, linesVisibleProperty ],
      () => {

        // move to position
        const position = pointTool.positionProperty.get();
        this.translation = modelViewTransform.modelToViewPosition( position );

        // display value and highlighting
        if ( graph.contains( position ) ) {
          this.setCoordinatesVector2( position );
          if ( linesVisibleProperty.get() ) {
            // use the line's color to highlight
            this.setForeground( !pointTool.onLineProperty.get() ? options.foregroundNormalColor : options.foregroundHighlightColor );
            this.setBackground( !pointTool.onLineProperty.get() ? options.backgroundNormalColor : pointTool.onLineProperty.get().color );
          }
          else {
            this.setForeground( options.foregroundNormalColor );
            this.setBackground( options.backgroundNormalColor );
          }
        }
        else {
          this.setCoordinatesString( graphingLinesStrings.point.unknown );
          this.setForeground( options.foregroundNormalColor );
          this.setBackground( options.backgroundNormalColor );
        }
      } );

    // interactivity
    this.addInputListener( new PointToolDragListener( this, pointTool, modelViewTransform, graph ) );

    // @private called by dispose
    this.disposePointToolNode = () => {
      Property.unmultilink( updateMultilink );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposePointToolNode();
    super.dispose();
  }

  // @private Sets the displayed value to a point
  setCoordinatesVector2( p ) {
    this.setCoordinatesString( StringUtils.format( graphingLinesStrings.point.XY,
      Utils.toFixed( p.x, NUMBER_OF_DECIMAL_PLACES ), Utils.toFixed( p.y, NUMBER_OF_DECIMAL_PLACES ) ) );
  }

  // @private Sets the displayed value to an arbitrary string
  setCoordinatesString( s ) {
    this.valueNode.text = s;
    this.valueNode.centerX = this.bodyNode.left + VALUE_WINDOW_CENTER_X;  // centered
  }

  // @private Sets the foreground, the color of the displayed value
  setForeground( color ) {
    this.valueNode.fill = color;
  }

  // @private Sets the background, the color of the display area behind the value
  setBackground( color ) {
    this.backgroundNode.fill = color;
  }
}

/**
 * Drag listener for the point tool.
 */
class PointToolDragListener extends DragListener {

  /**
   * @param {Node} targetNode
   * @param {PointTool} pointTool
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Graph} graph
   */
  constructor( targetNode, pointTool, modelViewTransform, graph ) {

    let startOffset; // where the drag started, relative to the tool's origin, in parent view coordinates

    const constrainBounds = ( point, bounds ) => {
      if ( !bounds || bounds.containsPoint( point ) ) {
        return point;
      }
      else {
        return new Vector2( Utils.clamp( point.x, bounds.minX, bounds.maxX ), Utils.clamp( point.y, bounds.minY, bounds.maxY ) );
      }
    };

    super( {

      allowTouchSnag: true,

      // note where the drag started
      start: event => {
        // Note the mouse-click offset when dragging starts.
        const position = modelViewTransform.modelToViewPosition( pointTool.positionProperty.get() );
        startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( position );
        // Move the tool that we're dragging to the foreground.
        event.currentTarget.moveToFront();
      },

      drag: event => {
        const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
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
}

graphingLines.register( 'PointToolNode', PointToolNode );

export default PointToolNode;