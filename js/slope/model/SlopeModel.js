// Copyright 2013-2021, University of Colorado Boulder

/**
 * Model for the 'Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import GLColors from '../../common/GLColors.js';
import Line from '../../common/model/Line.js';
import LineFormsModel from '../../common/model/LineFormsModel.js';
import graphingLines from '../../graphingLines.js';
import SlopeParameterRange from './SlopeParameterRange.js';

class SlopeModel extends LineFormsModel {

  constructor() {

    super( new Line( 1, 2, 3, 4, GLColors.INTERACTIVE_LINE ) );

    // @public ranges
    this.x1RangeProperty = new Property( this.graph.xRange );
    this.y1RangeProperty = new Property( this.graph.yRange );
    this.x2RangeProperty = new Property( this.graph.xRange );
    this.y2RangeProperty = new Property( this.graph.yRange );

    // Dynamically adjust ranges so that variables are constrained to the bounds of the graph.
    // unlink unnecessary because SlopeModel exists for the lifetime of the sim.
    const parameterRange = new SlopeParameterRange();
    this.interactiveLineProperty.link( line => {
      this.x1RangeProperty.set( parameterRange.x1( line, this.graph ) );
      this.y1RangeProperty.set( parameterRange.y1( line, this.graph ) );
      this.x2RangeProperty.set( parameterRange.x2( line, this.graph ) );
      this.y2RangeProperty.set( parameterRange.y2( line, this.graph ) );
    } );
  }
}

graphingLines.register( 'SlopeModel', SlopeModel );

export default SlopeModel;