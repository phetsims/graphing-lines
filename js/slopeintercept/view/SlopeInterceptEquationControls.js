// Copyright 2002-2013, University of Colorado Boulder

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
   * @param {SlopeModel} model
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
      new SlopeInterceptEquationNode( model.interactiveLineProperty, model.riseRange, model.runRange, model.y1Range ) );
  }

  return inherit( EquationControls, SlopeInterceptEquationControls );
} );