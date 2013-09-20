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
  var GLStrings = require( 'GRAPHING_LINES/common/GLStrings' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/linegame/view/PointSlopeEquationNode' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/linegame/view/SlopeInterceptEquationNode' );
  var TextButton = require( 'SUN/TextButton' );

  /**
   * Constructor
   * @param {Challenge} challenge the challenge
   * @param {LineGameModel} model the game model
   * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
   * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
   */
  function ChallengeNode( challenge, model, challengeSize, audioPlayer ) {
    Node.call( this );

    this.subclassParent; // subclasses should add children to this node, to preserve rendering order

    // description (dev)
    var descriptionNode = new Text( challenge.description, { font: new PhetFont( 12 ), fill: 'black' } );
    descriptionNode.left = 5;
    descriptionNode.top = 5;

    // smiley/frowning face
    this.faceNode = new FaceNode( LineGameConstants.FACE_DIAMETER, {
      headFill: LineGameConstants.FACE_COLOR,
      eyeFill: 'black',
      mouthFill: 'black',
      headStroke: LineGameConstants.FACE_COLOR.darkerColor(),
      headLineWidth: 1
    } );

    // points awarded
    this.pointsAwardedNode = new Text( "", { font: LineGameConstants.POINTS_AWARDED_FONT, fill: LineGameConstants.POINTS_AWARDED_COLOR } );

      // buttons
    var buttonOptions = { font: LineGameConstants.BUTTON_FONT, rectangleFillUp: LineGameConstants.BUTTON_COLOR };
    this.checkButton = new TextButton( GLStrings.check, buttonOptions );
    var tryAgainButton = new TextButton( GLStrings.tryAgain, buttonOptions );
    var showAnswerButton = new TextButton( GLStrings.showAnswer, buttonOptions );
    var nextButton = new TextButton( GLStrings.next, buttonOptions );

    // developer buttons, no i18n
    var devButtonOptions = { font: new PhetFont( 12 ) };
    var skipButton = new TextButton( "dev: Skip", devButtonOptions );
    var replayButton = new TextButton( "dev: Replay", devButtonOptions );

    //TODO continue porting constructor code, see below
  }

  /**
   * Creates a static (non-interactive) equation.
   * @param {EquationForm} equationForm
   * @param {Line} line
   * @param {Font} font
   * @param {Color} color
   */
  ChallengeNode.createEquationNode = function( equationForm, line, font, color ) {
    if ( equationForm === EquationForm.SLOPE_INTERCEPT ) {
      return new SlopeInterceptEquationNode( line, font, color );
    }
    else if ( equationForm === EquationForm.POINT_SLOPE ) {
      return new PointSlopeEquationNode( line, font, color );
    }
    else {
      throw new Error( "unsupported equation form: " + equationForm );
    }
  };

  return inherit( Node, ChallengeNode );
} );


