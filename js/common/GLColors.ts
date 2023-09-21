// Copyright 2013-2023, University of Colorado Boulder

/**
 * Colors used throughout this project.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import graphingLines from '../graphingLines.js';

const GLColors = {

  // Background color used for all screens
  screenBackgroundColorProperty: new ProfileColorProperty( graphingLines, 'screenBackgroundColor', {
    default: 'rgb( 255, 255, 214 )'
  } ),

  // Fill used for all control panels
  controlPanelFillProperty: new ProfileColorProperty( graphingLines, 'controlPanelFill', {
    default: 'rgb( 238, 238, 238 )'
  } ),

  // point tool
  pointToolColorProperty: new ProfileColorProperty( graphingLines, 'pointToolColor', {
    default: Color.grayColor( 200 )
  } ),

  // lines
  INTERACTIVE_LINE: 'black',
  Y_EQUALS_X: 'rgb( 16, 178, 15 )',
  Y_EQUALS_NEGATIVE_X: 'rgb( 16, 178, 15 )',
  SAVED_LINE_NORMAL: 'rgb( 160, 160, 160 )',
  SAVED_LINE_HIGHLIGHT: 'rgb( 0, 0, 255 )',

  // interactive aspects of lines
  slopeColorProperty: new ProfileColorProperty( graphingLines, 'slopeColor', {
    default: 'rgb( 117, 217, 255 )'
  } ),
  slopeToolDimensionalLinesColorProperty: new ProfileColorProperty( graphingLines, 'slopeToolDimensionalLinesColor', {
    default: 'rgb( 76, 199, 255 )'
  } ),
  interceptColorProperty: new ProfileColorProperty( graphingLines, 'interceptColor', {
    default: 'rgb( 200, 0, 200 )'
  } ),
  pointColorProperty: new ProfileColorProperty( graphingLines, 'pointColor', {
    default: 'rgb( 200, 0, 200 )'
  } ),
  pointX1Y1ColorProperty: new ProfileColorProperty( graphingLines, 'pointX1Y1Color', {
    default: 'rgb( 200, 0, 200 )'
  } ),
  pointX2Y2ColorProperty: new ProfileColorProperty( graphingLines, 'pointX2Y2Color', {
    default: 'rgb( 210, 255, 0 )'
  } ),

  // alpha channel (0-1) of the halo around the various manipulators, manually tuned for above colors
  HALO_ALPHA: {
    slope: 0.3,
    intercept: 0.15,
    x1y1: 0.15,
    x2y2: 0.35,
    point: 0.15
  }
};

graphingLines.register( 'GLColors', GLColors );

export default GLColors;