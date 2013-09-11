// Copyright 2002-2013, University of Colorado

/**
 * Graph that provides direct manipulation of a line in point-slope form.
 * Extends the base type by adding manipulators for point and slope.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsGraphNode = require( 'GRAPHING_LINES/common/view/LineFormsGraphNode' );
  var PointSlopeLineNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeLineNode' );
  var SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  var Vector2 = require( 'DOT/Vector2' );
  var X1Y1Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X1Y1Manipulator' );

  /**
   * @param {PointSlopeModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function PointSlopeGraphNode( model, viewProperties ) {

    var thisNode = this;
    LineFormsGraphNode.call( thisNode, model, viewProperties,
      function( line, graph, mvt ) {
        return new PointSlopeLineNode( line, graph, mvt );
      } );

    var manipulatorDiameter = model.mvt.modelToViewDeltaX( model.manipulatorDiameter );

    // (x1,y1) point manipulator
    var x1y1Manipulator = new X1Y1Manipulator(
      manipulatorDiameter, model.interactiveLineProperty, model.x1RangeProperty, model.y1RangeProperty, model.mvt, true /* constantSlope */ );

    // slope manipulator
    var slopeManipulator = new SlopeManipulator(
      manipulatorDiameter, model.interactiveLineProperty, model.riseRangeProperty, model.runRangeProperty, model.mvt );

    // rendering order
    thisNode.addChild( x1y1Manipulator );
    thisNode.addChild( slopeManipulator );

    // visibility of manipulators
    var updateVisibility = function() {
      var visible = viewProperties.linesVisible && viewProperties.interactiveLineVisible;
      x1y1Manipulator.setVisible( visible );
      slopeManipulator.setVisible( visible );
    };
    viewProperties.linesVisibleProperty.link( updateVisibility );
    viewProperties.interactiveLineVisibleProperty.link( updateVisibility );
  }

  return inherit( LineFormsGraphNode, PointSlopeGraphNode );
} );
