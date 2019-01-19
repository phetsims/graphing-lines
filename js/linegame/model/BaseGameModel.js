// Copyright 2013-2018, University of Colorado Boulder

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
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GameTimer = require( 'VEGAS/GameTimer' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var GLQueryParameters = require( 'GRAPHING_LINES/common/GLQueryParameters' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var PlayState = require( 'GRAPHING_LINES/linegame/model/PlayState' );
  var Property = require( 'AXON/Property' );
  var StringProperty = require( 'AXON/StringProperty' );

  // constants
  var CHALLENGES_PER_GAME = 6;
  var DUMMY_CHALLENGE = new GraphTheLine( '', Line.createSlopeIntercept( 1, 1, 1 ),
    EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE, GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );

  /**
   * @param {BaseChallengeFactory[]} challengeFactories
   * @constructor
   */
  function BaseGameModel( challengeFactories ) {

    var self = this;

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
    this.bestScoreProperties = []; // best scores for each level, array of Property.<number>
    this.bestTimeProperties = []; // best times for each level, in ms, array of Property.<number>
    this.isNewBestTime = false; // is the time for the most-recently-completed game a new best time?
    for ( var level = 0; level < this.numberOfLevels; level++ ) {
      this.bestScoreProperties.push( new NumberProperty( 0, {
        numberType: 'Integer'
      } ) );
      this.bestTimeProperties.push( new Property( null ) ); // null if a level has no best time yet
    }

    // @public
    this.gamePhaseProperty = new GamePhaseProperty( GamePhase.SETTINGS,
      /*
       * This function will be called prior to setting the Property value.
       * Updates fields so that they are accurate before Property listeners are notified.
       */
      function( gamePhase ) {
        if ( gamePhase === GamePhase.SETTINGS ) {
          self.playStateProperty.set( PlayState.NONE );
          self.timer.stop();
        }
        else if ( gamePhase === GamePhase.PLAY ) {
          self.initChallenges();
          self.playStateProperty.set( PlayState.FIRST_CHECK );
          self.scoreProperty.set( 0 );
          self.timer.start();
        }
        else if ( gamePhase === GamePhase.RESULTS ) {
          self.playStateProperty.set( PlayState.NONE );
          self.updateBestTime();
        }
        else {
          throw new Error( 'unsupported game phase: ' + gamePhase );
        }
      } );

    this.initChallenges();

    // Do this after initChallenges, because this will fire immediately and needs to have an initial set of challenges.
    // unlink is unnecessary since BaseGameModel exists for the lifetime of the sim.
    this.playStateProperty.link( function( playState ) {

      var challengeIndex = self.challengeIndexProperty.get();
      var isLastChallenge = ( challengeIndex === self.challenges.length - 1 );

      if ( isLastChallenge && ( playState === PlayState.NEXT || playState === PlayState.SHOW_ANSWER ) ) {
        // game over, stop the timer
        self.timer.stop();
      }

      if ( playState === PlayState.FIRST_CHECK ) {

        var level = self.levelProperty.get();
        var score = self.scoreProperty.get();

        if ( isLastChallenge ) {
          // game has been completed
          self.gamePhaseProperty.set( GamePhase.RESULTS );
          if ( score > self.bestScoreProperties[ level ].get() ) {
            self.bestScoreProperties[ level ].set( score );
          }
        }
        else {
          // next challenge
          var nextChallengeIndex = challengeIndex + 1;
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

  inherit( Object, BaseGameModel, {

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

      this.gamePhaseProperty.reset();
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
      if ( this.timerEnabledProperty.get() && this.isPerfectScore() ) {
        var level = this.levelProperty.get();
        var time = this.timer.elapsedTimeProperty.value;
        this.isNewBestTime = false;
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
      var level = this.levelProperty.get();
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
      for ( var level = 0; level < this.challengeFactories.length; level++ ) {
        console.log( 'verifying level ' + level + '...' );
        for ( var i = 0; i < 2000; i++ ) {
          this.challengeFactories[ level ].createChallenges();
        }
      }
      console.log( 'end: verify creation of challenges' );
    }
  } );

  /**
   * Property used for the game phase.
   * It has a 'hook' function that is called before the value is changed.
   * This is useful for setting the various state parameters of the game before
   * notifying observes that the game phase has changed.
   * TODO: Shouldn't this be accomplished by adding the first listener to a Property?
   * @param {GamePhase} value
   * @param {function} hook function with one parameter of type {GamePhase}
   * @constructor
   */
  class GamePhaseProperty extends Property {
    constructor( value, hook ) {
      super( value );
      this.hook = hook; // @private
    }

    /**
     * @param value
     * @public
     * @override
     */
    set( value ) {
      this.hook( value );
      super.set( value );
    }
  }

  graphingLines.register( 'BaseGameModel.GamePhaseProperty', GamePhaseProperty );

  return BaseGameModel;
} );