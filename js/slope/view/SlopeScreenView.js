// Copyright 2013-2018, University of Colorado Boulder

/**
 * View for the 'Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EquationAccordionBox = require( 'GRAPHING_LINES/common/view/EquationAccordionBox' );
  const GraphControlPanel = require( 'GRAPHING_LINES/common/view/GraphControlPanel' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LineFormsScreenView = require( 'GRAPHING_LINES/common/view/LineFormsScreenView' );
  const LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );
  const SlopeEquationNode = require( 'GRAPHING_LINES/slope/view/SlopeEquationNode' );
  const SlopeGraphNode = require( 'GRAPHING_LINES/slope/view/SlopeGraphNode' );

  /**
   * @param {SlopeModel} model
   * @constructor
   */
  function SlopeScreenView( model ) {

    var viewProperties = new LineFormsViewProperties();

    LineFormsScreenView.call( this, model, viewProperties,

      // graph
      new SlopeGraphNode( model, viewProperties ),

      // graph control panel
      new GraphControlPanel(
        viewProperties.gridVisibleProperty,
        viewProperties.slopeToolVisibleProperty,
        model.standardLines, {
          includeStandardLines: false
        } ),

      // equation accordion box
      new EquationAccordionBox(
        // title
        SlopeEquationNode.createGeneralFormNode(),

        // interactive equation
        new SlopeEquationNode( model.interactiveLineProperty, {
          x1RangeProperty: model.x1RangeProperty,
          y1RangeProperty: model.y1RangeProperty,
          x2RangeProperty: model.x2RangeProperty,
          y2RangeProperty: model.y2RangeProperty,
          maxWidth: 400
        } ),

        // Properties
        model.interactiveLineProperty,
        model.savedLines,
        viewProperties.interactiveEquationVisibleProperty
      )
    );
  }

  graphingLines.register( 'SlopeScreenView', SlopeScreenView );

  return inherit( LineFormsScreenView, SlopeScreenView );
} );