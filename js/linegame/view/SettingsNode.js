// Copyright 2013-2021, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the 'settings' game phase. (See GamePhase.SETTINGS)
 * The displays a panel with controls used to configure a game.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimerToggleButton from '../../../../scenery-phet/js/buttons/TimerToggleButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import LayoutBox from '../../../../scenery/js/nodes/LayoutBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import LevelSelectionButton from '../../../../vegas/js/LevelSelectionButton.js';
import ScoreDisplayStars from '../../../../vegas/js/ScoreDisplayStars.js';
import GLConstants from '../../common/GLConstants.js';
import graphingLines from '../../graphingLines.js';
import graphingLinesStrings from '../../graphingLinesStrings.js';
import GamePhase from '../model/GamePhase.js';

class SettingsNode extends Node {

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {HTMLImageElement[][]} levelImages - grid of images for the level-selection buttons, ordered by level
   * @param {Object} [options]
   */
  constructor( model, layoutBounds, levelImages, options ) {

    assert && assert( _.flatten( levelImages ).length === model.numberOfLevels,
      'one image is required for each game level' );

    options = merge( {
      buttonsXSpace: 50,
      buttonsYSpace: 25
    }, options );

    // Title
    const title = new Text( graphingLinesStrings.chooseYourLevel, {
      font: new PhetFont( 40 ),
      maxWidth: 0.85 * layoutBounds.width
    } );

    // Grid of level-selection buttons. levelImages describes the grid.
    let level = 0;
    const gridChildren = [];
    levelImages.forEach( row => {

      // create the buttons for the current row
      const rowChildren = [];
      row.forEach( levelImage => {
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
    const buttonGrid = new VBox( {
      children: gridChildren,
      spacing: options.buttonsYSpace,
      align: 'center'
    } );

    // Timer and Sound controls
    const timerToggleButton = new TimerToggleButton( model.timerEnabledProperty, {
      stroke: 'gray',
      scale: 1.3,
      left: GLConstants.SCREEN_X_MARGIN,
      bottom: layoutBounds.height - GLConstants.SCREEN_Y_MARGIN
    } );

    // Reset All button, at rightBottom
    const resetAllButton = new ResetAllButton( {
      listener: () => model.reset(),
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

    super( options );
  }
}

/**
 * Creates a level selection button
 * @param {number} level
 * @param {LineGameModel} model
 * @param {HTMLImageElement} levelImage
 * @returns {LevelSelectionButton}
 */
function createLevelSelectionButton( level, model, levelImage ) {

  const image = new Image( levelImage );
  const label = new Text( StringUtils.format( graphingLinesStrings.pattern_Level_0, level + 1 ), {
    font: new PhetFont( 60 ),
    maxWidth: image.width
  } );

  // 'Level N' centered above image
  const icon = new VBox( { children: [ label, image ], spacing: 20 } );

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
    listener: () => {
      model.levelProperty.set( level );
      model.setGamePhase( GamePhase.PLAY );
    },
    soundPlayerIndex: level
  } );
}

graphingLines.register( 'SettingsNode', SettingsNode );

export default SettingsNode;