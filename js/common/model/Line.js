// Copyright 2002-2013, University of Colorado

/**
 * An immutable line, described by 2 points, (x1,y1) and (x2,y2).
 * Slope components (rise and run) are signed relative to (x1,y1).
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var Color = require( 'SCENERY/util/Color' );
  var Fraction = require( 'common/model/Fraction' );
  var LGColors = require( 'common/LGColors' );
  var Util = require( 'DOT/Util' );

  // Euclid's algorithm for computing the greatest common divisor (GCD) of two integers
  var getGreatestCommonDivisor = function( a, b ) {
    assert && assert( Util.isInteger( a ) && Util.isInteger( b ) );
    if ( b === 0 ) {
      return a;
    }
    else {
      return getGreatestCommonDivisor( b, a % b );
    }
  };

  function Line( x1, y1, x2, y2, color ) {
    assert && assert( x1 != x2 || y1 != y2 ); // 2 different points are required
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.rise = y2 - y1;
    this.run = x2 - x1;
    this.color = color || 'black';
  }

  Line.prototype = {

    // Convenience method for creating a line with a different color.
    withColor: function( color ) {
      return new Line( this.x1, this.y1, this.x2, this.y2, color );
    },

    toString: function() {
      return "Line[x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 +
             " rise=" + this.rise + " run=" + this.run + " color=" + this.color.toString() + "]";
    },

    // Returns true if 2 points on the specified line are also on this line.
    same: function( line ) {
      return ( line != null ) && this.onLine( line.x1, line.y1 ) && this.onLine( line.x2, line.y2 );
    },

    // Returns true if the slope is undefined.
    undefinedSlope: function() {
      return run == 0;
    },

    // Gets the slope. Returns NaN if slope is undefined.
    getSlope: function() {
      if ( this.undefinedSlope() ) {
        return Number.NaN;
      }
      else {
        return this.rise / this.run;
      }
    },

    /*
     * Given x, solve y = m(x - x1) + y1
     * Returns NaN if the solution is not unique, or there is no solution (x can't possibly be on the line.)
     * This occurs when we have a vertical line, with no run.
     */
    solveY: function( x ) {
      if ( this.undefinedSlope() ) {
        return Number.NaN;
      }
      else {
        return ( this.getSlope() * ( x - this.x1 ) ) + this.y1;
      }
    },

    /*
     * Given y, solve x = ((y - y1)/m) + x1
     * Returns NaN if the solution is not unique (horizontal line) or the slope is undefined (vertical line).
     */
    solveX: function( y ) {
      if ( this.rise == 0 || this.run == 0 ) {
        return Number.NaN;
      }
      else {
        return ( ( y - this.y1 ) / ( this.rise / this.run ) ) + this.x1;
      }
    },

    // Gets the simplified rise.
    getSimplifiedRise: function() {
      if ( this.slopeIsSimplifiable() ) {
        return ( this.rise / getGreatestCommonDivisor( Math.floor( this.rise ), Math.floor( this.run ) ) );
      }
      else {
        return this.rise;
      }
    },

    // Gets the simplified run.
    getSimplifiedRun: function() {
      if ( this.slopeIsSimplifiable() ) {
        return ( this.run / getGreatestCommonDivisor( Math.floor( this.rise ), Math.floor( this.run ) ) );
      }
      else {
        return run;
      }
    },

    /*
     * Simplification uses Euclid's algorithm for computing the greatest common divisor (GCD) of non-zero integers,
     * so slope can be simplified only if the rise and run meet that criteria.
     */
    slopeIsSimplifiable: function() {
      return ( this.rise != 0 ) && ( this.run != 0 ) && Util.isInteger( this.rise ) && Util.isInteger( this.run );
    },

    // Returns true if point (x,y) is on this line.
    onLine: function( x, y ) {
      if ( this.rise == 0 ) {
        return ( y == this.y1 );
      }
      else if ( this.run == 0 ) {
        return ( x == this.x1 );
      }
      else {
        return ( x == this.solveX( y ) );
      }
    },

    /**
     * Gets the the y-intercept as a simplified fraction.
     * This is valid only if (x1,y1) and (x2,y2) are at integer locations on the grid.
     */
    getYIntercept: function() {
      assert && assert( Util.isInteger( this.x1 ) && Util.isInteger( this.y1 ) && Util.isInteger( this.rise ) && Util.isInteger( this.run ) );
      if ( this.rise == 0 || this.run == 0 ) {
        return new Fraction( Math.floor( this.y1 ), 1 ); // not technically correct for run==0, but gives the desired result in slope-intercept equations
      }
      var numerator = Math.floor( ( this.y1 * this.run ) - ( this.x1 * this.rise ) );
      var denominator = Math.floor( run );
      var gcd = getGreatestCommonDivisor( numerator, denominator );
      return new Fraction( numerator / gcd, denominator / gcd );
    }
  };

  // standard lines
  Line.Y_EQUALS_X_LINE = new Line( 0, 0, 1, 1, LGColors.Y_EQUALS_X );  // y = x
  Line.Y_EQUALS_NEGATIVE_X_LINE = new Line( 0, 0, 1, -1, LGColors.Y_EQUALS_NEGATIVE_X ); // y = -x

  /*
   * Creates a line by describing it in point-slope form: (y - y1) = m(x - x1)
   * Need to use a factory method because params are identical to primary constructor.
   */
  Line.createPointSlope = function( x1, y1, rise, run, color ) {
    return new Line( x1, y1, x1 + run, y1 + rise, color );
  };

  /*
   * Creates a line by describing it in slope-intercept form: y = mx + b
   * Using a factory method instead of a constructor to be consistent with createPointSlope.
   */
  Line.createSlopeIntercept = function( rise, run, yIntercept, color ) {
    return Line.createPointSlope( 0, yIntercept, rise, run, color );
  };

} );
