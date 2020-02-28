// Copyright 2013-2020, University of Colorado Boulder

/**
 * View for 'Place the Points' challenges.
 * This is a specialization of the 'Graph the Line' view.
 * User manipulates 3 arbitrary points, equations are displayed on the left.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import graphingLines from '../../graphingLines.js';
import PlayState from '../model/PlayState.js';
import GraphTheLineNode from './GraphTheLineNode.js';
import GraphThreePointsNode from './GraphThreePointsNode.js';

/**
 * @param {GraphTheLine} challenge
 * @param {LineGameModel} model
 * @param {Dimension2} challengeSize
 * @param {GameAudioPlayer} audioPlayer
 * @constructor
 */
function PlaceThePointsNode( challenge, model, challengeSize, audioPlayer ) {

  GraphTheLineNode.call( this, challenge, model, challengeSize, audioPlayer );

  const self = this;

  const playStateObserver = function( playState ) {

    // show user's line only in states where there guess is wrong.
    self.graphNode.setGuessLineVisible(
      !challenge.isCorrect() && ( playState === PlayState.TRY_AGAIN || playState === PlayState.NEXT ) );

    /*
     * Plot (x1,y1) for answer when user got the challenge wrong.
     * Do not plot (x1,y1) for guess because none of the 3 points corresponds to (x1,y1).
     */
    self.graphNode.setAnswerPointVisible( playState === PlayState.NEXT && !challenge.isCorrect() );
    self.graphNode.setGuessPointVisible( false );
  };
  model.playStateProperty.link( playStateObserver ); // unlink in dispose

  // @private called by dispose
  this.disposePlaceThePointsNode = function() {
    model.playStateProperty.unlink( playStateObserver );
  };
}

graphingLines.register( 'PlaceThePointsNode', PlaceThePointsNode );

export default inherit( GraphTheLineNode, PlaceThePointsNode, {

  /**
   * @public
   * @override
   */
  dispose: function() {
    this.disposePlaceThePointsNode();
    GraphTheLineNode.prototype.dispose.call( this );
  },

  /**
   * Creates the graph portion of the view.
   * @param {Challenge} challenge
   * @returns {ChallengeGraphNode}
   * @override
   * @public
   */
  createGraphNode: function( challenge ) {
    return new GraphThreePointsNode( challenge );
  }
} );