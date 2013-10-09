// Copyright 2002-2013, University of Colorado Boulder

//TODO port
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TextButton = require( 'SUN/TextButton' );

  // strings
  var newGameString = require( 'string!GRAPHING_LINES/newGame' );

  function GameOverNode( level, score, perfectScore, scoreDecimalPlaces, time, bestTime, isNewBestTime, timerEnabled, newGameCallback, options ) {

    options = _.extend( {
      xMargin: 20,
      yMargin: 20,
      fill: new Color( 235, 235, 235 ),
      font: new PhetFont( 20 ),
      newGameButtonColor: new Color( 255, 255, 255 )
    }, options );

    var titleNode = new Text( "Game Over", { font: new PhetFont( 30 ) } );

    //TODO what should UI look like? this is a dump of the parameter values
    var dataNode = new MultiLineText(
      'level=' + level + '\n' +
      'score=' + score + '\n' +
      'perfectScore=' + perfectScore + '\n' +
      'time=' + time + '\n' +
      'bestTime=' + bestTime + '\n' +
      'isNewBestTime=' + isNewBestTime + '\n' +
      'timerEnabled=' + timerEnabled,
      { font: new PhetFont( 20 ), align: 'left' } );

    // New Game button
    var newGameButton = new TextButton( newGameString, newGameCallback,
      { font: options.font, rectangleFillUp: options.newGameButtonColor } );

    // content for the panel
    var content = new Node();
    content.addChild( titleNode );
    content.addChild( dataNode );
    content.addChild( newGameButton );

    // layout
    var ySpacing = 30;
    dataNode.centerX = titleNode.centerX;
    dataNode.top = titleNode.bottom + ySpacing;
    newGameButton.centerX = dataNode.centerX;
    newGameButton.top = dataNode.bottom + ySpacing

    Panel.call( this, content, options );
  }

  return inherit( Panel, GameOverNode );
} );
