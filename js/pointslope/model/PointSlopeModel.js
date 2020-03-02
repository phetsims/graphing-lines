// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model for the 'Point-Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import GLColors from '../../common/GLColors.js';
import Line from '../../common/model/Line.js';
import LineFormsModel from '../../common/model/LineFormsModel.js';
import graphingLines from '../../graphingLines.js';
import PointSlopeParameterRange from './PointSlopeParameterRange.js';

class PointSlopeModel extends LineFormsModel {

  /**
   * @param {Line} interactiveLine
   * @param {PointSlopeParameterRange} [parameterRange]
   */
  constructor( interactiveLine, parameterRange ) {

    interactiveLine = interactiveLine || Line.createPointSlope( 1, 2, 3, 4, GLColors.INTERACTIVE_LINE );
    parameterRange = parameterRange || new PointSlopeParameterRange();

    super( interactiveLine );

    // @public ranges
    this.x1RangeProperty = new Property( this.graph.xRange );
    this.y1RangeProperty = new Property( this.graph.yRange );
    this.riseRangeProperty = new Property( this.graph.yRange );
    this.runRangeProperty = new Property( this.graph.xRange );

    // Dynamically adjust ranges so that variables are constrained to the bounds of the graph.
    // unlink unnecessary because PointSlopeModel exists for the lifetime of the sim.
    this.interactiveLineProperty.link( line => {
      this.x1RangeProperty.set( parameterRange.x1( line, this.graph ) );
      this.y1RangeProperty.set( parameterRange.y1( line, this.graph ) );
      this.riseRangeProperty.set( parameterRange.rise( line, this.graph ) );
      this.runRangeProperty.set( parameterRange.run( line, this.graph ) );
    } );
  }
}

graphingLines.register( 'PointSlopeModel', PointSlopeModel );

export default PointSlopeModel;