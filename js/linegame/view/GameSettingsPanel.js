// Copyright 2002-2013, University of Colorado Boulder

/**
 * Control panel that provides settings for a game.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var CheckBox = require( 'SUN/CheckBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TextButton = require( 'SUN/TextButton' );

  // strings
  var gameSettingsString = require( 'string!GRAPHING_LINES/gameSettings' );
  var soundString = require( 'string!GRAPHING_LINES/sound' ); //TODO if this goes away, remove from string file
  var startString = require( 'string!GRAPHING_LINES/start' );
  var timerString = require( 'string!GRAPHING_LINES/timer' ); //TODO if this goes away, remove from string file

  function GameSettingsPanel( numberOfLevels, levelProperty, timerEnabledProperty, soundEnabledProperty, startFunction, options ) {

    options = _.extend( {
      fill: 'rgb( 180, 205, 255 )',
      titleFont: new PhetFont( 38 ),
      labelFont: new PhetFont( 24 ),
      controlFont: new PhetFont( 24 ),
      startButtonColor: 'rgb(235, 235, 235)',
      xMargin: 20,
      yMargin: 20
    }, options );

    var titleNode = new Text( gameSettingsString, { font: options.titleFont } );
    var timerCheckBox = CheckBox.createTextCheckBox( timerString, { font: options.controlFont }, timerEnabledProperty );
    var soundCheckBox = CheckBox.createTextCheckBox( soundString, { font: options.controlFont }, soundEnabledProperty );
    var startButton = new TextButton( startString, startFunction, {
      font: options.controlFont,
      rectangleFillUp: options.startButtonColor,
      rectangleXMargin: 20,
      rectangleYMargin: 5
    } );

    // level control
    var levelControl = new Node();
    var levelLabel = new Text( "Level:", { font: options.controlFont } );
    levelControl.addChild( levelLabel );
    var previousNode = levelLabel;
    var xSpacing = 14;
    for ( var level = 0; level < numberOfLevels; level++ ) {
      var radioButton = new AquaRadioButton( levelProperty, level, new Text( level + 1, { font: options.controlFont } ) );
      levelControl.addChild( radioButton );
      radioButton.left = previousNode.right + xSpacing;
      radioButton.centerY = previousNode.centerY;
      previousNode = radioButton;
    }

    // content that will be put in the panel
    var content = new Node();
    content.addChild( titleNode );
    content.addChild( levelControl );
    content.addChild( timerCheckBox );
    content.addChild( soundCheckBox );
    content.addChild( startButton );

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
    levelControl.top = topSeparator.bottom + ySpacing;
    timerCheckBox.top = levelControl.bottom + ySpacing;
    soundCheckBox.top = timerCheckBox.bottom + ySpacing;
    bottomSeparator.top = soundCheckBox.bottom + ySpacing;
    startButton.centerX = topSeparator.centerX;
    startButton.top = bottomSeparator.bottom + ySpacing;

    Panel.call( this, content, options );
  }

  return inherit( Panel, GameSettingsPanel );
} );
