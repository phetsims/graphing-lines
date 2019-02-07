// Copyright 2013-2017, University of Colorado Boulder

/**
 * View for 'Place the Points' challenges.
 * This is a specialization of the 'Graph the Line' view.
 * User manipulates 3 arbitrary points, equations are displayed on the left.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GraphTheLineNode = require( 'GRAPHING_LINES/linegame/view/GraphTheLineNode' );
  var GraphThreePointsNode = require( 'GRAPHING_LINES/linegame/view/GraphThreePointsNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PlayState = require( 'GRAPHING_LINES/linegame/model/PlayState' );

  /**
   * @param {GraphTheLine} challenge
   * @param {LineGameModel} model
   * @param {Dimension2} challengeSize
   * @param {GameAudioPlayer} audioPlayer
   * @constructor
   */
  function PlaceThePointsNode( challenge, model, challengeSize, audioPlayer ) {

    GraphTheLineNode.call( this, challenge, model, challengeSize, audioPlayer );

    var self = this;

    var playStateObserver = function( playState ) {

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

  return inherit( GraphTheLineNode, PlaceThePointsNode, {

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
} );