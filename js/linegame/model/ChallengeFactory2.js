// Copyright 2013-2015, University of Colorado Boulder

/**
 * Creates game challenges for Level 2, as specified in the design document.
 * Slope and intercept are uniquely chosen.
 * Point (x1,y1) is not unique, but is chosen such that slope indicator is on the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ChallengeFactory = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory' );
  var EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var MakeTheEquation = require( 'GRAPHING_LINES/linegame/model/MakeTheEquation' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var RandomChooser = require( 'GRAPHING_LINES/linegame/model/RandomChooser' );
  var Range = require( 'DOT/Range' );
  var ValuePool = require( 'GRAPHING_LINES/linegame/model/ValuePool' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function ChallengeFactory2( options ) {
    ChallengeFactory.call( this, options );
  }

  graphingLines.register( 'ChallengeFactory2', ChallengeFactory2 );

  return inherit( ChallengeFactory, ChallengeFactory2, {

    /**
     * Creates challenges for this game level.
     * @return {Challenge[]} array of challenges
     * @public
     * @override
     */
    createChallenges: function() {

      var challenges = [];

      // hoist vars
      var slope;
      var yIntercept;
      var point;
      var description;
      var manipulationMode;

      // pools of values for slope, y-intercept and point
      var slopePool = new ValuePool( this.createSlopeArrays() );
      var yInterceptPool = new ValuePool( this.createYInterceptArrays() );

      // CHALLENGE 1: Graph-the-Line, slope-intercept form
      slope = slopePool.chooseRequired();
      yIntercept = yInterceptPool.chooseOptional();
      challenges.push( new GraphTheLine( 'required slope, slope variable',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT,
        ManipulationMode.SLOPE,
        this.xRange, this.yRange ) );

      // CHALLENGE 2: Graph-the-Line, slope-intercept form
      slope = slopePool.chooseOptional();
      yIntercept = yInterceptPool.chooseRequired();
      challenges.push( new GraphTheLine( 'required y-intercept, y-intercept variable',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT,
        ManipulationMode.INTERCEPT,
        this.xRange, this.yRange ) );

      // CHALLENGE 3: Make-the-Equation, slope-intercept form
      slope = slopePool.chooseRequired();
      yIntercept = yInterceptPool.chooseOptional();
      challenges.push( new MakeTheEquation( 'required slope, slope variable',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT,
        ManipulationMode.SLOPE,
        this.xRange, this.yRange ) );

      // CHALLENGE 4: Make-the-Equation, slope-intercept form
      slope = slopePool.chooseOptional();
      yIntercept = yInterceptPool.chooseRequired();
      challenges.push( new MakeTheEquation( 'required y-intercept, y-intercept variable',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT,
        ManipulationMode.INTERCEPT,
        this.xRange, this.yRange ) );

      // for point-slope form, one of each manipulation mode
      var pointSlopeManipulationModes = [ ManipulationMode.POINT, ManipulationMode.SLOPE ];

      // CHALLENGE 5: Graph-the-Line, point-slope form, point or slope variable (random choice)
      {
        // manipulation mode
        manipulationMode = RandomChooser.choose( pointSlopeManipulationModes );

        if ( manipulationMode === ManipulationMode.SLOPE ) {
          slope = slopePool.chooseRequired();
          description = 'required slope, slope variable';
        }
        else {
          slope = slopePool.chooseOptional();
          description = 'point variable';
        }
        // random point, not necessarily unique
        point = ChallengeFactory.choosePointForSlope( slope, this.xRange, this.yRange );

        // challenge
        challenges.push( new GraphTheLine( description,
          Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator ),
          EquationForm.POINT_SLOPE,
          manipulationMode,
          this.xRange, this.yRange ) );
      }

      // CHALLENGE 6: Make-the-Equation, point-slope form, point or slope variable (whichever was not variable above)
      {
        // manipulation mode
        manipulationMode = RandomChooser.choose( pointSlopeManipulationModes );

        if ( manipulationMode === ManipulationMode.SLOPE ) {
          slope = slopePool.chooseRequired();
          description = 'required slope, slope variable';
        }
        else {
          slope = slopePool.chooseOptional();
          description = 'point variable';
        }
        // random point, not necessarily unique
        point = ChallengeFactory.choosePointForSlope( slope, this.xRange, this.yRange );

        // challenge
        challenges.push( new MakeTheEquation( description,
          Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator ),
          EquationForm.POINT_SLOPE,
          manipulationMode,
          this.xRange, this.yRange ) );
      }

      return challenges;
    },

    /**
     * Creates the 3 sets of slopes that are identified in the design document.
     * @returns {Fraction[][]}
     */
    createSlopeArrays: function() {
      return [

        // positive and negative integers
        [
          new Fraction( 1, 1 ),
          new Fraction( 2, 1 ),
          new Fraction( 3, 1 ),
          new Fraction( 4, 1 ),
          new Fraction( 5, 1 ),
          new Fraction( -1, 1 ),
          new Fraction( -2, 1 ),
          new Fraction( -3, 1 ),
          new Fraction( -4, 1 ),
          new Fraction( -5, 1 )
        ],

        // {Fraction[]} positive fractions
        ChallengeFactory2.createPositiveFractionalSlopes(),

        // negative fractions
        [
          new Fraction( -1, 2 ),
          new Fraction( -1, 3 ),
          new Fraction( -1, 4 ),
          new Fraction( -1, 5 ),
          new Fraction( -2, 3 ),
          new Fraction( -3, 4 ),
          new Fraction( -2, 5 ),
          new Fraction( -3, 5 ),
          new Fraction( -4, 5 ),
          new Fraction( -3, 2 ),
          new Fraction( -4, 3 ),
          new Fraction( -5, 2 ),
          new Fraction( -5, 3 ),
          new Fraction( -5, 4 )
        ]
      ];
    },

    /**
     * Creates the sets of y-intercepts used for generating challenges.
     * @returns {number[][]}
     * @protected
     * @override
     */
    createYInterceptArrays: function() {
      return [
        ValuePool.rangeToArray( new Range( this.yRange.min, -1 ) ), // negative intercepts
        ValuePool.rangeToArray( new Range( 1, this.yRange.max ) )   // positive intercepts
      ];
    }
  }, {

    /**
     * Creates the set of positive fractional slopes that are identified in the design document.
     * @returns {Fraction[]}
     */
    createPositiveFractionalSlopes: function() {
      return [
        // positive fractions
        new Fraction( 1, 4 ),
        new Fraction( 1, 5 ),
        new Fraction( 1, 6 ),
        new Fraction( 1, 7 ),
        new Fraction( 2, 5 ),
        new Fraction( 3, 5 ),
        new Fraction( 2, 7 ),
        new Fraction( 3, 7 ),
        new Fraction( 4, 7 ),
        new Fraction( 5, 2 ),
        new Fraction( 3, 2 ),
        new Fraction( 7, 2 ),
        new Fraction( 7, 3 ),
        new Fraction( 7, 4 )
      ];
    }
  } );
} );