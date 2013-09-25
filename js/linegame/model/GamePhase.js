// Copyright 2002-2013, University of Colorado Boulder

/**
 * Phases of a game, mutually exclusive
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  return Object.freeze( {
    SETTINGS: 'SETTINGS', // user is choosing game settings
    PLAY: 'PLAY', // user is playing the game
    RESULTS: 'RESULTS' // user is viewing results at end of a game
  } );
} );

