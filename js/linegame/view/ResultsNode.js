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
  var GameOverPanel = require( 'GRAPHING_LINES/linegame/view/GameOverPanel' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var inherit = require( 'PHET_CORE/inherit' );
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
          thisNode.rewardNode.setLevel( model.levelProperty.get() );
          thisNode.addChild( thisNode.rewardNode );
          thisNode.setRewardRunning( true );
        }

        // game results
        thisNode.addChild( new GameOverPanel(
          model.levelProperty.get(),
          model.scoreProperty.get(),
          model.getPerfectScore(),
          0, /* scoreDecimalPlaces */
          model.timer.elapsedTime,
          model.bestTimes[ model.levelProperty.get() ],
          model.isNewBestTime,
          model.timerEnabledProperty.get(),
          function() {
            model.gamePhaseProperty.set( GamePhase.SETTINGS );
          }, {
            newGameButtonColor: LineGameConstants.BUTTON_COLOR,
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