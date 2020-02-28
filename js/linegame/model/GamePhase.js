// Copyright 2013-2020, University of Colorado Boulder

/**
 * Phases of a game, mutually exclusive
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingLines from '../../graphingLines.js';

// NOTE: enum pattern recommends using {} for each value, but strings are more convenient for debugging
const GamePhase = Object.freeze( {
  SETTINGS: 'SETTINGS', // user is choosing game settings
  PLAY: 'PLAY', // user is playing the game
  RESULTS: 'RESULTS' // user is viewing results at end of a game
} );

graphingLines.register( 'GamePhase', GamePhase );

export default GamePhase;