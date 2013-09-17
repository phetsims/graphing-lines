// Copyright 2002-2013, University of Colorado Boulder

/**
 * Base type for challenge factories. These factories handle quasi-random creation of challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var RandomChooser = require( 'GRAPHING_LINES/linegame/model/RandomChooser' );
  var Vector2 = require( 'DOT/Vector2' );

  function ChallengeFactory() {}

  ChallengeFactory.prototype = {

    /**
     * Creates challenges for the factory's game level.
     *
     * @abstract
     * @param {Range} xRange range of the graph's x axis
     * @param {Range} yRange range of the graph's y axis
     * @return {Array<Challenge>} array of challenges
     */
    createChallenges: function( xRange, yRange ) {
      throw new Error( 'must be implemented by subtypes' );
    }
  };

  // Gets a random index for a specified array.
  ChallengeFactory.randomIndex = function( array ) {
    return Math.floor( Math.random() * array.length );
  };

  /**
   * Picks a point that keeps the slope indicator on the graph.
   * @param {Fraction} slope
   * @param {Range} graphXRange
   * @param {Range} graphYRange
   * @returns {Vector2}
   */
  ChallengeFactory.choosePointForSlope = function( slope, graphXRange, graphYRange ) {

    var rise = slope.numerator;
    var run = slope.denominator;

    // x
    var minX = ( run >= 0 ) ? graphXRange.min : graphXRange.min - run;
    var maxX = (run >= 0) ? graphXRange.max - run : graphXRange.max;
    var x = Math.floor( minX + ( Math.random() * ( maxX - minX ) ) );

    // y
    var minY = ( rise >= 0) ? graphYRange.min : graphYRange.min - rise;
    var maxY = (rise >= 0) ? graphYRange.max - rise : graphYRange.max;
    var y = Math.floor( minY + ( Math.random() * ( maxY - minY ) ) );

    return new Vector2( x, y );
  };

  /**
   * Picks a point (x1,x2) on the graph that results in the slope indicator (x2,y2) being off the graph.
   * This forces the user to invert the slope.
   *
   * @param {Fraction} slope
   * @param {Range} graphXRange
   * @param {Range} graphYRange
   * @returns {Vector2}
   */
  ChallengeFactory.choosePointForSlopeInversion = function( slope, graphXRange, graphYRange ) {

    var rise = slope.numerator;
    var run = slope.denominator;

    // x1 coordinates
    var minX1 = ( run >= 0 ) ? graphXRange.max - run + 1 : graphXRange.min;
    var maxX1 = ( run >= 0 ) ? graphXRange.max : graphXRange.min - run - 1;
    var x1 = Math.floor( minX1 + ( Math.random() * ( maxX1 - minX1 ) ) );

    // y1 coordinates
    var minY1 = ( rise >= 0 ) ? graphYRange.max - rise + 1 : graphYRange.min;
    var maxY1 = ( rise >= 0 ) ? graphYRange.max : graphYRange.min - rise - 1;
    var y1 = Math.floor( minY1 + ( Math.random() * ( maxY1 - minY1 ) ) );

    // compute (x2,y2) for validation
    var x2 = x1 + run;
    var y2 = y1 + rise;

    // (x1,y1) must be on the graph, (x2,y2) must be off the graph
    assert && assert( graphXRange.contains( x1 ) && !graphXRange.contains( x2 ) );
    assert && assert( graphYRange.contains( y1 ) && !graphYRange.contains( y2 ) );

    return new Vector2( x1, y1 );
  };

  /**
   * Converts an integer range to a ordered array of integer values that are in that range.
   * @param {Range} range
   * @returns {Array<Number>}
   */
  ChallengeFactory.rangeToArray = function( range ) {
    var array = [];
    for ( var i = range.min; i <= range.max; i++ ) {
      array.put( i );
    }
    return array;
  };

  return ChallengeFactory;
} );

