// Copyright 2002-2013, University of Colorado Boulder

//TODO port
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TextButton = require( 'SUN/TextButton' );

  // strings
  var newGameString = require( 'string!GRAPHING_LINES/newGame' );

  function GameOverPanel( level, score, perfectScore, scoreDecimalPlaces, time, bestTime, isNewBestTime, timerEnabled, newGameCallback, options ) {

    options = _.extend( {
      xMargin: 20,
      yMargin: 20,
      fill: 'rgb( 180, 205, 255 )',
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
    var newGameButton = new TextButton( newGameString, newGameCallback, {
      font: options.font,
      rectangleFillUp: options.newGameButtonColor,
      rectangleXMargin: 20,
      rectangleYMargin: 5 } );

    // content for the panel
    var content = new Node();
    content.addChild( titleNode );
    content.addChild( dataNode );
    content.addChild( newGameButton );

    // separators
    var separatorWidth = content.width;
    var topSeparator = new Line( 0, 0, separatorWidth, 0, { stroke: 'black' } );
    var bottomSeparator = new Line( 0, 0, separatorWidth, 0, { stroke: 'black' } );
    content.addChild( topSeparator );
    content.addChild( bottomSeparator );

    // layout
    var ySpacing = 30;
    titleNode.centerX = topSeparator.centerX;
    topSeparator.top = titleNode.bottom + ySpacing;
    dataNode.centerX = topSeparator.centerX;
    dataNode.top = topSeparator.bottom + ySpacing;
    bottomSeparator.top = dataNode.bottom + ySpacing;
    newGameButton.centerX = bottomSeparator.centerX;
    newGameButton.top = bottomSeparator.bottom + ySpacing

    Panel.call( this, content, options );
  }

  return inherit( Panel, GameOverPanel );
} );
