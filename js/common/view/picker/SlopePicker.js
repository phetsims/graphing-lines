// Copyright 2013-2015, University of Colorado Boulder

/**
 * Picker for changing a component of slope.
 * Avoids creating an undefined line with slope=0/0.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );

  /**
   * @param {Property.<number>} variableComponent the part of the slope we're manipulating
   * @param {Property.<number>} fixedComponent the part of the slope we're not manipulating
   * @param {Property.<Range>} variableRange the range of variableComponent
   * @param {Object} [options]
   * @constructor
   */
  function SlopePicker( variableComponent, fixedComponent, variableRange, options ) {

    options = _.extend( {
      color: GLColors.SLOPE,
      touchAreaXDilation: GLConstants.PICKER_TOUCH_AREA_X_DILATION,

      // Prevent overlapping points when fixedComponent is at the maximum.
      // See https://github.com/phetsims/graphing-lines/issues/75
      upEnabledFunction: function( value, range ) {
        var max = ( fixedComponent.value === range.max ) ? ( range.max - 1 ) : range.max;
        return ( value < max );
      },

      // Prevent overlapping points when fixedComponent is at the minimum.
      // See https://github.com/phetsims/graphing-lines/issues/75
      downEnabledFunction: function( value, range ) {
        var min = ( fixedComponent.value === range.min ) ? ( range.min + 1 ) : range.min;
        return ( value > min );
      }
    }, options );

    // 'up' function, skips over undefined line condition (slope=0/0) - not changeable by clients
    options.upFunction = function( variable ) {
      return ( variable === -1 && fixedComponent.get() === 0 ) ? 1 : variable + 1;
    };

    // 'down' function, skips over undefined line condition (slope=0/0) - not changeable by clients
    options.downFunction = function( variable ) {
      return ( variable === 1 && fixedComponent.get() === 0 ) ? -1 : variable - 1;
    };

    NumberPicker.call( this, variableComponent, variableRange, options );
  }

  graphingLines.register( 'SlopePicker', SlopePicker );

  return inherit( NumberPicker, SlopePicker );
} );
