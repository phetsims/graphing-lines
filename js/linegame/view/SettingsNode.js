// Copyright 2002-2014, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the "settings" game phase. (See GamePhase.SETTINGS)
 * The displays a panel with controls used to configure a game.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelStartButton = require( 'VEGAS/LevelStartButton' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TimerToggleButton = require( 'SCENERY_PHET/TimerToggleButton' );

  // images
  var levelImages = [
    require( 'image!GRAPHING_LINES/Level_1.png' ),
    require( 'image!GRAPHING_LINES/Level_2.png' ),
    require( 'image!GRAPHING_LINES/Level_3.png' ),
    require( 'image!GRAPHING_LINES/Level_4.png' ),
    require( 'image!GRAPHING_LINES/Level_5.png' ),
    require( 'image!GRAPHING_LINES/Level_6.png' )
  ];

  // strings
  var chooseYourGameLevelString = require( 'string!GRAPHING_LINES/chooseYourGameLevel' );

  // constants
  var X_MARGIN = 40;
  var Y_MARGIN = 40;
  var CHALLENGES_PER_GAME = 6;
  var BUTTONS_X_SPACING = 50;
  var BUTTONS_Y_SPACING = 50;

  // Creates a level selection button
  var createLevelStartButton = function( level, model ) {
    return new LevelStartButton(
      new Image( levelImages[level] ),
      CHALLENGES_PER_GAME,
      function() {
        model.levelProperty.set( level );
        model.gamePhaseProperty.set( GamePhase.PLAY );
      },
      model.bestScoreProperties[ level ],
      model.getPerfectScore(),
      { backgroundColor: 'rgb( 242, 255, 204 )', highlightedBackgroundColor: 'rgb( 224, 255, 122 )' } )
  };

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @constructor
   */
  function SettingsNode( model, layoutBounds ) {

    Node.call( this );

    // Title
    var title = new Text( chooseYourGameLevelString, { font: new PhetFont( 40 ) } );
    this.addChild( title );

    // Buttons for selecting a game level
    var buttonsParent = new Node();
    this.addChild( buttonsParent );
    var button, previousButton;
    for ( var level = 0; level < model.numberOfLevels; level++ ) {

      button = createLevelStartButton( level, model );
      buttonsParent.addChild( button );

      if ( previousButton ) {
        if ( level === model.numberOfLevels / 2 ) {
          button.left = 0;
          button.top = previousButton.bottom + BUTTONS_Y_SPACING;
        }
        else {
          button.left = previousButton.right + BUTTONS_X_SPACING;
          button.top = previousButton.top;
        }
      }
      previousButton = button;
    }

    // Timer and Sound controls
    var timerToggleButton = new TimerToggleButton( model.timerEnabledProperty, { stroke: 'gray' } );
    this.addChild( timerToggleButton );
    var soundToggleButton = new SoundToggleButton( model.soundEnabledProperty, { stroke: 'gray' } );
    this.addChild( soundToggleButton );

    // Reset All button
    var resetButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      scale: 1.32
    } );
    this.addChild( resetButton );

    // layout
    buttonsParent.centerX = layoutBounds.width / 2;
    buttonsParent.centerY = layoutBounds.height / 2;
    title.centerX = buttonsParent.centerX;
    title.centerY = buttonsParent.top / 2;
    soundToggleButton.left = X_MARGIN;
    soundToggleButton.bottom = layoutBounds.height - Y_MARGIN;
    timerToggleButton.left = X_MARGIN;
    timerToggleButton.bottom = soundToggleButton.top - 10;
    resetButton.right = layoutBounds.width - X_MARGIN;
    resetButton.bottom = layoutBounds.height - Y_MARGIN;
  }

  return inherit( Node, SettingsNode );
} );

