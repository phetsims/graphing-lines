// Copyright 2013-2021, University of Colorado Boulder

/**
 * Base type view for all challenges.
 * Provides the view components that are common to all challenges.
 *
 * Subtypes are responsible for:
 * - providing the nodes for graph and equations
 * - positioning faceNode
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import FaceWithPointsNode from '../../../../scenery-phet/js/FaceWithPointsNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import vegasStrings from '../../../../vegas/js/vegasStrings.js';
import PointToolNode from '../../common/view/PointToolNode.js';
import graphingLines from '../../graphingLines.js';
import PointSlopeEquationNode from '../../pointslope/view/PointSlopeEquationNode.js';
import SlopeInterceptEquationNode from '../../slopeintercept/view/SlopeInterceptEquationNode.js';
import LineGameConstants from '../LineGameConstants.js';
import EquationForm from '../model/EquationForm.js';
import PlayState from '../model/PlayState.js';

// strings
const checkString = vegasStrings.check;
const nextString = vegasStrings.next;
const showAnswerString = vegasStrings.showAnswer;
const tryAgainString = vegasStrings.tryAgain;

class ChallengeNode extends Node {

  /**
   * @param {Challenge} challenge the challenge
   * @param {LineGameModel} model the game model
   * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
   * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
   */
  constructor( challenge, model, challengeSize, audioPlayer ) {

    super();

    this.subtypeParent = new Node(); // @protected subtypes should add children to this node, to preserve rendering order

    // @protected smiley/frowning face
    this.faceNode = new FaceWithPointsNode( {
      faceDiameter: LineGameConstants.FACE_DIAMETER,
      faceOpacity: 1,
      pointsAlignment: 'rightCenter'
    } );

    // buttons
    const buttonOptions = {
      font: LineGameConstants.BUTTON_FONT,
      baseColor: LineGameConstants.BUTTON_COLOR,
      xMargin: 20,
      yMargin: 5,
      centerX: 0 // center aligned
    };
    const checkButton = new TextPushButton( checkString, buttonOptions );
    const tryAgainButton = new TextPushButton( tryAgainString, buttonOptions );
    const showAnswerButton = new TextPushButton( showAnswerString, buttonOptions );
    const nextButton = new TextPushButton( nextString, buttonOptions );

    // @protected
    this.buttonsParent = new Node( {
      children: [ checkButton, tryAgainButton, showAnswerButton, nextButton ],
      maxWidth: 400 // determined empirically
    } );

    // point tools
    const linesVisibleProperty = new BooleanProperty( true );
    const pointToolNode1 = new PointToolNode( challenge.pointTool1, challenge.modelViewTransform, challenge.graph, linesVisibleProperty, { scale: LineGameConstants.POINT_TOOL_SCALE } );
    const pointToolNode2 = new PointToolNode( challenge.pointTool2, challenge.modelViewTransform, challenge.graph, linesVisibleProperty, { scale: LineGameConstants.POINT_TOOL_SCALE } );

    // Point tools moveToFront when dragged, so we give them a common parent to preserve rendering order of the reset of the scenegraph.
    const pointToolParent = new Node();
    pointToolParent.addChild( pointToolNode1 );
    pointToolParent.addChild( pointToolNode2 );

    // rendering order
    this.addChild( this.subtypeParent );
    this.addChild( this.buttonsParent );
    this.addChild( pointToolParent );
    this.addChild( this.faceNode );

    // buttons at center-bottom
    this.buttonsParent.centerX = challenge.modelViewTransform.modelToViewX( challenge.graph.xRange.min ); // centered on left edge of graph
    this.buttonsParent.bottom = challengeSize.height - 20;

    // debugging controls
    let skipButton = null;
    let replayButton = null;
    if ( phet.chipper.queryParameters.showAnswers ) {

      // description at leftTop
      const descriptionNode = new Text( challenge.description, {
        font: new PhetFont( 16 ),
        fill: 'black'
      } );
      descriptionNode.left = 10;
      descriptionNode.top = 10;
      this.addChild( descriptionNode );

      // developer buttons (no i18n) to right of main buttons
      const devButtonOptions = {
        font: new PhetFont( 20 ),
        baseColor: 'red',
        textFill: 'white'
      };

      // skips the current challenge.
      skipButton = new TextPushButton( 'Skip', devButtonOptions );
      skipButton.addListener( () => model.skipCurrentChallenge() );

      // replays the current challenge.
      replayButton = new TextPushButton( 'Replay', devButtonOptions );
      replayButton.addListener( () => model.replayCurrentChallenge() );

      const devButtonsParent = new Node( { children: [ skipButton, replayButton ] } );
      devButtonsParent.left = this.buttonsParent.right + 15;
      devButtonsParent.centerY = this.buttonsParent.centerY;
      this.addChild( devButtonsParent );
      devButtonsParent.moveToBack();
    }

    // 'Check' button
    checkButton.addListener( () => {
      if ( challenge.isCorrect() ) {
        this.faceNode.smile();
        audioPlayer.correctAnswer();
        const points = model.computePoints( model.playStateProperty.get() === PlayState.FIRST_CHECK ? 1 : 2 /* number of attempts */ );

        // Prevent score from exceeding perfect score, in case we replay challenges with ?gameDebug query parameter.
        // See https://github.com/phetsims/graphing-lines/issues/70
        const newScore = Math.min( model.scoreProperty.get() + points, model.getPerfectScore() );
        model.scoreProperty.set( newScore );
        this.faceNode.setPoints( points );
        model.playStateProperty.set( PlayState.NEXT );
      }
      else {
        this.faceNode.frown();
        this.faceNode.setPoints( 0 );
        audioPlayer.wrongAnswer();
        if ( model.playStateProperty.get() === PlayState.FIRST_CHECK ) {
          model.playStateProperty.set( PlayState.TRY_AGAIN );
        }
        else {
          model.playStateProperty.set( PlayState.SHOW_ANSWER );
        }
      }
    } );

    // 'Try Again' button
    tryAgainButton.addListener( () => {
      model.playStateProperty.set( PlayState.SECOND_CHECK );
    } );

    // 'Show Answer' button
    showAnswerButton.addListener( () => {
      model.playStateProperty.set( PlayState.NEXT );
    } );

    // 'Next' button
    nextButton.addListener( () => {
      model.playStateProperty.set( PlayState.FIRST_CHECK );
    } );

    // play-state changes
    const playStateObserver = state => {

      // visibility of face
      this.faceNode.visible = ( state === PlayState.TRY_AGAIN ||
                                state === PlayState.SHOW_ANSWER ||
                                ( state === PlayState.NEXT && challenge.isCorrect() ) );

      // visibility of buttons
      checkButton.visible = ( state === PlayState.FIRST_CHECK || state === PlayState.SECOND_CHECK );
      tryAgainButton.visible = ( state === PlayState.TRY_AGAIN );
      showAnswerButton.visible = ( state === PlayState.SHOW_ANSWER );
      nextButton.visible = ( state === PlayState.NEXT );

      // dev buttons
      if ( replayButton && skipButton ) {
        replayButton.visible = ( state === PlayState.NEXT );
        skipButton.visible = !replayButton.visible;
      }
    };
    model.playStateProperty.link( playStateObserver ); // unlink in dispose

    // Move from "Try Again" to "Check" state when the user changes their guess, see graphing-lines#47.
    const guessObserver = guess => {
      if ( model.playStateProperty.get() === PlayState.TRY_AGAIN ) {
        model.playStateProperty.set( PlayState.SECOND_CHECK );
      }
    };
    challenge.guessProperty.link( guessObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeChallengeNode = () => {
      pointToolNode1.dispose();
      pointToolNode2.dispose();
      model.playStateProperty.unlink( playStateObserver );
      challenge.guessProperty.unlink( guessObserver );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeChallengeNode();
    super.dispose();
  }

  /**
   * Creates a non-interactive equation, used to label the specified line.
   * @param {Property.<Line>} lineProperty
   * @param {EquationForm} equationForm
   * @param {Object} [options] - see EquationNode
   * @public
   * @static
   */
  static createEquationNode( lineProperty, equationForm, options ) {

    options = merge( {
      fontSize: 18, // {number},
      slopeUndefinedVisible: true
    }, options );

    if ( equationForm === EquationForm.SLOPE_INTERCEPT ) {
      return SlopeInterceptEquationNode.createDynamicLabel( lineProperty, options );
    }
    else if ( equationForm === EquationForm.POINT_SLOPE ) {
      return PointSlopeEquationNode.createDynamicLabel( lineProperty, options );
    }
    else {
      throw new Error( `unsupported equation form: ${equationForm.name}` );
    }
  }
}

graphingLines.register( 'ChallengeNode', ChallengeNode );

export default ChallengeNode;