//        // point tools
//        Rectangle2D pointToolDragBounds = new Rectangle2D.Double( 0, 0, challengeSize.getWidth(), challengeSize.getHeight() );
//        PointToolNode pointToolNode1 = new PointToolNode( challenge.pointTool1, challenge.mvt, challenge.graph, pointToolDragBounds, new BooleanProperty( true ) );
//        PointToolNode pointToolNode2 = new PointToolNode( challenge.pointTool2, challenge.mvt, challenge.graph, pointToolDragBounds, new BooleanProperty( true ) );
//        pointToolNode1.scale( LineGameConstants.POINT_TOOL_SCALE );
//        pointToolNode2.scale( LineGameConstants.POINT_TOOL_SCALE );
//
//        // Point tools moveToFront when dragged, so we give them a common parent to preserve rendering order of the reset of the scenegraph.
//        PNode pointToolParent = new PNode();
//        pointToolParent.addChild( pointToolNode1 );
//        pointToolParent.addChild( pointToolNode2 );
//
//        // Parent for subclass-specific nodes, to maintain rendering order.
//        subclassParent = new PNode();
//
//        // Rendering order
//        {
//            addChild( subclassParent );
//            if ( PhetApplication.getInstance().isDeveloperControlsEnabled() ) {
//               addChild( descriptionNode );
//            }
//            addChild( checkButton );
//            addChild( tryAgainButton );
//            addChild( showAnswerButton );
//            addChild( nextButton );
//            if ( PhetApplication.getInstance().isDeveloperControlsEnabled() ) {
//                addChild( skipButton ); // This button lets you skip the current challenge.
//                addChild( replayButton ); // This button lets you repeat the current challenge.
//            }
//            addChild( pointToolParent );
//            addChild( faceNode );
//            addChild( pointsAwardedNode );
//        }
//
//        // layout
//        {
//            // buttons at bottom center
//            final double buttonCenterX = ( challengeSize.getWidth() / 2 );
//            final double buttonCenterY = challengeSize.getHeight() - checkButton.getFullBoundsReference().getHeight() - 30;
//            checkButton.setOffset( buttonCenterX - ( checkButton.getFullBoundsReference().getWidth() / 2 ), buttonCenterY );
//            tryAgainButton.setOffset( buttonCenterX - ( tryAgainButton.getFullBoundsReference().getWidth() / 2 ), buttonCenterY );
//            showAnswerButton.setOffset( buttonCenterX - ( showAnswerButton.getFullBoundsReference().getWidth() / 2 ), buttonCenterY );
//            nextButton.setOffset( buttonCenterX - ( nextButton.getFullBoundsReference().getWidth() / 2 ), buttonCenterY );
//            skipButton.setOffset( nextButton.getFullBoundsReference().getCenterX() - ( skipButton.getFullBoundsReference().getWidth() / 2 ),
//                                  nextButton.getFullBoundsReference().getMaxY() + 2 );
//            replayButton.setOffset( nextButton.getFullBoundsReference().getCenterX() - ( replayButton.getFullBoundsReference().getWidth() / 2 ),
//                                    nextButton.getFullBoundsReference().getMaxY() + 2 );
//        }
//
//        // "Check" button
//        checkButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                if ( challenge.isCorrect() ) {
//                    faceNode.smile();
//                    audioPlayer.correctAnswer();
//                    final int points = model.computePoints( model.state.get() == PlayState.FIRST_CHECK ? 1 : 2 /* number of attempts */ );
//                    model.results.score.set( model.results.score.get() + points );
//                    pointsAwardedNode.setText( MessageFormat.format( Strings.POINTS_AWARDED, String.valueOf( points ) ) );
//                    // points to right of face
//                    pointsAwardedNode.setOffset( faceNode.getFullBoundsReference().getMaxX() + 10,
//                                                 faceNode.getFullBoundsReference().getCenterY() - ( pointsAwardedNode.getFullBoundsReference().getHeight() / 2 ) );
//                    model.state.set( PlayState.NEXT );
//                }
//                else {
//                    faceNode.frown();
//                    audioPlayer.wrongAnswer();
//                    pointsAwardedNode.setText( "" );
//                    if ( model.state.get() == PlayState.FIRST_CHECK ) {
//                        model.state.set( PlayState.TRY_AGAIN );
//                    }
//                    else {
//                        model.state.set( PlayState.SHOW_ANSWER );
//                    }
//                }
//            }
//        } );
//
//        // "Try Again" button
//        tryAgainButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                model.state.set( PlayState.SECOND_CHECK );
//            }
//        } );
//
//        // "Show Answer" button
//        showAnswerButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                model.state.set( PlayState.NEXT );
//            }
//        } );
//
//        // "Next" button
//        nextButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                model.state.set( PlayState.FIRST_CHECK );
//            }
//        } );
//
//        // "Skip" button
//        skipButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                model.skipCurrentChallenge();
//            }
//        } );
//
//        // "Repeat" button
//        replayButton.addActionListener( new ActionListener() {
//            public void actionPerformed( ActionEvent e ) {
//                model.replayCurrentChallenge();
//            }
//        } );
//
//        // state changes
//        model.state.addObserver( new VoidFunction1<PlayState>() {
//            public void apply( PlayState state ) {
//
//                // visibility of face
//                faceNode.setVisible( state == PlayState.TRY_AGAIN ||
//                                     state == PlayState.SHOW_ANSWER ||
//                                     ( state == PlayState.NEXT && challenge.isCorrect() ) );
//
//                // visibility of points
//                pointsAwardedNode.setVisible( faceNode.getVisible() && challenge.isCorrect() );
//
//                // visibility of buttons
//                checkButton.setVisible( state == PlayState.FIRST_CHECK || state == PlayState.SECOND_CHECK );
//                tryAgainButton.setVisible( state == PlayState.TRY_AGAIN );
//                showAnswerButton.setVisible( state == PlayState.SHOW_ANSWER );
//                nextButton.setVisible( state == PlayState.NEXT );
//                skipButton.setVisible( !nextButton.getVisible() );
//                replayButton.setVisible( nextButton.getVisible() );
//            }
//        } );
//    }

