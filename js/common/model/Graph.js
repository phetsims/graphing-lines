// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model of a simple 2D graph.  Used in the icon as well as the sim screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import createObservableArray from '../../../../axon/js/createObservableArray.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import graphingLines from '../../graphingLines.js';

class Graph {

  /**
   * @param {dot.Range} xRange
   * @param {dot.Range} yRange
   */
  constructor( xRange, yRange ) {

    // @public
    this.xRange = xRange;
    this.yRange = yRange;
    this.lines = createObservableArray(); // {Line} lines that the graph is currently displaying
  }

  // @public
  getWidth() { return this.xRange.getLength(); }

  // @public
  getHeight() { return this.yRange.getLength(); }

  /**
   * Does the graph contain the specified point?
   * @param {Vector2} point
   * @returns {boolean}
   * @public
   */
  contains( point ) {
    return this.xRange.contains( point.x ) && this.yRange.contains( point.y );
  }

  /**
   * Constrains a point to the x,y range of the graph.
   * @param {Vector2} point
   * @returns {Vector2}
   * @public
   */
  constrain( point ) {
    const x = this.xRange.constrainValue( point.x );
    const y = this.yRange.constrainValue( point.y );
    if ( point.x === x && point.y === y ) {
      return point;
    }
    else {
      return new Vector2( x, y );
    }
  }
}

graphingLines.register( 'Graph', Graph );

export default Graph;