// Copyright 2013-2015, University of Colorado Boulder

/**
 * Manipulator for changing a line's (x1,y1) point.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {number} radius
   * @param {Property.<Line>} lineProperty
   * @param {Property.<Range>} x1RangeProperty
   * @param {Property.<Range>} y1RangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {boolean} constantSlope true: slope is constant, false: (x2,y2) is constant
   * @constructor
   */
  function X1Y1Manipulator( radius, lineProperty, x1RangeProperty, y1RangeProperty, modelViewTransform, constantSlope ) {

    var self = this;

    Manipulator.call( this, radius, GLColors.POINT_X1_Y1, { haloAlpha: GLColors.HALO_ALPHA.x1y1 } );

    // move the manipulator to match the line's (x1,y1) point
    var lineObserver = function( line ) {
      self.translation = modelViewTransform.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
    };
    lineProperty.link( lineObserver ); // unlink in dispose

    this.addInputListener( new X1Y1DragHandler( lineProperty, x1RangeProperty, y1RangeProperty, modelViewTransform, constantSlope ) );

    // @private called by dispose
    this.disposeX1Y1Manipulator = function() {
      lineProperty.unlink( lineObserver );
    };
  }

  graphingLines.register( 'X1Y1Manipulator', X1Y1Manipulator );

  inherit( Manipulator, X1Y1Manipulator, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeX1Y1Manipulator();
      Manipulator.prototype.dispose.call( this );
    }
  } );

  /**
   * Drag handler for (x1,y1) manipulator.
   * @param {Property.<Line>} lineProperty
   * @param {Property.<Range>} x1RangeProperty
   * @param {Property.<Range>} y1RangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {boolean} constantSlope true: slope is constant, false: (x2,y2) is constant
   * @constructor
   */
  function X1Y1DragHandler( lineProperty, x1RangeProperty, y1RangeProperty, modelViewTransform, constantSlope ) {

    var startOffset; // where the drag started, relative to (x1,y1), in parent view coordinates

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
        var x1 = Util.roundSymmetric( Util.clamp( location.x, x1RangeProperty.get().min, x1RangeProperty.get().max ) );
        var y1 = Util.roundSymmetric( Util.clamp( location.y, y1RangeProperty.get().min, y1RangeProperty.get().max ) );
        var line = lineProperty.get();

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

  graphingLines.register( 'X1Y1Manipulator.X1Y1DragHandler', X1Y1DragHandler );

  inherit( SimpleDragHandler, X1Y1DragHandler );

  return X1Y1Manipulator;
} );
