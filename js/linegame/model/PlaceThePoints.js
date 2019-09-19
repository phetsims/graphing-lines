// Copyright 2013-2019, University of Colorado Boulder

/**
 * Model for 'Place the Points' challenges.
 * This is a specialization of 'Graph the Line' challenge.
 * In this challenge, the user is given an equation and must place 3 points on a graph to make the line.
 * If the 3 points do not form a line, the guess line will be null.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'GRAPHING_LINES/common/model/Line' );
  const LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  const ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  const NotALine = require( 'GRAPHING_LINES/linegame/model/NotALine' );
  const PlaceThePointsNode = require( 'GRAPHING_LINES/linegame/view/PlaceThePointsNode' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  /**
   * @param {string} description brief description of the challenge, visible in dev versions
   * @param {Line} answer  the correct answer
   * @param {EquationForm} equationForm specifies the form of the equation
   * @param {Range} xRange range of the graph's x axis
   * @param {Range} yRange range of the graph's y axis
   * @constructor
   */
  function PlaceThePoints( description, answer, equationForm, xRange, yRange ) {

    GraphTheLine.call( this, description, answer, equationForm, ManipulationMode.THREE_POINTS, xRange, yRange );

    // @public initial points do not form a line
    this.p1Property = new Vector2Property( new Vector2( -3, 2 ) );
    this.p2Property = new Vector2Property( new Vector2( 0, 0 ) );
    this.p3Property = new Vector2Property( new Vector2( 3, 2 ) );

    // update the guess when the points change
    // unmultilink unnecessary because PlaceThePoints owns these Properties.
    const self = this;
    Property.multilink( [ this.p1Property, this.p2Property, this.p3Property ],
      function( p1, p2, p3 ) {
        const line = new Line( p1.x, p1.y, p2.x, p2.y, LineGameConstants.GUESS_COLOR );
        if ( line.onLinePoint( p3 ) ) {
          // all 3 points are on a line
          self.guessProperty.set( line );
        }
        else {
          // the 3 points don't form a line
          self.guessProperty.set( new NotALine() );
        }
      } );
  }

  graphingLines.register( 'PlaceThePoints', PlaceThePoints );

  return inherit( GraphTheLine, PlaceThePoints, {

    // @public
    reset: function() {
       GraphTheLine.prototype.reset.call( this );
      this.p1Property.reset();
      this.p2Property.reset();
      this.p3Property.reset();
    },

    /**
     * Creates the view for this challenge.
     * @param {LineGameModel} model the game model
     * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
     * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
     * @returns {PlaceThePointsNode}
     * @override
     * @public
     */
    createView: function( model, challengeSize, audioPlayer ) {
      return new PlaceThePointsNode( this, model, challengeSize, audioPlayer );
    }
  } );
} );