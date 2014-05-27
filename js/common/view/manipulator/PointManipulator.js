// Copyright 2002-2014, University of Colorado Boulder

/**
 * Drag handler for an arbitrary point (Vector2).
 * Used exclusively in "Place the Points" game challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Drag handler for arbitrary point.
   * @param {Property<Vector2>} pointProperty
   * @param {Array<Property<Vector2>>} otherPointProperties points that the point can't be on
   * @param {Range} xRange
   * @param {Range} yRange
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function PointDragHandler( pointProperty, otherPointProperties, xRange, yRange, mvt ) {

    var startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      // note where the drag started
      start: function( event ) {
        var location = mvt.modelToViewPosition( pointProperty.get() );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
      },

      drag: function( event ) {

        var parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        var location = mvt.viewToModelPosition( parentPoint );

        // constrain to range, snap to grid
        var x = Math.round( Util.clamp( location.x, xRange.min, xRange.max ) );
        var y = Math.round( Util.clamp( location.y, yRange.min, yRange.max ) );
        var p = new Vector2( x, y );

        // is this point the same as one of the others?
        var same = false;
        for ( var i = 0; i < otherPointProperties.length; i++ ) {
          if ( p.equals( otherPointProperties[i].get() ) ) {
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

  inherit( SimpleDragHandler, PointDragHandler );

  /**
   * @param {Number} diameter
   * @param {Color|String} color
   * @param {Property<Vector2>} pointProperty
   * @param {Array<Property<Vector2>>} otherPointProperties
   * @param {Range} xRange
   * @param {Range} yRange
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function PointManipulator( diameter, color, pointProperty, otherPointProperties, xRange, yRange, mvt ) {

    var thisNode = this;
    Manipulator.call( thisNode, diameter, color );

    // move the manipulator to match the point
    pointProperty.link( function( point ) {
      thisNode.translation = mvt.modelToViewPosition( point );
    } );

    thisNode.addInputListener( new PointDragHandler( pointProperty, otherPointProperties, xRange, yRange, mvt ) );
  }

  return inherit( Manipulator, PointManipulator );
} );
