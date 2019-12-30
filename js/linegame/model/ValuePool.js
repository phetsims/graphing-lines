// Copyright 2017-2019, University of Colorado Boulder

/**
 * ValuePool takes sets of values, separates them into "required" and "optional" sets,
 * and provides an API for randomly selecting values from either set.
 * Used in the game to create sets of slopes, y-intercepts and points for challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Utils = require( 'DOT/Utils' );

  /**
   * @param {*[][]} arrays - the sets of values
   * @constructor
   */
  function ValuePool( arrays ) {

    const self = this;

    // @private 1 value from each array is "required"
    this.requiredValues = [];
    arrays.forEach( function( array ) {
      assert && assert( Array.isArray( array ) );
      self.requiredValues.push( ValuePool.choose( array ) );
    } );

    // @private the remaining values are optional
    this.optionalValues = _.flatten( arrays );
  }

  graphingLines.register( 'ValuePool', ValuePool );

  return inherit( Object, ValuePool, {

    /**
     * Randomly selects a required value, and removes it from the set of required values.
     * @returns {*}
     * @public
     */
    chooseRequired: function() {
      assert && assert( this.requiredValues.length > 0, 'required values is empty' );
      return ValuePool.choose( this.requiredValues );
    },

    /**
     * Randomly selects an optional value, and removes it from the set of optional values.
     * @returns {*}
     * @public
     */
    chooseOptional: function() {
      assert && assert( this.optionalValues.length > 0, 'optional values is empty' );
      return ValuePool.choose( this.optionalValues );
    },

    /**
     * Is the required pool empty?
     * @returns {boolean}
     */
    isEmpty: function() {
      return ( this.requiredValues.length === 0 );
    }
  }, {

    /**
     * Randomly chooses an item from an array, and removes the item from the array.
     * @param {*[]} array
     * @returns {*}
     * @public
     * @static
     */
    choose: function( array ) {
      assert && assert( array && array.length > 0, 'array is empty' );
      const index = phet.joist.random.nextIntBetween( 0, array.length - 1 );
      assert && assert( index !== -1 );
      const item = array[ index ];
      array.splice( index, 1 );
      return item;
    },

    /**
     * Converts an integer range to an ordered array of integer values that are in that range.
     * @param {Range} range
     * @param {Object} [options]
     * @returns {number[]}
     * @public
     * @static
     */
    rangeToArray: function( range, options ) {

      assert && assert( Utils.isInteger( range.min ) && Utils.isInteger( range.max ) );

      options = merge( {
        excludeZero: false // {boolean} whether to exclude zero from the array
      }, options );

      const array = [];
      for ( let i = range.min; i <= range.max; i++ ) {
        if ( !options.excludeZero || i !== 0 ) {
          array.push( i );
        }
      }
      return array;
    }
  } );
} );
