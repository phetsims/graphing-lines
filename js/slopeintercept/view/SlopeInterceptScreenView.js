// Copyright 2013-2019, University of Colorado Boulder

/**
 * View for the 'Slope-Intercept' screen.
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
  const SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );
  const SlopeInterceptGraphNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptGraphNode' );

  /**
   * @param {SlopeInterceptModel} model
   * @constructor
   */
  function SlopeInterceptScreenView( model ) {

    const viewProperties = new LineFormsViewProperties();

    LineFormsScreenView.call( this, model, viewProperties,

      // graph
      new SlopeInterceptGraphNode( model, viewProperties ),

      // graph control panel
      new GraphControlPanel(
        viewProperties.gridVisibleProperty,
        viewProperties.slopeToolVisibleProperty,
        model.standardLines
      ),

      // equation accordion box
      new EquationAccordionBox(

        // title
        SlopeInterceptEquationNode.createGeneralFormNode(),

        // interactive equation
        new SlopeInterceptEquationNode( model.interactiveLineProperty, {
          riseRangeProperty: model.riseRangeProperty,
          runRangeProperty: model.runRangeProperty,
          yInterceptRangeProperty: model.y1RangeProperty,
          maxWidth: 400
        } ),

        // Properties
        model.interactiveLineProperty,
        model.savedLines,
        viewProperties.interactiveEquationVisibleProperty
      )
    );
  }

  graphingLines.register( 'SlopeInterceptScreenView', SlopeInterceptScreenView );

  return inherit( LineFormsScreenView, SlopeInterceptScreenView );
} );