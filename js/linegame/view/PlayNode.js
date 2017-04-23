// Copyright 2013-2017, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the 'play' game phase. (See GamePhase.PLAY)
 * Displays the scoreboard and current challenge.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ChallengeNode = require( 'GRAPHING_LINES/linegame/view/ChallengeNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var ScoreboardBar = require( 'VEGAS/ScoreboardBar' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {GameAudioPlayer} audioPlayer
   * @constructor
   */
  function PlayNode( model, layoutBounds, audioPlayer ) {

    Node.call( this );

    var scoreboardNode = new ScoreboardBar(
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
      {
        font: new GLFont( 20 ),
        leftMargin: 40, // visually aligned with left edge of challenge boxes
        rightMargin: 50 // visually aligned with right edge of challenge graph
      } );
    scoreboardNode.centerX = layoutBounds.centerX;
    scoreboardNode.top = 0;
    this.addChild( scoreboardNode );

    // compute the size of the area available for the challenges
    var challengeSize = new Dimension2( layoutBounds.width, layoutBounds.height - scoreboardNode.bottom );

    // challenge parent, to keep challenge below scoreboard
    var challengeParent = new Rectangle( 0, 0, 0, 1 );
    challengeParent.top = scoreboardNode.bottom;
    this.addChild( challengeParent );

    // Set up a new challenge
    model.challengeProperty.link( function( challenge ) {

      // dispose of view for previous challenge
      var challengeNodes = challengeParent.getChildren();
      for ( var i = 0; i < challengeNodes.length; i++ ) {
        var challengeNode = challengeNodes[ i ];
        assert && assert( challengeNode instanceof ChallengeNode );
        challengeNode.dispose();
        challengeParent.removeChild( challengeNode );
      }

      // add view for current challenge
      challengeParent.addChild( challenge.createView( model, challengeSize, audioPlayer ) );
    } );
  }

  graphingLines.register( 'PlayNode', PlayNode );

  return inherit( Node, PlayNode );
} );