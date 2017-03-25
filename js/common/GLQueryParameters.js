// Copyright 2014-2017, University of Colorado Boulder

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

    // shows the game answers and additional debugging controls
    showAnswers: { type: 'flag' },

    // shows the game reward regardless of score
    showReward: { type: 'flag' },

    // whether to shuffle challenges in the game,
    // set to false if you want to compare challenges to the design doc
    shuffle: {
      type: 'boolean',
      defaultValue: true
    }
  } );

  graphingLines.register( 'GLQueryParameters', GLQueryParameters );

  return GLQueryParameters;
} );
