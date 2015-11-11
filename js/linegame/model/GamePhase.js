// Copyright 2013-2015, University of Colorado Boulder

/**
 * Phases of a game, mutually exclusive
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );

  // NOTE: enum pattern recommends using {} for each value, but strings are more convenient for debugging
  var GamePhase = Object.freeze( {
    SETTINGS: 'SETTINGS', // user is choosing game settings
    PLAY: 'PLAY', // user is playing the game
    RESULTS: 'RESULTS' // user is viewing results at end of a game
  } );

  graphingLines.register( 'GamePhase', GamePhase );

  return GamePhase;
} );

