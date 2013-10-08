// Copyright 2002-2013, University of Colorado Boulder

//TODO port from Java, or look at BAA
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function GameScoreboardNode() {
    Rectangle.call( this, 0, 0, 1000, 50, { fill: 'rgb(155,191,255)', stroke: 'black' } );
  }

  return inherit( Rectangle, GameScoreboardNode, {

    addListener: function( listener ) {
      //TODO see PlayNode
    },

    setLevel: function( level ) {
      //TODO
    },

    setScore: function( score ) {
      //TODO
    },

    setTimerVisible: function( visible ) {
      //TODO
    },

    setTime: function( time, bestTime ) {
      //TODO
    }
  } );
} );
