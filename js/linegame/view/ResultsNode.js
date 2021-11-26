// Copyright 2013-2021, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the 'results' game phase. (See GamePhase.RESULTS)
 * Displays a panel with the game results.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node } from '../../../../scenery/js/imports.js';
import LevelCompletedNode from '../../../../vegas/js/LevelCompletedNode.js';
import GLQueryParameters from '../../common/GLQueryParameters.js';
import graphingLines from '../../graphingLines.js';
import LineGameConstants from '../LineGameConstants.js';
import GamePhase from '../model/GamePhase.js';
import GLRewardNode from './GLRewardNode.js';

class ResultsNode extends Node {

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {GameAudioPlayer} audioPlayer
   * @param {function[]} rewardFactoryFunctions - functions that create nodes for the game reward, ordered by level
   */
  constructor( model, layoutBounds, audioPlayer, rewardFactoryFunctions ) {

    super();

    this.rewardNode = null; // @private

    // show results when we enter this phase
    // unlink unnecessary because ResultsNode exists for the lifetime of the sim.
    model.gamePhaseProperty.link( gamePhase => {
      if ( gamePhase === GamePhase.RESULTS ) {

        // game reward, shown for perfect score (or with 'reward' query parameter)
        if ( model.isPerfectScore() || GLQueryParameters.showReward ) {

          audioPlayer.gameOverPerfectScore();

          const level = model.levelProperty.get();
          const rewardNodes = rewardFactoryFunctions[ level ]();
          this.rewardNode = new GLRewardNode( rewardNodes );
          this.addChild( this.rewardNode );
        }
        else {
          audioPlayer.gameOverImperfectScore();
        }

        // game results
        this.addChild( new LevelCompletedNode(
          model.levelProperty.get() + 1,
          model.scoreProperty.get(),
          model.getPerfectScore(),
          model.getPerfectScore() / model.maxPointsPerChallenge, // number of stars in the progress indicator
          model.timerEnabledProperty.get(),
          model.timer.elapsedTimeProperty.value,
          model.bestTimeProperties[ model.levelProperty.get() ].get(),
          model.isNewBestTime,
          () => model.setGamePhase( GamePhase.SETTINGS ),
          {
            starDiameter: 45,
            buttonFill: LineGameConstants.BUTTON_COLOR,
            centerX: layoutBounds.centerX,
            centerY: layoutBounds.centerY
          } ) );
      }
      else {
        this.removeAllChildren();
        if ( this.rewardNode !== null ) {
          this.rewardNode.dispose();
        }
        this.rewardNode = null;
      }
    } );
  }

  // @public
  step( elapsedTime ) {
    if ( this.rewardNode ) {
      this.rewardNode.step( elapsedTime );
    }
  }
}

graphingLines.register( 'ResultsNode', ResultsNode );

export default ResultsNode;