// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model of a simple 2D graph.  Used in the icon as well as the sim screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ObservableArray = require( 'AXON/ObservableArray' );

  /**
   * @param {Range} xRange
   * @param {Range} yRange
   * @constructor
   */
  function Graph( xRange, yRange ) {

    // @public
    this.xRange = xRange;
    this.yRange = yRange;
    this.lines = new ObservableArray(); // {Line} lines that the graph is currently displaying
  }

  graphingLines.register( 'Graph', Graph );

  return inherit( Object, Graph, {

    // @public
    getWidth: function() { return this.xRange.getLength(); },

    // @public
    getHeight: function() { return this.yRange.getLength(); },

    /**
     * Does the graph contain the specified point?
     * @param {Vector2} point
     * @returns {boolean}
     * @public
     */
    contains: function( point ) {
      return this.xRange.contains( point.x ) && this.yRange.contains( point.y );
    }
  } );
} );