// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for "Make the Equation" challenges.
 * User manipulates an equation on the right, graph is displayed on the left.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AnswerGraphNode = require( 'GRAPHING_LINES/linegame/view/AnswerGraphNode' );
  var ChallengeNode = require( 'GRAPHING_LINES/linegame/view/ChallengeNode' );
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var EquationBoxNode = require( 'GRAPHING_LINES/linegame/view/EquationBoxNode' );
  var EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlayState = require( 'GRAPHING_LINES/linegame/model/PlayState' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );
  var Property = require( 'AXON/Property' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );
  var strings = require( 'GRAPHING_LINES/graphing-lines-strings' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {GraphTheLine} challenge
   * @param {LineGameModel} model
   * @param {Dimension2} challengeSize
   * @param {GameAudioPlayer} audioPlayer
   * @constructor
   */
  function MakeTheEquationNode( challenge, model, challengeSize, audioPlayer ) {

    var thisNode = this;
    ChallengeNode.call( thisNode, challenge, model, challengeSize, audioPlayer );

    // title, possibly scaled for i18n
    var titleNode = new Text( challenge.title, { font: LineGameConstants.TITLE_FONT, fill: LineGameConstants.TITLE_COLOR } );
    var maxTitleWidth = 0.45 * challengeSize.width;
    if ( titleNode.width > maxTitleWidth ) {
      titleNode.scale = maxTitleWidth / titleNode.width;
    }

    var boxSize = new Dimension2( 0.4 * challengeSize.width, 0.3 * challengeSize.height );

    // Answer
    var answerBoxNode =
      new EquationBoxNode( strings.aCorrectEquation, challenge.answer.color, boxSize,
        ChallengeNode.createEquationNode( challenge.equationForm, challenge.answer, LineGameConstants.STATIC_EQUATION_FONT_SIZE, challenge.answer.color ) );
    answerBoxNode.visible = false;

    // Guess
    var guessBoxNode =
      new EquationBoxNode( strings.yourEquation, challenge.guess.get().color, boxSize,
        createInteractiveEquationNode( challenge.equationForm, challenge.manipulationMode, challenge.guess, challenge.graph,
          LineGameConstants.INTERACTIVE_EQUATION_FONT_SIZE, LineGameConstants.STATIC_EQUATION_FONT_SIZE, challenge.guess.get().color ) );

    // Graph
    var graphNode = new AnswerGraphNode( challenge );

    // rendering order
    thisNode.subclassParent.addChild( titleNode );
    thisNode.subclassParent.addChild( graphNode );
    thisNode.subclassParent.addChild( answerBoxNode );
    thisNode.subclassParent.addChild( guessBoxNode );

    // layout
    {
      // graphNode is positioned automatically based on mvt's origin offset.

      // guess equation in left half of challenge space
      guessBoxNode.right = ( 0.5 * challengeSize.width ) - 50;
      guessBoxNode.bottom = challenge.mvt.modelToViewY( 0 ) - 10;

      // answer below guess
      answerBoxNode.left = guessBoxNode.left;
      answerBoxNode.top = challenge.mvt.modelToViewY( 0 ) + 10;

      // face centered below equation boxes
      thisNode.faceNode.centerX = answerBoxNode.centerX;
      thisNode.faceNode.bottom = thisNode.checkButton.bottom;

      // title above guess equation, left justified
      titleNode.left = guessBoxNode.left;
      titleNode.bottom = guessBoxNode.top = 20;
    }

    // To reduce brain damage during development, show the answer equation in translucent gray.
    if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
      var devAnswerNode = ChallengeNode.createEquationNode( challenge.equationForm, challenge.answer, LineGameConstants.STATIC_EQUATION_FONT_SIZE, new Color( 0, 0, 0, 25 ) );
      devAnswerNode.left = answerBoxNode.left + 30;
      devAnswerNode.centerY = answerBoxNode.centerY;
      thisNode.addChild( devAnswerNode );
      devAnswerNode.moveToBack();
    }

    // Update visibility of the correct/incorrect icons.
    var updateIcons = function() {
      answerBoxNode.setCorrectIconVisible( model.playStateProperty.get() === PlayState.NEXT );
      guessBoxNode.setCorrectIconVisible( model.playStateProperty.get() === PlayState.NEXT && challenge.isCorrect() );
      guessBoxNode.setIncorrectIconVisible( model.playStateProperty.get() === PlayState.NEXT && !challenge.isCorrect() );
    };

    // sync with guess
    challenge.guess.link( updateIcons.bind( thisNode ) );

    // sync with game state
    model.playStateProperty.link( function( playState ) {

      // states in which the equation is interactive
      guessBoxNode.pickable = ( playState === PlayState.FIRST_CHECK || playState === PlayState.SECOND_CHECK || ( playState === PlayState.NEXT && !challenge.isCorrect() ) );

      // Graph the guess line at the end of the challenge.
      graphNode.setGuessVisible( playState === PlayState.NEXT );

      // show stuff when the user got the challenge wrong
      if ( playState === PlayState.NEXT && !challenge.isCorrect() ) {
        answerBoxNode.setVisible( true );
        graphNode.setAnswerPointVisible( true );
        graphNode.setGuessPointVisible( true );
        graphNode.setSlopeToolVisible( true );
      }

      // visibility of correct/incorrect icons
      updateIcons();
    } );
  }

  /**
   * Creates an interactive equation.
   * @param {EquationForm} equationForm
   * @param {ManipulationMode} manipulationMode
   * @param {Property<Line>} line
   * @param {Graph} graph
   * @param {Font} interactiveFont
   * @param {Font} staticFont
   * @param {Color} staticColor
   */
   var createInteractiveEquationNode = function( equationForm, manipulationMode, line, graph, interactiveFontSize, staticFontSize, staticColor ) {
    var interactivePoint, interactiveSlope, interactiveIntercept;
    if ( equationForm === EquationForm.SLOPE_INTERCEPT ) {
      interactiveSlope = ( manipulationMode === ManipulationMode.SLOPE ) || ( manipulationMode === ManipulationMode.SLOPE_INTERCEPT );
      interactiveIntercept = ( manipulationMode === ManipulationMode.INTERCEPT ) || ( manipulationMode === ManipulationMode.SLOPE_INTERCEPT );
      return new SlopeInterceptEquationNode( line, new Property( graph.yRange ), new Property( graph.xRange ), new Property( graph.yRange ), {
        interactiveSlope: interactiveSlope,
        interactiveIntercept: interactiveIntercept,
        interactiveFontSize: interactiveFontSize,
        staticFontSize: staticFontSize,
        staticColor: staticColor } );
    }
    else if ( equationForm === EquationForm.POINT_SLOPE ) {
      interactivePoint = ( manipulationMode === ManipulationMode.POINT ) || ( manipulationMode === ManipulationMode.POINT_SLOPE );
      interactiveSlope = ( manipulationMode === ManipulationMode.SLOPE ) || ( manipulationMode === ManipulationMode.POINT_SLOPE );
      return new PointSlopeEquationNode( line, new Property( graph.xRange ), new Property( graph.yRange ), new Property( graph.yRange ), new Property( graph.xRange ), {
        interactiveX1: interactivePoint,
        interactiveY1: interactivePoint,
        interactiveSlope: interactiveSlope,
        interactiveFontSize: interactiveFontSize,
        staticFontSize: staticFontSize,
        staticColor: staticColor } );
    }
    else {
      throw new Error( "unsupported equation form: " + equationForm );
    }
  };

  return inherit( ChallengeNode, MakeTheEquationNode );
} );