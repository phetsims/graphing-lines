// Copyright 2002-2014, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the "play" game phase. (See GamePhase.PLAY)
 * Displays the scoreboard and current challenge.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var GLScoreboard = require( 'GRAPHING_LINES/linegame/view/GLScoreboard' );

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {GameAudioPlayer} audioPlayer
   * @constructor
   */
  function PlayNode( model, layoutBounds, audioPlayer ) {

    var thisNode = this;
    Node.call( thisNode );

    var scoreboardNode = new GLScoreboard(
      layoutBounds.width,
      model.challengeIndexProperty,
      model.challengesPerGameProperty,
      model.levelProperty,
      model.scoreProperty,
      model.timer.elapsedTimeProperty,
      model.timerEnabledProperty,
      function() {
        model.gamePhaseProperty.set( GamePhase.SETTINGS );
      },
      { font: new GLFont( 20 ) } );
    scoreboardNode.centerX = layoutBounds.centerX;
    scoreboardNode.top = 0;
    thisNode.addChild( scoreboardNode );

    // compute the size of the area available for the challenges
    var challengeSize = new Dimension2( layoutBounds.width, layoutBounds.height - scoreboardNode.bottom );

    // challenge
    var challengeNode = null;

    // Set up a new challenge
    model.challengeProperty.link( function( challenge ) {
      if ( challengeNode ) {
        thisNode.removeChild( challengeNode );
      }
      challengeNode = challenge.createView( model, challengeSize, audioPlayer );
      thisNode.addChild( challengeNode );
      challengeNode.top = scoreboardNode.bottom;
    } );
  }

  return inherit( Node, PlayNode );
} );