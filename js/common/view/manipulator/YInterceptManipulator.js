// Copyright 2013-2020, University of Colorado Boulder

/**
 * Manipulator for changing a line's y-intercept.
 * This manipulates (x1,y1), keeping x1 constrained to zero, and effectively dragging along the y-axis.
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
 * @param {Property.<Range>} y1RangeProperty
 * @param {ModelViewTransform2} modelViewTransform
 * @constructor
 */
function YInterceptManipulator( radius, lineProperty, y1RangeProperty, modelViewTransform ) {

  const self = this;

  Manipulator.call( this, radius, GLColors.INTERCEPT, { haloAlpha: GLColors.HALO_ALPHA.intercept } );

  // move the manipulator to match the line's (x1,y1) point
  const lineObserver = function( line ) {
    self.translation = modelViewTransform.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
  };
  lineProperty.link( lineObserver ); // unlink in dispose

  this.addInputListener( new YInterceptDragHandler( lineProperty, y1RangeProperty, modelViewTransform ) );

  // @private called by dispose
  this.disposeYInterceptManipulator = function() {
    lineProperty.unlink( lineObserver );
  };
}

graphingLines.register( 'YInterceptManipulator', YInterceptManipulator );

inherit( Manipulator, YInterceptManipulator, {

  /**
   * @public
   * @override
   */
  dispose: function() {
    this.disposeYInterceptManipulator();
    Manipulator.prototype.dispose.call( this );
  }
} );

/**
 * Drag handler for y-intercept manipulator.
 * @param {Property.<Line>} lineProperty
 * @param {Property.<Range>} y1RangeProperty
 * @param {ModelViewTransform2} modelViewTransform
 * @constructor
 */
function YInterceptDragHandler( lineProperty, y1RangeProperty, modelViewTransform ) {

  let startOffset; // where the drag started, relative to the y-intercept, in parent view coordinates

  SimpleDragHandler.call( this, {

    allowTouchSnag: true,

    // note where the drag started
    start: function( event ) {
      const line = lineProperty.get();
      const position = modelViewTransform.modelToViewXY( line.x1, line.y1 );
      startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( position );
    },

    drag: function( event ) {

      const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
      const position = modelViewTransform.viewToModelPosition( parentPoint );

      // constrain to range, snap to grid
      const y1 = Utils.roundSymmetric( Utils.clamp( position.y, y1RangeProperty.get().min, y1RangeProperty.get().max ) );
      const line = lineProperty.get();

      // Keep slope constant, change y1.
      lineProperty.set( Line.createSlopeIntercept( line.rise, line.run, y1, line.color ) );
    }
  } );
}

inherit( SimpleDragHandler, YInterceptDragHandler );

export default YInterceptManipulator;