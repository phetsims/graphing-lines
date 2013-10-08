// Copyright 2002-2013, University of Colorado Boulder

/**
 * Base type for game challenges.
 * In all challenges, the user is trying to match a given line.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var PointTool = require( 'GRAPHING_LINES/common/model/PointTool' );
  var Property = require( 'AXON/Property' );

  // strings
  var putPointsOnLineString = require( 'string!GRAPHING_LINES/putPointsOnLine' );
  var setThePointString = require( 'string!GRAPHING_LINES/setThePoint' );
  var setTheSlopeString = require( 'string!GRAPHING_LINES/setTheSlope' );
  var setTheYInterceptString = require( 'string!GRAPHING_LINES/setTheYIntercept' );

  /**
   * @param {String} title title that is visible to the user
   * @param {String} description brief description of the challenge, visible in dev versions
   * @param {Line} answer the correct answer
   * @param {EquationForm} equationForm specifies the form of the equation
   * @param {ManipulationMode} manipulationMode indicates which properties of a line the user is able to change
   * @param {Range} xRange range of the graph's x axis
   * @param {Range} yRange range of the graph's y axis
   * @param {Vector2} originOffset offset of the origin (center of the graph) in view coordinates //TODO change to model coordinates?
   * @param {Vector2} pointToolLocation1 location of point tool in model coordinates
   * @param {Vector2} pointToolLocation2 location of point tool in model coordinates
   * @constructor
   */
  function Challenge( title, description, answer, equationForm, manipulationMode, xRange, yRange, originOffset, pointToolLocation1, pointToolLocation2 ) {

    assert && assert( !answer.undefinedSlope() ); // our answer should be defined

    this.title = title;
    this.description = description;
    this.answer = answer.withColor( LineGameConstants.ANSWER_COLOR );
    this.guess = new Property( createInitialGuess( answer, manipulationMode ) ); //TODO rename guessProperty
    this.answerVisible = false;
    this.equationForm = equationForm;
    this.manipulationMode = manipulationMode;

    // model-view transform, created in the model because each challenge subclass may have its own transform
    var mvtScale = LineGameConstants.GRAPH_WIDTH / xRange.getLength(); // view units / model units
    this.mvt = ModelViewTransform2.createOffsetXYScaleMapping( originOffset, mvtScale, -mvtScale ); // graph on right, y inverted

    // Graph
    this.graph = new Graph( xRange, yRange );

    // Point tools
    var dragBounds1 = null; //TODO compute dragBounds1
    var dragBounds2 = null; //TODO compute dragBounds2
    this.pointTool1 = new PointTool( pointToolLocation1, 'up', this.graph.lines, dragBounds1 );
    this.pointTool2 = new PointTool( pointToolLocation2, 'down', this.graph.lines, dragBounds2 );

    // When the guess changes, update the lines that are "seen" by the point tools.
    this.guess.link( this.updateGraphLines.bind( this ) );
  }

  Challenge.prototype = {

    /**
     * Creates the view component for the challenge.
     *
     * @abstract
     * @param {LineGameModel} model the game model
     * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
     * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
     */
    createView: function( model, challengeSize, audioPlayer ) {
       throw new Error( 'must be implemented by subtype' );
    },

    /**
     * Updates the collection of lines that are "seen" by the point tools.
     * @abstract
     */
    updateGraphLines: function() {
      throw new Error( 'must be implemented by subtype' );
    },

    // Resets the challenge
    reset: function() {
      this.guess.reset();
      this.pointTool1.reset();
      this.pointTool2.reset();
      this.setAnswerVisible( false );
    },

    // Visibility of the answer affects what is "seen" by the point tools.
    setAnswerVisible: function( visible ) {
      this.answerVisible = visible;
      this.updateGraphLines();
    },

    // True if the guess and answer are descriptions of the same line.
    isCorrect: function() {
      return this.answer.same( this.guess.get() );
    },

    toString: function() {
      return this.constructor.name + "[" +
             " title=" + this.title +
             " answer=" + this.answer.toString() +
             " equationForm=" + this.equationForm +
             " manipulationMode=" + this.manipulationMode +
             " ]";
    }
  };

  /*
   * Creates an initial guess, based on the answer and what the user can manipulate.
   * @param {Line} answer
   * @param {ManipulationMode} manipulationMode
   */
  var createInitialGuess = function( answer, manipulationMode ) {
    if ( manipulationMode === ManipulationMode.SLOPE ) {
      // slope is variable, so use the answer's point
      return Line.createPointSlope( answer.x1, answer.y1, 1, 1, LineGameConstants.GUESS_COLOR );
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
  };

  // Creates a standard title for the challenge, based on what the user can manipulate.
  Challenge.createTitle = function( defaultTitle, manipulationMode ) {
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
  };

  return Challenge;
} );