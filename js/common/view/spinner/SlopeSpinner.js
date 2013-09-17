// Copyright 2002-2013, University of Colorado Boulder

/**
 * Spinner for changing a component of slope.
 * Avoids creating an undefined line with slope=0/0.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Spinner = require( 'GRAPHING_LINES/common/view/spinner/Spinner' );

  /**
   * @param {Property<Number>} variableComponent the part of the slope we're manipulating
   * @param {Property<Number>} fixedComponent the part of the slope we're not manipulating
   * @param {Property<Range>} variableRange the range of variableComponent
   * @param {*} options
   * @constructor
   */
  function SlopeSpinner( variableComponent, fixedComponent, variableRange, options ) {

    options = _.extend( {
       color: GLColors.SLOPE
    }, options );

    // "up" function, skips over undefined line condition (slope=0/0)
    options.upFunction = function() {
      return ( variableComponent.get() === -1 && fixedComponent.get() === 0 ) ? 1 : variableComponent.get() + 1;
    };

    // "down" function, skips over undefined line condition (slope=0/0)
    options.downFunction = function() {
      return ( variableComponent.get() === 1 && fixedComponent.get() === 0 ) ? -1 : variableComponent.get() - 1;
    };

    Spinner.call( this, variableComponent, variableRange, options );
  }

  return inherit( Spinner, SlopeSpinner );
} );
