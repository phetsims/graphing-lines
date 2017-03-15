// Copyright 2017, University of Colorado Boulder

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
     * @return {Challenge[]} array of challenges
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
  } );
} );

