// Copyright 2017-2020, University of Colorado Boulder

/**
 * ValuePool takes sets of values, separates them into "required" and "optional" sets,
 * and provides an API for randomly selecting values from either set.
 * Used in the game to create sets of slopes, y-intercepts and points for challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import graphingLines from '../../graphingLines.js';

class ValuePool {

  /**
   * @param {*[][]} arrays - the sets of values
   */
  constructor( arrays ) {

    // @private 1 value from each array is "required"
    this.requiredValues = [];
    arrays.forEach( array => {
      assert && assert( Array.isArray( array ) );
      this.requiredValues.push( ValuePool.choose( array ) );
    } );

    // @private the remaining values are optional
    this.optionalValues = _.flatten( arrays );
  }

  /**
   * Randomly selects a required value, and removes it from the set of required values.
   * @returns {*}
   * @public
   */
  chooseRequired() {
    assert && assert( this.requiredValues.length > 0, 'required values is empty' );
    return ValuePool.choose( this.requiredValues );
  }

  /**
   * Randomly selects an optional value, and removes it from the set of optional values.
   * @returns {*}
   * @public
   */
  chooseOptional() {
    assert && assert( this.optionalValues.length > 0, 'optional values is empty' );
    return ValuePool.choose( this.optionalValues );
  }

  /**
   * Is the required pool empty?
   * @returns {boolean}
   */
  isEmpty() {
    return ( this.requiredValues.length === 0 );
  }

  /**
   * Randomly chooses an item from an array, and removes the item from the array.
   * @param {*[]} array
   * @returns {*}
   * @public
   * @static
   */
  static choose( array ) {
    assert && assert( array && array.length > 0, 'array is empty' );
    const index = phet.joist.random.nextIntBetween( 0, array.length - 1 );
    assert && assert( index !== -1 );
    const item = array[ index ];
    array.splice( index, 1 );
    return item;
  }

  /**
   * Converts an integer range to an ordered array of integer values that are in that range.
   * @param {Range} range
   * @param {Object} [options]
   * @returns {number[]}
   * @public
   * @static
   */
  static rangeToArray( range, options ) {

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
}

graphingLines.register( 'ValuePool', ValuePool );

export default ValuePool;