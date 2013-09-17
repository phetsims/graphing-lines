// Copyright 2002-2013, University of Colorado Boulder

/**
 * Constants that are global to this sim.
 * Additional constants for the 'Line Game' screen are in LineGameConstants.
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
