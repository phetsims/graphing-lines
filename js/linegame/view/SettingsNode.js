// Copyright 2013-2015, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the 'settings' game phase. (See GamePhase.SETTINGS)
 * The displays a panel with controls used to configure a game.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TimerToggleButton = require( 'SCENERY_PHET/buttons/TimerToggleButton' );
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
  var patternLevel0String = require( 'string!GRAPHING_LINES/pattern_Level_0' );

  // constants
  var CHALLENGES_PER_GAME = 6;
  var BUTTONS_X_SPACING = 50;
  var BUTTONS_Y_SPACING = 40;

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {Object} [options]
   * @constructor
   */
  function SettingsNode( model, layoutBounds, options ) {

    options = options || {};

    // Title
    var title = new Text( chooseYourLevelString, {
      font: new GLFont( 40 ),
      maxWidth: 0.85 * layoutBounds.width
    } );

    // Level-selection buttons, arranged in 2 rows
    assert && assert( Util.isInteger( model.numberOfLevels / 2 ) ); // assumes an even number of buttons
    var buttonsParent = new Node();
    var button;
    var previousButton;
    for ( var level = 0; level < model.numberOfLevels; level++ ) {

      button = createLevelSelectionButton( level, model );
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
    var soundToggleButton = new SoundToggleButton( model.soundEnabledProperty, toggleOptions );

    // Reset All button, at rightBottom
    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      scale: GLConstants.RESET_ALL_BUTTON_SCALE,
      right: layoutBounds.width - GLConstants.SCREEN_X_MARGIN,
      bottom: layoutBounds.height - GLConstants.SCREEN_Y_MARGIN
    } );

    options.children = [
      // title and level-selection buttons centered
      new LayoutBox( {
        children: [ title, buttonsParent ],
        orientation: 'vertical',
        align: 'center',
        spacing: 40,
        center: layoutBounds.center
      } ),
      // timer and sound buttons at leftBottom
      new LayoutBox( {
        children: [ timerToggleButton, soundToggleButton ],
        orientation: 'vertical',
        align: 'center',
        spacing: 15,
        left: GLConstants.SCREEN_X_MARGIN,
        bottom: layoutBounds.height - GLConstants.SCREEN_Y_MARGIN
      } ),
      resetAllButton
    ];
    Node.call( this, options );
  }

  graphingLines.register( 'SettingsNode', SettingsNode );

  // Creates a level selection button
  var createLevelSelectionButton = function( level, model ) {

    // 'Level N' centered above icon
    var label = new Text( StringUtils.format( patternLevel0String, level + 1 ), { font: new GLFont( 60 ) } );
    var image = new Image( levelImages[ level ], { centerX: label.centerX, top: label.bottom + 20 } );
    var icon = new Node( { children: [ label, image ] } );

    return new LevelSelectionButton(
      icon,
      CHALLENGES_PER_GAME,
      function() {
        model.levelProperty.set( level );
        model.gamePhaseProperty.set( GamePhase.PLAY );
      },
      model.bestScoreProperties[ level ],
      model.getPerfectScore(),
      {
        baseColor: 'rgb( 180, 205, 255 )',
        buttonWidth: 175,
        buttonHeight: 210,
        bestTimeProperty: model.bestTimeProperties[ level ],
        bestTimeVisibleProperty: model.timerEnabledProperty
      } );
  };

  return inherit( Node, SettingsNode );
} );

