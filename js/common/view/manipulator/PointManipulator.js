// Copyright 2013-2017, University of Colorado Boulder

/**
 * Drag handler for an arbitrary point (Vector2).
 * Used exclusively in 'Place the Points' game challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {number} radius
   * @param {Vector2Property} pointProperty
   * @param {Vector2Property} otherPointProperties
   * @param {Range} xRange
   * @param {Range} yRange
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function PointManipulator( radius, pointProperty, otherPointProperties, xRange, yRange, modelViewTransform ) {

    var self = this;

    Manipulator.call( this, radius, GLColors.POINT, { haloAlpha: GLColors.HALO_ALPHA.point } );

    // move the manipulator to match the point
    var lineObserver = function( point ) {
      self.translation = modelViewTransform.modelToViewPosition( point );
    };
    pointProperty.link( lineObserver ); // unlink in dispose

    this.addInputListener( new PointDragHandler( pointProperty, otherPointProperties, xRange, yRange, modelViewTransform ) );

    // @private called by dispose
    this.disposePointManipulator = function() {
      pointProperty.unlink( lineObserver );
    };
  }

  graphingLines.register( 'PointManipulator', PointManipulator );

  inherit( Manipulator, PointManipulator, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposePointManipulator();
      Manipulator.prototype.dispose.call( this );
    }
  } );

  /**
   * Drag handler for arbitrary point.
   * @param {Vector2Property} pointProperty
   * @param {Vector2Property[]} otherPointProperties points that the point can't be on
   * @param {Range} xRange
   * @param {Range} yRange
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function PointDragHandler( pointProperty, otherPointProperties, xRange, yRange, modelViewTransform ) {

    var startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      // note where the drag started
      start: function( event ) {
        var location = modelViewTransform.modelToViewPosition( pointProperty.get() );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
      },

      drag: function( event ) {

        var parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        var location = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to range, snap to grid
        var x = Util.roundSymmetric( Util.clamp( location.x, xRange.min, xRange.max ) );
        var y = Util.roundSymmetric( Util.clamp( location.y, yRange.min, yRange.max ) );
        var p = new Vector2( x, y );

        // is this point the same as one of the others?
        var same = false;
        for ( var i = 0; i < otherPointProperties.length; i++ ) {
          if ( p.equals( otherPointProperties[ i ].get() ) ) {
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

  graphingLines.register( 'PointManipulator.PointDragHandler', PointDragHandler );

  inherit( SimpleDragHandler, PointDragHandler );

  return PointManipulator;
} );
