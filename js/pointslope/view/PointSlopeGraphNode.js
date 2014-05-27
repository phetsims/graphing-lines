// Copyright 2002-2014, University of Colorado Boulder

/**
 * Graph that provides direct manipulation of a line in point-slope form.
 * Extends the base type by adding manipulators for point and slope.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsGraphNode = require( 'GRAPHING_LINES/common/view/LineFormsGraphNode' );
  var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );
  var SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  var X1Y1Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X1Y1Manipulator' );

  /**
   * @param {PointSlopeModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function PointSlopeGraphNode( model, viewProperties ) {

    var thisNode = this;
    LineFormsGraphNode.call( thisNode, model, viewProperties,
      // createLineNode: {Line} line, {Graph} graph, {ModelViewTransform2} mvt
      function( line, graph, mvt ) {
        return new LineNode( line, graph, mvt, {
          createEquationNode: function( line, fontSize, color ) {
            return PointSlopeEquationNode.createStaticEquation( line, fontSize, color );
          }
        } );
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
      x1y1Manipulator.visible = slopeManipulator.visible = (viewProperties.linesVisible && viewProperties.interactiveLineVisible);
    };
    viewProperties.linesVisibleProperty.link( updateVisibility.bind( thisNode ) );
    viewProperties.interactiveLineVisibleProperty.link( updateVisibility.bind( thisNode ) );
  }

  return inherit( LineFormsGraphNode, PointSlopeGraphNode );
} );
