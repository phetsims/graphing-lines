// Copyright 2002-2013, University of Colorado Boulder

/**
 * Results for the 'Line Game' screen.
 * Note that levels are numbered internally starting from zero, but presented to the user starting from 1.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports 
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {Number} numberOfLevels
   * @constructor
   */
  function GameResults( numberOfLevels ) {
    this.scoreProperty = new Property( 0 ); // how many points the user has earned for the current game
    this.isNewBestTime = false; // is the time for the most-recently-completed game a new best time?
    this.bestTimes = []; // best times for each level, in ms
    for ( var level = 0; level < numberOfLevels; level++ ) {
      this.bestTimes.push( null ); // null if a level has no best time yet
    }
  }

  return GameResults;
} );
