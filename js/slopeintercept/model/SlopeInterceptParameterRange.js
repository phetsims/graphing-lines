// Copyright 2013-2019, University of Colorado Boulder

/**
 * Methods for computing ranges of line parameters for slope-intercept form,
 * so that slope and intercept are within the visible range of the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PointSlopeParameterRange = require( 'GRAPHING_LINES/pointslope/model/PointSlopeParameterRange' );
  const Range = require( 'DOT/Range' );

  /**
   * @constructor
   */
  function SlopeInterceptParameterRange() {
    PointSlopeParameterRange.call( this );
  }

  graphingLines.register( 'SlopeInterceptParameterRange', SlopeInterceptParameterRange );

  return inherit( PointSlopeParameterRange, SlopeInterceptParameterRange, {

    // @override @public Ranges are identical to point-slope, except that x1 is fixed at 0 for slope-intercept.
    x1: function() {
      return new Range( 0, 0 );
    }
  } );
} );