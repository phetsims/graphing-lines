// Copyright 2002-2013, University of Colorado Boulder

//TODO this was in Java common code
/**
 * Properties related to game settings.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' );

  function GameSettings( numberOfLevels, soundEnabled, timerEnabled ) {

    this.levelProperty = new Property( 0 );
    this.soundEnabledProperty = new Property( soundEnabled );
    this.timerEnabledProperty = new Property( timerEnabled );

    this.levelProperty.link( function( level ) {
      if ( level < 0 || level > numberOfLevels - 1 ) {
        throw new Error( "level is out of range: " + level );
      }
    });
  }

  GameSettings.prototype = {

    reset: function() {
      this.levelProperty.reset();
      this.soundEnabledProperty.reset();
      this.timerEnabledProperty.reset();
    }
  };

  return GameSettings;
} );
