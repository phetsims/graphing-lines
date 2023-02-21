// Copyright 2013-2021, University of Colorado Boulder

/**
 * Drag listener for an arbitrary point (Vector2).
 * Used exclusively in 'Place the Points' game challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import { DragListener } from '../../../../../scenery/js/imports.js';
import graphingLines from '../../../graphingLines.js';
import GLColors from '../../GLColors.js';
import Manipulator from './Manipulator.js';

export default class PointManipulator extends Manipulator {

  /**
   * @param {number} radius
   * @param {Vector2Property} pointProperty
   * @param {Vector2Property} otherPointProperties
   * @param {Range} xRange
   * @param {Range} yRange
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( radius, pointProperty, otherPointProperties, xRange, yRange, modelViewTransform ) {

    super( radius, GLColors.POINT, { haloAlpha: GLColors.HALO_ALPHA.point } );

    // move the manipulator to match the point
    const lineObserver = point => {
      this.translation = modelViewTransform.modelToViewPosition( point );
    };
    pointProperty.link( lineObserver ); // unlink in dispose

    this.addInputListener( new PointDragListener( this, pointProperty, otherPointProperties, xRange, yRange, modelViewTransform ) );

    // @private called by dispose
    this.disposePointManipulator = () => {
      pointProperty.unlink( lineObserver );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposePointManipulator();
    super.dispose();
  }
}

/**
 * Drag listener for an arbitrary point.
 */
class PointDragListener extends DragListener {

  /**
   * @param {Node} targetNode
   * @param {Vector2Property} pointProperty
   * @param {Vector2Property[]} otherPointProperties points that the point can't be on
   * @param {Range} xRange
   * @param {Range} yRange
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( targetNode, pointProperty, otherPointProperties, xRange, yRange, modelViewTransform ) {

    let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

    super( {

      allowTouchSnag: true,

      // note where the drag started
      start: event => {
        const position = modelViewTransform.modelToViewPosition( pointProperty.get() );
        startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( position );
      },

      drag: event => {

        const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
        const position = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to range, snap to grid
        const x = Utils.roundSymmetric( Utils.clamp( position.x, xRange.min, xRange.max ) );
        const y = Utils.roundSymmetric( Utils.clamp( position.y, yRange.min, yRange.max ) );
        const p = new Vector2( x, y );

        // is this point the same as one of the others?
        let same = false;
        for ( let i = 0; i < otherPointProperties.length; i++ ) {
          if ( p.equals( otherPointProperties[ i ].get() ) ) {
            same = true;
            break;
          }
        }

        // if the point is unique, set it
        if ( !same ) {
          pointProperty.set( p );
        }
      }
    } );
  }
}

graphingLines.register( 'PointManipulator', PointManipulator );