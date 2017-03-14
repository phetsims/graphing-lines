// Copyright 2017, University of Colorado Boulder

/**
 * Base type for challenge factories.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );

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
     */
    createChallenges: function() {
      throw new Error( 'must be implemented by subtypes' );
    }
  } );
} );

