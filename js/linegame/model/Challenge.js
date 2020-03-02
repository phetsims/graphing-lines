// Copyright 2013-2020, University of Colorado Boulder

/**
 * Base class for game challenges.
 * In all challenges, the user is trying to match a given line.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Graph from '../../common/model/Graph.js';
import Line from '../../common/model/Line.js';
import PointTool from '../../common/model/PointTool.js';
import graphingLinesStrings from '../../graphing-lines-strings.js';
import graphingLines from '../../graphingLines.js';
import LineGameConstants from '../LineGameConstants.js';
import ManipulationMode from './ManipulationMode.js';

const putPointsOnLineString = graphingLinesStrings.putPointsOnLine;
const setThePointString = graphingLinesStrings.setThePoint;
const setTheSlopeString = graphingLinesStrings.setTheSlope;
const setTheYInterceptString = graphingLinesStrings.setTheYIntercept;

class Challenge {

  /**
   * @param {string} title title that is visible to the user
   * @param {string} description brief description of the challenge, visible in dev versions
   * @param {Line} answer the correct answer
   * @param {EquationForm} equationForm specifies the form of the equation
   * @param {ManipulationMode} manipulationMode indicates which properties of a line the user is able to change
   * @param {Range} xRange range of the graph's x axis
   * @param {Range} yRange range of the graph's y axis
   */
  constructor( title, description, answer, equationForm, manipulationMode, xRange, yRange ) {

    // @public {Line} the user's current guess
    this.guessProperty = new Property( createInitialGuess( answer, manipulationMode, xRange, yRange ) );

    // @public (read-only)
    this.title = title;
    this.description = description;
    this.answer = answer.withColor( LineGameConstants.ANSWER_COLOR );
    this.answerVisible = false;
    this.equationForm = equationForm;
    this.manipulationMode = manipulationMode;

    // @public model-view transform, created in the model because each challenge subclass may have its own transform
    const modelViewTransformScale = LineGameConstants.GRAPH_WIDTH / xRange.getLength(); // view units / model units
    this.modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( LineGameConstants.ORIGIN_OFFSET, modelViewTransformScale, -modelViewTransformScale ); // graph on right, y inverted

    // @public Graph
    this.graph = new Graph( xRange, yRange );

    // @public Point tools
    this.pointTool1 = new PointTool( new Vector2( 1.5, -10.5 ), 'up', this.graph.lines, new Bounds2( -15, -11, 11, 13 ) );
    this.pointTool2 = new PointTool( new Vector2( 7, -13 ), 'down', this.graph.lines, new Bounds2( -15, -14, 11, 11 ) );

    // {Line|NotALine} When the guess changes, update the lines that are 'seen' by the point tools.
    // unlink unnecessary because Challenge owns this Property.
    this.guessProperty.link( this.updateGraphLines.bind( this ) );
  }

  /**
   * Creates the view component for the challenge.
   *
   * @abstract
   * @param {LineGameModel} model the game model
   * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
   * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
   * @returns {ChallengeNode}
   * @public
   */
  createView( model, challengeSize, audioPlayer ) {
    throw new Error( 'must be implemented by subtype' );
  }

  /**
   * Updates the collection of lines that are 'seen' by the point tools.
   * @abstract
   * @public
   */
  updateGraphLines() {
    throw new Error( 'must be implemented by subtype' );
  }

  // @public Resets the challenge
  reset() {
    this.guessProperty.reset();
    this.pointTool1.reset();
    this.pointTool2.reset();
    this.setAnswerVisible( false );
  }

  // @public Visibility of the answer affects what is 'seen' by the point tools.
  setAnswerVisible( visible ) {
    this.answerVisible = visible;
    this.updateGraphLines();
  }

  // @public True if the guess and answer are descriptions of the same line.
  isCorrect() {
    return this.answer.same( this.guessProperty.get() );
  }

  // @public
  toString() {
    return this.constructor.name + '[' +
           ' title=' + this.title +
           ' answer=' + this.answer.toString() +
           ' equationForm=' + this.equationForm +
           ' manipulationMode=' + this.manipulationMode +
           ' ]';
  }

  /*
   * Creates a standard title for the challenge, based on what the user can manipulate.
   * @static
   * @protected
   */
  static createTitle( defaultTitle, manipulationMode ) {
    if ( manipulationMode === ManipulationMode.SLOPE ) {
      return setTheSlopeString;
    }
    else if ( manipulationMode === ManipulationMode.INTERCEPT ) {
      return setTheYInterceptString;
    }
    else if ( manipulationMode === ManipulationMode.POINT ) {
      return setThePointString;
    }
    else if ( manipulationMode === ManipulationMode.THREE_POINTS ) {
      return putPointsOnLineString;
    }
    else {
      return defaultTitle;
    }
  }
}

/*
 * Creates an initial guess, based on the answer and what the user can manipulate.
 * @param {Line} answer
 * @param {ManipulationMode} manipulationMode
 * @param {Range} xRange
 * @param {Range} yRange
 * @returns {Line}
 */
function createInitialGuess( answer, manipulationMode, xRange, yRange ) {
  if ( manipulationMode === ManipulationMode.SLOPE ) {
    // slope is variable, so use the answer's point
    return Line.createPointSlope( answer.x1, answer.y1, ( answer.y1 === yRange.max ? -1 : 1 ),
      ( answer.x1 === xRange.max ? -1 : 1 ), LineGameConstants.GUESS_COLOR );
  }
  else if ( manipulationMode === ManipulationMode.INTERCEPT ) {
    // intercept is variable, so use the answer's slope
    return Line.createSlopeIntercept( answer.rise, answer.run, 0, LineGameConstants.GUESS_COLOR );
  }
  else if ( manipulationMode === ManipulationMode.POINT ) {
    // point is variable, so use the answer's slope
    return Line.createPointSlope( 0, 0, answer.rise, answer.run, LineGameConstants.GUESS_COLOR );
  }
  else if ( manipulationMode === ManipulationMode.THREE_POINTS ) {
    return null; // 3 points don't initially form a line
  }
  else {
    // in all other cases, use the standard line y=x
    return Line.Y_EQUALS_X_LINE.withColor( LineGameConstants.GUESS_COLOR );
  }
}

graphingLines.register( 'Challenge', Challenge );

export default Challenge;