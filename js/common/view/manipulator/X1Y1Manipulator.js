// Copyright 2013-2020, University of Colorado Boulder

/**
 * Manipulator for changing a line's (x1,y1) point.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import DragListener from '../../../../../scenery/js/listeners/DragListener.js';
import graphingLines from '../../../graphingLines.js';
import GLColors from '../../GLColors.js';
import Line from '../../model/Line.js';
import Manipulator from './Manipulator.js';

class X1Y1Manipulator extends Manipulator {

  /**
   * @param {number} radius
   * @param {Property.<Line>} lineProperty
   * @param {Property.<Range>} x1RangeProperty
   * @param {Property.<Range>} y1RangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {boolean} constantSlope true: slope is constant, false: (x2,y2) is constant
   */
  constructor( radius, lineProperty, x1RangeProperty, y1RangeProperty, modelViewTransform, constantSlope ) {

    super( radius, GLColors.POINT_X1_Y1, { haloAlpha: GLColors.HALO_ALPHA.x1y1 } );

    // move the manipulator to match the line's (x1,y1) point
    const lineObserver = line => {
      this.translation = modelViewTransform.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
    };
    lineProperty.link( lineObserver ); // unlink in dispose

    this.addInputListener( new X1Y1DragListener( this, lineProperty, x1RangeProperty, y1RangeProperty, modelViewTransform, constantSlope ) );

    // @private called by dispose
    this.disposeX1Y1Manipulator = () => {
      lineProperty.unlink( lineObserver );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeX1Y1Manipulator();
    super.dispose();
  }
}

/**
 * Drag listener for (x1,y1) manipulator.
 */
class X1Y1DragListener extends DragListener {

  /**
   * @param {Node} targetNode
   * @param {Property.<Line>} lineProperty
   * @param {Property.<Range>} x1RangeProperty
   * @param {Property.<Range>} y1RangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {boolean} constantSlope true: slope is constant, false: (x2,y2) is constant
   */
  constructor( targetNode, lineProperty, x1RangeProperty, y1RangeProperty, modelViewTransform, constantSlope ) {

    let startOffset; // where the drag started, relative to (x1,y1), in parent view coordinates

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
        const x1 = Utils.roundSymmetric( Utils.clamp( position.x, x1RangeProperty.get().min, x1RangeProperty.get().max ) );
        const y1 = Utils.roundSymmetric( Utils.clamp( position.y, y1RangeProperty.get().min, y1RangeProperty.get().max ) );
        const line = lineProperty.get();

        if ( constantSlope ) {
          // Keep slope constant, change (x1,y1) and (x2,y2).
          lineProperty.set( Line.createPointSlope( x1, y1, line.rise, line.run, line.color ) );
        }
        else if ( x1 !== lineProperty.get().x2 || y1 !== lineProperty.get().y2 ) {
          // Don't allow points to be the same, this would result in slope=0/0 (undefined line.)
          // Keep (x2,y2) constant, change (x1,y1) and slope.
          lineProperty.set( new Line( x1, y1, line.x2, line.y2, line.color ) );
        }
      }
    } );
  }
}

graphingLines.register( 'X1Y1Manipulator', X1Y1Manipulator );

export default X1Y1Manipulator;