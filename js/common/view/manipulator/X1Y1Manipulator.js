// Copyright 2002-2014, University of Colorado Boulder

/**
 * Manipulator for changing a line's (x1,y1) point.
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
   * Drag handler for (x1,y1) manipulator.
   * @param {Property<Line>} lineProperty
   * @param {Property<Range>} x1RangeProperty
   * @param {Property<Range>} y1RangeProperty
   * @param {ModelViewTransform2} mvt
   * @param {Boolean} constantSlope true: slope is constant, false: (x2,y2) is constant
   * @constructor
   */
  function X1Y1DragHandler( lineProperty, x1RangeProperty, y1RangeProperty, mvt, constantSlope ) {

    var startOffset; // where the drag started, relative to (x1,y1), in parent view coordinates

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
        var x1 = Math.round( Util.clamp( location.x, x1RangeProperty.get().min, x1RangeProperty.get().max ) );
        var y1 = Math.round( Util.clamp( location.y, y1RangeProperty.get().min, y1RangeProperty.get().max ) );
        var line = lineProperty.get();
        if ( constantSlope ) {
          // Keep slope constant, change (x1,y1) and (x2,y2).
          lineProperty.set( Line.createPointSlope( x1, y1, line.rise, line.run, line.color ) );
        }
        // Don't allow points to be the same, this would result in slope=0/0 (undefined line.)
        else if ( x1 !== lineProperty.get().x2 || y1 !== lineProperty.get().y2 ) {
          // Keep (x2,y2) constant, change (x1,y1) and slope.
          lineProperty.set( new Line( x1, y1, line.x2, line.y2, line.color ) );
        }
      }
    } );
  }

  inherit( SimpleDragHandler, X1Y1DragHandler );

  /**
   * @param {Number} diameter
   * @param {Property<Line>} interactiveLineProperty
   * @param {Property<Range>} x1RangeProperty
   * @param {Property<Range>} y1RangeProperty
   * @param {ModelViewTransform2} mvt
   * @param {Boolean} constantSlope true: slope is constant, false: (x2,y2) is constant
   * @constructor
   */
  function X1Y1Manipulator( diameter, interactiveLineProperty, x1RangeProperty, y1RangeProperty, mvt, constantSlope ) {

    var thisNode = this;
    Manipulator.call( thisNode, diameter, GLColors.POINT_X1_Y1 );

    // move the manipulator to match the line's (x1,y1) point
    interactiveLineProperty.link( function( line ) {
      thisNode.translation = mvt.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
    } );

    thisNode.addInputListener( new X1Y1DragHandler( interactiveLineProperty, x1RangeProperty, y1RangeProperty, mvt, constantSlope ) );
  }

  return inherit( Manipulator, X1Y1Manipulator );
} );
