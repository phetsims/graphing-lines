// Copyright 2002-2013, University of Colorado Boulder

//TODO this was in Java common code
//TODO implement this
define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' );

  function GameTimer() {
    this.timeProperty = new Property( 0 ); // ms
    this._running = false;
  }

  GameTimer.prototype = {
    start: function() { this._running = true; },
    stop: function() { this._running = false; },
    isRunning: function() { return this._running; }
  };

  //TODO does time format need to be localized?
  /**
   * Formats a value representing seconds into HH:MM:SS.
   * @param {Number} secs
   * @returns {string}
   */
  GameTimer.formatTime = function( secs ) {
    var hours = Math.floor( secs / 3600 );
    var minutes = Math.floor( (secs - (hours * 3600)) / 60 );
    var seconds = Math.floor( secs - (hours * 3600) - (minutes * 60) );
    return ( hours > 0 ? hours + ':' : '' ) + hours > 0 && minutes < 10 ? '0' + minutes : minutes + ':' + ( seconds > 9 ? seconds : '0' + seconds );
  };

  return GameTimer;
} );
