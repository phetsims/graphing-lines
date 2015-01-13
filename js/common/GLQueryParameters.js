// Copyright 2002-2014, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  var getQueryParameter = window.phetcommon.getQueryParameter;

  return {
    // enables developer-only features
    DEV:        getQueryParameter( 'dev' ) || false,

    // shows the game reward regardless of score
    REWARD:     getQueryParameter( 'reward' ) || false,

    // use hard-coded challenges in the game, for debugging
    HARD_CODED: getQueryParameter( 'hardCoded' ) || false
  };
} );
