// Copyright 2002-2013, University of Colorado

/**
 * Data structure for a fraction (possibly improper).
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function() {
  'use strict';

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
      return Math.floor( this.valueOf() ) == this.valueOf();
    },

    toString: function() {
      return "Fraction[numerator=" + this.numerator + ", denominator=" + this.denominator + "]";
    }
  };

  return Fraction;
} );