// Copyright 2017-2023, University of Colorado Boulder

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

import Range from '../../../../dot/js/Range.js';
import graphingLines from '../../graphingLines.js';

export default class SlopeParameterRange {

  constructor() {}

  // @public Range for the x component of the point (x1,y1)
  x1( line, graph ) {
    const min = ( line.rise === 0 && ( line.x1 + line.run === graph.xRange.min ) ) ? ( graph.xRange.min + 1 ) : graph.xRange.min;
    const max = ( line.rise === 0 && ( line.x1 + line.run === graph.xRange.max ) ) ? ( graph.xRange.max - 1 ) : graph.xRange.max;
    return new Range( min, max );
  }

  // @public Range for the y component of the point (x1,y1)
  y1( line, graph ) {
    const min = ( line.run === 0 && ( line.y1 + line.rise === graph.yRange.min ) ) ? ( graph.yRange.min + 1 ) : graph.yRange.min;
    const max = ( line.run === 0 && ( line.y1 + line.rise === graph.yRange.max ) ) ? ( graph.yRange.max - 1 ) : graph.yRange.max;
    return new Range( min, max );
  }

  // @public Range for the x component of the point (x2,y2)
  x2( line, graph ) {
    const min = ( line.rise === 0 && line.x1 === graph.xRange.min ) ? ( graph.xRange.min + 1 ) : graph.xRange.min;
    const max = ( line.rise === 0 && line.x1 === graph.xRange.max ) ? ( graph.xRange.max - 1 ) : graph.xRange.max;
    return new Range( min, max );
  }

  // @public Range for the y component of the point (x2,y2)
  y2( line, graph ) {
    const min = ( line.run === 0 && line.y1 === graph.yRange.min ) ? ( graph.yRange.min + 1 ) : graph.yRange.min;
    const max = ( line.run === 0 && line.y1 === graph.yRange.max ) ? ( graph.yRange.max - 1 ) : graph.yRange.max;
    return new Range( min, max );
  }
}

graphingLines.register( 'SlopeParameterRange', SlopeParameterRange );