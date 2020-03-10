// Copyright 2013-2020, University of Colorado Boulder

/**
 * Used to specify the form of the equations in Game challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import graphingLines from '../../graphingLines.js';

const EquationForm = Enumeration.byKeys( [
  'SLOPE_INTERCEPT', // y = mx + b
  'POINT_SLOPE'      // (y2 - y1) = m(x2 - x1)
] );

graphingLines.register( 'EquationForm', EquationForm );

export default EquationForm;