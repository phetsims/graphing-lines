// Copyright 2013-2018, University of Colorado Boulder

/**
 * View for the 'Slope-Intercept' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationAccordionBox = require( 'GRAPHING_LINES/common/view/EquationAccordionBox' );
  var GraphControlPanel = require( 'GRAPHING_LINES/common/view/GraphControlPanel' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsScreenView = require( 'GRAPHING_LINES/common/view/LineFormsScreenView' );
  var LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );
  var SlopeInterceptGraphNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptGraphNode' );

  /**
   * @param {SlopeInterceptModel} model
   * @constructor
   */
  function SlopeInterceptScreenView( model ) {

    var viewProperties = new LineFormsViewProperties();

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