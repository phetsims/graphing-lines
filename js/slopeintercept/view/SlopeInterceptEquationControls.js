// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for interacting with a line's equation in slope form.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationControls = require( 'GRAPHING_LINES/common/view/EquationControls' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );

  /**
   * @param {SlopeInterceptModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function SlopeInterceptEquationControls( model, viewProperties ) {
    EquationControls.call( this,
      SlopeInterceptEquationNode.createGeneralFormNode(),
      model.interactiveLineProperty,
      model.savedLines,
      viewProperties.interactiveEquationVisibleProperty,
      viewProperties.linesVisibleProperty,
      new SlopeInterceptEquationNode( model.interactiveLineProperty, model.riseRangeProperty, model.runRangeProperty, model.y1RangeProperty ) );
  }

  return inherit( EquationControls, SlopeInterceptEquationControls );
} );