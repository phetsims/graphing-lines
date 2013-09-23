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
  var GameScoreboardNode = require( 'GRAPHING_LINES/linegame/view/GameScoreboardNode' );

  /**
   * @param {LineGameModel} model
   * @param {Dimension2} playAreaSize //TODO change to ScreenView.layoutBounds?
   * @param {GameAudioPlayer} audioPlayer
   * @constructor
   */
  function PlayNode( model, playAreaSize, audioPlayer ) {

    var thisNode = this;
    Node.call( thisNode );

    var scoreboardNode = new GameScoreboardNode(); //TODO flesh this out, add constructor parameters
    scoreboardNode.centerX = playAreaSize.width / 2;
    scoreboardNode.bottom = playAreaSize.height - 10;
    thisNode.addChild( scoreboardNode );

    // compute the size of the area available for the challenges
    var challengeSize = new Dimension2( playAreaSize.width, scoreboardNode.top );

    // challenge parent, to maintain rendering order
    var challengeParent = new Node();
    thisNode.addChild( challengeParent );

    // When "New Game" button is pressed, change game phase
    scoreboardNode.addListener( {
      newGame: function() {
        model.gamePhaseProperty.set( GamePhase.SETTINGS );
      }} );

    // level on the scoreboard
    model.settings.levelProperty.link( function( level ) {
      scoreboardNode.setLevel( level );
    } );

    // points on the scoreboard
    model.results.scoreProperty.link( function( score ) {
      scoreboardNode.setScore( score );
    } );

    // timer visibility on the scoreboard
    model.settings.timerEnabledProperty.link( function( enabled ) {
      scoreboardNode.setTimerVisible( enabled );
    } );

    // timer
    model.timer.timeProperty.link( function( time ) {
      scoreboardNode.setTime( time, model.results.bestTimes[ model.settings.levelProperty.get() ] );
    } );

    // Set up a new challenge
    model.challengeProperty.link( function( challenge ) {
      challengeParent.removeAllChildren();
      challengeParent.addChild( challenge.createView( model, challengeSize, audioPlayer ) );
    } );
  }

  return inherit( Node, PlayNode );
} );