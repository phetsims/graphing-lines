// Copyright 2002-2013, University of Colorado Boulder

/**
 * Manipulator for changing a line's y-intercept.
 * This manipulates (x1,y1), keeping x1 constrained to zero, and effectively dragging along the y-axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var LineManipulator = require( 'GRAPHING_LINES/common/view/manipulator/LineManipulator' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Drag handler for y-intercept manipulator.
   * @param {Property<Line>} lineProperty
   * @param {Property<Range>} y1RangeProperty
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function YInterceptDragHandler( lineProperty, y1RangeProperty, mvt ) {

    var startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      // note where the drag started
      start: function( event ) {
        var line = lineProperty.get();
        var location = mvt.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
      },

      drag: function( event ) {
        var parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        var location = mvt.viewToModelPosition( parentPoint );
        // constrain to range, snap to grid
        var y1 = Math.round( Util.clamp( location.y, y1RangeProperty.get().min, y1RangeProperty.get().max ) );
        var line = lineProperty.get();
        // Keep slope constant, change y1.
        lineProperty.set( Line.createSlopeIntercept( line.rise, line.run, y1, line.color ) );
      },

      translate: function() { /* override default behavior, do nothing */ }
    } );
  }

  inherit( SimpleDragHandler, YInterceptDragHandler );

  /**
   * @param {Number} diameter
   * @param {Property<Line>} interactiveLineProperty
   * @param {Property<Range>} y1RangeProperty
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function YInterceptManipulator( diameter, interactiveLineProperty, y1RangeProperty, mvt ) {

    var thisNode = this;
    LineManipulator.call( thisNode, diameter, GLColors.INTERCEPT );

    // move the manipulator to match the line's (x1,y1) point
    interactiveLineProperty.link( function( line ) {
      thisNode.translation = mvt.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
    } );

    this.addInputListener( new YInterceptDragHandler( interactiveLineProperty, y1RangeProperty, mvt ) );
  }

  return inherit( LineManipulator, YInterceptManipulator );
} );
