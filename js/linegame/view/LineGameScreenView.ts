// Copyright 2013-2024, University of Colorado Boulder

/**
 * View for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import GLQueryParameters, { NUMBER_OF_GAME_LEVELS } from '../../common/GLQueryParameters.js';
import graphingLines from '../../graphingLines.js';
import LineGameModel from '../model/LineGameModel.js';
import BaseGameScreenView from './BaseGameScreenView.js';
import GLRewardNode from './GLRewardNode.js';
import ClimberCharacters from './ClimberCharacters.js';
import ClimberImages from './ClimberImages.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import RegionAndCulturePortrayal from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';

export default class LineGameScreenView extends BaseGameScreenView {

  public constructor( model: LineGameModel,
                      regionAndCulturePortrayalProperty: TReadOnlyProperty<RegionAndCulturePortrayal>,
                      tandem: Tandem ) {

    // Images for the level-selection buttons, ordered by level
    const climberCharacters = new ClimberCharacters( regionAndCulturePortrayalProperty, ClimberImages );
    const levelImages = climberCharacters.climberNodes;
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