// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for "Place the Points" challenges.
 * This is a specialization of "Graph the Line" challenge.
 * In this challenge, the user is given an equation and must place 3 points on a graph to make the line.
 * If the 3 points do not form a line, the guess line will be null.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var LineGameConstants =  require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var PlaceThePointsNode = require( 'GRAPHING_LINES/linegame/view/PlaceThePointsNode' );
  var Property = require( 'AXON/Property' );
  var strings = require( 'GRAPHING_LINES/graphing-lines-strings' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {String} description brief description of the challenge, visible in dev versions
   * @param {Line} answer  the correct answer
   * @param {EquationForm} equationForm specifies the form of the equation
   * @param {Range} xRange range of the graph's x axis
   * @param {Range} yRange range of the graph's y axis
   * @constructor
   */
  function PlaceThePoints( description, answer, equationForm, xRange, yRange ) {

    var thisChallenge = this;
    GraphTheLine.call( thisChallenge, description, answer, equationForm, ManipulationMode.THREE_POINTS, xRange, yRange );

    // initial points do not form a line
    thisChallenge.p1 = new Property( new Vector2( -3, 2 ) );
    thisChallenge.p2 = new Property( new Vector2( 0, 0 ) );
    thisChallenge.p3 = new Property( new Vector2( 3, 2 ) );

    // update the guess when the points change
    var updateGuess = function() {
      var line = new Line( thisChallenge.p1.get().x, thisChallenge.p1.get().y, thisChallenge.p2.get().x, thisChallenge.p2.get().y, LineGameConstants.GUESS_COLOR );
      if ( line.onLine( thisChallenge.p3.get() ) ) {
        // all 3 points are on a line
        thisChallenge.guess.set( line );
        if ( thisChallenge.isCorrect() ) {
          // when correct, we want the guess to match the answer exactly
          thisChallenge.guess.set( thisChallenge.answer );
        }
      }
      else {
        // the 3 points don't form a line
        thisChallenge.guess.set( null );
      }
    };
    thisChallenge.p1.link( updateGuess.bind( thisChallenge ) );
    thisChallenge.p2.link( updateGuess.bind( thisChallenge ) );
    thisChallenge.p3.link( updateGuess.bind( thisChallenge ) );
  }

  return inherit( GraphTheLine, PlaceThePoints, {

    /** @override */
    reset: function() {
      GraphTheLine.prototype.reset.call( this );
      this.p1.reset();
      this.p2.reset();
      this.p3.reset();
    },

    /**
     * Creates the view for this challenge.
     * @override
     * @param {LineGameModel} model the game model
     * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
     * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
     */
    createView: function( model, challengeSize, audioPlayer ) {
      return new PlaceThePointsNode( this, model, challengeSize, audioPlayer );
    }
  } );
} );