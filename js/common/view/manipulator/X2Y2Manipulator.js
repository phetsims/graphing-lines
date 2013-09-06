// Copyright 2002-2013, University of Colorado Boulder

/**
 * Manipulator for changing a line's (x2,y2) point.
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
   * Drag handler for (x2,y2) manipulator.
   * @param {Property<Line>} lineProperty
   * @param {Property<Range>} x2RangeProperty
   * @param {Property<Range>} y2RangeProperty
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function X2Y2DragHandler( lineProperty, x2RangeProperty, y2RangeProperty, mvt ) {

    var startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      // note where the drag started
      start: function( event ) {
        var line = lineProperty.get();
        var location = mvt.modelToViewPosition( new Vector2( line.x2, line.y2 ) );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
      },

      drag: function( event ) {
        var line = lineProperty.get();
        var parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        var location = mvt.viewToModelPosition( parentPoint );
        // constrain to range, snap to grid
        var x2 = Math.round( Util.clamp( mvt.viewToModelDeltaX( location.x ), x2RangeProperty.get().min, x2RangeProperty.get().max ) );
        var y2 = Math.round( Util.clamp( mvt.viewToModelDeltaY( location.y ), y2RangeProperty.get().min, y2RangeProperty.get().max ) );
        console.log( "x2Range=" + x2RangeProperty.get().toString() );
        console.log( "y2Range=" + y2RangeProperty.get().toString() );
        console.log( "x2,y2 = " + x2 + "," + y2 );//XXX
        // Don't allow points to be the same, this would result in slope=0/0 (undefined line.)
        if ( x2 !== line.x1 || y2 !== line.y1 ) {
          // Keep (x1,y1) constant, change (x2,y2) and slope.
          lineProperty.set( new Line( line.x1, line.y1, x2, y2, line.color ) );
        }
      },

      translate: function() { /* override default behavior, do nothing */ }
    } );
  }

  inherit( SimpleDragHandler, X2Y2DragHandler );

  /**
   * @param {Number} diameter
   * @param {Property<Line>} interactiveLineProperty
   * @param {Property<Range>} x2RangeProperty
   * @param {Property<Range>} y2RangeProperty
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function X2Y2Manipulator( diameter, interactiveLineProperty, x2RangeProperty, y2RangeProperty, mvt ) {

    var thisNode = this;
    LineManipulator.call( thisNode, diameter, GLColors.POINT_X2_Y2 );

    // move the manipulator to match the line's (x2,y2) point
    interactiveLineProperty.link( function( line ) {
      thisNode.translation = mvt.modelToViewPosition( new Vector2( line.x2, line.y2 ) );
    } );

    this.addInputListener( new X2Y2DragHandler( interactiveLineProperty, x2RangeProperty, y2RangeProperty, mvt ) );
  }

  return inherit( LineManipulator, X2Y2Manipulator );
} );
