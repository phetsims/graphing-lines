// Copyright 2002-2013, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the "play" game phase. (See GamePhase.PLAY)
 * Displays the scoreboard and current challenge.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var Scoreboard = require( 'GRAPHING_LINES/linegame/view/Scoreboard' );

  /**
   * @param {LineGameModel} model
   * @param {Dimension2} playAreaSize //TODO change to ScreenView.layoutBounds?
   * @param {GameAudioPlayer} audioPlayer
   * @constructor
   */
  function PlayNode( model, playAreaSize, audioPlayer ) {

    var thisNode = this;
    Node.call( thisNode );

    var scoreboardNode = new Scoreboard(
      model.challengeIndexProperty,
      model.challengesPerGameProperty,
      model.levelProperty,
      model.scoreProperty,
      model.timer.elapsedTimeProperty,
      model.timerEnabledProperty,
      function() {
        model.gamePhaseProperty.set( GamePhase.SETTINGS );
      } );
    scoreboardNode.centerX = playAreaSize.width / 2;
    scoreboardNode.bottom = playAreaSize.height - 10;
    thisNode.addChild( scoreboardNode );

    // compute the size of the area available for the challenges
    var challengeSize = new Dimension2( playAreaSize.width, scoreboardNode.top );

    // challenge parent, to maintain rendering order
    var challengeParent = new Node();
    thisNode.addChild( challengeParent );

    // Set up a new challenge
    model.challengeProperty.link( function( challenge ) {
      challengeParent.removeAllChildren();
      challengeParent.addChild( challenge.createView( model, challengeSize, audioPlayer ) );
    } );
  }

  return inherit( Node, PlayNode );
} );