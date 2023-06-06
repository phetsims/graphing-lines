// Copyright 2013-2023, University of Colorado Boulder

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

import Property from '../../../../axon/js/Property.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import FaceWithPointsNode from '../../../../scenery-phet/js/FaceWithPointsNode.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import TextPushButton, { TextPushButtonOptions } from '../../../../sun/js/buttons/TextPushButton.js';
import VegasStrings from '../../../../vegas/js/VegasStrings.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import PointToolNode from '../../common/view/PointToolNode.js';
import graphingLines from '../../graphingLines.js';
import PointSlopeEquationNode from '../../pointslope/view/PointSlopeEquationNode.js';
import SlopeInterceptEquationNode from '../../slopeintercept/view/SlopeInterceptEquationNode.js';
import LineGameConstants from '../LineGameConstants.js';
import EquationForm from '../model/EquationForm.js';
import PlayState from '../model/PlayState.js';
import Challenge from '../model/Challenge.js';
import LineGameModel from '../model/LineGameModel.js';
import Line from '../../common/model/Line.js';
import NotALine from '../model/NotALine.js';
import { CreateDynamicLabelOptions } from '../../common/view/LineNode.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';

// strings
const checkStringProperty = VegasStrings.checkStringProperty;
const nextStringProperty = VegasStrings.nextStringProperty;
const showAnswerStringProperty = VegasStrings.showAnswerStringProperty;
const tryAgainStringProperty = VegasStrings.tryAgainStringProperty;

export default class ChallengeNode extends Node {

  // subclasses should add children to this node, to preserve rendering order
  protected readonly subtypeParent: Node;

  protected readonly buttonsParent: Node;
  protected readonly faceNode: FaceWithPointsNode;
  private readonly disposeChallengeNode: () => void;

  /**
   * @param challenge - the challenge
   * @param model - the game model
   * @param challengeSize - dimensions of the view rectangle that is available for rendering the challenge
   * @param audioPlayer - the audio player, for providing audio feedback during game play
   */
  protected constructor( challenge: Challenge, model: LineGameModel, challengeSize: Dimension2, audioPlayer: GameAudioPlayer ) {

    super();

    this.subtypeParent = new Node();

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
      textNodeOptions: {
        maxWidth: 375
      }
    };

    // 'Check' button
    const checkButton = new TextPushButton( checkStringProperty, buttonOptions );

    // 'Try Again' button
    const tryAgainButton = new TextPushButton( tryAgainStringProperty, combineOptions<TextPushButtonOptions>( {
      listener: () => {
        model.playStateProperty.value = PlayState.SECOND_CHECK;
      }
    }, buttonOptions ) );

    // 'Show Answer' button
    const showAnswerButton = new TextPushButton( showAnswerStringProperty, combineOptions<TextPushButtonOptions>( {
      listener: () => {
        model.playStateProperty.value = PlayState.NEXT;
      }
    }, buttonOptions ) );

    const nextButton = new TextPushButton( nextStringProperty, combineOptions<TextPushButtonOptions>( {
      listener: () => {
        model.playStateProperty.value = PlayState.FIRST_CHECK;
      }
    }, buttonOptions ) );

    // buttons at center-bottom
    this.buttonsParent = new Node( {
      children: [ checkButton, tryAgainButton, showAnswerButton, nextButton ]
    } );
    this.buttonsParent.boundsProperty.link( () => {
      this.buttonsParent.centerX = challengeSize.width / 2;
      this.buttonsParent.bottom = challengeSize.height - 20;
    } );

    // point tools
    const linesVisibleProperty = new BooleanProperty( true );
    const pointToolOptions = {
      scale: LineGameConstants.POINT_TOOL_SCALE
    };
    const pointToolNode1 = new PointToolNode( challenge.pointTool1, challenge.modelViewTransform, challenge.graph, linesVisibleProperty, pointToolOptions );
    const pointToolNode2 = new PointToolNode( challenge.pointTool2, challenge.modelViewTransform, challenge.graph, linesVisibleProperty, pointToolOptions );

    // Point tools moveToFront when dragged, so we give them a common parent to preserve rendering order of the reset of the scenegraph.
    const pointToolParent = new Node();
    pointToolParent.addChild( pointToolNode1 );
    pointToolParent.addChild( pointToolNode2 );

    // rendering order
    this.addChild( this.subtypeParent );
    this.addChild( this.buttonsParent );
    this.addChild( pointToolParent );
    this.addChild( this.faceNode );

    // debugging controls
    let skipButton: TextPushButton;
    let replayButton: TextPushButton;
    if ( phet.chipper.queryParameters.showAnswers ) {

      // description at leftTop
      const descriptionNode = new Text( challenge.description, {
        font: new PhetFont( 16 ),
        fill: 'red'
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

      // lower-left corner
      const devButtonsParent = new Node( { children: [ skipButton, replayButton ] } );
      devButtonsParent.left = 20;
      devButtonsParent.bottom = challengeSize.height - 20;
      this.addChild( devButtonsParent );
      devButtonsParent.moveToBack();
    }

    // 'Check' button listener
    checkButton.addListener( () => {
      if ( challenge.isCorrect() ) {
        this.faceNode.smile();
        audioPlayer.correctAnswer();
        const points = model.computePoints( model.playStateProperty.value === PlayState.FIRST_CHECK ? 1 : 2 /* number of attempts */ );

        // Prevent score from exceeding perfect score, in case we replay challenges with ?gameDebug query parameter.
        // See https://github.com/phetsims/graphing-lines/issues/70
        model.scoreProperty.value = Math.min( model.scoreProperty.value + points, model.getPerfectScore() );
        this.faceNode.setPoints( points );
        model.playStateProperty.value = PlayState.NEXT;
      }
      else {
        this.faceNode.frown();
        this.faceNode.setPoints( 0 );
        audioPlayer.wrongAnswer();
        if ( model.playStateProperty.value === PlayState.FIRST_CHECK ) {
          model.playStateProperty.value = PlayState.TRY_AGAIN;
        }
        else {
          model.playStateProperty.value = PlayState.SHOW_ANSWER;
        }
      }
    } );

    // playStateProperty listener
    const playStateObserver = ( state: PlayState ) => {

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
    const guessObserver = ( guess: Line | NotALine ) => {
      if ( model.playStateProperty.value === PlayState.TRY_AGAIN ) {
        model.playStateProperty.value = PlayState.SECOND_CHECK;
      }
    };
    challenge.guessProperty.link( guessObserver ); // unlink in dispose

    this.disposeChallengeNode = () => {
      pointToolNode1.dispose();
      pointToolNode2.dispose();
      model.playStateProperty.unlink( playStateObserver );
      challenge.guessProperty.unlink( guessObserver );
    };
  }

  public override dispose(): void {
    this.disposeChallengeNode();
    super.dispose();
  }

  /**
   * Creates a non-interactive equation, used to label the specified line.
   */
  public static createEquationNode( lineProperty: Property<Line>,
                                    equationForm: EquationForm,
                                    providedOptions?: CreateDynamicLabelOptions ): Node {

    const options = combineOptions<CreateDynamicLabelOptions>( {
      fontSize: 18,
      slopeUndefinedVisible: true
    }, providedOptions );

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