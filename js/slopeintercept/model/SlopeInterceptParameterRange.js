// Copyright 2013-2020, University of Colorado Boulder

/**
 * Methods for computing ranges of line parameters for slope-intercept form,
 * so that slope and intercept are within the visible range of the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../../dot/js/Range.js';
import inherit from '../../../../phet-core/js/inherit.js';
import graphingLines from '../../graphingLines.js';
import PointSlopeParameterRange from '../../pointslope/model/PointSlopeParameterRange.js';

/**
 * @constructor
 */
function SlopeInterceptParameterRange() {
  PointSlopeParameterRange.call( this );
}

graphingLines.register( 'SlopeInterceptParameterRange', SlopeInterceptParameterRange );

export default inherit( PointSlopeParameterRange, SlopeInterceptParameterRange, {

  // @override @public Ranges are identical to point-slope, except that x1 is fixed at 0 for slope-intercept.
  x1: function() {
    return new Range( 0, 0 );
  }
} );