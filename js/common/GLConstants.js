// Copyright 2002-2014, University of Colorado Boulder

/**
 * Constants that are global to this sim.
 * Additional constants for the 'Line Game' screen are in LineGameConstants.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var Range = require( 'DOT/Range' );

  return {
    RENDERER: 'svg',
    LAYOUT_BOUNDS: new Bounds2( 0, 0, 1100, 700 ),
    X_AXIS_RANGE: new Range( -10, 10 ),
    Y_AXIS_RANGE: new Range( -10, 10 ),
    INTERACTIVE_EQUATION_FONT_SIZE: 34,
    PICKER_TOUCH_AREA_EXPAND_X: 30
  };
} );
