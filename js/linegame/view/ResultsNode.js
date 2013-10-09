// Copyright 2002-2013, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the "results" game phase. (See GamePhase.RESULTS)
 * Displays a panel with the game results.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GameOverNode = require( 'GRAPHING_LINES/linegame/view/GameOverNode' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RewardNode = require( 'GRAPHING_LINES/linegame/view/RewardNode' );

  /**
   * @param {LineGameModel} model
   * @param {Dimension2} playAreaSize //TODO change to ScreenView.layoutBounds?
   * @constructor
   */
  function ResultsNode( model, playAreaSize ) {

    var thisNode = this;
    Node.call( thisNode );

    thisNode.rewardNode = new RewardNode();

    // show results when we enter this phase
    model.gamePhaseProperty.link( function( gamePhase ) {
      if ( gamePhase === GamePhase.RESULTS ) {

        // game reward, shown for perfect score
        if ( model.isPerfectScore() ) {
          thisNode.rewardNode.setLevel( model.levelProperty.get() );
          thisNode.addChild( thisNode.rewardNode );
          thisNode.setRewardRunning( true );
        }

        // game results
        var gameOverNode = new GameOverNode(
          model.levelProperty.get(),
          model.scoreProperty.get(),
          model.getPerfectScore(),
          0, /* scoreDecimalPlaces */
          model.timer.timeProperty.get(),
          model.bestTimes[ model.levelProperty.get() ],
          model.isNewBestTime,
          model.timerEnabledProperty.get(),
          function() {
            model.gamePhaseProperty.set( GamePhase.SETTINGS );
          }, {
            newGameButtonColor: LineGameConstants.BUTTON_COLOR
          } );
        thisNode.addChild( gameOverNode );
        gameOverNode.centerX = playAreaSize.width / 2;
        gameOverNode.centerY = playAreaSize.height / 2;
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
        this.rewardNode.setBounds( bounds );
    },

    isRewardRunning: function() {
        return this.rewardNode.isRunning();
    },

    setRewardRunning: function( running ) {
        this.rewardNode.setRunning( running );
    }
  } );
} );