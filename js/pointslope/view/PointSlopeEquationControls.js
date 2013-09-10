// Copyright 2002-2013, University of Colorado Boulder

/**
 * Control panel for interacting with a line's equation in point-slope form.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationControls = require( 'PATH/EquationControls' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );

  /**
   * @param {PointSlopeModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function PointSlopeEquationControls( model, viewProperties ) {
    EquationControls.call( this,
      PointSlopeEquationNode.createGeneralFormNode(),
      model.interactiveLineProperty,
      model.savedLines,
      viewProperties.interactiveEquationVisibleProperty,
      viewProperties.linesVisibleProperty,
      new PointSlopeEquationNode( model.interactiveLineProperty, model.x1Range, model.y1Range, model.riseRange, model.runRange )
    )
  }

  return inherit( EquationControls, PointSlopeEquationControls );
} );

