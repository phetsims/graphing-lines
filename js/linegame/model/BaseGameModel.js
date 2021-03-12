// Copyright 2013-2020, University of Colorado Boulder

/**
 * Base type for the 'Line Game' model.
 *
 * Responsibilities include:
 * - creation of challenges (delegated to factory)
 * - management of game state
 * - management of game results
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import GameTimer from '../../../../vegas/js/GameTimer.js';
import GLConstants from '../../common/GLConstants.js';
import GLQueryParameters from '../../common/GLQueryParameters.js';
import Line from '../../common/model/Line.js';
import graphingLines from '../../graphingLines.js';
import EquationForm from './EquationForm.js';
import GamePhase from './GamePhase.js';
import GraphTheLine from './GraphTheLine.js';
import ManipulationMode from './ManipulationMode.js';
import PlayState from './PlayState.js';

// constants
const INITIAL_GAME_PHASE = GamePhase.SETTINGS;
const CHALLENGES_PER_GAME = 6;
const DUMMY_CHALLENGE = new GraphTheLine( '', Line.createSlopeIntercept( 1, 1, 1 ),
  EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE, GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );

class BaseGameModel {

  /**
   * @param {BaseChallengeFactory[]} challengeFactories
   */
  constructor( challengeFactories ) {

    // @private
    this.challengeFactories = challengeFactories;

    // @public Properties
    this.levelProperty = new NumberProperty( 0, {
      numberType: 'Integer'
    } );
    this.soundEnabledProperty = new BooleanProperty( true );
    this.timerEnabledProperty = new BooleanProperty( false );
    this.scoreProperty = new NumberProperty( 0, {
      numberType: 'Integer'
    } ); // {number} how many points the user has earned for the current game
    this.challengeProperty = new Property( DUMMY_CHALLENGE );
    this.challengeIndexProperty = new NumberProperty( 0, {
      numberType: 'Integer'
    } );
    this.challengesPerGameProperty = new NumberProperty( CHALLENGES_PER_GAME, {
      numberType: 'Integer'
    } );
    this.playStateProperty = new EnumerationProperty( PlayState, PlayState.NONE, {
      reentrant: true // see https://github.com/phetsims/graphing-lines/issues/102
    } );

    // @public
    this.challenges = []; // {Challenge[]}
    this.timer = new GameTimer();
    this.numberOfLevels = challengeFactories.length;
    this.maxPointsPerChallenge = 2;
    this.bestScoreProperties = []; // {NumberProperty[]} best scores for each level
    this.bestTimeProperties = []; // {Property.<number|null>[]} best times for each level, in ms
    this.isNewBestTime = false; // is the time for the most-recently-completed game a new best time?
    for ( let level = 0; level < this.numberOfLevels; level++ ) {
      this.bestScoreProperties.push( new NumberProperty( 0, {
        numberType: 'Integer'
      } ) );
      this.bestTimeProperties.push( new Property( null ) ); // null if a level has no best time yet
    }

    // @public (read-only) set this using setGamePhase
    this.gamePhaseProperty = new EnumerationProperty( GamePhase, INITIAL_GAME_PHASE );

    this.initChallenges();

    // Do this after initChallenges, because this will fire immediately and needs to have an initial set of challenges.
    // unlink is unnecessary since BaseGameModel exists for the lifetime of the sim.
    this.playStateProperty.link( playState => {

      const challengeIndex = this.challengeIndexProperty.get();
      const isLastChallenge = ( challengeIndex === this.challenges.length - 1 );

      if ( isLastChallenge && ( playState === PlayState.NEXT || playState === PlayState.SHOW_ANSWER ) ) {
        // game over, stop the timer
        this.timer.stop();
      }

      if ( playState === PlayState.FIRST_CHECK ) {

        const level = this.levelProperty.get();
        const score = this.scoreProperty.get();

        if ( isLastChallenge ) {
          // game has been completed
          this.setGamePhase( GamePhase.RESULTS );
          if ( score > this.bestScoreProperties[ level ].get() ) {
            this.bestScoreProperties[ level ].set( score );
          }
        }
        else {
          // next challenge
          const nextChallengeIndex = challengeIndex + 1;
          this.challengeIndexProperty.set( nextChallengeIndex );
          this.challengeProperty.set( this.challenges[ nextChallengeIndex ] );
        }
      }
      else if ( playState === PlayState.NEXT ) {
        this.challengeProperty.get().setAnswerVisible( true );
      }
    } );

    if ( GLQueryParameters.verifyChallenges ) {
      this.verifyChallenges();
    }
  }

  /**
   * Sets the game phase. Call this instead of setting gamePhaseProperty directly,
   * because there are tasks that needs to be done before listeners are notified.
   * @param {GamePhase} gamePhase
   * @public
   */
  setGamePhase( gamePhase ) {
    if ( gamePhase !== this.gamePhaseProperty.get() ) {

      // Do tasks that need to be done before notifying listeners.
      if ( gamePhase === GamePhase.SETTINGS ) {
        this.playStateProperty.set( PlayState.NONE );
        this.timer.stop();
      }
      else if ( gamePhase === GamePhase.PLAY ) {
        this.initChallenges();
        this.playStateProperty.set( PlayState.FIRST_CHECK );
        this.scoreProperty.set( 0 );
        this.timer.start();
      }
      else if ( gamePhase === GamePhase.RESULTS ) {
        this.playStateProperty.set( PlayState.NONE );
        this.updateBestTime();
      }
      else {
        throw new Error( `unsupported game phase: ${gamePhase}` );
      }

      // Change the Property, which notifies listeners
      this.gamePhaseProperty.set( gamePhase );
    }
  }

  // @public
  reset() {

    this.levelProperty.reset();
    this.soundEnabledProperty.reset();
    this.timerEnabledProperty.reset();
    this.scoreProperty.reset();
    this.challengeProperty.reset();
    this.challengeIndexProperty.reset();
    this.challengesPerGameProperty.reset();
    this.playStateProperty.reset();

    this.setGamePhase( INITIAL_GAME_PHASE );
    this.resetBestScores();
    this.resetBestTimes();

    this.initChallenges(); // takes care of challengeProperty, challengeIndexProperty, challengesPerGameProperty
  }

  // @private resets the best score to zero for every level
  resetBestScores() {
    this.bestScoreProperties.forEach( property => property.set( 0 ) );
  }

  // @private resets the best times to null (no time) for every level
  resetBestTimes() {
    this.bestTimeProperties.forEach( property => property.set( null ) );
  }

  // @public
  isPerfectScore() {
    return this.scoreProperty.get() === this.getPerfectScore();
  }

  // @public Gets the number of points in a perfect score (ie, correct answers for all challenges on the first try)
  getPerfectScore() {
    return this.challenges.length * this.computePoints( 1 );
  }

  // @public Compute points to be awarded for a correct answer.
  computePoints( attempts ) {
    return Math.max( 0, this.maxPointsPerChallenge - attempts + 1 );
  }

  /**
   * Skips the current challenge.
   * This is a developer feature.
   * Score and best times are meaningless after using this.
   * @public
   */
  skipCurrentChallenge() {
    this.playStateProperty.set( PlayState.NEXT );
    this.playStateProperty.set( PlayState.FIRST_CHECK );
  }

  /**
   * Replays the current challenge.
   * This is a developer feature.
   * Score and best times are meaningless after using this.
   * @public
   */
  replayCurrentChallenge() {
    this.challengeProperty.get().reset();
    this.challengeIndexProperty.set( this.challengeIndexProperty.get() - 1 );
    this.challengeProperty.set( DUMMY_CHALLENGE ); // force an update
    this.playStateProperty.set( PlayState.FIRST_CHECK );
  }

  // @private Updates the best time for the current level, at the end of a timed game with a perfect score.
  updateBestTime() {
    assert && assert( !this.timer.isRunningProperty.value );
    this.isNewBestTime = false;
    if ( this.timerEnabledProperty.get() && this.isPerfectScore() ) {
      const level = this.levelProperty.get();
      const time = this.timer.elapsedTimeProperty.value;
      if ( !this.bestTimeProperties[ level ].get() ) {
        // there was no previous time for this level
        this.bestTimeProperties[ level ].set( time );
      }
      else if ( time < this.bestTimeProperties[ level ].get() ) {
        // we have a new best time for this level
        this.bestTimeProperties[ level ].set( time );
        this.isNewBestTime = true;
      }
    }
  }

  // @private initializes a new set of challenges for the current level
  initChallenges() {

    // force update
    this.challengeIndexProperty.set( -1 );

    // level
    const level = this.levelProperty.get();
    assert && assert( level >= 0 && level < this.challengeFactories.length );

    // generate challenges
    this.challenges = this.challengeFactories[ level ].createChallenges();
    if ( GLQueryParameters.shuffle ) {
      this.challenges = dotRandom.shuffle( this.challenges );
    }

    // set the number of challenges
    this.challengesPerGameProperty.set( this.challenges.length );
    assert && assert( this.challengesPerGameProperty.get() === CHALLENGES_PER_GAME );
  }

  // @private verify challenge creation by
  verifyChallenges() {
    console.log( 'begin: verify creation of challenges' );
    for ( let level = 0; level < this.challengeFactories.length; level++ ) {
      console.log( `verifying level ${level}...` );
      for ( let i = 0; i < 2000; i++ ) {
        this.challengeFactories[ level ].createChallenges();
      }
    }
    console.log( 'end: verify creation of challenges' );
  }
}

graphingLines.register( 'BaseGameModel', BaseGameModel );

export default BaseGameModel;