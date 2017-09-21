// Copyright 2013-2017, University of Colorado Boulder

/**
 * Manipulator for changing a line's slope.
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
   * @param {Property.<Range>} riseRangeProperty
   * @param {Property.<Range>} runRangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function SlopeManipulator( radius, lineProperty, riseRangeProperty, runRangeProperty, modelViewTransform ) {

    var self = this;

    Manipulator.call( this, radius, GLColors.SLOPE, { haloAlpha: GLColors.HALO_ALPHA.slope } );

    // move the manipulator to match the line's slope
    var lineObserver = function( line ) {
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

    var startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      // note where the drag started
      start: function( event ) {
        var line = lineProperty.get();
        var location = modelViewTransform.modelToViewXY( line.x2, line.y2 );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
      },

      drag: function( event ) {
        var parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        var location = modelViewTransform.viewToModelPosition( parentPoint );
        // constrain to dynamic range, snap to grid
        var line = lineProperty.get();
        var run = Util.roundSymmetric( Util.clamp( location.x - line.x1, runRangeProperty.get().min, runRangeProperty.get().max ) );
        var rise = Util.roundSymmetric( Util.clamp( location.y - line.y1, riseRangeProperty.get().min, riseRangeProperty.get().max ) );
        // don't allow slope=0/0, undefined line
        if ( rise !== 0 || run !== 0 ) {
          lineProperty.set( Line.createPointSlope( line.x1, line.y1, rise, run, line.color ) );
        }
      }
    } );
  }

  graphingLines.register( 'SlopeManipulator.SlopeDragHandler', SlopeDragHandler );

  inherit( SimpleDragHandler, SlopeDragHandler );

  return SlopeManipulator;
} );