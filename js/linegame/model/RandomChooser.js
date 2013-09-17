// Copyright 2002-2013, University of Colorado Boulder

/**
 * Functions for randomly choosing values from arrays or arrays-of-arrays.
 * Used for generating challenges in "Line Game".
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var ChallengeFactory = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory' );
  var Range = require( 'DOT/Range' );

  return {

    /**
     *  Chooses a value from an array, removes the value from the array.
     *  @param {Array<*>} array the array from which the value will be chosen
     *  @return {*} a value
     */
    choose: function( array ) {
      var index = ChallengeFactory.randomIndex( array );
      assert && assert( index !== -1 );
      var value = array.get( index );
      array.splice( index, 1 );
      return value;
    },

    //TODO will this work? will index be removed from indices?
    /**
     * Chooses a value from an array of arrays, removes it from the array in which it was found, removes the array from the arrayIndices.
     * Use this when values are organized into 2 or more sets, and a value should be chosen from each set.
     * By removing an index from arrayIndices, one of the arrays is excluded from further consideration.
     *
     * @param {Array<Array<*>>} arrays arrays from which the value may be chosen
     * @param {Array<Number>} indices indices of the arrays that will be considered when choosing a value, optional
     * @return a value from one of the arrays
     */
    chooseFromArrays: function( arrays, indices ) {
      indices = indices || ChallengeFactory.rangeToArray( new Range( 0, arrays.length - 1 ) );
      var index = ChallengeFactory.randomIndex( indices );
      assert && assert( index !== -1 );
      var array = arrays.get( indices.get( index ) );
      indices.splice( index, 1 );
      return this.choose( array );
    }
  };
} );

