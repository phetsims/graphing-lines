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
  var SlopeEquationNode = require( 'GRAPHING_LINES/slope/view/SlopeEquationNode' );

  /**
   * @param {SlopeModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function SlopeEquationControls( model, viewProperties ) {
    EquationControls.call( this,
      SlopeEquationNode.createGeneralFormNode(),
      model.interactiveLineProperty,
      model.savedLines,
      viewProperties.interactiveEquationVisibleProperty,
      viewProperties.linesVisibleProperty,
      new SlopeEquationNode( model.interactiveLineProperty, model.x1RangeProperty, model.y1RangeProperty ) );
  }

  return inherit( EquationControls, SlopeEquationControls );
} );