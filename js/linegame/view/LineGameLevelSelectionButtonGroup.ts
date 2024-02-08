// Copyright 2013-2024, University of Colorado Boulder

/**
 * LineGameLevelSelectionButtonGroup is the group of level-selection buttons for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import LevelSelectionButtonGroup, { LevelSelectionButtonGroupItem } from '../../../../vegas/js/LevelSelectionButtonGroup.js';
import ScoreDisplayStars from '../../../../vegas/js/ScoreDisplayStars.js';
import graphingLines from '../../graphingLines.js';
import GraphingLinesStrings from '../../GraphingLinesStrings.js';
import GamePhase from '../model/GamePhase.js';
import LineGameModel from '../model/LineGameModel.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const BUTTON_WIDTH = 175;
const BUTTON_HEIGHT = 210;

// Layout of buttons
const X_SPACING = 40;
const Y_SPACING = 30;

export default class LineGameLevelSelectionButtonGroup extends LevelSelectionButtonGroup {

  /**
   * @param model
   * @param climberNodes - Nodes that show 'climber' portrayals, for the level-selection buttons, ordered by level
   * @param gameLevels - show buttons for these game levels
   * @param tandem
   */
  public constructor( model: LineGameModel, climberNodes: Node[], gameLevels: number[], tandem: Tandem ) {
    assert && assert( climberNodes.length === model.numberOfLevels, 'one image is required for each game level' );

    // To give all button icons the same effective size
    const iconAlignGroup = new AlignGroup();

    // Descriptions of LevelSelectionButtons
    const levelSelectionButtonItems: LevelSelectionButtonGroupItem[] = [];
    for ( let level = 0; level < model.numberOfLevels; level++ ) {
      levelSelectionButtonItems.push( {
        icon: createLevelSelectionButtonIcon( level, climberNodes[ level ], iconAlignGroup ),
        scoreProperty: model.bestScoreProperties[ level ],
        options: {
          createScoreDisplay: scoreProperty => new ScoreDisplayStars( scoreProperty, {
            numberOfStars: model.challengesPerGameProperty.value,
            perfectScore: model.getPerfectScore()
          } ),
          listener: () => {
            model.levelProperty.value = level;
            model.setGamePhase( GamePhase.PLAY );
          },
          soundPlayerIndex: level
        }
      } );
    }

    const buttonsPerRow = ( gameLevels.length <= 4 ) ? 4 : 3;

    super( levelSelectionButtonItems, {

      // LevelSelectionButtonGroupOptions
      levelSelectionButtonOptions: {
        baseColor: 'rgb( 180, 205, 255 )'
      },
      groupButtonWidth: BUTTON_WIDTH,
      groupButtonHeight: BUTTON_HEIGHT,

      // A maximum number of buttons per row, wrapping to a new row
      flowBoxOptions: {
        spacing: X_SPACING, // horizontal spacing
        lineSpacing: Y_SPACING, // vertical spacing
        preferredWidth: buttonsPerRow * ( BUTTON_WIDTH + X_SPACING ),
        wrap: true, // start a new row when preferredWidth is reached
        justify: 'center' // horizontal justification
      },
      gameLevels: gameLevels,
      tandem: tandem
    } );
  }
}

/**
 * Creates an icon for a LevelSelectionButton.
 */
function createLevelSelectionButtonIcon( level: number, climberNode: Node, iconAlignGroup: AlignGroup ): Node {

  // Level N
  const stringProperty = new DerivedStringProperty( [ GraphingLinesStrings.pattern_Level_0StringProperty ],
    pattern => StringUtils.format( pattern, level + 1 ) );
  const text = new Text( stringProperty, {
    font: new PhetFont( 40 ),
    maxWidth: 100
  } );

  const alignBox = new AlignBox( climberNode, {
    group: iconAlignGroup
  } );

  // 'Level N' centered above image
  return new VBox( {
    spacing: 15,
    children: [ text, alignBox ]
  } );
}

graphingLines.register( 'LineGameLevelSelectionButtonGroup', LineGameLevelSelectionButtonGroup );