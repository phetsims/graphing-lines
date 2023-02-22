// Copyright 2013-2023, University of Colorado Boulder

/**
 * Manipulator for changing a line's y-intercept.
 * This manipulates (x1,y1), keeping x1 constrained to zero, and effectively dragging along the y-axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import { DragListener } from '../../../../../scenery/js/imports.js';
import graphingLines from '../../../graphingLines.js';
import GLColors from '../../GLColors.js';
import Line from '../../model/Line.js';
import Manipulator from './Manipulator.js';

export default class YInterceptManipulator extends Manipulator {

  /**
   * @param {number} radius
   * @param {Property.<Line>} lineProperty
   * @param {Property.<Range>} y1RangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( radius, lineProperty, y1RangeProperty, modelViewTransform ) {

    super( radius, GLColors.INTERCEPT, { haloAlpha: GLColors.HALO_ALPHA.intercept } );

    // move the manipulator to match the line's (x1,y1) point
    const lineObserver = line => {
      this.translation = modelViewTransform.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
    };
    lineProperty.link( lineObserver ); // unlink in dispose

    this.addInputListener( new YInterceptDragListener( this, lineProperty, y1RangeProperty, modelViewTransform ) );

    // @private called by dispose
    this.disposeYInterceptManipulator = () => {
      lineProperty.unlink( lineObserver );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeYInterceptManipulator();
    super.dispose();
  }
}

/**
 * Drag listener for y-intercept manipulator.
 */
class YInterceptDragListener extends DragListener {

  /**
   * @param {Node} targetNode
   * @param {Property.<Line>} lineProperty
   * @param {Property.<Range>} y1RangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( targetNode, lineProperty, y1RangeProperty, modelViewTransform ) {

    let startOffset; // where the drag started, relative to the y-intercept, in parent view coordinates

    super( {

      allowTouchSnag: true,

      // note where the drag started
      start: event => {
        const line = lineProperty.get();
        const position = modelViewTransform.modelToViewXY( line.x1, line.y1 );
        startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( position );
      },

      drag: event => {

        const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
        const position = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to range, snap to grid
        const y1 = Utils.roundSymmetric( Utils.clamp( position.y, y1RangeProperty.get().min, y1RangeProperty.get().max ) );
        const line = lineProperty.get();

        // Keep slope constant, change y1.
        lineProperty.set( Line.createSlopeIntercept( line.rise, line.run, y1, line.color ) );
      }
    } );
  }
}

graphingLines.register( 'YInterceptManipulator', YInterceptManipulator );