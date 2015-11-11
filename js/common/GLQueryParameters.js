// Copyright 2014-2015, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );

  var getQueryParameter = phet.chipper.getQueryParameter;

  var GLQueryParameters = {

    // enables developer-only features
    DEV: getQueryParameter( 'dev' ) || false,

    // shows the game reward regardless of score
    REWARD: getQueryParameter( 'reward' ) || false,

    // use hard-coded challenges in the game, for debugging
    HARD_CODED: getQueryParameter( 'hardCoded' ) || false
  };

  graphingLines.register( 'GLQueryParameters', GLQueryParameters );

  return GLQueryParameters;
} );
