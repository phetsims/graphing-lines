// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the "Line Game" screen. Responsibilities include:
 * <ul>
 * <li>creation of challenges (delegated to factory)</li>
 * <li>management of game state</li>
 * <li>management of game results</li>
 * </ul>
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var callSuper = require( 'PHET_CORE/callSuper' );
  var ChallengeFactoryHardCoded = require( 'GRAPHING_LINES/linegame/model/ChallengeFactoryHardCoded' );
  var EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GameResults = require( 'GRAPHING_LINES/linegame/model/GameResults' );
  var GameSettings = require( 'GRAPHING_LINES/linegame/model/GameSettings' );
  var GameTimer = require( 'GRAPHING_LINES/linegame/model/GameTimer' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var PlayState = require( 'GRAPHING_LINES/linegame/model/PlayState' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );

  // constants
  var USE_HARD_CODED_CHALLENGES = true; //TODO set to false
  var MAX_POINTS_PER_CHALLENGE = 2;
  var NUMBER_OF_LEVELS = 6;
  var DUMMY_CHALLENGE = new GraphTheLine( "", Line.createSlopeIntercept( 1, 1, 1 ), EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE, GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );

  //TODO uncomment these when they're implemented
  // a challenge factory for each level
  var factory0 = null;//new ChallengeFactory0();
  var factory1 = null;//new ChallengeFactory1();
  var factory2 = null;//new ChallengeFactory2();
  var factory3 = null;//new ChallengeFactory3();
  var factory4 = null;//new ChallengeFactory4();
  var factory5 = null;//new ChallengeFactory5();

  function LineGameModel() {

    var thisModel = this;

    thisModel.settings = new GameSettings( NUMBER_OF_LEVELS, true /* soundEnabled */, true /* timerEnabled */ );
    thisModel.timer = new GameTimer();
    thisModel.results = new GameResults( NUMBER_OF_LEVELS );
    thisModel.challengeIndex = 0;
    thisModel.challengeProperty = new Property( DUMMY_CHALLENGE ); //TODO is DUMMY_CHALLENGE needed?
    thisModel.challenges = []; // Array<Challenge>
    thisModel.playStateProperty = new Property( PlayState.NONE );

    thisModel.gamePhaseProperty = new PropertyWithHook( GamePhase.SETTINGS,
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
          thisModel.results.scoreProperty.set( 0 );
          thisModel.timer.start();
        }
        else if ( gamePhase === GamePhase.RESULTS ) {
          thisModel.playStateProperty.set( PlayState.NONE );
          thisModel.timer.stop();
          thisModel.updateBestTime();
        }
        else {
          throw new Error( "unsupported game phase = " + gamePhase );
        }
      } );

    thisModel.initChallenges();

    //TODO document why this has to (seemingly?) be done after initChallenges
    thisModel.playStateProperty.link( function( playState ) {
      if ( playState === PlayState.FIRST_CHECK ) {
        if ( thisModel.challengeIndex === thisModel.challenges.length ) {
          // game has been completed
          thisModel.gamePhaseProperty.set( GamePhase.RESULTS );
        }
        else {
          // next challenge
          thisModel.challengeProperty.set( thisModel.challenges[thisModel.challengeIndex] );
          thisModel.challengeIndex++;
        }
      }
      else if ( playState === PlayState.NEXT ) {
        thisModel.challengeProperty.get().setAnswerVisible( true );
      }
    } );
  }

  LineGameModel.prototype = {

    step: function() { /* no animation, do nothing */ },

    isPerfectScore: function() {
      return this.results.scoreProperty.get() === this.getPerfectScore();
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
      this.challengeIndex--;
      this.challengeProperty.set( DUMMY_CHALLENGE ); // force an update
      this.playStateProperty.set( PlayState.FIRST_CHECK );
    },

    // Updates the best time for the current level, at the end of a timed game with a perfect score.
    updateBestTime: function() {
      assert && assert( !this.timer.isRunning() );
      if ( this.settings.timerEnabledProperty.get() && this.isPerfectScore() ) {
        this.results.updateBestTime( this.settings.levelProperty.get(), this.timer.timeProperty.get() );
      }
    },

    // initializes a new set of challenges for the current level
    initChallenges: function() {

      this.challengeIndex = 0;

      if ( USE_HARD_CODED_CHALLENGES ) {
        this.challenges = ChallengeFactoryHardCoded.createChallenges( this.settings.levelProperty.get(), GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
      }
      else {
        switch( this.settings.level.get() ) {
          case 0:
            this.challenges = factory1.createChallenges( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
            break;
          case 1:
            this.challenges = factory2.createChallenges( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
            break;
          case 2:
            this.challenges = factory3.createChallenges( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
            break;
          case 3:
            this.challenges = factory4.createChallenges( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
            break;
          case 4:
            this.challenges = factory5.createChallenges( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
            break;
          case 5:
            this.challenges = factory6.createChallenges( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
            break;
          default:
            throw new Error( "unsupported level: " + this.settings.levelProperty.get() );
        }
      }
    }
  };

  //TODO revisit this later
  function PropertyWithHook( value, hook ) {
    this.hook = hook;
    Property.call( this, value );
  }

  inherit( Property, PropertyWithHook, {
    //@override
    set: function( value ) {
      this.hook( value );
      callSuper( Property, 'set', this, value );
    }
  } );

  return LineGameModel;
} );