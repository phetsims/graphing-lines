// Copyright 2002-2013, University of Colorado Boulder

/**
 * Base type view for all challenges.
 * Provides the view components that are common to all challenges.
 * <p/>
 * Subtypes are responsible for:
 * <li>
 * <ul>providing the nodes for graph and equations</ul>
 * <ul>positioning faceNode</ul>
 * </li>
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PlayState = require( 'GRAPHING_LINES/linegame/model/PlayState' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );
  var PointToolNode = require( 'GRAPHING_LINES/common/view/PointToolNode' );
  var Property = require( 'AXON/Property' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TextButton = require( 'SUN/TextButton' );

  // strings
  var checkString = require( 'string!GRAPHING_LINES/check' );
  var pointsAwardedString = require( 'string!GRAPHING_LINES/pointsAwarded' );
  var nextString = require( 'string!GRAPHING_LINES/next' );
  var showAnswerString = require( 'string!GRAPHING_LINES/showAnswer' );
  var tryAgainString = require( 'string!GRAPHING_LINES/tryAgain' );

  /**
   * Constructor
   * @param {Challenge} challenge the challenge
   * @param {LineGameModel} model the game model
   * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
   * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
   */
  function ChallengeNode( challenge, model, challengeSize, audioPlayer ) {

    var thisNode = this;
    Node.call( thisNode );

    //TODO rename this subtypeParent
    thisNode.subclassParent = new Node(); // subtypes should add children to this node, to preserve rendering order

    // description (dev)
    var descriptionNode = new Text( this.constructor.name + ": " + challenge.description, { font: new PhetFont( 16 ), fill: 'black' } );

    // smiley/frowning face
    thisNode.faceNode = new FaceNode( LineGameConstants.FACE_DIAMETER, {
      headFill: LineGameConstants.FACE_COLOR,
      eyeFill: 'black',
      mouthFill: 'black',
      headStroke: LineGameConstants.FACE_COLOR.darkerColor(),
      headLineWidth: 1
    } );

    // points awarded
    thisNode.pointsAwardedNode = new Text( "", { font: LineGameConstants.POINTS_AWARDED_FONT, fill: LineGameConstants.POINTS_AWARDED_COLOR } );

      // buttons
    var doNothing = function(){}; //TODO delete this when sun#21 is addressed
    var buttonOptions = { font: LineGameConstants.BUTTON_FONT, rectangleFillUp: LineGameConstants.BUTTON_COLOR };
    thisNode.checkButton = new TextButton( checkString, doNothing, buttonOptions );
    var tryAgainButton = new TextButton( tryAgainString, doNothing, buttonOptions );
    var showAnswerButton = new TextButton( showAnswerString, doNothing, buttonOptions );
    var nextButton = new TextButton( nextString, doNothing, buttonOptions );

    // developer buttons, no i18n
    var devButtonOptions = { font: new PhetFont( 12 ), rectangleFillUp: Color.WHITE };
    var skipButton = new TextButton( "dev: Skip", doNothing, devButtonOptions );
    var replayButton = new TextButton( "dev: Replay", doNothing, devButtonOptions );

    // point tools
    var linesVisibleProperty = new Property( true );
    var pointToolNode1 = new PointToolNode( challenge.pointTool1, challenge.mvt, challenge.graph, linesVisibleProperty, { scale: LineGameConstants.POINT_TOOL_SCALE } );
    var pointToolNode2 = new PointToolNode( challenge.pointTool2, challenge.mvt, challenge.graph, linesVisibleProperty, { scale: LineGameConstants.POINT_TOOL_SCALE } );

    // Point tools moveToFront when dragged, so we give them a common parent to preserve rendering order of the reset of the scenegraph.
    var pointToolParent = new Node();
    pointToolParent.addChild( pointToolNode1 );
    pointToolParent.addChild( pointToolNode2 );

    // rendering order
    {
      thisNode.addChild( thisNode.subclassParent );
      if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
        thisNode.addChild( descriptionNode );
      }
      thisNode.addChild( thisNode.checkButton );
      thisNode.addChild( tryAgainButton );
      thisNode.addChild( showAnswerButton );
      thisNode.addChild( nextButton );
      if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
        thisNode.addChild( skipButton ); // This button lets you skip the current challenge.
        thisNode.addChild( replayButton ); // This button lets you repeat the current challenge.
      }
      thisNode.addChild( pointToolParent );
      thisNode.addChild( thisNode.faceNode );
      thisNode.addChild( thisNode.pointsAwardedNode );
    }

    // layout
    {
      descriptionNode.left = 10;
      descriptionNode.top = 10;

      // buttons at bottom center
      var buttonCenterX = challengeSize.width / 2;
      var buttonBottom = challengeSize.height - 30;
      thisNode.checkButton.centerX = buttonCenterX;
      thisNode.checkButton.bottom = buttonBottom;
      tryAgainButton.centerX = buttonCenterX;
      tryAgainButton.bottom = buttonBottom;
      showAnswerButton.centerX = buttonCenterX;
      showAnswerButton.bottom = buttonBottom;
      nextButton.centerX = buttonCenterX;
      nextButton.bottom = buttonBottom;

      // dev buttons below main buttons
      skipButton.centerX = buttonCenterX;
      skipButton.top = buttonBottom + 2;
      replayButton.centerX = buttonCenterX;
      replayButton.top = buttonBottom + 2;
    }

    // "Check" button
    thisNode.checkButton.addListener( function() {
      if ( challenge.isCorrect() ) {
        thisNode.faceNode.smile();
        audioPlayer.correctAnswer();
        var points = model.computePoints( model.playStateProperty.get() === PlayState.FIRST_CHECK ? 1 : 2 /* number of attempts */ );
        model.scoreProperty.set( model.scoreProperty.get() + points );
        thisNode.pointsAwardedNode.text = StringUtils.format( pointsAwardedString, points );
        // points to right of face
        thisNode.pointsAwardedNode.left = thisNode.faceNode.right + 10;
        thisNode.pointsAwardedNode.centerY = thisNode.faceNode.centerY;
        model.playStateProperty.set( PlayState.NEXT );
      }
      else {
        thisNode.faceNode.frown();
        audioPlayer.wrongAnswer();
        thisNode.pointsAwardedNode.text = "";
        if ( model.playStateProperty.get() === PlayState.FIRST_CHECK ) {
          model.playStateProperty.set( PlayState.TRY_AGAIN );
        }
        else {
          model.playStateProperty.set( PlayState.SHOW_ANSWER );
        }
      }
    } );

    // "Try Again" button
    tryAgainButton.addListener( function() {
      model.playStateProperty.set( PlayState.SECOND_CHECK );
    } );

    // "Show Answer" button
    showAnswerButton.addListener( function() {
      model.playStateProperty.set( PlayState.NEXT );
    } );

    // "Next" button
    nextButton.addListener( function() {
      model.playStateProperty.set( PlayState.FIRST_CHECK );
    } );

    // "Skip" button
    skipButton.addListener( function() {
      model.skipCurrentChallenge();
    } );

    // "Repeat" button
    replayButton.addListener( function() {
      model.replayCurrentChallenge();
    } );

    // play-state changes
    model.playStateProperty.link( function( state ) {

      // visibility of face
      thisNode.faceNode.visible = ( state === PlayState.TRY_AGAIN ||
                                    state === PlayState.SHOW_ANSWER ||
                                    ( state === PlayState.NEXT && challenge.isCorrect() ) );

      // visibility of points
      thisNode.pointsAwardedNode.visible = ( thisNode.faceNode.visible && challenge.isCorrect() );

      // visibility of buttons
      thisNode.checkButton.visible = ( state === PlayState.FIRST_CHECK || state === PlayState.SECOND_CHECK );
      tryAgainButton.visible = ( state === PlayState.TRY_AGAIN );
      showAnswerButton.visible = ( state === PlayState.SHOW_ANSWER );
      nextButton.visible = ( state === PlayState.NEXT );

      // visibility of dev buttons
      skipButton.visible = !nextButton.visible;
      replayButton.visible = nextButton.visible;
    } );
  }

  /**
   * Creates a static (non-interactive) equation.
   * @param {EquationForm} equationForm
   * @param {Line} line
   * @param {Font} font
   * @param {Color} color
   */
  ChallengeNode.createEquationNode = function( equationForm, line, fontSize, color ) {
    if ( equationForm === EquationForm.SLOPE_INTERCEPT ) {
      return SlopeInterceptEquationNode.createStaticEquation( line, fontSize, color );
    }
    else if ( equationForm === EquationForm.POINT_SLOPE ) {
      return new PointSlopeEquationNode.createStaticEquation( line, fontSize, color );
    }
    else {
      throw new Error( "unsupported equation form: " + equationForm );
    }
  };

  return inherit( Node, ChallengeNode );
} );