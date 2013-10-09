// Copyright 2002-2013, University of Colorado Boulder

//TODO this is a quick-&-dirty implementation, do it right
//TODO i18n
define( function( require ) {
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var CheckBox = require( 'SUN/CheckBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TextButton = require( 'SUN/TextButton' );

  function GameSettingsPanel( numberOfLevels, levelProperty, timerEnabledProperty, soundEnabledProperty, startFunction, options ) {

    options = _.extend( {
      fill: 'rgb( 235, 235, 235 )',
      titleFont: new PhetFont( 38 ),
      labelFont: new PhetFont( 24 ),
      controlFont: new PhetFont( 24 ),
      startButtonColor: 'rgb(235, 235, 235)',
      xMargin: 20,
      yMargin: 20
    }, options );

    var titleNode = new Text( "Game Settings", { font: options.titleFont } );
    var timerCheckBox = CheckBox.createTextCheckBox( "Timer", { font: options.controlFont }, timerEnabledProperty );
    var soundCheckBox = CheckBox.createTextCheckBox( "Sound", { font: options.controlFont }, soundEnabledProperty );
    var startButton = new TextButton( "Start", startFunction, { font: options.controlFont, rectangleFillUp: options.startButtonColor } );

    // level control
    var levelControl = new Node();
    var levelLabel = new Text( "Level:", { font: options.controlFont } );
    levelControl.addChild( levelLabel );
    var previousNode = levelLabel;
    var xSpacing = 8;
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

    // layout
    var ySpacing = 30;
    var contentWidth = content.width;
    titleNode.centerX = contentWidth / 2;
    levelControl.top = titleNode.bottom + ySpacing;
    timerCheckBox.top = levelControl.bottom + ySpacing;
    soundCheckBox.top = timerCheckBox.bottom + ySpacing;
    startButton.centerX = contentWidth / 2;
    startButton.top = soundCheckBox.bottom + ySpacing;

    Panel.call( this, content, options );
  }

  return inherit( Panel, GameSettingsPanel );
} );
