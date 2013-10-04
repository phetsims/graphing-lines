// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Game' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var Image = require( 'SCENERY/nodes/Image' );
  var LineGameModel = require( 'GRAPHING_LINES/linegame/model/LineGameModel' );
  var LineGameView = require( 'GRAPHING_LINES/linegame/view/LineGameView' );

  // strings
  var lineGameString = require( 'string!GRAPHING_LINES/tab.lineGame' );

  // images
  var gameImage = require( 'image!GRAPHING_LINES/../images/Game-icon.png' );

  function GameScreen() {

    this.name = lineGameString;
    this.icon = new Image( gameImage );
    this.backgroundColor = new Color( 255, 255, 214 );

    this.createModel = function() {
      return new LineGameModel();
    };

    this.createView = function( model ) {
      return new LineGameView( model );
    };
  }

  return GameScreen;
} );