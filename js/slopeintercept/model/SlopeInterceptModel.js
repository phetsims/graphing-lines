// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model for the 'Slope-Intercept' screen.
 * This is a specialization of the Point-Slope model.
 * x1 is fixed at zero, so that y1 is synonymous with y-intercept.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import GLColors from '../../common/GLColors.js';
import Line from '../../common/model/Line.js';
import graphingLines from '../../graphingLines.js';
import PointSlopeModel from '../../pointslope/model/PointSlopeModel.js';
import SlopeInterceptParameterRange from './SlopeInterceptParameterRange.js';

class SlopeInterceptModel extends PointSlopeModel {
  constructor() {
    super( Line.createSlopeIntercept( 2, 3, 1, GLColors.INTERACTIVE_LINE ), new SlopeInterceptParameterRange() );
  }
}

graphingLines.register( 'SlopeInterceptModel', SlopeInterceptModel );

export default SlopeInterceptModel;