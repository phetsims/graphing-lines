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

  return GameTimer;
} );
