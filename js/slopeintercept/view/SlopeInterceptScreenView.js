// Copyright 2013-2015, University of Colorado Boulder

/**
 * View for the 'Slope-Intercept' screen.
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
        SlopeInterceptEquationNode.createGeneralFormNode(),
        model.interactiveLineProperty,
        model.savedLines,
        viewProperties.interactiveEquationVisibleProperty,
        viewProperties.linesVisibleProperty,
        new SlopeInterceptEquationNode( model.interactiveLineProperty, {
          riseRangeProperty: model.riseRangeProperty,
          runRangeProperty: model.runRangeProperty,
          yInterceptRangeProperty: model.y1RangeProperty
        } )
      )
    );
  }

  graphingLines.register( 'SlopeInterceptScreenView', SlopeInterceptScreenView );

  return inherit( LineFormsScreenView, SlopeInterceptScreenView );
} );