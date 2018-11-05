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
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var FiniteStatusBar = require( 'VEGAS/FiniteStatusBar' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScoreDisplayLabeledNumber = require( 'VEGAS/ScoreDisplayLabeledNumber' );

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {Property.<Bounds2>} visibleBoundsProperty
   * @param {GameAudioPlayer} audioPlayer
   * @constructor
   */
  function PlayNode( model, layoutBounds, visibleBoundsProperty, audioPlayer ) {

    Node.call( this );

    var statusBar = new FiniteStatusBar( layoutBounds, visibleBoundsProperty, model.scoreProperty, {
      scoreDisplayConstructor: ScoreDisplayLabeledNumber,

      // FiniteStatusBar uses 1-based level numbering, model is 0-based, see #88.
      levelProperty: new DerivedProperty( [ model.levelProperty ], function( level ) { return level + 1; } ),
      challengeIndexProperty: model.challengeIndexProperty,
      numberOfChallengesProperty: model.challengesPerGameProperty,
      elapsedTimeProperty: model.timer.elapsedTimeProperty,
      timerEnabledProperty: model.timerEnabledProperty,
      font: new GLFont( 20 ),
      textFill: 'white',
      barFill: 'rgb( 49, 117, 202 )',
      xMargin: 40,
      startOverButtonOptions: {
        baseColor: 'rgb( 229, 243, 255 )',
        textFill: 'black',
        xMargin: 10,
        yMargin: 5,
        listener: function() {
          model.gamePhaseProperty.set( GamePhase.SETTINGS );
        }
      }
    } );
    this.addChild( statusBar );

    // compute the size of the area available for the challenges
    var challengeSize = new Dimension2( layoutBounds.width, layoutBounds.height - statusBar.bottom );

    // challenge parent, to keep challenge below scoreboard
    var challengeParent = new Rectangle( 0, 0, 0, 1 );
    challengeParent.top = statusBar.bottom;
    this.addChild( challengeParent );

    // Set up a new challenge
    // unlink unnecessary because PlayNode exists for the lifetime of the sim.
    model.challengeProperty.link( function( challenge ) {

      // dispose of view for previous challenge
      var challengeNodes = challengeParent.getChildren();
      for ( var i = 0; i < challengeNodes.length; i++ ) {
        var challengeNode = challengeNodes[ i ];
        assert && assert( challengeNode instanceof ChallengeNode );
        challengeParent.removeChild( challengeNode );
        challengeNode.dispose();
      }

      // add view for current challenge
      challengeParent.addChild( challenge.createView( model, challengeSize, audioPlayer ) );
    } );
  }

  graphingLines.register( 'PlayNode', PlayNode );

  return inherit( Node, PlayNode );
} );