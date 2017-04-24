// Copyright 2013-2015, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the 'results' game phase. (See GamePhase.RESULTS)
 * Displays a panel with the game results.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GLQueryParameters = require( 'GRAPHING_LINES/common/GLQueryParameters' );
  var GLRewardNode = require( 'GRAPHING_LINES/linegame/view/GLRewardNode' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelCompletedNode = require( 'VEGAS/LevelCompletedNode' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {GameAudioPlayer} audioPlayer
   * @param {function[]} rewardFactoryFunctions - functions that create nodes for the game reward, ordered by level
   * @constructor
   */
  function ResultsNode( model, layoutBounds, audioPlayer, rewardFactoryFunctions ) {

    var self = this;

    Node.call( this );

    this.rewardNode = null; // @private

    // show results when we enter this phase
    // unlink unnecessary because ResultsNode exists for the lifetime of the sim.
    model.gamePhaseProperty.link( function( gamePhase ) {
      if ( gamePhase === GamePhase.RESULTS ) {

        // game reward, shown for perfect score (or with 'reward' query parameter)
        if ( model.isPerfectScore() || GLQueryParameters.showReward ) {

          audioPlayer.gameOverPerfectScore();

          var level = model.levelProperty.get();
          var rewardNodes = rewardFactoryFunctions[ level ]();
          self.rewardNode = new GLRewardNode( rewardNodes );
          self.addChild( self.rewardNode );
        }
        else {
          audioPlayer.gameOverImperfectScore();
        }

        // game results
        self.addChild( new LevelCompletedNode(
          model.levelProperty.get(),
          model.scoreProperty.get(),
          model.getPerfectScore(),
          model.getPerfectScore() / model.maxPointsPerChallenge, // number of stars in the progress indicator
          model.timerEnabledProperty.get(),
          model.timer.elapsedTimeProperty.value,
          model.bestTimeProperties[ model.levelProperty.get() ].get(),
          model.isNewBestTime,
          function() {
            model.gamePhaseProperty.set( GamePhase.SETTINGS );
          }, {
            starDiameter: 45,
            buttonFill: LineGameConstants.BUTTON_COLOR,
            centerX: layoutBounds.centerX,
            centerY: layoutBounds.centerY
          } ) );
      }
      else {
        self.removeAllChildren();
        if ( self.rewardNode !== null ) {
          self.rewardNode.dispose();
        }
        self.rewardNode = null;
      }
    } );
  }

  graphingLines.register( 'ResultsNode', ResultsNode );

  return inherit( Node, ResultsNode, {

    // @public
    step: function( elapsedTime ) {
      if ( this.rewardNode ) {
        this.rewardNode.step( elapsedTime );
      }
    }
  } );
} );