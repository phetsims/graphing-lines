// Copyright 2002-2014, University of Colorado Boulder

/**
 * Colors used throughout this project.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  return {
    SCREEN_BACKGROUND: 'rgb( 255, 255, 214 )',
    INTERACTIVE_LINE: 'black',
    SAVED_LINE_NORMAL: 'rgb( 160, 160, 160 )',
    SAVED_LINE_HIGHLIGHT: 'rgb( 0, 0, 255 )',
    Y_EQUALS_X: 'rgb( 16, 178, 15 )',
    Y_EQUALS_NEGATIVE_X: 'rgb( 16, 178, 15 )',
    SLOPE: 'rgb( 117, 217, 255 )',
    POINT_X1_Y1: 'rgb( 200, 0, 200 )',
    POINT_X2_Y2: 'rgb( 210, 255, 0 )',
    POINT: 'rgb( 200, 0, 200 )',
    INTERCEPT: 'rgb( 200, 0, 200 )',
    SAVE_LINE_BUTTON: 'white',
    ERASE_LINES_BUTTON: 'white',
    PICKER_BUTTON_DISABLED: 'rgb( 190, 190, 190 )',
    PICKER_BACKGROUND_DISABLED: 'rgb( 245, 245, 245 )',
    POINT_TOOL_FOREGROUND_NORMAL_COLOR: 'black',
    POINT_TOOL_BACKGROUND_NORMAL_COLOR: 'white',
    POINT_TOOL_FOREGROUND_HIGHLIGHT_COLOR: 'white',
    STATIC_EQUATION_ELEMENT: 'black',
    EQUATION_CONTROL_PANEL: 'rgb( 238, 238, 238 )',
    GRAPH_CONTROL_PANEL: 'rgb( 238, 238, 238 )',

    // alpha channel (0-1) of the halo around the various manipulators
    HALO_ALPHA: {
      slope: 0.3,
      intercept: 0.15,
      x1y1: 0.15,
      x2y2: 0.35,
      point: 0.15
    }
  };
} );