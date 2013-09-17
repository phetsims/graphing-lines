// Copyright 2002-2013, University of Colorado Boulder

/**
 * Used to specify the form of the equations in Game challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function() {
  'use strict';

  return Object.freeze( {
    SLOPE_INTERCEPT: {}, /* y = mx + b */
    POINT_SLOPE: {} /* (y2 - y1) = m(x2 - x1) */
  } );
} );