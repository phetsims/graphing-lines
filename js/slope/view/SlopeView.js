// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var EquationControls = require( 'GRAPHING_LINES/common/view/EquationControls' );
  var GraphControls = require( 'GRAPHING_LINES/common/view/GraphControls' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsView = require( 'GRAPHING_LINES/common/view/LineFormsView' );
  var LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );
  var SlopeGraphNode = require( 'GRAPHING_LINES/slope/view/SlopeGraphNode' );

  /**
   * @param {SlopeModel} model
   * @constructor
   */
  function SlopeView( model ) {
    var viewProperties = new LineFormsViewProperties();
    LineFormsView.call( this, model, viewProperties,
      new SlopeGraphNode( model, viewProperties ),
      EquationControls.createSlopeEquationControls( model, viewProperties ),
      new GraphControls( viewProperties.linesVisibleProperty, viewProperties.slopeVisibleProperty, model.standardLines, { includeStandardLines: false } ) );
  }

  return inherit( LineFormsView, SlopeView );
} );