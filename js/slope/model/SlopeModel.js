// Copyright 2013-2019, University of Colorado Boulder

/**
 * Model for the 'Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import inherit from '../../../../phet-core/js/inherit.js';
import GLColors from '../../common/GLColors.js';
import Line from '../../common/model/Line.js';
import LineFormsModel from '../../common/model/LineFormsModel.js';
import graphingLines from '../../graphingLines.js';
import SlopeParameterRange from './SlopeParameterRange.js';

/**
 * @constructor
 */
function SlopeModel() {

  const self = this;

  LineFormsModel.call( this, new Line( 1, 2, 3, 4, GLColors.INTERACTIVE_LINE ) );

  // @public ranges
  this.x1RangeProperty = new Property( this.graph.xRange );
  this.y1RangeProperty = new Property( this.graph.yRange );
  this.x2RangeProperty = new Property( this.graph.xRange );
  this.y2RangeProperty = new Property( this.graph.yRange );

  // Dynamically adjust ranges so that variables are constrained to the bounds of the graph.
  // unlink unnecessary because SlopeModel exists for the lifetime of the sim.
  const parameterRange = new SlopeParameterRange();
  this.interactiveLineProperty.link( function( line ) {
    self.x1RangeProperty.set( parameterRange.x1( line, self.graph ) );
    self.y1RangeProperty.set( parameterRange.y1( line, self.graph ) );
    self.x2RangeProperty.set( parameterRange.x2( line, self.graph ) );
    self.y2RangeProperty.set( parameterRange.y2( line, self.graph ) );
  } );
}

graphingLines.register( 'SlopeModel', SlopeModel );

inherit( LineFormsModel, SlopeModel );
export default SlopeModel;