// Copyright 2013-2019, University of Colorado Boulder

/**
 * Picker for changing a component of slope.
 * Avoids creating an undefined line with slope=0/0.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  const GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const NumberPicker = require( 'SCENERY_PHET/NumberPicker' );

  /**
   * @param {Property.<number>} variableComponentProperty - the part of the slope we're manipulating
   * @param {Property.<number>} fixedComponentProperty - the part of the slope we're not manipulating
   * @param {Property.<Range>} variableRangeProperty - the range of variableComponentProperty
   * @param {Object} [options]
   * @constructor
   */
  function SlopePicker( variableComponentProperty, fixedComponentProperty, variableRangeProperty, options ) {

    options = merge( {}, GLConstants.PICKER_OPTIONS, {
      color: GLColors.SLOPE
    }, options );

    // 'up' function, skips over undefined line condition (slope=0/0) - not changeable by clients
    options.upFunction = function( variable ) {
      return ( variable === -1 && fixedComponentProperty.get() === 0 ) ? 1 : variable + 1;
    };

    // 'down' function, skips over undefined line condition (slope=0/0) - not changeable by clients
    options.downFunction = function( variable ) {
      return ( variable === 1 && fixedComponentProperty.get() === 0 ) ? -1 : variable - 1;
    };

    NumberPicker.call( this, variableComponentProperty, variableRangeProperty, options );
  }

  graphingLines.register( 'SlopePicker', SlopePicker );

  return inherit( NumberPicker, SlopePicker );
} );
