// Copyright 2013-2020, University of Colorado Boulder

/**
 * Manipulator for changing a line's (x2,y2) point.
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

class X2Y2Manipulator extends Manipulator {

  /**
   * @param {number} radius
   * @param {Property.<Line>} lineProperty
   * @param {Property.<Range>} x2RangeProperty
   * @param {Property.<Range>} y2RangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( radius, lineProperty, x2RangeProperty, y2RangeProperty, modelViewTransform ) {

    super( radius, GLColors.POINT_X2_Y2, { haloAlpha: GLColors.HALO_ALPHA.x2y2 } );

    // move the manipulator to match the line's (x2,y2) point
    const lineObserver = line => {
      this.translation = modelViewTransform.modelToViewPosition( new Vector2( line.x2, line.y2 ) );
    };
    lineProperty.link( lineObserver ); // unlink in dispose

    this.addInputListener( new X2Y2DragListener( this, lineProperty, x2RangeProperty, y2RangeProperty, modelViewTransform ) );

    // @private called by dispose
    this.disposeX2Y2Manipulator = () => {
      lineProperty.unlink( lineObserver );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeX2Y2Manipulator();
    super.dispose();
  }
}

/**
 * Drag listener for (x2,y2) manipulator.
 */
class X2Y2DragListener extends DragListener {

  /**
   * @param {Node} targetNode
   * @param {Property.<Line>} lineProperty
   * @param {Property.<Range>} x2RangeProperty
   * @param {Property.<Range>} y2RangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( targetNode, lineProperty, x2RangeProperty, y2RangeProperty, modelViewTransform ) {

    let startOffset; // where the drag started, relative to (x2,y2), in parent view coordinates

    super( {

      allowTouchSnag: true,

      // note where the drag started
      start: event => {
        const line = lineProperty.get();
        const position = modelViewTransform.modelToViewXY( line.x2, line.y2 );
        startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( position );
      },

      drag: event => {

        const line = lineProperty.get();
        const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
        const position = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to range, snap to grid
        const x2 = Utils.roundSymmetric( Utils.clamp( position.x, x2RangeProperty.get().min, x2RangeProperty.get().max ) );
        const y2 = Utils.roundSymmetric( Utils.clamp( position.y, y2RangeProperty.get().min, y2RangeProperty.get().max ) );

        if ( x2 !== line.x1 || y2 !== line.y1 ) {
          // Don't allow points to be the same, this would result in slope=0/0 (undefined line.)
          // Keep (x1,y1) constant, change (x2,y2) and slope.
          lineProperty.set( new Line( line.x1, line.y1, x2, y2, line.color ) );
        }
      }
    } );
  }
}

graphingLines.register( 'X2Y2Manipulator', X2Y2Manipulator );

export default X2Y2Manipulator;