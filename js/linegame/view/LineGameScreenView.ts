// Copyright 2013-2024, University of Colorado Boulder

/**
 * View for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import level1_svg from '../../../images/usa/level1_svg.js';
import level2_svg from '../../../images/usa/level2_svg.js';
import level3_svg from '../../../images/usa/level3_svg.js';
import level4_svg from '../../../images/usa/level4_svg.js';
import level5_svg from '../../../images/usa/level5_svg.js';
import level6_svg from '../../../images/usa/level6_svg.js';
import GLQueryParameters, { NUMBER_OF_GAME_LEVELS } from '../../common/GLQueryParameters.js';
import graphingLines from '../../graphingLines.js';
import LineGameModel from '../model/LineGameModel.js';
import BaseGameScreenView from './BaseGameScreenView.js';
import GLRewardNode from './GLRewardNode.js';

export default class LineGameScreenView extends BaseGameScreenView {

  public constructor( model: LineGameModel, tandem: Tandem ) {

    // Images for the level-selection buttons, ordered by level
    const levelImages = [ level1_svg, level2_svg, level3_svg, level4_svg, level5_svg, level6_svg ];
    assert && assert( levelImages.length === NUMBER_OF_GAME_LEVELS );

    // functions that create nodes for the game reward, ordered by level
    const rewardNodeFunctions = [
      GLRewardNode.createEquationNodes,
      GLRewardNode.createGraphNodes,
      GLRewardNode.createPointToolNodes,
      GLRewardNode.createSmileyFaceNodes,
      GLRewardNode.createPaperAirplaneNodes,
      GLRewardNode.createAssortedNodes
    ];
    assert && assert( rewardNodeFunctions.length === NUMBER_OF_GAME_LEVELS );

    super( model, GLQueryParameters.gameLevels, levelImages, rewardNodeFunctions, tandem );
  }
}

graphingLines.register( 'LineGameScreenView', LineGameScreenView );