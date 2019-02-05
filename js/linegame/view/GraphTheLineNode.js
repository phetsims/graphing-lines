// Copyright 2013-2017, University of Colorado Boulder

/**
 * View for 'Graph the Line' challenges.
 * User manipulates a graphed line on the right, equations are displayed on the left.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ChallengeNode = require( 'GRAPHING_LINES/linegame/view/ChallengeNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var EquationBoxNode = require( 'GRAPHING_LINES/linegame/view/EquationBoxNode' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GraphPointSlopeNode = require( 'GRAPHING_LINES/linegame/view/GraphPointSlopeNode' );
  var GraphSlopeInterceptNode = require( 'GRAPHING_LINES/linegame/view/GraphSlopeInterceptNode' );
  var GraphTwoPointsNode = require( 'GRAPHING_LINES/linegame/view/GraphTwoPointsNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlayState = require( 'GRAPHING_LINES/linegame/model/PlayState' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var lineToGraphString = require( 'string!GRAPHING_LINES/lineToGraph' );
  var notALineString = require( 'string!GRAPHING_LINES/notALine' );
  var yourLineString = require( 'string!GRAPHING_LINES/yourLine' );

  /**
   * @param {GraphTheLine} challenge
   * @param {LineGameModel} model
   * @param {Dimension2} challengeSize
   * @param {GameAudioPlayer} audioPlayer
   * @constructor
   */
  function GraphTheLineNode( challenge, model, challengeSize, audioPlayer ) {

    var self = this;

    ChallengeNode.call( this, challenge, model, challengeSize, audioPlayer );

    var boxSize = new Dimension2( 0.4 * challengeSize.width, 0.22 * challengeSize.height );

    // title, possibly scaled for i18n
    var titleNode = new Text( challenge.title, {
      font: LineGameConstants.TITLE_FONT,
      fill: LineGameConstants.TITLE_COLOR,
      maxWidth: boxSize.width
    } );

    // Answer
    var answerBoxNode = new EquationBoxNode( lineToGraphString, challenge.answer.color, boxSize,
      ChallengeNode.createEquationNode( new Property( challenge.answer ), challenge.equationForm, {
        fontSize: LineGameConstants.STATIC_EQUATION_FONT_SIZE,
        slopeUndefinedVisible: false
      } ) );

    var guessLineProperty = new Property( Line.Y_EQUALS_X_LINE ); // start with any non-null line
    var guessEquationNode = ChallengeNode.createEquationNode( guessLineProperty, challenge.equationForm, {
      fontSize: LineGameConstants.STATIC_EQUATION_FONT_SIZE
    } );

    // @private 'Not A Line', for situations where 3-points do not define a line
    this.notALineNode = new Text( notALineString, { font: new GLFont( { size: 24, weight: 'bold' } ), fill: 'black' } );

    // See https://github.com/phetsims/graphing-lines/issues/117
    // Either the equation or 'not a line' is displayed. So clear guessEquationNode's default maxWidth,
    // which is appropriate for an equation on the graph, but not for an equation in EquationBoxNode.
    var equationNode = new Node( { children: [ guessEquationNode, this.notALineNode ] } );
    guessEquationNode.maxWidth = null;

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
      var ySpacing = 30;
      titleNode.top = challenge.modelViewTransform.modelToViewY( challenge.graph.yRange.max );
      answerBoxNode.top = titleNode.bottom + ySpacing;
      this.guessBoxNode.top = answerBoxNode.bottom + ySpacing;

      // face centered below boxes, bottom-aligned with buttons
      this.faceNode.centerX = answerBoxNode.centerX;
      this.faceNode.bottom = this.buttonsParent.bottom;
    }

    // Update visibility of the correct/incorrect icons.
    var updateIcons = function() {
      var playState = model.playStateProperty.get();
      answerBoxNode.setCorrectIconVisible( playState === PlayState.NEXT );
      self.guessBoxNode.setCorrectIconVisible( playState === PlayState.NEXT && challenge.isCorrect() );
      self.guessBoxNode.setIncorrectIconVisible( playState === PlayState.NEXT && !challenge.isCorrect() );
    };

    // sync with guess
    var guessObserver = function( line ) {

      var isaLine = ( line instanceof Line );

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
    var playStateObserver = function( playState ) {

      // states in which the graph is interactive
      self.graphNode.pickable = (
        playState === PlayState.FIRST_CHECK ||
        playState === PlayState.SECOND_CHECK ||
        playState === PlayState.TRY_AGAIN ||
        ( playState === PlayState.NEXT && !challenge.isCorrect() )
      );

      // Graph the answer line at the end of the challenge.
      self.graphNode.setAnswerVisible( playState === PlayState.NEXT );

      self.guessBoxNode.visible = ( playState === PlayState.NEXT );

      if ( playState === PlayState.NEXT ) {
        self.graphNode.setAnswerPointVisible( true );

        // show stuff when the user got the challenge wrong
        if ( !challenge.isCorrect() ) {
          self.graphNode.setGuessPointVisible( true );
          self.graphNode.setSlopeToolVisible( true );
        }
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

  return inherit( ChallengeNode, GraphTheLineNode, {

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
} );