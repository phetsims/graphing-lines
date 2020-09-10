// Copyright 2013-2020, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the 'play' game phase. (See GamePhase.PLAY)
 * Displays the scoreboard and current challenge.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import FiniteStatusBar from '../../../../vegas/js/FiniteStatusBar.js';
import ScoreDisplayLabeledNumber from '../../../../vegas/js/ScoreDisplayLabeledNumber.js';
import graphingLines from '../../graphingLines.js';
import GamePhase from '../model/GamePhase.js';
import ChallengeNode from './ChallengeNode.js';

class PlayNode extends Node {
  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {Property.<Bounds2>} visibleBoundsProperty
   * @param {GameAudioPlayer} audioPlayer
   */
  constructor( model, layoutBounds, visibleBoundsProperty, audioPlayer ) {

    super();

    const statusBar = new FiniteStatusBar( layoutBounds, visibleBoundsProperty, model.scoreProperty, {
      scoreDisplayConstructor: ScoreDisplayLabeledNumber,

      // FiniteStatusBar uses 1-based level numbering, model is 0-based, see #88.
      levelProperty: new DerivedProperty( [ model.levelProperty ], level => level + 1 ),
      challengeIndexProperty: model.challengeIndexProperty,
      numberOfChallengesProperty: model.challengesPerGameProperty,
      elapsedTimeProperty: model.timer.elapsedTimeProperty,
      timerEnabledProperty: model.timerEnabledProperty,
      font: new PhetFont( 20 ),
      textFill: 'white',
      barFill: 'rgb( 49, 117, 202 )',
      xMargin: 40,
      startOverButtonOptions: {
        baseColor: 'rgb( 229, 243, 255 )',
        textFill: 'black',
        xMargin: 10,
        yMargin: 5,
        listener: () => {
          model.setGamePhase( GamePhase.SETTINGS );
        }
      }
    } );
    this.addChild( statusBar );

    // compute the size of the area available for the challenges
    const challengeSize = new Dimension2( layoutBounds.width, layoutBounds.height - statusBar.bottom );

    // challenge parent, to keep challenge below scoreboard
    const challengeParent = new Rectangle( 0, 0, 0, 1 );
    challengeParent.top = statusBar.bottom;
    this.addChild( challengeParent );

    // Set up a new challenge
    // unlink unnecessary because PlayNode exists for the lifetime of the sim.
    model.challengeProperty.link( challenge => {

      // dispose of view for previous challenge
      const challengeNodes = challengeParent.getChildren();
      for ( let i = 0; i < challengeNodes.length; i++ ) {
        const challengeNode = challengeNodes[ i ];
        assert && assert( challengeNode instanceof ChallengeNode );
        challengeParent.removeChild( challengeNode );
        challengeNode.dispose();
      }

      // add view for current challenge
      challengeParent.addChild( challenge.createView( model, challengeSize, audioPlayer ) );
    } );
  }
}

graphingLines.register( 'PlayNode', PlayNode );

export default PlayNode;