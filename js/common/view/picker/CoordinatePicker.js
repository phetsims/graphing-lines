// Copyright 2013-2020, University of Colorado Boulder

/**
 * Picker for one coordinate of a 2D point.
 * It prevents the point from having the same value as some other point,
 * so that we don't end up with with an undefined line because (x1,y1) == (x2,y2).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import NumberPicker from '../../../../../sun/js/NumberPicker.js';
import graphingLines from '../../../graphingLines.js';
import GLColors from '../../GLColors.js';
import GLConstants from '../../GLConstants.js';

class CoordinatePicker extends NumberPicker {

  /**
   * @param {Property.<number>} a1Property - the coordinate that this picker changes
   * @param {Property.<number>} b1Property - the other coordinate of the point that has coordinate a1Property
   * @param {Property.<number>} a2Property - the coordinate in the second point that is on the same axis as a1Property
   * @param {Property.<number>} b2Property - the coordinate in the second point that is on the same axis as b1Property
   * @param {Property.<Range>} rangeProperty - the range of a1Property
   * @param {Object} [options]
   */
  constructor( a1Property, b1Property, a2Property, b2Property, rangeProperty, options ) {

    options = merge( {}, GLConstants.PICKER_OPTIONS, {
      color: GLColors.POINT_X1_Y1
    }, options );

    // computes value when 'up' button is pressed
    options.incrementFunction = a1 => {
      let x1New = a1 + 1;
      if ( x1New === a2Property.get() && b1Property.get() === b2Property.get() ) { // will points be the same?
        x1New++;
        if ( x1New > rangeProperty.get().max ) { // did we skip too far?
          x1New = a1;
        }
      }
      return x1New;
    };

    // computes value when 'down' button is pressed
    options.decrementFunction = a1 => {
      let x1New = a1 - 1;
      if ( x1New === a2Property.get() && b1Property.get() === b2Property.get() ) { // will points be the same?
        x1New--;
        if ( x1New < rangeProperty.get().min ) { // did we skip too far?
          x1New = a1;
        }
      }
      return x1New;
    };

    super( a1Property, rangeProperty, options );
  }
}

graphingLines.register( 'CoordinatePicker', CoordinatePicker );

export default CoordinatePicker;