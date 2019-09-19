// Copyright 2013-2017, University of Colorado Boulder

/**
 * View for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BaseGameScreenView = require( 'GRAPHING_LINES/linegame/view/BaseGameScreenView' );
  const GLRewardNode = require( 'GRAPHING_LINES/linegame/view/GLRewardNode' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );

  // images
  const level1Image = require( 'image!GRAPHING_LINES/Level_1.png' );
  const level2Image = require( 'image!GRAPHING_LINES/Level_2.png' );
  const level3Image = require( 'image!GRAPHING_LINES/Level_3.png' );
  const level4Image = require( 'image!GRAPHING_LINES/Level_4.png' );
  const level5Image = require( 'image!GRAPHING_LINES/Level_5.png' );
  const level6Image = require( 'image!GRAPHING_LINES/Level_6.png' );

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

  return inherit( BaseGameScreenView, LineGameScreenView );
} );
