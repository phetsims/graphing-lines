// Copyright 2013-2018, University of Colorado Boulder

/**
 * Model of a simple 2D graph.  Used in the icon as well as the sim screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Vector2 = require( 'DOT/Vector2' );

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
    },

    /**
     * Constrains a point to the x,y range of the graph.
     * @param {Vector2} point
     * @returns {Vector2}
     */
    constrain: function( point ) {
      var x = this.xRange.constrainValue( point.x );
      var y = this.yRange.constrainValue( point.y );
      if ( point.x === x && point.y === y ) {
        return point;
      }
      else {
        return new Vector2( x, y );
      }
    }
  } );
} );