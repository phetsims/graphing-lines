// Copyright 2002-2013, University of Colorado

/**
 * Data structure for a fraction (possibly improper).
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var Util = require( 'DOT/Util' );

  /**
   * @param {Number} numerator
   * @param {Number} denominator
   * @constructor
   */
  function Fraction( numerator, denominator ) {
    this.numerator = numerator;
    this.denominator = denominator;
  }

  Fraction.prototype = {

    valueOf: function() {
      return this.numerator / this.denominator;
    },

    isInteger: function() {
      return Util.isInteger( this.valueOf() );
    },

    toString: function() {
      return "Fraction[numerator=" + this.numerator + " denominator=" + this.denominator + "]";
    }
  };

  return Fraction;
} );