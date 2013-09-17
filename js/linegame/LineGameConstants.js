// Copyright 2002-2013, University of Colorado Boulder

/**
 * Constants that are specific to the 'Line Game' screen.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  return {
    // fonts
    TITLE_FONT: new PhetFont( { size: 40, weight: 'bold' } ),
    BUTTON_FONT: new PhetFont( { size: 30, weight: 'bold' } ),
    INTERACTIVE_EQUATION_FONT: new PhetFont( { size: 28, weight: 'bold' } ),
    STATIC_EQUATION_FONT: new PhetFont( { size: 28 } ),
    POINTS_AWARDED_FONT: new PhetFont( { size: 36, weight: 'bold' } ),

    // colors
    TITLE_COLOR: Color.BLACK,
    ANSWER_COLOR: new Color( 0, 180, 0 ), // color of the correct answer
    GUESS_COLOR: Color.BLACK, // color of the user's guess
    FACE_COLOR: new Color( 255, 255, 0, 0.7 ), // translucent yellow
    POINTS_AWARDED_COLOR: Color.BLACK,
    BUTTON_COLOR: Color.YELLOW,

    // sizes
    GRAPH_WIDTH: 400, // graph width in view coordinates
    FACE_DIAMETER: 120,
    MANIPULATOR_DIAMETER: 0.85, // diameter of the manipulators, in model units
    POINT_DIAMETER: 0.5, // diameter of plotted points, in model units
    POINT_TOOL_SCALE: 0.80
  };
} );

