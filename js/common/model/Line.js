// Copyright 2013-2019, University of Colorado Boulder

/**
 * An immutable line, described by 2 points, (x1,y1) and (x2,y2).
 * Slope components (rise and run) are signed relative to (x1,y1).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Utils = require( 'DOT/Utils' );

  /**
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   * @param {Color|String} [color] - default to 'black'
   * @constructor
   */
  function Line( x1, y1, x2, y2, color ) {

    // 2 different points are required
    assert && assert( x1 !== x2 || y1 !== y2, 'points are the same: (' + x1 + ',' + y1 + ')' );

    // @public
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.rise = y2 - y1;
    this.run = x2 - x1;
    this.color = color || 'black';
  }

  graphingLines.register( 'Line', Line );

  inherit( Object, Line, {

    // @public Convenience method for creating a line with a different color.
    withColor: function( color ) {
      return new Line( this.x1, this.y1, this.x2, this.y2, color );
    },

    // @public
    toString: function() {
      return 'Line[x1=' + this.x1 + ' y1=' + this.y1 + ' x2=' + this.x2 + ' y2=' + this.y2 +
             ' rise=' + this.rise + ' run=' + this.run + ' color=' + this.color.toString() + ']';
    },

    // @public Returns true if 2 points on the specified line are also on this line.
    same: function( line ) {
      return ( line !== null ) && this.onLineXY( line.x1, line.y1 ) && this.onLineXY( line.x2, line.y2 );
    },

    // @public Returns true if the slope is undefined.
    undefinedSlope: function() {
      return this.run === 0;
    },

    // @public Gets the slope. Returns NaN if slope is undefined.
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
     * @param {number} x
     * @returns {number}
     * @public
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
     * @param {number} y
     * @returns {number}
     * @public
     */
    solveX: function( y ) {
      if ( this.rise === 0 || this.run === 0 ) {
        return Number.NaN;
      }
      else {
        return ( ( y - this.y1 ) / ( this.rise / this.run ) ) + this.x1;
      }
    },

    // @public Gets the simplified rise.
    getSimplifiedRise: function() {
      if ( this.slopeIsSimplifiable() ) {
        return Utils.roundSymmetric( this.rise / Utils.gcd( this.rise, this.run ) );
      }
      else {
        return this.rise;
      }
    },

    // @public Gets the simplified run.
    getSimplifiedRun: function() {
      if ( this.slopeIsSimplifiable() ) {
        return Utils.roundSymmetric( this.run / Utils.gcd( this.rise, this.run ) );
      }
      else {
        return this.run;
      }
    },

    /*
     * Simplification uses Euclid's algorithm for computing the greatest common divisor (GCD) of non-zero integers,
     * so slope can be simplified only if the rise and run meet that criteria.
     * @public
     */
    slopeIsSimplifiable: function() {
      return ( this.rise !== 0 ) && ( this.run !== 0 ) && Utils.isInteger( this.rise ) && Utils.isInteger( this.run );
    },

    /**
     * Returns true if point is on this line.
     * @param {Vector2} p
     * @public
     */
    onLinePoint: function( p ) {
      return this.onLineXY( p.x, p.y );
    },

    // @private
    onLineXY: function( x, y ) {
      if ( this.rise === 0 ) {
        return ( y === this.y1 );
      }
      else if ( this.run === 0 ) {
        return ( x === this.x1 );
      }
      else {
        // account for floating point errors, see https://github.com/phetsims/graphing-lines/issues/56
        return ( Math.abs( x - this.solveX( y ) ) < 1E-10 );
      }
    },

    /**
     * Gets the y-intercept as a simplified fraction.
     * This is valid only if (x1,y1) and (x2,y2) are at integer locations on the grid.
     * @returns {Fraction}
     * @public
     */
    getYIntercept: function() {
      assert && assert( Utils.isInteger( this.x1 ) && Utils.isInteger( this.y1 ) && Utils.isInteger( this.rise ) && Utils.isInteger( this.run ) );
      if ( this.rise === 0 || this.run === 0 ) {
        return new Fraction( this.y1, 1 ); // not technically correct for run===0, but gives the desired result in slope-intercept equations
      }
      const numerator = Utils.roundSymmetric( ( this.y1 * this.run ) - ( this.x1 * this.rise ) );
      const denominator = this.run;
      const gcd = Utils.gcd( numerator, denominator );
      return new Fraction( Utils.roundSymmetric( numerator / gcd ), Utils.roundSymmetric( denominator / gcd ) );
    }
  }, {

    /*
     * Creates a line by describing it in point-slope form: (y - y1) = m(x - x1)
     * @static
     * @public
     */
    createPointSlope: function( x1, y1, rise, run, color ) {
      return new Line( x1, y1, x1 + run, y1 + rise, color );
    },

    /*
     * Creates a line by describing it in slope-intercept form: y = mx + b
     * @static
     * @public
     */
    createSlopeIntercept: function( rise, run, yIntercept, color ) {
      return Line.createPointSlope( 0, yIntercept, rise, run, color );
    }
  } );

  // @static @public y = x (a standard line)
  Line.Y_EQUALS_X_LINE = new Line( 0, 0, 1, 1, GLColors.Y_EQUALS_X );

  // @static @public y = -x (a standard line)
  Line.Y_EQUALS_NEGATIVE_X_LINE = new Line( 0, 0, 1, -1, GLColors.Y_EQUALS_NEGATIVE_X );

  return Line;
} );
