// Copyright 2002-2013, University of Colorado Boulder

//TODO implement
define( function( require ) {
  'use strict';

  // imports
  var ChallengeFactory = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ChallengeFactory5() {
    ChallengeFactory.call( this );
  }

  return inherit( ChallengeFactory, ChallengeFactory5, {

    /**
     * Creates challenges for this game level.
     * @override
     * @param {Range} xRange range of the graph's x axis
     * @param {Range} yRange range of the graph's y axis
     * @return {Array<Challenge>} array of challenges
     */
    createChallenges: function( xRange, yRange ) {
      return [];        //TODO
    }
  } );
} );