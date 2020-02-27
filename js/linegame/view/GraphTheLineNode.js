// Copyright 2013-2019, University of Colorado Boulder

/**
 * View for 'Graph the Line' challenges.
 * User manipulates a graphed line on the right, equations are displayed on the left.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import GLFont from '../../common/GLFont.js';
import Line from '../../common/model/Line.js';
import graphingLinesStrings from '../../graphing-lines-strings.js';
import graphingLines from '../../graphingLines.js';
import LineGameConstants from '../LineGameConstants.js';
import ManipulationMode from '../model/ManipulationMode.js';
import PlayState from '../model/PlayState.js';
import ChallengeNode from './ChallengeNode.js';
import EquationBoxNode from './EquationBoxNode.js';
import GraphPointSlopeNode from './GraphPointSlopeNode.js';
import GraphSlopeInterceptNode from './GraphSlopeInterceptNode.js';
import GraphTwoPointsNode from './GraphTwoPointsNode.js';

const lineToGraphString = graphingLinesStrings.lineToGraph;
const notALineString = graphingLinesStrings.notALine;
const yourLineString = graphingLinesStrings.yourLine;

/**
 * @param {GraphTheLine} challenge
 * @param {LineGameModel} model
 * @param {Dimension2} challengeSize
 * @param {GameAudioPlayer} audioPlayer
 * @constructor
 */
