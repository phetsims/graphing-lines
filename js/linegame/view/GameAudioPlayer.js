// Copyright 2002-2013, University of Colorado Boulder

//TODO this is a stub, see BAA.GameAudioPlayer for implementation
define( function( require ) {
  'use strict';

  /**
   * @param soundEnabledProperty
   * @constructor
   */
  function GameAudioPlayer( soundEnabledProperty ) {
    this.soundEnabledProperty = soundEnabledProperty;
  }

  GameAudioPlayer.prototype.correctAnswer = function() {
    if ( this.soundEnabledProperty.value ) {
      //TODO
    }
  };

  GameAudioPlayer.prototype.wrongAnswer = function() {
    if ( this.soundEnabledProperty.value ) {
      //TODO
    }
  };

  GameAudioPlayer.prototype.gameOverZeroScore = function() {
    if ( this.soundEnabledProperty.value ) {
      //TODO
    }
  };

  GameAudioPlayer.prototype.gameOverImperfectScore = function() {
    if ( this.soundEnabledProperty.value ) {
      //TODO
    }
  };

  GameAudioPlayer.prototype.gameOverPerfectScore = function() {
    if ( this.soundEnabledProperty.value ) {
      //TODO
    }
  };

  return GameAudioPlayer;
} );