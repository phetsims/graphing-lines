// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Game' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameModel = require( 'GRAPHING_LINES/linegame/model/LineGameModel' );
  var LineGameView = require( 'GRAPHING_LINES/linegame/view/LineGameView' );
  var Screen = require( 'JOIST/SCREEN' );

  // strings
  var lineGameString = require( 'string!GRAPHING_LINES/tab.lineGame' );

  // images
  var screenIcon = require( 'image!GRAPHING_LINES/LineGame-screen-icon.png' );

  function GameScreen() {
    Screen.call( this, lineGameString, new Image( screenIcon ),
      function() { return new LineGameModel(); },
      function( model ) { return new LineGameView( model ); },
      { backgroundColor: GLColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, GameScreen );
} );