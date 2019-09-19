// Copyright 2013-2019, University of Colorado Boulder

/**
 * Constants that are global to this sim.
 * Additional constants for the 'Line Game' screen are in LineGameConstants.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Range = require( 'DOT/Range' );

  const GLConstants = {
    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) },
    X_AXIS_RANGE: new Range( -10, 10 ),
    Y_AXIS_RANGE: new Range( -10, 10 ),
    INTERACTIVE_EQUATION_FONT_SIZE: 34,
    MANIPULATOR_RADIUS: 0.425,
    SCREEN_X_MARGIN: 40,
    SCREEN_Y_MARGIN: 20,
    RESET_ALL_BUTTON_SCALE: 1.32,
    PATTERN_0VALUE_EQUALS_1VALUE: '{0} ' + MathSymbols.EQUAL_TO + ' {1}', // i18n not required, used for e.g. x = 5
    EQUATION_FONT_WEIGHT: 'bold',

    // see https://github.com/phetsims/graphing-lines/issues/124
    PICKER_OPTIONS: {
      touchAreaXDilation: 26,
      touchAreaYDilation: 4,
      mouseAreaXDilation: 0,
      mouseAreaYDilation: 4
    }
  };

  graphingLines.register( 'GLConstants', GLConstants );

  return GLConstants;
} );
