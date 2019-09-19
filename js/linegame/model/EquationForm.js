// Copyright 2013-2015, University of Colorado Boulder

/**
 * Used to specify the form of the equations in Game challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );

  // NOTE: enum pattern recommends using {} for each value, but strings are more convenient for debugging
  var EquationForm = Object.freeze( {
    SLOPE_INTERCEPT: 'SLOPE_INTERCEPT', /* y = mx + b */
    POINT_SLOPE: 'POINT_SLOPE' /* (y2 - y1) = m(x2 - x1) */
  } );

  graphingLines.register( 'EquationForm', EquationForm );

  return EquationForm;
} );