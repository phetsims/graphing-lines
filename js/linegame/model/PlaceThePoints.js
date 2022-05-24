// Copyright 2013-2022, University of Colorado Boulder

/**
 * Model for 'Place the Points' challenges.
 * This is a specialization of 'Graph the Line' challenge.
 * In this challenge, the user is given an equation and must place 3 points on a graph to make the line.
 * If the 3 points do not form a line, the guess line will be null.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import Line from '../../common/model/Line.js';
import graphingLines from '../../graphingLines.js';
import LineGameConstants from '../LineGameConstants.js';
import PlaceThePointsNode from '../view/PlaceThePointsNode.js';
import GraphTheLine from './GraphTheLine.js';
import ManipulationMode from './ManipulationMode.js';
import NotALine from './NotALine.js';

class PlaceThePoints extends GraphTheLine {

  /**
   * @param {string} description brief description of the challenge, visible in dev versions
   * @param {Line} answer  the correct answer
   * @param {EquationForm} equationForm specifies the form of the equation
   * @param {Range} xRange range of the graph's x axis
   * @param {Range} yRange range of the graph's y axis
   */
  constructor( description, answer, equationForm, xRange, yRange ) {

    super( description, answer, equationForm, ManipulationMode.THREE_POINTS, xRange, yRange );

    // @public initial points do not form a line
    this.p1Property = new Vector2Property( new Vector2( -3, 2 ) );
    this.p2Property = new Vector2Property( new Vector2( 0, 0 ) );
    this.p3Property = new Vector2Property( new Vector2( 3, 2 ) );

    // update the guess when the points change
    // unmultilink unnecessary because PlaceThePoints owns these Properties.
    Multilink.multilink(
      [ this.p1Property, this.p2Property, this.p3Property ],
      ( p1, p2, p3 ) => {
        const line = new Line( p1.x, p1.y, p2.x, p2.y, LineGameConstants.GUESS_COLOR );
        if ( line.onLinePoint( p3 ) ) {
          // all 3 points are on a line
          this.guessProperty.set( line );
        }
        else {
          // the 3 points don't form a line
          this.guessProperty.set( new NotALine() );
        }
      } );
  }

  // @public @override
  reset() {
    super.reset();
    this.p1Property.reset();
    this.p2Property.reset();
    this.p3Property.reset();
  }

  /**
   * Creates the view for this challenge.
   * @param {LineGameModel} model the game model
   * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
   * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
   * @returns {PlaceThePointsNode}
   * @override
   * @public
   */
  createView( model, challengeSize, audioPlayer ) {
    return new PlaceThePointsNode( this, model, challengeSize, audioPlayer );
  }
}

graphingLines.register( 'PlaceThePoints', PlaceThePoints );

export default PlaceThePoints;