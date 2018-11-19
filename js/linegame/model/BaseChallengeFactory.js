// Copyright 2017-2018, University of Colorado Boulder

/**
 * Base type for challenge factories in both the 'Graphing Lines' and 'Graphing Slope-Intercept' sims.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function BaseChallengeFactory( options ) {

    options = _.extend( {
      xRange: GLConstants.X_AXIS_RANGE, // {Range} range of the graph's x axis
      yRange: GLConstants.Y_AXIS_RANGE  // {Range} range of the graph's y axis
    }, options );

    // @protected
    this.xRange = options.xRange;
    this.yRange = options.yRange;
  }

  graphingLines.register( 'BaseChallengeFactory', BaseChallengeFactory );

  return inherit( Object, BaseChallengeFactory, {

    /**
     * Creates challenges for the factory's game level.
     *
     * @returns {Challenge[]} array of challenges
     * @public
     * @abstract
     */
    createChallenges: function() {
      throw new Error( 'must be implemented by subtypes' );
    },

    /**
     * Convenience function for creating a line, give a slope and intercept.
     * @param {Fraction} slope
     * @param {number} intercept
     * @returns {Line}
     * @protected
     */
    createSlopeInterceptLine: function( slope, intercept ) {
      assert && assert( slope instanceof Fraction );
      assert && assert( typeof intercept === 'number' );
      return Line.createSlopeIntercept( slope.numerator, slope.denominator, intercept );
    },

    /**
     * Convenience function for creating a line, give a point and slope.
     * @param {Vector2} point
     * @param {Fraction} slope
     * @returns {Line}
     * @protected
     */
    createPointSlopeLine: function( point, slope ) {
      assert && assert( point instanceof Vector2 );
      assert && assert( slope instanceof Fraction );
      return Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator );
    }
  }, {

    /**
     * Picks a point that keeps the slope indicator on the graph.
     * @param {Fraction} slope
     * @param {Range} graphXRange
     * @param {Range} graphYRange
     * @returns {Vector2}
     * @public
     * @static
     */
    choosePointForSlope: function( slope, graphXRange, graphYRange ) {

      var rise = slope.numerator;
      var run = slope.denominator;

      // x
      var minX = ( run >= 0 ) ? graphXRange.min : graphXRange.min - run;
      var maxX = (run >= 0) ? graphXRange.max - run : graphXRange.max;
      var x = Util.roundSymmetric( minX + ( phet.joist.random.nextDouble() * ( maxX - minX ) ) );
      assert && assert( x >= minX && x <= maxX, 'x out of range: ' + x );

      // y
      var minY = ( rise >= 0) ? graphYRange.min : graphYRange.min - rise;
      var maxY = (rise >= 0) ? graphYRange.max - rise : graphYRange.max;
      var y = Util.roundSymmetric( minY + ( phet.joist.random.nextDouble() * ( maxY - minY ) ) );
      assert && assert( y >= minY && y <= maxY, 'y out of range: ' + y );

      return new Vector2( x, y );
    },

    /**
     * Picks a point (x1,x2) on the graph that results in the slope indicator (x2,y2) being off the graph.
     * This forces the user to invert the slope.
     *
     * @param {Fraction} slope
     * @param {Range} graphXRange
     * @param {Range} graphYRange
     * @returns {Vector2}
     * @public
     * @static
     */
    choosePointForSlopeInversion: function( slope, graphXRange, graphYRange ) {

      var rise = slope.numerator;
      var run = slope.denominator;

      // x1 coordinates
      var minX1 = ( run >= 0 ) ? graphXRange.max - run + 1 : graphXRange.min;
      var maxX1 = ( run >= 0 ) ? graphXRange.max : graphXRange.min - run - 1;
      var x1 = Util.roundSymmetric( minX1 + ( phet.joist.random.nextDouble() * ( maxX1 - minX1 ) ) );
      assert && assert( x1 >= minX1 && x1 <= maxX1, 'x1 out of range: ' + x1 );

      // y1 coordinates
      var minY1 = ( rise >= 0 ) ? graphYRange.max - rise + 1 : graphYRange.min;
      var maxY1 = ( rise >= 0 ) ? graphYRange.max : graphYRange.min - rise - 1;
      var y1 = Util.roundSymmetric( minY1 + ( phet.joist.random.nextDouble() * ( maxY1 - minY1 ) ) );
      assert && assert( y1 >= minY1 && y1 <= maxY1, 'y1 out of range: ' + y1 );

      // compute (x2,y2) for validation
      var x2 = x1 + run;
      var y2 = y1 + rise;

      // (x1,y1) must be on the graph, (x2,y2) must be off the graph
      assert && assert( graphXRange.contains( x1 ) && !graphXRange.contains( x2 ) );
      assert && assert( graphYRange.contains( y1 ) && !graphYRange.contains( y2 ) );

      return new Vector2( x1, y1 );
    }
  } );
} );

