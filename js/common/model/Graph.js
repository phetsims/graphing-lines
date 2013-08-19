// Copyright 2002-2013, University of Colorado

/**
 * Model of a simple 2D graph.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {

  // imports
  var ObservableArray = require( 'AXON/ObservableArray' );

  /**
   * @param {Range} xRange
   * @param {Range} yRange
   * @constructor
   */
  function Graph( xRange, yRange ) {
    this.xRange = xRange;
    this.yRange = yRange;
    this.lines = new ObservableArray();
  }

  Graph.prototype = {

    getWidth: function() { return this.xRange.getLength(); },

    getHeight: function() { return this.yRange.getLength(); },

    /**
     * @param {Vector2} point
     * @returns {Boolean}
     */
    contains: function( point ) {
      return return this.xRange.contains( point.x ) && this.yRange.contains( point.y );
    }
  };

  return Graph;
} );