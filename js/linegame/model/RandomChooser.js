// Copyright 2013-2015, University of Colorado Boulder

/**
 * Functions for randomly choosing values from arrays or arrays-of-arrays.
 * Used for generating challenges in 'Line Game'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );

  var RandomChooser = {

    /**
     *  Chooses a value from an array, removes the value from the array.
     *  @param {*[]} array the array from which the value will be chosen
     *  @return {*} a value
     */
    choose: function( array ) {
      assert && assert( array && array.length > 0, 'array is empty' );
      var index = RandomChooser.randomIndex( array );
      assert && assert( index !== -1 );
      var value = array[ index ];
      array.splice( index, 1 );
      return value;
    },

    /**
     * Chooses a value from an array of arrays, removes it from the array in which it was found, removes the array from the arrayIndices.
     * Use this when values are organized into 2 or more sets, and a value should be chosen from each set.
     * By removing an index from arrayIndices, one of the arrays is excluded from further consideration.
     *
     * @param {*[][]} arrays arrays from which the value may be chosen
     * @param {Array<number>} [indices] indices of the arrays that will be considered when choosing a value, optional
     * @return a value from one of the arrays
     */
    chooseFromArrays: function( arrays, indices ) {
      assert && assert( arrays && arrays.length > 0, 'arrays is empty' );
      indices = indices || RandomChooser.rangeToArray( { min: 0, max: arrays.length - 1 } );
      var index = RandomChooser.randomIndex( indices );
      assert && assert( index !== -1 );
      var array = arrays[ indices[ index ] ];
      indices.splice( index, 1 );
      return this.choose( array );
    },

    // Gets a random index for a specified array.
    randomIndex: function( array ) {
      return Math.floor( phet.joist.random.nextDouble() * array.length );
    },

    /**
     * Converts an integer range to a ordered array of integer values that are in that range.
     * @param {{min:Number, max:Number}} range
     * @param {Object} [options]
     * @returns {number[]}
     */
    rangeToArray: function( range, options ) {

      options = _.extend( {
        excludeZero: false // {boolean} whether to exclude zero from the array
      }, options );
      
      var array = [];
      for ( var i = range.min; i <= range.max; i++ ) {
        if ( !options.excludeZero || i !== 0 ) {
          array.push( i );
        }
      }
      return array;
    }
  };

  graphingLines.register( 'RandomChooser', RandomChooser );

  return RandomChooser;
} );

