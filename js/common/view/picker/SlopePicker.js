// Copyright 2013-2022, University of Colorado Boulder

/**
 * Picker for changing a component of slope.
 * Avoids creating an undefined line with slope=0/0.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import NumberPicker from '../../../../../sun/js/NumberPicker.js';
import graphingLines from '../../../graphingLines.js';
import GLColors from '../../GLColors.js';
import GLConstants from '../../GLConstants.js';

export default class SlopePicker extends NumberPicker {
  /**
   * @param {Property.<number>} variableComponentProperty - the part of the slope we're manipulating
   * @param {Property.<number>} fixedComponentProperty - the part of the slope we're not manipulating
   * @param {Property.<Range>} variableRangeProperty - the range of variableComponentProperty
   * @param {Object} [options]
   */
  constructor( variableComponentProperty, fixedComponentProperty, variableRangeProperty, options ) {

    options = merge( {}, GLConstants.PICKER_OPTIONS, {
      color: GLColors.SLOPE
    }, options );

    // increment function, skips over undefined line condition (slope=0/0) - not changeable by clients
    options.incrementFunction = variable => {
      return ( variable === -1 && fixedComponentProperty.get() === 0 ) ? 1 : variable + 1;
    };

    // decrement function, skips over undefined line condition (slope=0/0) - not changeable by clients
    options.decrementFunction = variable => {
      return ( variable === 1 && fixedComponentProperty.get() === 0 ) ? -1 : variable - 1;
    };

    super( variableComponentProperty, variableRangeProperty, options );
  }
}

graphingLines.register( 'SlopePicker', SlopePicker );