// Copyright 2013-2020, University of Colorado Boulder

/**
 * View for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import level1Image from '../../../images/Level_1_png.js';
import level2Image from '../../../images/Level_2_png.js';
import level3Image from '../../../images/Level_3_png.js';
import level4Image from '../../../images/Level_4_png.js';
import level5Image from '../../../images/Level_5_png.js';
import level6Image from '../../../images/Level_6_png.js';
import graphingLines from '../../graphingLines.js';
import BaseGameScreenView from './BaseGameScreenView.js';
import GLRewardNode from './GLRewardNode.js';

/**
 * @param {LineGameModel} model
 * @constructor
 */
function LineGameScreenView( model ) {

  // grid of images for the level-selection buttons, ordered by level
  const levelImages = [
    [ level1Image, level2Image, level3Image ],
    [ level4Image, level5Image, level6Image ]
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

  BaseGameScreenView.call( this, model, levelImages, rewardFactoryFunctions );
}

graphingLines.register( 'LineGameScreenView', LineGameScreenView );

inherit( BaseGameScreenView, LineGameScreenView );
export default LineGameScreenView;