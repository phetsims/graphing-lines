// Copyright 2013-2018, University of Colorado Boulder

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
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScoreDisplayStars = require( 'VEGAS/ScoreDisplayStars' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TimerToggleButton = require( 'SCENERY_PHET/buttons/TimerToggleButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var chooseYourLevelString = require( 'string!GRAPHING_LINES/chooseYourLevel' );
  var patternLevel0String = require( 'string!GRAPHING_LINES/pattern_Level_0' );

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {HTMLImageElement[][]} levelImages - grid of images for the level-selection buttons, ordered by level
   * @param {Object} [options]
   * @constructor
   */
  function SettingsNode( model, layoutBounds, levelImages, options ) {

    assert && assert( _.flatten( levelImages ).length === model.numberOfLevels,
      'one image is required for each game level' );

    options = _.extend( {
      buttonsXSpace: 50,
      buttonsYSpace: 25
    }, options );

    // Title
    var title = new Text( chooseYourLevelString, {
      font: new GLFont( 40 ),
      maxWidth: 0.85 * layoutBounds.width
    } );

    // Grid of level-selection buttons. levelImages describes the grid.
    var level = 0;
    var gridChildren = [];
    levelImages.forEach( function( row ) {

      // create the buttons for the current row
      var rowChildren = [];
      row.forEach( function( levelImage ) {
        rowChildren.push( createLevelSelectionButton( level, model, levelImage ) );
        level++;
      } );

      // layout the row horizontally
      gridChildren.push( new HBox( {
        children: rowChildren,
        spacing: options.buttonsXSpace,
        align: 'center'
      } ) );
    } );
    var buttonGrid = new VBox( {
      children: gridChildren,
      spacing: options.buttonsYSpace,
      align: 'center'
    } );

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
        children: [ title, buttonGrid ],
        orientation: 'vertical',
        align: 'center',
        spacing: 50,
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

  /**
   * Creates a level selection button
   * @param {number} level
   * @param {LineGameModel} model
   * @param {HTMLImageElement} levelImage
   * @returns {LevelSelectionButton}
   */
  var createLevelSelectionButton = function( level, model, levelImage ) {

    var image = new Image( levelImage );
    var label = new Text( StringUtils.format( patternLevel0String, level + 1 ), {
      font: new GLFont( 60 ),
      maxWidth: image.width
    } );

    // 'Level N' centered above image
    var icon = new VBox( { children: [ label, image ], spacing: 20 } );

    return new LevelSelectionButton( icon, model.bestScoreProperties[ level ], {
      baseColor: 'rgb( 180, 205, 255 )',
      buttonWidth: 175,
      buttonHeight: 210,
      bestTimeProperty: model.bestTimeProperties[ level ],
      bestTimeVisibleProperty: model.timerEnabledProperty,
      scoreDisplayConstructor: ScoreDisplayStars,
      scoreDisplayOptions: {
        numberOfStars: model.challengesPerGameProperty.get(),
        perfectScore: model.getPerfectScore( level )
      },
      listener: function() {
        model.levelProperty.set( level );
        model.gamePhaseProperty.set( GamePhase.PLAY );
      }
    } );
  };

  return inherit( Node, SettingsNode );
} );

