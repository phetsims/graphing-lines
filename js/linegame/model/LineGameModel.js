// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the 'Line Game' screen. Responsibilities include:
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

  // modules
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
  var GLQueryParameters = require( 'GRAPHING_LINES/common/GLQueryParameters' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var PlayState = require( 'GRAPHING_LINES/linegame/model/PlayState' );
  var Property = require( 'AXON/Property' );

  // constants
  var DUMMY_CHALLENGE = new GraphTheLine( '', Line.createSlopeIntercept( 1, 1, 1 ),
    EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE, GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );

  // a challenge factory for each level
  var factories = [
    new ChallengeFactory1(),
    new ChallengeFactory2(),
    new ChallengeFactory3(),
    new ChallengeFactory4(),
    new ChallengeFactory5(),
    new ChallengeFactory6()
  ];

  /**
   * @constructor
   */
  function LineGameModel() {

    var self = this;

    // @public Properties
    this.levelProperty = new Property( 0 );
    this.soundEnabledProperty = new Property( true );
    this.timerEnabledProperty = new Property( false );
    this.scoreProperty = new Property( 0 ); // {number} how many points the user has earned for the current game
    this.challengeProperty = new Property( DUMMY_CHALLENGE );
    this.challengeIndexProperty = new Property( 0 );
    this.challengesPerGameProperty = new Property( 0 );
    this.playStateProperty = new Property( PlayState.NONE );

    // @public
    this.challenges = []; // {Challenge[]}
    this.timer = new GameTimer();
    this.numberOfLevels = factories.length;
    this.maxPointsPerChallenge = 2;
    this.bestScoreProperties = []; // best scores for each level, array of Property.<number>
    this.bestTimeProperties = []; // best times for each level, in ms, array of Property.<number>
    this.isNewBestTime = false; // is the time for the most-recently-completed game a new best time?
    for ( var level = 0; level < this.numberOfLevels; level++ ) {
      this.bestScoreProperties.push( new Property( 0 ) );
      this.bestTimeProperties.push( new Property( null ) ); // null if a level has no best time yet
    }

    // @public
    this.gamePhaseProperty = new GamePhaseProperty( GamePhase.SETTINGS,
      /*
       * This function will be called prior to setting the property value.
       * Updates fields so that they are accurate before property listeners are notified.
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
          self.timer.stop();
          self.updateBestTime();
        }
        else {
          throw new Error( 'unsupported game phase: ' + gamePhase );
        }
      } );

    this.initChallenges();

    // Do this after initChallenges, because this will fire immediately and needs to have an initial set of challenges.
    this.playStateProperty.link( function( playState ) {
      if ( playState === PlayState.FIRST_CHECK ) {

        var challengeIndex = self.challengeIndexProperty.get();
        var level = self.levelProperty.get();
        var score = self.scoreProperty.get();

        if ( challengeIndex === self.challenges.length - 1 ) {
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
  }

  graphingLines.register( 'LineGameModel', LineGameModel );

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
    this.hook = hook; // @private
    Property.call( this, value );
  }

  graphingLines.register( 'LineGameModel.GamePhaseProperty', GamePhaseProperty );

  inherit( Property, GamePhaseProperty, {
    /** @override */
    set: function( value ) {
      this.hook( value );
      Property.prototype.set.call( this, value );
    }
  } );

  return inherit( Object, LineGameModel, {

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
      this.initChallenges(); // takes care of challengeProperty, challengeIndexProperty, challengesPerGameProperty
    },

    // @private resets the best score to zero for every level
    resetBestScores: function() {
      this.bestScoreProperties.forEach( function( property ) {
        property.set( 0 );
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
      assert && assert( !this.timer.isRunning );
      if ( this.timerEnabledProperty.get() && this.isPerfectScore() ) {
        var level = this.levelProperty.get();
        var time = this.timer.elapsedTime;
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
      this.challengeIndexProperty.set( -1 );
      var level = this.levelProperty.get();
      if ( GLQueryParameters.HARD_CODED ) {
        console.log( 'using hard-coded challenges for debugging' );
        this.challenges = ChallengeFactoryHardCoded.createChallenges( level, GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
      }
      else {
        assert && assert( level >= 0 && level < factories.length );
        this.challenges = factories[ level ].createChallenges( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
      }
      this.challengesPerGame = this.challenges.length;
    }
  } );
} );