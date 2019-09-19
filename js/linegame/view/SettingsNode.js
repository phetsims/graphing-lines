// Copyright 2013-2019, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the 'settings' game phase. (See GamePhase.SETTINGS)
 * The displays a panel with controls used to configure a game.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  const GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  const GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  const LevelSelectionButton = require( 'VEGAS/LevelSelectionButton' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScoreDisplayStars = require( 'VEGAS/ScoreDisplayStars' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const TimerToggleButton = require( 'SCENERY_PHET/buttons/TimerToggleButton' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const chooseYourLevelString = require( 'string!GRAPHING_LINES/chooseYourLevel' );
  const patternLevel0String = require( 'string!GRAPHING_LINES/pattern_Level_0' );

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
    var timerToggleButton = new TimerToggleButton( model.timerEnabledProperty, {
      stroke: 'gray',
      scale: 1.3,
      left: GLConstants.SCREEN_X_MARGIN,
      bottom: layoutBounds.height - GLConstants.SCREEN_Y_MARGIN
    } );

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
      timerToggleButton,
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
        model.setGamePhase( GamePhase.PLAY );
      }
    } );
  };

  return inherit( Node, SettingsNode );
} );

