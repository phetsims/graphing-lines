// Copyright 2013-2022, University of Colorado Boulder

/**
 * PointToolNode is a tool that displays the (x,y) coordinates of a grid-point on the graph.
 * If it's not on the graph, it will display '( ?, ? )'.
 * Origin is at the tip of the tool (bottom center.)
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import { DragListener, Node } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';
import PointToolBodyNode from './PointToolBodyNode.js';
import PointToolProbeNode from './PointToolProbeNode.js';

export default class PointToolNode extends Node {

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

    // coordinatesProperty is null when the tool is not on the graph.
    const coordinatesProperty = new DerivedProperty( [ pointTool.positionProperty ],
      position => ( graph.contains( position ) ? position : null ), {
        valueType: [ Vector2, null ]
      } );

    const bodyNode = new PointToolBodyNode( coordinatesProperty, {
      coordinatesSide: 'left',
      decimals: 0,
      backgroundFill: options.backgroundNormalColor,
      textFill: options.foregroundNormalColor
    } );

    /*
     * The probe is a pointy triangle, separate from the body and not pickable.
     * Because picking bounds are rectangular, making the tip pickable made it difficult
     * to pick a line manipulator when the tip and manipulator were on the same grid point.
     * Making the tip non-pickable was determined to be an acceptable and 'natural feeling' solution.
     */
    const probeNode = new PointToolProbeNode( {
      pickable: false
    } );

    // orientation
    if ( pointTool.orientation === 'down' ) {
      probeNode.centerX = 0;
      probeNode.bottom = 0;
      bodyNode.left = probeNode.left - ( 0.1 * bodyNode.width );
      bodyNode.bottom = probeNode.top + 2; // overlap
    }
    else if ( pointTool.orientation === 'up' ) {
      probeNode.setScaleMagnitude( 1, -1 ); // reflect around x-axis, so that lighting will be correct
      probeNode.centerX = 0;
      probeNode.top = 0;
      bodyNode.left = probeNode.left - ( 0.1 * bodyNode.width );
      bodyNode.top = probeNode.bottom - 2; // overlap
    }
    else {
      throw new Error( `unsupported point tool orientation: ${pointTool.orientation}` );
    }

    assert && assert( !options.children );
    options.children = [ probeNode, bodyNode ];

    this.mutate( options );

    // position and display
    const updateMultilink = Multilink.multilink(
      [ pointTool.positionProperty, pointTool.onLineProperty, linesVisibleProperty ],
      ( position, onLine, linesVisible ) => {

        // move to position
        this.translation = modelViewTransform.modelToViewPosition( position );

        // display value and highlighting
        if ( graph.contains( position ) && onLine && linesVisible ) {

          // use the line's color to highlight
          bodyNode.setBackgroundFill( onLine.color );
          bodyNode.setTextFill( options.foregroundHighlightColor );
        }
        else {
          bodyNode.setBackgroundFill( options.backgroundNormalColor );
          bodyNode.setTextFill( options.foregroundNormalColor );
        }
      } );

    // interactivity
    this.addInputListener( new PointToolDragListener( this, pointTool, modelViewTransform, graph ) );

    // @private called by dispose
    this.disposePointToolNode = () => {
      Multilink.unmultilink( updateMultilink );
      bodyNode.dispose();
      coordinatesProperty.dispose();
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