// Copyright 2013-2021, University of Colorado Boulder

/**
 * View for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import level1_png from '../../../images/level1_png.js';
import level2_png from '../../../images/level2_png.js';
import level3_png from '../../../images/level3_png.js';
import level4_png from '../../../images/level4_png.js';
import level5_png from '../../../images/level5_png.js';
import level6_png from '../../../images/level6_png.js';
import graphingLines from '../../graphingLines.js';
import BaseGameScreenView from './BaseGameScreenView.js';
import GLRewardNode from './GLRewardNode.js';

class LineGameScreenView extends BaseGameScreenView {

  /**
   * @param {LineGameModel} model
   */
  constructor( model ) {

    // grid of images for the level-selection buttons, ordered by level
    const levelImages = [
      [ level1_png, level2_png, level3_png ],
      [ level4_png, level5_png, level6_png ]
    ];

    // functions that create nodes for the game reward, ordered by level
    const rewardFactoryFunctions = [
      GLRewardNode.createEquationNodes,
      GLRewardNode.createGraphNodes,
      GLRewardNode.createPointToolNodes,
      GLRewardNode.createSmileyFaceNodes,
      GLRewardNode.createPaperAirplaneNodes,
      GLRewardNode.createAssortedNodes
    ];

    super( model, levelImages, rewardFactoryFunctions );
  }
}

graphingLines.register( 'LineGameScreenView', LineGameScreenView );

export default LineGameScreenView;