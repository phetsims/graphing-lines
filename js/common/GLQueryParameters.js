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

  var GLQueryParameters = QueryStringMachine.getAll( {

    // adds debugging components to the Game screen
    gameDebug: { type: 'flag' },

    // shows the answers
    showAnswers: { type: 'flag' },

    // shows the game reward regardless of score
    showReward: { type: 'flag' },

    // use hard-coded challenges in the game, for debugging
    hardCoded: { type: 'flag' }
  } );

  graphingLines.register( 'GLQueryParameters', GLQueryParameters );

  return GLQueryParameters;
} );
