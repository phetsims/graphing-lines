// Copyright 2013-2015, University of Colorado Boulder

/**
 * Constants that are global to this sim.
 * Additional constants for the 'Line Game' screen are in LineGameConstants.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var Range = require( 'DOT/Range' );

  var GLConstants = {
    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) },
    X_AXIS_RANGE: new Range( -10, 10 ),
    Y_AXIS_RANGE: new Range( -10, 10 ),
    INTERACTIVE_EQUATION_FONT_SIZE: 34,
    PICKER_TOUCH_AREA_EXPAND_X: 30,
    MANIPULATOR_RADIUS: 0.425,
    SCREEN_X_MARGIN: 40,
    SCREEN_Y_MARGIN: 20,
    RESET_ALL_BUTTON_SCALE: 1.32
  };

  graphingLines.register( 'GLConstants', GLConstants );

  return GLConstants;
} );
