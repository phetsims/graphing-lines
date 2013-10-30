// Copyright 2002-2013, University of Colorado Boulder

//TODO use PropertySet
/**
 * Model for the "Line Game" screen. Responsibilities include:
 * <ul>
 * <li>creation of challenges (delegated to factory)</li>
 * <li>management of game state</li>
 * <li>management of game results</li>
 * </ul>
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ChallengeFactory = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory' );
  var ChallengeFactory1 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory1' );
  var ChallengeFactory2 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory2' );
  var ChallengeFactory3 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory3' );
  var ChallengeFactory4 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory4' );
  var ChallengeFactory5 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory5' );
  var ChallengeFactory6 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory6' );
  var ChallengeFactoryHardCoded = require( 'GRAPHING_LINES/linegame/model/ChallengeFactoryHardCoded' );
  var EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GameTimer = require( 'VEGAS/GameTimer' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var PlayState = require( 'GRAPHING_LINES/linegame/model/PlayState' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );

  // constants
  var USE_HARD_CODED_CHALLENGES = window.phetcommon.getQueryParameter( 'hardcoded' ); // for debugging
  var MAX_POINTS_PER_CHALLENGE = 2;
  var NUMBER_OF_LEVELS = 6;
  var DUMMY_CHALLENGE = new GraphTheLine( "", Line.createSlopeIntercept( 1, 1, 1 ), EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE, GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );

  // a challenge factory for each level
  var factories = [
    new ChallengeFactory1(),
    new ChallengeFactory2(),
    new ChallengeFactory3(),
    new ChallengeFactory4(),
    new ChallengeFactory5(),
    new ChallengeFactory6()
  ];
  assert && assert( factories.length === NUMBER_OF_LEVELS );

  function LineGameModel() {

    var thisModel = this;

    // settings
    thisModel.numberOfLevels = 6;
    thisModel.levelProperty = new Property( 0 );
    thisModel.soundEnabledProperty = new Property( true );
    thisModel.timerEnabledProperty = new Property( true );

    // results
    thisModel.scoreProperty = new Property( 0 ); // how many points the user has earned for the current game
    thisModel.isNewBestTime = false; // is the time for the most-recently-completed game a new best time?
    thisModel.bestTimes = []; // best times for each level, in ms
    for ( var level = 0; level < thisModel.numberOfLevels; level++ ) {
      thisModel.bestTimes.push( null ); // null if a level has no best time yet
    }

    // time
    thisModel.timer = new GameTimer();

    // challenges
    thisModel.challenges = []; // Array<Challenge>
    thisModel.challengeProperty = new Property( DUMMY_CHALLENGE );
    thisModel.challengeIndexProperty = new Property( 0 );
    thisModel.challengesPerGameProperty = new Property( 0 );

    // state
    thisModel.playStateProperty = new Property( PlayState.NONE );
    thisModel.gamePhaseProperty = new GamePhaseProperty( GamePhase.SETTINGS,
      /*
       * This function will be called prior to setting the property value.
       * Updates fields so that they are accurate before property listeners are notified.
       */
      function( gamePhase ) {
        if ( gamePhase === GamePhase.SETTINGS ) {
          thisModel.playStateProperty.set( PlayState.NONE );
          thisModel.timer.stop();
        }
        else if ( gamePhase === GamePhase.PLAY ) {
          thisModel.initChallenges();
          thisModel.playStateProperty.set( PlayState.FIRST_CHECK );
          thisModel.scoreProperty.set( 0 );
          thisModel.timer.start();
        }
        else if ( gamePhase === GamePhase.RESULTS ) {
          thisModel.playStateProperty.set( PlayState.NONE );
          thisModel.timer.stop();
          thisModel.updateBestTime();
        }
        else {
          throw new Error( "unsupported game phase: " + gamePhase );
        }
      } );

    thisModel.initChallenges();

    // Do this after initChallenges, because this will fire immediately and needs to have an initial set of challenges.
    thisModel.playStateProperty.link( function( playState ) {
      if ( playState === PlayState.FIRST_CHECK ) {
        if ( thisModel.challengeIndexProperty.get() === thisModel.challenges.length - 1 ) {
          // game has been completed
          thisModel.gamePhaseProperty.set( GamePhase.RESULTS );
        }
        else {
          // next challenge
          thisModel.challengeIndexProperty.set( thisModel.challengeIndexProperty.get() + 1 );
          thisModel.challengeProperty.set( thisModel.challenges[thisModel.challengeIndexProperty.get()] );
        }
      }
      else if ( playState === PlayState.NEXT ) {
        thisModel.challengeProperty.get().setAnswerVisible( true );
      }
    } );
  }

  LineGameModel.prototype = {

    reset: function() {

      this.levelProperty.reset();
      this.soundEnabledProperty.reset();
      this.timerEnabledProperty.reset();
      this.scoreProperty.reset();

      this.gamePhaseProperty.reset();
      this.playStateProperty.reset();

      this.initChallenges(); // takes care of challengeProperty, challengeIndexProperty, challengesPerGameProperty
    },

    step: function() { /* no animation, do nothing */ },

    isPerfectScore: function() {
      return this.scoreProperty.get() === this.getPerfectScore();
    },

    // Gets the number of points in a perfect score (ie, correct answers for all challenges on the first try)
    getPerfectScore: function() {
      return this.challenges.length * this.computePoints( 1 );
    },

    // Compute points to be awarded for a correct answer.
    computePoints: function( attempts ) {
      return Math.max( 0, MAX_POINTS_PER_CHALLENGE - attempts + 1 );
    },

    /**
     * Skips the current challenge.
     * This is a developer feature.
     * Score and best times are meaningless after using this.
     */
    skipCurrentChallenge: function() {
      this.playStateProperty.set( PlayState.NEXT );
      this.playStateProperty.set( PlayState.FIRST_CHECK );
    },

    /**
     * Replays the current challenge.
     * This is a developer feature.
     * Score and best times are meaningless after using this.
     */
    replayCurrentChallenge: function() {
      this.challengeProperty.get().reset();
      this.challengeIndexProperty.set( this.challengeIndexProperty.get() - 1 );
      this.challengeProperty.set( DUMMY_CHALLENGE ); // force an update
      this.playStateProperty.set( PlayState.FIRST_CHECK );
    },

    // Updates the best time for the current level, at the end of a timed game with a perfect score.
    updateBestTime: function() {
      assert && assert( !this.timer.isRunning );
      if ( this.timerEnabledProperty.get() && this.isPerfectScore() ) {
        var level = this.levelProperty.get();
        var time = this.timer.elapsedTime;
        this.isNewBestTime = false;
        if ( !this.bestTimes[ level ] ) {
          // there was no previous time for this level
          this.bestTimes[ level ] = time;
        }
        else if ( time < this.bestTimes[ level ] ) {
          // we have a new best time for this level
          this.bestTimes[ level ] = time;
          this.isNewBestTime = true;
        }
      }
    },

    // initializes a new set of challenges for the current level
    initChallenges: function() {
      this.challengeIndexProperty.set( -1 );
      var level = this.levelProperty.get();
      if ( USE_HARD_CODED_CHALLENGES ) {
        this.challenges = ChallengeFactoryHardCoded.createChallenges( level, GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
      }
      else {
        assert && assert( level >= 0 && level < factories.length );
        this.challenges = factories[level].createChallenges( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
      }
      this.challengesPerGameProperty.set( this.challenges.length );
    }
  };

  /**
   * Property used for the game phase.
   * It has a 'hook' function that is called before the value is changed.
   * This is useful for setting the various state parameters of the game before
   * notifying observes that the game phase has changed.
   * @param {GamePhase} value
   * @param {function} hook function with one parameter of type {GamePhase}
   * @constructor
   */
  function GamePhaseProperty( value, hook ) {
    this.hook = hook;
    Property.call( this, value );
  }

  inherit( Property, GamePhaseProperty, {
    /** @override */
    set: function( value ) {
      this.hook( value );
      Property.prototype.set.call( this, value );
    }
  } );

  return LineGameModel;
} );