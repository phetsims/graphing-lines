// Copyright 2002-2014, University of Colorado Boulder

/**
 * Colors used throughout this project.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );

  return {
    SCREEN_BACKGROUND: 'rgb( 255, 255, 214 )',
    INTERACTIVE_LINE: Color.BLACK,
    SAVED_LINE_NORMAL: new Color( 160, 160, 160 ),
    SAVED_LINE_HIGHLIGHT: new Color( 0, 0, 255 ),
    Y_EQUALS_X: new Color( 16, 178, 15 ),
    Y_EQUALS_NEGATIVE_X: new Color( 16, 178, 15 ),
    SLOPE: new Color( 117, 217, 255 ),
    POINT_X1_Y1: new Color( 200, 0, 200 ),
    POINT_X2_Y2: new Color( 210, 255, 0 ),
    POINT_1: new Color( 200, 0, 200 ),
    POINT_2: new Color( 200, 0, 200 ),
    POINT_3: new Color( 200, 0, 200 ),
    INTERCEPT: new Color( 200, 0, 200 ),
    SAVE_LINE_BUTTON: Color.WHITE,
    ERASE_LINES_BUTTON: Color.WHITE,
    PICKER_BUTTON_DISABLED: new Color( 190, 190, 190 ),
    PICKER_BACKGROUND_DISABLED: new Color( 245, 245, 245 ),
    POINT_TOOL_FOREGROUND_NORMAL_COLOR: Color.BLACK,
    POINT_TOOL_BACKGROUND_NORMAL_COLOR: Color.WHITE,
    POINT_TOOL_FOREGROUND_HIGHLIGHT_COLOR: Color.WHITE,
    STATIC_EQUATION_ELEMENT: Color.BLACK,
    EQUATION_CONTROL_PANEL: new Color( 238, 238, 238 ),
    GRAPH_CONTROL_PANEL: new Color( 238, 238, 238 )
  };
} );