// Copyright 2002-2013, University of Colorado Boulder

/**
 * Global configuration of this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );

  return {
    RENDERER: 'svg',
    LAYOUT_BOUNDS: new Bounds2( 0, 0, 1100, 700 )
  };
} );
