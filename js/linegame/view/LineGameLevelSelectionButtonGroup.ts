// Copyright 2013-2024, University of Colorado Boulder

/**
 * LineGameLevelSelectionButtonGroup is the group of level-selection buttons for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, Image, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import LevelSelectionButtonGroup, { LevelSelectionButtonGroupItem, LevelSelectionButtonGroupOptions } from '../../../../vegas/js/LevelSelectionButtonGroup.js';
import ScoreDisplayStars from '../../../../vegas/js/ScoreDisplayStars.js';
import graphingLines from '../../graphingLines.js';
import GraphingLinesStrings from '../../GraphingLinesStrings.js';
import GamePhase from '../model/GamePhase.js';
import LineGameModel from '../model/LineGameModel.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import GLQueryParameters from '../../common/GLQueryParameters.js';

const BUTTON_WIDTH = 175;
const BUTTON_HEIGHT = 210;

type SelfOptions = EmptySelfOptions;

export type LineGameLevelSelectionButtonGroupOptions = SelfOptions &
  StrictOmit<LevelSelectionButtonGroupOptions, 'levelSelectionButtonOptions'>;

export default class LineGameLevelSelectionButtonGroup extends LevelSelectionButtonGroup {

  /**
   * @param model
   * @param levelImages - images for the level-selection buttons, ordered by level
   * @param [providedOptions]
   */
  public constructor( model: LineGameModel, levelImages: HTMLImageElement[], providedOptions?: LineGameLevelSelectionButtonGroupOptions ) {
    assert && assert( levelImages.length === model.numberOfLevels, 'one image is required for each game level' );

    const options = optionize<LineGameLevelSelectionButtonGroupOptions, SelfOptions, LevelSelectionButtonGroupOptions>()( {

      // LevelSelectionButtonGroupOptions
      levelSelectionButtonOptions: {
        baseColor: 'rgb( 180, 205, 255 )'
      },
      groupButtonWidth: BUTTON_WIDTH,
      groupButtonHeight: BUTTON_HEIGHT,
      flowBoxOptions: {
        spacing: 50
      },
      gameLevels: GLQueryParameters.gameLevels
    }, providedOptions );

    // To give all button icons the same effective size
    const iconAlignGroup = new AlignGroup();

    // Descriptions of LevelSelectionButtons
    const levelSelectionButtonItems: LevelSelectionButtonGroupItem[] = [];
    for ( let level = 0; level < model.numberOfLevels; level++ ) {
      levelSelectionButtonItems.push( {
        icon: createLevelSelectionButtonIcon( level, levelImages[ level ], iconAlignGroup ),
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

    super( levelSelectionButtonItems, options );
  }
}

/**
 * Creates an icon for a LevelSelectionButton.
 */
function createLevelSelectionButtonIcon( level: number, levelImage: HTMLImageElement, iconAlignGroup: AlignGroup ): Node {

  // Level N
  const stringProperty = new DerivedStringProperty( [ GraphingLinesStrings.pattern_Level_0StringProperty ],
    pattern => StringUtils.format( pattern, level + 1 ) );

  const text = new Text( stringProperty, {
    font: new PhetFont( 40 ),
    maxWidth: 100
  } );

  const image = new AlignBox( new Image( levelImage, { scale: 0.54 } ), {
    group: iconAlignGroup
  } );

  // 'Level N' centered above image
  return new VBox( {
    spacing: 15,
    children: [ text, image ]
  } );
}

graphingLines.register( 'LineGameLevelSelectionButtonGroup', LineGameLevelSelectionButtonGroup );