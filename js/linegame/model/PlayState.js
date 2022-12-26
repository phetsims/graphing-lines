// Copyright 2013-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * States during the 'play' phase of a game, mutually exclusive. (See GamePhase.)
 * For lack of better names, the state names correspond to the main action that
 * the user can take in that state.  For example. the FIRST_CHECK state is where the user
 * has their first opportunity to press the 'Check' button.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import graphingLines from '../../graphingLines.js';

const PlayState = EnumerationDeprecated.byKeys( [
  'FIRST_CHECK',
  'TRY_AGAIN',
  'SECOND_CHECK',
  'SHOW_ANSWER',
  'NEXT',
  'NONE' // use this value when game is not in the 'play' phase
] );

graphingLines.register( 'PlayState', PlayState );

export default PlayState;