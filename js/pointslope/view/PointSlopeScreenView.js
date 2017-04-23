// Copyright 2013-2015, University of Colorado Boulder

/**
 * View for the 'Point-Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationControls = require( 'GRAPHING_LINES/common/view/EquationControls' );
  var GraphControls = require( 'GRAPHING_LINES/common/view/GraphControls' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsScreenView = require( 'GRAPHING_LINES/common/view/LineFormsScreenView' );
  var LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );
  var PointSlopeGraphNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeGraphNode' );

  /**
   * @param {PointSlopeModel} model
   * @constructor
   */
  function PointSlopeScreenView( model ) {

    var viewProperties = new LineFormsViewProperties();

    LineFormsScreenView.call( this, model, viewProperties,

      // graph
      new PointSlopeGraphNode( model, viewProperties ),

      // graph controls
      new GraphControls(
        viewProperties.linesVisibleProperty,
        viewProperties.gridVisibleProperty,
        viewProperties.slopeToolVisibleProperty,
        model.standardLines, {
          maxWidth: 400
        } ),

      // equation controls
      new EquationControls(
        PointSlopeEquationNode.createGeneralFormNode(),
        model.interactiveLineProperty,
        model.savedLines,
        viewProperties.interactiveEquationVisibleProperty,
        viewProperties.linesVisibleProperty,
        new PointSlopeEquationNode( model.interactiveLineProperty, {
          x1RangeProperty: model.x1RangeProperty,
          y1RangeProperty: model.y1RangeProperty,
          riseRangeProperty: model.riseRangeProperty,
          runRangeProperty: model.runRangeProperty
        } )
      )
    );
  }

  graphingLines.register( 'PointSlopeScreenView', PointSlopeScreenView );

  return inherit( LineFormsScreenView, PointSlopeScreenView );
} );