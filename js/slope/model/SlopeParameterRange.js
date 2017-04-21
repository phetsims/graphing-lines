// Copyright 2017, University of Colorado Boulder

/**
 * Methods for computing ranges of line parameters for slope form,
 * so that points are within the visible range of the graph and points do not overlap.
 *
 * Slope form is: m = (y2 - y1) / (x2 - x1) = rise/run
 *
 * This is similar in purpose to PointSlopeParameterRange, and was added to address
 * https://github.com/phetsims/graphing-lines/issues/75.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );

  /**
   * @constructor
   */
  function SlopeParameterRange() {}

  graphingLines.register( 'SlopeParameterRange', SlopeParameterRange );

  return inherit( Object, SlopeParameterRange, {

    // @public Range for the x component of the point (x1,y1)
    x1: function( line, graph ) {
      var min = ( line.rise === 0 && ( line.x1 + line.run === graph.xRange.min ) ) ? ( graph.xRange.min + 1 ) : graph.xRange.min;
      var max = ( line.rise === 0 && ( line.x1 + line.run === graph.xRange.max ) ) ? ( graph.xRange.max - 1 ) : graph.xRange.max;
      return new Range( min, max );
    },

    // @public Range for the y component of the point (x1,y1)
    y1: function( line, graph ) {
      var min = ( line.run === 0 && ( line.y1 + line.rise === graph.yRange.min ) ) ? ( graph.yRange.min + 1 ) : graph.yRange.min;
      var max = ( line.run === 0 && ( line.y1 + line.rise === graph.yRange.max ) ) ? ( graph.yRange.max - 1 ) : graph.yRange.max;
      return new Range( min, max );
    },

    // @public Range for the x component of the point (x2,y2)
    x2: function( line, graph ) {
      var min = ( line.rise === 0 && line.x1 === graph.xRange.min ) ? ( graph.xRange.min + 1 ) : graph.xRange.min;
      var max = ( line.rise === 0 && line.x1 === graph.xRange.max ) ? ( graph.xRange.max - 1 ) : graph.xRange.max;
      return new Range( min, max );
    },

    // @public Range for the y component of the point (x2,y2)
    y2: function( line, graph ) {
      var min = ( line.run === 0 && line.y1 === graph.yRange.min ) ? ( graph.yRange.min + 1 ) : graph.yRange.min;
      var max = ( line.run === 0 && line.y1 === graph.yRange.max ) ? ( graph.yRange.max - 1 ) : graph.yRange.max;
      return new Range( min, max );
    }
  } );
} );