// Copyright 2013-2019, University of Colorado Boulder

/**
 * View for the 'Point-Slope' screen.
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
  const PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );
  const PointSlopeGraphNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeGraphNode' );

  /**
   * @param {PointSlopeModel} model
   * @constructor
   */
  function PointSlopeScreenView( model ) {

    const viewProperties = new LineFormsViewProperties();

    LineFormsScreenView.call( this, model, viewProperties,

      // graph
      new PointSlopeGraphNode( model, viewProperties ),

      // graph control panel
      new GraphControlPanel(
        viewProperties.gridVisibleProperty,
        viewProperties.slopeToolVisibleProperty,
        model.standardLines
      ),

      // equation accordion box
      new EquationAccordionBox(

        // title
        PointSlopeEquationNode.createGeneralFormNode(),

        // interactive equation
        new PointSlopeEquationNode( model.interactiveLineProperty, {
          x1RangeProperty: model.x1RangeProperty,
          y1RangeProperty: model.y1RangeProperty,
          riseRangeProperty: model.riseRangeProperty,
          runRangeProperty: model.runRangeProperty,
          maxWidth: 400
        } ),

        // Properties
        model.interactiveLineProperty,
        model.savedLines,
        viewProperties.interactiveEquationVisibleProperty
      )
    );
  }

  graphingLines.register( 'PointSlopeScreenView', PointSlopeScreenView );

  return inherit( LineFormsScreenView, PointSlopeScreenView );
} );