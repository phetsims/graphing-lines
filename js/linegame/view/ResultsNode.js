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
          thisNode.rewardNode.setLevel( model.settings.levelProperty.get() );
          thisNode.addChild( thisNode.rewardNode );
          thisNode.setRewardRunning( true );
        }

        // game results
        var gameOverNode = new GameOverNode( model.settings.levelProperty.get(),
          model.results.scoreProperty.get(),
          model.getPerfectScore(),
          0,
          model.timer.timeProperty.get(),
          model.results.bestTimes[ model.settings.levelProperty.get() ],
          model.results.isNewBestTime,
          model.settings.timerEnabledProperty.get(),
          LineGameConstants.BUTTON_COLOR,
          { scale: 1.5 } );
        thisNode.addChild( gameOverNode );
        gameOverNode.centerX = playAreaSize.width / 2;
        gameOverNode.centerY = playAreaSize.height / 2;

        // change phase when "New Game" button is pressed
        gameOverNode.addListener( {
          newGame: function() {
            model.gamePhaseProperty.set( GamePhase.SETTINGS );
          }
        } );
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