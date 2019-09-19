// Copyright 2013-2017, University of Colorado Boulder

/**
 * Methods for computing ranges of line parameters for point-slope form,
 * so that point and slope are within the visible range of the graph,
 * and to prevent the 2 points that define the line from being identical.
 *
 * Point-slope form is: (y - y1) = (rise/run)(x - x1)
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Range = require( 'DOT/Range' );

  /**
   * @constructor
   */
  function PointSlopeParameterRange() {}

  graphingLines.register( 'PointSlopeParameterRange', PointSlopeParameterRange );

  return inherit( Object, PointSlopeParameterRange, {

    // @public Range for the x component of the point (x1,y1)
    x1: function( line, graph ) {
      var min = Math.max( graph.xRange.min, graph.xRange.min - line.run );
      var max = Math.min( graph.xRange.max, graph.xRange.max - line.run );
      return new Range( min, max );
    },

    // @public Range for the y component of the point (x1,y1)
    y1: function( line, graph ) {
      var min = Math.max( graph.yRange.min, graph.yRange.min - line.rise );
      var max = Math.min( graph.yRange.max, graph.yRange.max - line.rise );
      return new Range( min, max );
    },

    // @public Range for the vertical component of the slope
    // Prevents overlapping points at extremes, see https://github.com/phetsims/graphing-lines/issues/75
    rise: function( line, graph ) {
      var min = ( line.run === 0 && line.y1 === graph.yRange.min ) ? 1 : ( graph.yRange.min - line.y1 );
      var max = ( line.run === 0 && line.y1 === graph.yRange.max ) ? -1 : ( graph.yRange.max - line.y1 );
      return new Range( min, max );
    },

    // @public Range for the horizontal component of the slope
    // Prevents overlapping points at extremes, see https://github.com/phetsims/graphing-lines/issues/75
    run: function( line, graph ) {
      var min = ( line.rise === 0 && line.x1 === graph.xRange.min ) ? 1 : ( graph.xRange.min - line.x1 );
      var max = ( line.rise === 0 && line.x1 === graph.xRange.max ) ? -1 : ( graph.xRange.max - line.x1 );
      return new Range( min, max );
    }
  } );
} );