// Copyright 2013-2022, University of Colorado Boulder

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
import { AlignBox, AlignGroup, Image, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import LevelSelectionButtonGroup from '../../../../vegas/js/LevelSelectionButtonGroup.js';
import ScoreDisplayStars from '../../../../vegas/js/ScoreDisplayStars.js';
import GLConstants from '../../common/GLConstants.js';
import graphingLines from '../../graphingLines.js';
import graphingLinesStrings from '../../graphingLinesStrings.js';
import GamePhase from '../model/GamePhase.js';

class SettingsNode extends Node {

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {HTMLImageElement[]} levelImages - images for the level-selection buttons, ordered by level
   * @param {Object} [options]
   */
  constructor( model, layoutBounds, levelImages, options ) {

    assert && assert( levelImages.length === model.numberOfLevels, 'one image is required for each game level' );

    options = merge( {
      levelSelectionButtonGroupOptions: {
        levelSelectionButtonOptions: {
          baseColor: 'rgb( 180, 205, 255 )',
          buttonWidth: 175,
          buttonHeight: 210,
          bestTimeVisibleProperty: model.timerEnabledProperty
        },
        flowBoxOptions: {
          spacing: 50
        }
      }
    }, options );

    // Title
    const title = new Text( graphingLinesStrings.chooseYourLevel, {
      font: new PhetFont( 40 ),
      maxWidth: 0.85 * layoutBounds.width
    } );

    // To give all button icons the same effective size
    const iconAlignGroup = new AlignGroup();

    // Descriptions of LevelSelectionButtons
    const levelSelectionButtonItems = [];
    for ( let level = 0; level < model.numberOfLevels; level++ ) {
      levelSelectionButtonItems.push( {
        icon: createLevelSelectionButtonIcon( level, levelImages[ level ], iconAlignGroup ),
        scoreProperty: model.bestScoreProperties[ level ],
        options: {
          bestTimeProperty: model.bestTimeProperties[ level ],
          bestTimeVisibleProperty: model.timerEnabledProperty,
          createScoreDisplay: scoreProperty => new ScoreDisplayStars( scoreProperty, {
            numberOfStars: model.challengesPerGameProperty.get(),
            perfectScore: model.getPerfectScore( level )
          } ),
          listener: () => {
            model.levelProperty.set( level );
            model.setGamePhase( GamePhase.PLAY );
          },
          soundPlayerIndex: level
        }
      } );
    }

    // Group of LevelSelectionButtons
    const levelSelectionButtonGroup =
      new LevelSelectionButtonGroup( levelSelectionButtonItems, options.levelSelectionButtonGroupOptions );

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

    assert && assert( !options.children );
    options.children = [
      // title and level-selection buttons centered
      new VBox( {
        children: [ title, levelSelectionButtonGroup ],
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
 * Creates an icon for a LevelSelectionButton.
 * @param {number} level
 * @param {HTMLImageElement} levelImage
 * @param {AlignGroup} iconAlignGroup
 * @returns {Node}
 */
function createLevelSelectionButtonIcon( level, levelImage, iconAlignGroup ) {

  // Level N
  const label = new Text( StringUtils.format( graphingLinesStrings.pattern_Level_0, level + 1 ), {
    font: new PhetFont( 40 ),
    maxWidth: 100
  } );

  const image = new AlignBox( new Image( levelImage, { scale: 0.54 } ), {
    group: iconAlignGroup
  } );

  // 'Level N' centered above image
  return new VBox( {
    spacing: 15,
    children: [ label, image ]
  } );
}

graphingLines.register( 'SettingsNode', SettingsNode );

export default SettingsNode;