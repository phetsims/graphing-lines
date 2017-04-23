// Copyright 2013-2015, University of Colorado Boulder

/**
 * View for the 'Slope' screen.
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
  var SlopeEquationNode = require( 'GRAPHING_LINES/slope/view/SlopeEquationNode' );
  var SlopeGraphNode = require( 'GRAPHING_LINES/slope/view/SlopeGraphNode' );

  /**
   * @param {SlopeModel} model
   * @constructor
   */
  function SlopeScreenView( model ) {

    var viewProperties = new LineFormsViewProperties();

    LineFormsScreenView.call( this, model, viewProperties,

      // graph
      new SlopeGraphNode( model, viewProperties ),

      // graph controls
      new GraphControls(
        viewProperties.linesVisibleProperty,
        viewProperties.gridVisibleProperty,
        viewProperties.slopeToolVisibleProperty,
        model.standardLines, {
          includeStandardLines: false,
          maxWidth: 400
        } ),

      // equation controls
      new EquationControls(
        SlopeEquationNode.createGeneralFormNode(),
        model.interactiveLineProperty,
        model.savedLines,
        viewProperties.interactiveEquationVisibleProperty,
        viewProperties.linesVisibleProperty,
        new SlopeEquationNode( model.interactiveLineProperty, {
          x1RangeProperty: model.x1RangeProperty,
          y1RangeProperty: model.y1RangeProperty,
          x2RangeProperty: model.x2RangeProperty,
          y2RangeProperty: model.y2RangeProperty
        } )
      )
    );
  }

  graphingLines.register( 'SlopeScreenView', SlopeScreenView );

  return inherit( LineFormsScreenView, SlopeScreenView );
} );