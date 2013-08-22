// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Game' screen. Conforms to the contract specified in joist/Tab
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLImages = require( 'common/GLImages' );
  var GLStrings = require( 'common/GLStrings' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var GameModel = require( 'game/model/GameModel' );
  var GameView = require( 'game/view/GameView' );
  var Vector2 = require( 'DOT/Vector2' );

  function GameScreen() {

    this.name = GLStrings[ "tab.lineGame" ];
    this.icon = new Image( GLImages.getImage( 'Game-icon.png' ) );
    this.backgroundColor = 'white';

    var mvt = ModelViewTransform2.createIdentity();

    this.createModel = function() {
      return new GameModel();
    };

    this.createView = function( model ) {
      return new GameView( model, mvt );
    };
  }

  return GameScreen;
} );