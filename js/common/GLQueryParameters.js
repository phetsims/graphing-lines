// Copyright 2014-2019, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );

  const GLQueryParameters = QueryStringMachine.getAll( {

    // shows the game reward regardless of score
    showReward: { type: 'flag' },

    // whether to shuffle challenges in the game,
    // set to false if you want to compare challenges to the design doc
    shuffle: {
      type: 'boolean',
      defaultValue: true
    },

    // verifies the creation of challenges via stress testing, use this with assertions enabled (?ea)
    verifyChallenges: { type: 'flag' }
  } );

  graphingLines.register( 'GLQueryParameters', GLQueryParameters );

  // log the values of all sim-specific query parameters
  phet.log && phet.log( 'query parameters: ' + JSON.stringify( GLQueryParameters, null, 2 ) );

  return GLQueryParameters;
} );
