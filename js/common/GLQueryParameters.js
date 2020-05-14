// Copyright 2014-2020, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingLines from '../graphingLines.js';

const GLQueryParameters = QueryStringMachine.getAll( {

  // Shows the game reward regardless of score.
  // For internal use only.
  showReward: { type: 'flag' },

  // Whether to shuffle challenges in the game, set to false if you want to compare challenges to the design doc.
  // For internal use only.
  shuffle: {
    type: 'boolean',
    defaultValue: true
  },

  // Verifies the creation of challenges via stress testing, use this with assertions enabled (?ea).
  // For internal use only.
  verifyChallenges: { type: 'flag' }
} );

graphingLines.register( 'GLQueryParameters', GLQueryParameters );

// log the values of all sim-specific query parameters
phet.log && phet.log( 'query parameters: ' + JSON.stringify( GLQueryParameters, null, 2 ) );

export default GLQueryParameters;