// Copyright 2002-2014, University of Colorado Boulder

/**
 * Data structure for a fraction (possibly improper).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Util = require( 'DOT/Util' );

  /**
   * @param {Number} numerator must be an integer
   * @param {Number} denominator must be an integer
   * @constructor
   */
  function Fraction( numerator, denominator ) {
    assert && assert( Util.isInteger( numerator ) ) && assert( Util.isInteger( numerator ) );
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