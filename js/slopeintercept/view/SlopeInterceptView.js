// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Slope-Intercept' screen.
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
  var SlopeInterceptGraphNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptGraphNode' );

  /**
   * @param {SlopeInterceptModel} model
   * @constructor
   */
  function SlopeInterceptView( model ) {
    var viewProperties = new LineFormsViewProperties();
    LineFormsView.call( this, model, viewProperties,
      new SlopeInterceptGraphNode( model, viewProperties ),
      EquationControls.createSlopeInterceptEquationControls( model, viewProperties ),
      new GraphControls( viewProperties.linesVisibleProperty, viewProperties.slopeVisibleProperty, model.standardLines ) );
  }

  return inherit( LineFormsView, SlopeInterceptView );
} );