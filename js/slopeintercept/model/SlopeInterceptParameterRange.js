// Copyright 2013-2015, University of Colorado Boulder

/**
 * Methods for computing ranges of line parameters for slope-intercept form,
 * so that slope and intercept are within the visible range of the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PointSlopeParameterRange = require( 'GRAPHING_LINES/pointslope/model/PointSlopeParameterRange' );
  var Range = require( 'DOT/Range' );

  /**
   * @constructor
   */
  function SlopeInterceptParameterRange() {
    PointSlopeParameterRange.call( this );
  }

  graphingLines.register( 'SlopeInterceptParameterRange', SlopeInterceptParameterRange );

  return inherit( PointSlopeParameterRange, SlopeInterceptParameterRange, {

    // @override @pubic Ranges are identical to point-slope, except that x1 is fixed at 0 for slope-intercept.
    x1: function() {
      return new Range( 0, 0 );
    }
  } );
} );