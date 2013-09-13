// Copyright 2002-2013, University of Colorado Boulder

/**
 * Control panel for interacting with a line's equation in point-slope form.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationControls = require( 'GRAPHING_LINES/common/view/EquationControls' );
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
      new PointSlopeEquationNode( model.interactiveLineProperty,
        model.x1RangeProperty, model.y1RangeProperty, model.riseRangeProperty, model.runRangeProperty )
    );
  }

  return inherit( EquationControls, PointSlopeEquationControls );
} );

