// Copyright 2002-2014, University of Colorado Boulder

/**
 * Manipulator for changing a line's y-intercept.
 * This manipulates (x1,y1), keeping x1 constrained to zero, and effectively dragging along the y-axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Drag handler for y-intercept manipulator.
   * @param {Property.<Line>} lineProperty
   * @param {Property.<Range>} y1RangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function YInterceptDragHandler( lineProperty, y1RangeProperty, modelViewTransform ) {

    var startOffset; // where the drag started, relative to the y-intercept, in parent view coordinates

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      // note where the drag started
      start: function( event ) {
        var line = lineProperty.get();
        var location = modelViewTransform.modelToViewXY( line.x1, line.y1 );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
      },

      drag: function( event ) {

        var parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        var location = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to range, snap to grid
        var y1 = Math.round( Util.clamp( location.y, y1RangeProperty.get().min, y1RangeProperty.get().max ) );
        var line = lineProperty.get();

        // Keep slope constant, change y1.
        lineProperty.set( Line.createSlopeIntercept( line.rise, line.run, y1, line.color ) );
      }
    } );
  }

  inherit( SimpleDragHandler, YInterceptDragHandler );

  /**
   * @param {number} radius
   * @param {Property.<Line>} lineProperty
   * @param {Property.<Range>} y1RangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function YInterceptManipulator( radius, lineProperty, y1RangeProperty, modelViewTransform ) {

    var thisNode = this;
    Manipulator.call( thisNode, radius, GLColors.INTERCEPT, { haloAlpha: GLColors.HALO_ALPHA.intercept } );

    // move the manipulator to match the line's (x1,y1) point
    lineProperty.link( function( line ) {
      thisNode.translation = modelViewTransform.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
    } );

    thisNode.addInputListener( new YInterceptDragHandler( lineProperty, y1RangeProperty, modelViewTransform ) );
  }

  return inherit( Manipulator, YInterceptManipulator );
} );
