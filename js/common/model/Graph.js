// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model of a simple 2D graph.  Used in the icon as well as the sim screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ObservableArray from '../../../../axon/js/ObservableArray.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import graphingLines from '../../graphingLines.js';

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

export default inherit( Object, Graph, {

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
    const x = this.xRange.constrainValue( point.x );
    const y = this.yRange.constrainValue( point.y );
    if ( point.x === x && point.y === y ) {
      return point;
    }
    else {
      return new Vector2( x, y );
    }
  }
} );