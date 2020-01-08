// Copyright 2013-2020, University of Colorado Boulder

/**
 * Drag handler for an arbitrary point (Vector2).
 * Used exclusively in 'Place the Points' game challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Utils = require( 'DOT/Utils' );
  const Vector2 = require( 'DOT/Vector2' );

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

    const self = this;

    Manipulator.call( this, radius, GLColors.POINT, { haloAlpha: GLColors.HALO_ALPHA.point } );

    // move the manipulator to match the point
    const lineObserver = function( point ) {
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

    let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      // note where the drag started
      start: function( event ) {
        const position = modelViewTransform.modelToViewPosition( pointProperty.get() );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( position );
      },

      drag: function( event ) {

        const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        const position = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to range, snap to grid
        const x = Utils.roundSymmetric( Utils.clamp( position.x, xRange.min, xRange.max ) );
        const y = Utils.roundSymmetric( Utils.clamp( position.y, yRange.min, yRange.max ) );
        const p = new Vector2( x, y );

        // is this point the same as one of the others?
        let same = false;
        for ( let i = 0; i < otherPointProperties.length; i++ ) {
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

  inherit( SimpleDragHandler, PointDragHandler );

  return PointManipulator;
} );
