// Copyright 2013-2019, University of Colorado Boulder

/**
 * Model for the 'Point-Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import inherit from '../../../../phet-core/js/inherit.js';
import GLColors from '../../common/GLColors.js';
import Line from '../../common/model/Line.js';
import LineFormsModel from '../../common/model/LineFormsModel.js';
import graphingLines from '../../graphingLines.js';
import PointSlopeParameterRange from './PointSlopeParameterRange.js';

/**
 * @param {Line} interactiveLine
 * @param {PointSlopeParameterRange} parameterRange optional
 * @constructor
 */
function PointSlopeModel( interactiveLine, parameterRange ) {

  const self = this;

  interactiveLine = interactiveLine || Line.createPointSlope( 1, 2, 3, 4, GLColors.INTERACTIVE_LINE );
  parameterRange = parameterRange || new PointSlopeParameterRange();

  LineFormsModel.call( this, interactiveLine );

  // @public ranges
  this.x1RangeProperty = new Property( this.graph.xRange );
  this.y1RangeProperty = new Property( this.graph.yRange );
  this.riseRangeProperty = new Property( this.graph.yRange );
  this.runRangeProperty = new Property( this.graph.xRange );

  // Dynamically adjust ranges so that variables are constrained to the bounds of the graph.
  // unlink unnecessary because PointSlopeModel exists for the lifetime of the sim.
  this.interactiveLineProperty.link( function( line ) {
    self.x1RangeProperty.set( parameterRange.x1( line, self.graph ) );
    self.y1RangeProperty.set( parameterRange.y1( line, self.graph ) );
    self.riseRangeProperty.set( parameterRange.rise( line, self.graph ) );
    self.runRangeProperty.set( parameterRange.run( line, self.graph ) );
  } );
}

graphingLines.register( 'PointSlopeModel', PointSlopeModel );

inherit( LineFormsModel, PointSlopeModel );
export default PointSlopeModel;