// Copyright 2013-2020, University of Colorado Boulder

/**
 * Manipulator for changing a line's slope.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../../dot/js/Utils.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import SimpleDragHandler from '../../../../../scenery/js/input/SimpleDragHandler.js';
import graphingLines from '../../../graphingLines.js';
import GLColors from '../../GLColors.js';
import Line from '../../model/Line.js';
import Manipulator from './Manipulator.js';

/**
 * @param {number} radius
 * @param {Property.<Line>} lineProperty
 * @param {Property.<Range>} riseRangeProperty
 * @param {Property.<Range>} runRangeProperty
 * @param {ModelViewTransform2} modelViewTransform
 * @constructor
 */
function SlopeManipulator( radius, lineProperty, riseRangeProperty, runRangeProperty, modelViewTransform ) {

  const self = this;

  Manipulator.call( this, radius, GLColors.SLOPE, { haloAlpha: GLColors.HALO_ALPHA.slope } );

  // move the manipulator to match the line's slope
  const lineObserver = function( line ) {
    self.translation = modelViewTransform.modelToViewPosition( new Vector2( line.x2, line.y2 ) );
  };
  lineProperty.link( lineObserver ); // unlink in dispose

  this.addInputListener( new SlopeDragHandler( lineProperty, riseRangeProperty, runRangeProperty, modelViewTransform ) );

  // @private called by dispose
  this.disposeSlopeManipulator = function() {
    lineProperty.unlink( lineObserver );
  };
}

graphingLines.register( 'SlopeManipulator', SlopeManipulator );

inherit( Manipulator, SlopeManipulator, {

  /**
   * @public
   * @override
   */
  dispose: function() {
    this.disposeSlopeManipulator();
    Manipulator.prototype.dispose.call( this );
  }
} );

/**
 * Drag handler for slope manipulator.
 * @param {Property.<Line>} lineProperty
 * @param {Property.<Range>} riseRangeProperty
 * @param {Property.<Range>} runRangeProperty
 * @param {ModelViewTransform2} modelViewTransform
 * @constructor
 */
function SlopeDragHandler( lineProperty, riseRangeProperty, runRangeProperty, modelViewTransform ) {

  let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

  SimpleDragHandler.call( this, {

    allowTouchSnag: true,

    // note where the drag started
    start: function( event ) {
      const line = lineProperty.get();
      const position = modelViewTransform.modelToViewXY( line.x2, line.y2 );
      startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( position );
    },

    drag: function( event ) {
      const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
      const position = modelViewTransform.viewToModelPosition( parentPoint );
      // constrain to dynamic range, snap to grid
      const line = lineProperty.get();
      const run = Utils.roundSymmetric( Utils.clamp( position.x - line.x1, runRangeProperty.get().min, runRangeProperty.get().max ) );
      const rise = Utils.roundSymmetric( Utils.clamp( position.y - line.y1, riseRangeProperty.get().min, riseRangeProperty.get().max ) );
      // don't allow slope=0/0, undefined line
      if ( rise !== 0 || run !== 0 ) {
        lineProperty.set( Line.createPointSlope( line.x1, line.y1, rise, run, line.color ) );
      }
    }
  } );
}

inherit( SimpleDragHandler, SlopeDragHandler );

export default SlopeManipulator;