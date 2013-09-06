// Copyright 2002-2013, University of Colorado Boulder

/**
 * Manipulator for changing a line's slope.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var LineManipulatorNode = require( 'GRAPHING_LINES/common/view/manipulator/LineManipulatorNode' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Drag handler for slope manipulator.
   * @param {Property<Line>} lineProperty
   * @param {Property<Range>} riseRangeProperty
   * @param {Property<Range>} runRangeProperty
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function SlopeDragHandler( lineProperty, riseRangeProperty, runRangeProperty, mvt ) {

    var startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      // note where the drag started
      start: function( event ) {
        var location = mvt.modelToViewPosition( new Vector2( lineProperty.get().x2, lineProperty.get().y2 ) );
        startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
      },

      drag: function( event ) {
        var parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
        var location = mvt.viewToModelPosition( parentPoint );
        // constrain to dynamic range, snap to grid
        var run = Math.round( Util.clamp( location.x - lineProperty.get().x1, runRangeProperty.get().min, runRangeProperty.get().max ) );
        var rise = Math.round( Util.clamp( location.y - lineProperty.get().y1, riseRangeProperty.get().min, riseRangeProperty.get().max ) );
        // don't allow slope=0/0, undefined line
        if ( rise !== 0 || run !== 0 ) {
          lineProperty.set( Line.createPointSlope( lineProperty.get().x1, lineProperty.get().y1, rise, run, lineProperty.get().color ) );
        }
      }
    } );
  }

  inherit( SimpleDragHandler, SlopeDragHandler );

  /**
   * @param {Number} diameter
   * @param {Property<Line>} interactiveLineProperty
   * @param {Property<Range>} riseRangeProperty
   * @param {Property<Range>} runRangeProperty
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function SlopeManipulatorNode( diameter, interactiveLineProperty, riseRangeProperty, runRangeProperty, mvt ) {

    var thisNode = this;
    LineManipulatorNode.call( thisNode, diameter, GLColors.SLOPE );

    // move the manipulator to match the line's slope
    interactiveLineProperty.link( function( line ) {
      thisNode.translation = mvt.modelToViewPosition( new Vector2( line.x2, line.y2 ) );
    } );

    this.addInputListener( new SlopeDragHandler( interactiveLineProperty, riseRangeProperty, runRangeProperty, mvt ) );
  }

  return inherit( LineManipulatorNode, SlopeManipulatorNode );
} );