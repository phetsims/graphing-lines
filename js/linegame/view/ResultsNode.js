// Copyright 2002-2014, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the "results" game phase. (See GamePhase.RESULTS)
 * Displays a panel with the game results.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelCompletedNode = require( 'VEGAS/LevelCompletedNode' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RewardNode = require( 'GRAPHING_LINES/linegame/view/RewardNode' );

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @constructor
   */
  function ResultsNode( model, layoutBounds ) {

    var thisNode = this;
    Node.call( thisNode );

    thisNode.rewardNode = new RewardNode();

    // show results when we enter this phase
    model.gamePhaseProperty.link( function( gamePhase ) {
      if ( gamePhase === GamePhase.RESULTS ) {

        // game reward, shown for perfect score
        if ( model.isPerfectScore() ) {
          thisNode.rewardNode.setLevel( model.level );
          thisNode.addChild( thisNode.rewardNode );
          thisNode.setRewardRunning( true );
        }

        // game results
        thisNode.addChild( new LevelCompletedNode(
          model.level,
          model.score,
          model.getPerfectScore(),
            model.getPerfectScore() / model.maxPointsPerChallenge, // number of stars in the progress indicator
          model.timerEnabled,
          model.timer.elapsedTime,
          model.bestTimeProperties[ model.level ].get(),
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
        thisNode.removeAllChildren();
        thisNode.setRewardRunning( false );
      }
    } );
  }

  return inherit( Node, ResultsNode, {

    // Sets the bounds of the reward node, called when the canvas is resized so that the reward fills the browser window.
    setRewardBounds: function( bounds ) {
      this.rewardNode.set( bounds );
    },

    isRewardRunning: function() {
      return this.rewardNode.isRunning();
    },

    setRewardRunning: function( running ) {
      this.rewardNode.setRunning( running );
    }
  } );
} );