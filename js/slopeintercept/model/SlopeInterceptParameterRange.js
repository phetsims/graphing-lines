// Copyright 2013-2020, University of Colorado Boulder

/**
 * Methods for computing ranges of line parameters for slope-intercept form,
 * so that slope and intercept are within the visible range of the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../../dot/js/Range.js';
import graphingLines from '../../graphingLines.js';
import PointSlopeParameterRange from '../../pointslope/model/PointSlopeParameterRange.js';

class SlopeInterceptParameterRange extends PointSlopeParameterRange {

  constructor() {
    super();
  }

  // @override @public Ranges are identical to point-slope, except that x1 is fixed at 0 for slope-intercept.
  x1() {
    return new Range( 0, 0 );
  }
}

graphingLines.register( 'SlopeInterceptParameterRange', SlopeInterceptParameterRange );

export default SlopeInterceptParameterRange;