function GraphTheLineNode( challenge, model, challengeSize, audioPlayer ) {

  const self = this;

  ChallengeNode.call( this, challenge, model, challengeSize, audioPlayer );

  const boxSize = new Dimension2( 0.4 * challengeSize.width, 0.22 * challengeSize.height );

  // title, possibly scaled for i18n
  const titleNode = new Text( challenge.title, {
    font: LineGameConstants.TITLE_FONT,
    fill: LineGameConstants.TITLE_COLOR,
    maxWidth: boxSize.width
  } );

  // Answer
  const answerBoxNode = new EquationBoxNode( lineToGraphString, challenge.answer.color, boxSize,
    ChallengeNode.createEquationNode( new Property( challenge.answer ), challenge.equationForm, {
      fontSize: LineGameConstants.STATIC_EQUATION_FONT_SIZE,
      slopeUndefinedVisible: false
    } ) );

  const guessLineProperty = new Property( Line.Y_EQUALS_X_LINE ); // start with any non-null line
  const guessEquationNode = ChallengeNode.createEquationNode( guessLineProperty, challenge.equationForm, {
    fontSize: LineGameConstants.STATIC_EQUATION_FONT_SIZE,

    // guessEquationNode's default maxWidth is optimized for an equation on the graph, but is not appropriate for
    // an equation in EquationBoxNode, since EquationBoxNode controls the maxWidth of what's put in it.
    // See https://github.com/phetsims/graphing-lines/issues/117
    maxWidth: null
  } );

  // @private 'Not A Line', for situations where 3-points do not define a line
  this.notALineNode = new Text( notALineString, { font: new GLFont( { size: 24, weight: 'bold' } ), fill: 'black' } );

  // Either the equation or 'not a line' is displayed.
  const equationNode = new Node( { children: [ guessEquationNode, this.notALineNode ] } );

  // Guess
  this.guessBoxNode = new EquationBoxNode( yourLineString, LineGameConstants.GUESS_COLOR, boxSize, equationNode );

  // @private Graph
  this.graphNode = this.createGraphNode( challenge );
  this.graphNode.setGuessPointVisible( challenge.manipulationMode === ManipulationMode.SLOPE ); // plot the point if we're only manipulating slope

  // rendering order
  this.subtypeParent.addChild( titleNode );
  this.subtypeParent.addChild( this.graphNode );
  this.subtypeParent.addChild( answerBoxNode );
  this.subtypeParent.addChild( this.guessBoxNode );

  // layout
  {
    // graphNode is positioned automatically based on modelViewTransform's origin offset.

    // left align the title and boxes
    answerBoxNode.centerX = challenge.modelViewTransform.modelToViewX( challenge.graph.xRange.min ) / 2; // centered in space to left of graph
    this.guessBoxNode.left = answerBoxNode.left;
    titleNode.left = answerBoxNode.left;

    // stack title and boxes vertically, title top-aligned with graph's grid
    const ySpacing = 30;
    titleNode.top = challenge.modelViewTransform.modelToViewY( challenge.graph.yRange.max );
    answerBoxNode.top = titleNode.bottom + ySpacing;
    this.guessBoxNode.top = answerBoxNode.bottom + ySpacing;

    // face centered below boxes, bottom-aligned with buttons
    this.faceNode.centerX = answerBoxNode.centerX;
    this.faceNode.bottom = this.buttonsParent.bottom;
  }

  // Update visibility of the correct/incorrect icons.
  const updateIcons = function() {
    const playState = model.playStateProperty.get();
    answerBoxNode.setCorrectIconVisible( playState === PlayState.NEXT );
    self.guessBoxNode.setCorrectIconVisible( playState === PlayState.NEXT && challenge.isCorrect() );
    self.guessBoxNode.setIncorrectIconVisible( playState === PlayState.NEXT && !challenge.isCorrect() );
  };

  // sync with guess
  const guessObserver = function( line ) {

    const isaLine = ( line instanceof Line );

    // line is NotAline if ManipulationMode.THREE_POINTS and points don't make a line
    if ( isaLine ) {
      guessLineProperty.set( line ); // updates guessEquationNode
    }
    guessEquationNode.visible = isaLine;
    self.notALineNode.visible = !isaLine;

    // visibility of correct/incorrect icons
    updateIcons();
  };
  challenge.guessProperty.link( guessObserver ); // unlink in dispose

  // sync with game state
  const playStateObserver = function( playState ) {

    // states in which the graph is interactive
    self.graphNode.pickable = (
      playState === PlayState.FIRST_CHECK ||
      playState === PlayState.SECOND_CHECK ||
      playState === PlayState.TRY_AGAIN ||
      ( playState === PlayState.NEXT && !challenge.isCorrect() )
    );

    // Graph the answer line at the end of the challenge.
    self.graphNode.setAnswerLineVisible( playState === PlayState.NEXT );
    self.graphNode.setAnswerPointVisible( playState === PlayState.NEXT );

    self.guessBoxNode.visible = ( playState === PlayState.NEXT );

    // show stuff when the user got the challenge wrong
    if ( playState === PlayState.NEXT && !challenge.isCorrect() ) {
      self.graphNode.setGuessPointVisible( true );
      self.graphNode.setSlopeToolVisible( true );
    }

    // visibility of correct/incorrect icons
    updateIcons();
  };
  model.playStateProperty.link( playStateObserver ); // unlink in dispose

  // @private called by dispose
  this.disposeGraphTheLineNode = function() {
    challenge.guessProperty.unlink( guessObserver );
    model.playStateProperty.unlink( playStateObserver );
    guessEquationNode.dispose();
    self.graphNode.dispose();
  };
}

graphingLines.register( 'GraphTheLineNode', GraphTheLineNode );

export default inherit( ChallengeNode, GraphTheLineNode, {

  /**
   * @public
   * @override
   */
  dispose: function() {
    this.disposeGraphTheLineNode();
    ChallengeNode.prototype.dispose.call( this );
  },

  /**
   * Creates the graph portion of the view.
   * @param {Challenge} challenge
   * @returns {ChallengeGraphNode}
   * @public
   */
  createGraphNode: function( challenge ) {
    if ( challenge.manipulationMode === ManipulationMode.POINT || challenge.manipulationMode === ManipulationMode.SLOPE || challenge.manipulationMode === ManipulationMode.POINT_SLOPE ) {
      return new GraphPointSlopeNode( challenge );
    }
    else if ( challenge.manipulationMode === ManipulationMode.INTERCEPT || challenge.manipulationMode === ManipulationMode.SLOPE_INTERCEPT ) {
      assert && assert( challenge.answer.getYIntercept().isInteger() );
      return new GraphSlopeInterceptNode( challenge );
    }
    else if ( challenge.manipulationMode === ManipulationMode.TWO_POINTS ) {
      return new GraphTwoPointsNode( challenge );
    }
    else {
      throw new Error( 'unsupported manipulationMode: ' + challenge.manipulationMode );
    }
  }
} );