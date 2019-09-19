// Copyright 2013-2019, University of Colorado Boulder

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
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  const GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  const GameTimer = require( 'VEGAS/GameTimer' );
  const GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  const GLQueryParameters = require( 'GRAPHING_LINES/common/GLQueryParameters' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'GRAPHING_LINES/common/model/Line' );
  const ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PlayState = require( 'GRAPHING_LINES/linegame/model/PlayState' );
  const Property = require( 'AXON/Property' );
  const StringProperty = require( 'AXON/StringProperty' );

  // constants
  const INITIAL_GAME_PHASE = GamePhase.SETTINGS;
  const CHALLENGES_PER_GAME = 6;
  const DUMMY_CHALLENGE = new GraphTheLine( '', Line.createSlopeIntercept( 1, 1, 1 ),
    EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE, GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );

  /**
   * @param {BaseChallengeFactory[]} challengeFactories
   * @constructor
   */
  function BaseGameModel( challengeFactories ) {

    const self = this;

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
    this.playStateProperty = new StringProperty( PlayState.NONE, {
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

    // @public (read-only) {GamePhase} set this using setGamePhase
    this.gamePhaseProperty = new Property( INITIAL_GAME_PHASE );

    this.initChallenges();

    // Do this after initChallenges, because this will fire immediately and needs to have an initial set of challenges.
    // unlink is unnecessary since BaseGameModel exists for the lifetime of the sim.
    this.playStateProperty.link( function( playState ) {

      const challengeIndex = self.challengeIndexProperty.get();
      const isLastChallenge = ( challengeIndex === self.challenges.length - 1 );

      if ( isLastChallenge && ( playState === PlayState.NEXT || playState === PlayState.SHOW_ANSWER ) ) {
        // game over, stop the timer
        self.timer.stop();
      }

      if ( playState === PlayState.FIRST_CHECK ) {

        const level = self.levelProperty.get();
        const score = self.scoreProperty.get();

        if ( isLastChallenge ) {
          // game has been completed
          self.setGamePhase( GamePhase.RESULTS );
          if ( score > self.bestScoreProperties[ level ].get() ) {
            self.bestScoreProperties[ level ].set( score );
          }
        }
        else {
          // next challenge
          const nextChallengeIndex = challengeIndex + 1;
          self.challengeIndexProperty.set( nextChallengeIndex );
          self.challengeProperty.set( self.challenges[ nextChallengeIndex ] );
        }
      }
      else if ( playState === PlayState.NEXT ) {
        self.challengeProperty.get().setAnswerVisible( true );
      }
    } );

    if ( GLQueryParameters.verifyChallenges ) {
      this.verifyChallenges();
    }
  }

  graphingLines.register( 'BaseGameModel', BaseGameModel );

  return inherit( Object, BaseGameModel, {

    /**
     * Sets the game phase. Call this instead of setting gamePhaseProperty directly,
     * because there are tasks that needs to be done before listeners are notified.
     * @param {GamePhase} gamePhase
     * @public
     */
    setGamePhase: function( gamePhase ) {
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
          throw new Error( 'unsupported game phase: ' + gamePhase );
        }

        // Change the Property, which notifies listeners
        this.gamePhaseProperty.set( gamePhase );
      }
    },

    // @override @public
    reset: function() {

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
    },

    // @private resets the best score to zero for every level
    resetBestScores: function() {
      this.bestScoreProperties.forEach( function( property ) {
        property.set( 0 );
      } );
    },

    // @private resets the best times to null (no time) for every level
    resetBestTimes: function() {
      this.bestTimeProperties.forEach( function( property ) {
        property.set( null );
      } );
    },

    // @public
    isPerfectScore: function() {
      return this.scoreProperty.get() === this.getPerfectScore();
    },

    // @public Gets the number of points in a perfect score (ie, correct answers for all challenges on the first try)
    getPerfectScore: function() {
      return this.challenges.length * this.computePoints( 1 );
    },

    // @public Compute points to be awarded for a correct answer.
    computePoints: function( attempts ) {
      return Math.max( 0, this.maxPointsPerChallenge - attempts + 1 );
    },

    /**
     * Skips the current challenge.
     * This is a developer feature.
     * Score and best times are meaningless after using this.
     * @public
     */
    skipCurrentChallenge: function() {
      this.playStateProperty.set( PlayState.NEXT );
      this.playStateProperty.set( PlayState.FIRST_CHECK );
    },

    /**
     * Replays the current challenge.
     * This is a developer feature.
     * Score and best times are meaningless after using this.
     * @public
     */
    replayCurrentChallenge: function() {
      this.challengeProperty.get().reset();
      this.challengeIndexProperty.set( this.challengeIndexProperty.get() - 1 );
      this.challengeProperty.set( DUMMY_CHALLENGE ); // force an update
      this.playStateProperty.set( PlayState.FIRST_CHECK );
    },

    // @private Updates the best time for the current level, at the end of a timed game with a perfect score.
    updateBestTime: function() {
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
    },

    // @private initializes a new set of challenges for the current level
    initChallenges: function() {

      // force update
      this.challengeIndexProperty.set( -1 );

      // level
      const level = this.levelProperty.get();
      assert && assert( level >= 0 && level < this.challengeFactories.length );

      // generate challenges
      this.challenges = this.challengeFactories[ level ].createChallenges();
      if ( GLQueryParameters.shuffle ) {
        this.challenges = phet.joist.random.shuffle( this.challenges );
      }

      // set the number of challenges
      this.challengesPerGameProperty.set( this.challenges.length );
      assert && assert( this.challengesPerGameProperty.get() === CHALLENGES_PER_GAME );
    },

    // @private verify challenge creation by
    verifyChallenges: function() {
      console.log( 'begin: verify creation of challenges' );
      for ( let level = 0; level < this.challengeFactories.length; level++ ) {
        console.log( 'verifying level ' + level + '...' );
        for ( let i = 0; i < 2000; i++ ) {
          this.challengeFactories[ level ].createChallenges();
        }
      }
      console.log( 'end: verify creation of challenges' );
    }
  } );
} );