// Copyright 2002-2014, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the "settings" game phase. (See GamePhase.SETTINGS)
 * The displays a panel with controls used to configure a game.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelStartButton = require( 'VEGAS/LevelStartButton' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TimerToggleButton = require( 'SCENERY_PHET/TimerToggleButton' );
  var Util = require( 'DOT/Util' );

  // images, ordered by level
  var levelImages = [
    require( 'image!GRAPHING_LINES/Level_1.png' ),
    require( 'image!GRAPHING_LINES/Level_2.png' ),
    require( 'image!GRAPHING_LINES/Level_3.png' ),
    require( 'image!GRAPHING_LINES/Level_4.png' ),
    require( 'image!GRAPHING_LINES/Level_5.png' ),
    require( 'image!GRAPHING_LINES/Level_6.png' )
  ];

  // strings
  var chooseYourLevelString = require( 'string!GRAPHING_LINES/chooseYourLevel' );
  var pattern_Level_0 = require( 'string!GRAPHING_LINES/pattern_Level_0' );

  // constants
  var X_MARGIN = 40;
  var Y_MARGIN = 40;
  var CHALLENGES_PER_GAME = 6;
  var BUTTONS_X_SPACING = 50;
  var BUTTONS_Y_SPACING = 40;

  // Creates a level selection button
  var createLevelStartButton = function( level, model ) {

    // 'Level N' centered above icon
    var label = new Text( StringUtils.format( pattern_Level_0, level + 1 ), { font: new GLFont( 60 ) } );
    var image = new Image( levelImages[level], { centerX: label.centerX, top: label.bottom + 20 } );
    var icon = new Node( { children: [ label, image ] } );

    return new LevelStartButton(
      icon,
      CHALLENGES_PER_GAME,
      function() {
        model.levelProperty.set( level );
        model.gamePhaseProperty.set( GamePhase.PLAY );
      },
      model.bestScoreProperties[ level ],
      model.getPerfectScore(),
      {
        backgroundColor: 'rgb( 180, 205, 255 )',
        highlightedBackgroundColor: 'rgb( 220, 230, 255 )',
        buttonWidth: 175,
        buttonHeight: 210,
        bestTimeProperty: model.bestTimeProperties[ level ],
        bestTimeVisibleProperty: model.timerEnabledProperty
      } );
  };

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {Number} screenHeight
   * @param {*} options
   * @constructor
   */
  function SettingsNode( model, layoutBounds, options ) {

    Node.call( this );

    // Title
    var title = new Text( chooseYourLevelString, { font: new GLFont( 40 ) } );
    this.addChild( title );

    // Level-selection buttons, arranged in 2 rows
    assert && assert( Util.isInteger( model.numberOfLevels / 2 ) ); // assumes an even number of buttons
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
    var toggleOptions = { stroke: 'gray', scale: 1.3 };
    var timerToggleButton = new TimerToggleButton( model.timerEnabledProperty, toggleOptions );
    this.addChild( timerToggleButton );
    var soundToggleButton = new SoundToggleButton( model.soundEnabledProperty, toggleOptions );
    this.addChild( soundToggleButton );

    // Reset All button
    var resetButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      scale: 1.32
    } );
    this.addChild( resetButton );

    // layout
    title.centerX = layoutBounds.centerX;
    title.top = 0;
    buttonsParent.centerX = title.centerX;
    buttonsParent.top = title.bottom + 50;
    soundToggleButton.left = X_MARGIN;
    soundToggleButton.bottom = layoutBounds.height - Y_MARGIN;
    timerToggleButton.left = X_MARGIN;
    timerToggleButton.bottom = soundToggleButton.top - 15;
    resetButton.right = layoutBounds.width - X_MARGIN;
    resetButton.bottom = layoutBounds.height - Y_MARGIN;

    this.mutate( options );
  }

  return inherit( Node, SettingsNode );
} );

