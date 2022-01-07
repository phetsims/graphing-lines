// Copyright 2013-2020, University of Colorado Boulder

/**
 * Phases of a game, mutually exclusive
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import graphingLines from '../../graphingLines.js';

const GamePhase = EnumerationDeprecated.byKeys( [
  'SETTINGS', // user is choosing game settings
  'PLAY',     // user is playing the game
  'RESULTS'   // user is viewing results at end of a game
] );

graphingLines.register( 'GamePhase', GamePhase );

export default GamePhase;