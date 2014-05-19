// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for "Graph the Line" challenges.
 * User manipulates a graphed line on the right, equations are displayed on the left.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ChallengeNode = require( 'GRAPHING_LINES/linegame/view/ChallengeNode' );
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var EquationBoxNode = require( 'GRAPHING_LINES/linegame/view/EquationBoxNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PlayState = require( 'GRAPHING_LINES/linegame/model/PlayState' );
  var PointSlopeGraphNode = require( 'GRAPHING_LINES/linegame/view/PointSlopeGraphNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SlopeInterceptGraphNode = require( 'GRAPHING_LINES/linegame/view/SlopeInterceptGraphNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TwoPointsGraphNode = require( 'GRAPHING_LINES/linegame/view/TwoPointsGraphNode' );

  // strings
  var lineToGraphString = require( 'string!GRAPHING_LINES/lineToGraph' );
  var notALineString = require( 'string!GRAPHING_LINES/notALine' );
  var yourLineString = require( 'string!GRAPHING_LINES/yourLine' );

  // constants
  var NOT_A_LINE = new Text( notALineString, { font: new PhetFont( { size: 24, weight: 'bold' } ), fill: 'black' } );

  /**
   * @param {GraphTheLine} challenge
   * @param {LineGameModel} model
   * @param {Dimension2} challengeSize
   * @param {GameAudioPlayer} audioPlayer
   * @constructor
   */
  function GraphTheLineNode( challenge, model, challengeSize, audioPlayer ) {

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
    var answerBoxNode = new EquationBoxNode( lineToGraphString, challenge.answer.color, boxSize,
      ChallengeNode.createEquationNode( challenge.equationForm, challenge.answer, LineGameConstants.STATIC_EQUATION_FONT_SIZE, challenge.answer.color ) );

    // Guess
    thisNode.guessBoxNode = new EquationBoxNode( yourLineString, Color.BLACK, boxSize, new Rectangle( 0, 0, 1, 1 ) ); // placeholder for equation, must have well-defined bounds

    // Graph
    thisNode.graphNode = this.createGraphNode( challenge );
    thisNode.graphNode.setGuessPointVisible( challenge.manipulationMode === ManipulationMode.SLOPE ); // plot the point if we're only manipulating slope

    // rendering order
    thisNode.subtypeParent.addChild( titleNode );
    thisNode.subtypeParent.addChild( thisNode.graphNode );
    thisNode.subtypeParent.addChild( answerBoxNode );
    thisNode.subtypeParent.addChild( thisNode.guessBoxNode );

    // layout
    {
      // graphNode is positioned automatically based on mvt's origin offset.

      // equation in left half of challenge space
      answerBoxNode.right = ( challengeSize.width / 2 ) - 50;
      answerBoxNode.bottom = challenge.mvt.modelToViewY( 0 ) - 10;

      // face centered below equation boxes
      thisNode.faceNode.centerX = answerBoxNode.centerX;
      thisNode.faceNode.bottom = thisNode.checkButton.bottom;

      // title above answer equation, left justified
      titleNode.left = answerBoxNode.left;
      titleNode.bottom = answerBoxNode.top - 20;
    }

    // Update visibility of the correct/incorrect icons.
    var updateIcons = function() {
      answerBoxNode.setCorrectIconVisible( model.playState === PlayState.NEXT );
      thisNode.guessBoxNode.setCorrectIconVisible( model.playState === PlayState.NEXT && challenge.isCorrect() );
      thisNode.guessBoxNode.setIncorrectIconVisible( model.playState === PlayState.NEXT && !challenge.isCorrect() );
    };

    // sync with guess
    challenge.guessProperty.link( function( line ) {

      // update the equation (line is null if ManipulationMode.THREE_POINTS and points don't make a line)
      thisNode.subtypeParent.removeChild( thisNode.guessBoxNode );
      var equationNode = ( !line ) ? NOT_A_LINE : ChallengeNode.createEquationNode( challenge.equationForm, line, LineGameConstants.STATIC_EQUATION_FONT_SIZE, line.color );
      var color = ( !line ) ? LineGameConstants.GUESS_COLOR : line.color;
      thisNode.guessBoxNode = new EquationBoxNode( yourLineString, color, boxSize, equationNode );

      // adjust position of guess equation so that it's below the answer
      thisNode.guessBoxNode.left = answerBoxNode.left;
      thisNode.guessBoxNode.top = challenge.mvt.modelToViewY( 0 ) + 10;
      thisNode.subtypeParent.addChild( thisNode.guessBoxNode );
      thisNode.guessBoxNode.visible = ( model.playState === PlayState.NEXT );

      // visibility of correct/incorrect icons
      updateIcons();
    } );

    // sync with game state
    model.playStateProperty.link( function( playState ) {

      // states in which the graph is interactive
      thisNode.graphNode.pickable = ( playState === PlayState.FIRST_CHECK || playState === PlayState.SECOND_CHECK || ( playState === PlayState.NEXT && !challenge.isCorrect() ) );

      // Graph the answer line at the end of the challenge.
      thisNode.graphNode.setAnswerVisible( playState === PlayState.NEXT );

      // show stuff when the user got the challenge wrong
      if ( playState === PlayState.NEXT && !challenge.isCorrect() ) {
        thisNode.guessBoxNode.visible = true;
        thisNode.graphNode.setAnswerPointVisible( true );
        thisNode.graphNode.setGuessPointVisible( true );
        thisNode.graphNode.setSlopeToolVisible( true );
      }

      // visibility of correct/incorrect icons
      updateIcons();
    } );
  }

  return inherit( ChallengeNode, GraphTheLineNode, {

    /**
     * Creates the graph portion of the view.
     * @param {Challenge} challenge
     * @returns {ChallengeGraphNode}
     */
    createGraphNode: function( challenge ) {
      if ( challenge.manipulationMode === ManipulationMode.POINT || challenge.manipulationMode === ManipulationMode.SLOPE || challenge.manipulationMode === ManipulationMode.POINT_SLOPE ) {
        return new PointSlopeGraphNode( challenge );
      }
      else if ( challenge.manipulationMode === ManipulationMode.INTERCEPT || challenge.manipulationMode === ManipulationMode.SLOPE_INTERCEPT ) {
        assert && assert( challenge.answer.getYIntercept().isInteger() );
        return new SlopeInterceptGraphNode( challenge );
      }
      else if ( challenge.manipulationMode === ManipulationMode.TWO_POINTS ) {
        return new TwoPointsGraphNode( challenge );
      }
      else {
        throw new Error( "unsupported manipulationMode: " + challenge.manipulationMode );
      }
    }
  } );
} );