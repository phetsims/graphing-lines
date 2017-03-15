// Copyright 2013-2015, University of Colorado Boulder

/**
 * Creates game challenges for Level 1, as specified in the design document.
 * Slope, intercept, and point (x1,y1) are all uniquely chosen.
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
  var Range = require( 'DOT/Range' );
  var RandomChooser = require( 'GRAPHING_LINES/linegame/model/RandomChooser' );
  var ValuePool = require( 'GRAPHING_LINES/linegame/model/ValuePool' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Object} options
   * @constructor
   */
  function ChallengeFactory1( options ) {
    ChallengeFactory.call( this, options );
  }

  graphingLines.register( 'ChallengeFactory1', ChallengeFactory1 );

  return inherit( ChallengeFactory, ChallengeFactory1, {

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

      // pools of values for points, slope and y-intercept
      var pointPool = new ValuePool( this.createPointArrays() );
      var slopePool = new ValuePool( this.createSlopeArrays() );
      var yInterceptPool = new ValuePool( this.createYInterceptArrays() );

      // CHALLENGE 1: Graph-the-Line, slope-intercept form, slope variable
      slope = slopePool.chooseRequired();
      yIntercept = yInterceptPool.chooseOptional();
      challenges.push( new GraphTheLine( 'required slopes, slope variable',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE,
        this.xRange, this.yRange ) );

      // CHALLENGE 2: Graph-the-Line, slope-intercept form, intercept variable
      slope = slopePool.chooseOptional();
      yIntercept = yInterceptPool.chooseRequired();
      challenges.push( new GraphTheLine( 'required y-intercept, y-intercept variable',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT, ManipulationMode.INTERCEPT,
        this.xRange, this.yRange ) );

      // CHALLENGE 3: Make-the-Equation, slope-intercept form, slope variable
      slope = slopePool.chooseRequired();
      yIntercept = yInterceptPool.chooseOptional();
      challenges.push( new MakeTheEquation( 'required slope, slope variable',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE,
        this.xRange, this.yRange ) );

      // CHALLENGE 4: Make-the-Equation, slope-intercept form, intercept variable
      slope = slopePool.chooseOptional();
      yIntercept = yInterceptPool.chooseRequired();
      challenges.push( new MakeTheEquation( 'required y-intercept, y-intercept variable',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT, ManipulationMode.INTERCEPT,
        this.xRange, this.yRange ) );

      // for point-slope form, one of each manipulation mode
      var pointSlopeManipulationModes = [ ManipulationMode.POINT, ManipulationMode.SLOPE ];

      // CHALLENGE 5: Graph-the-Line, point-slope form, point or slope variable (random choice)
      {
        // manipulation mode
        manipulationMode = RandomChooser.choose( pointSlopeManipulationModes );

        if ( manipulationMode === ManipulationMode.SLOPE ) {
          point = pointPool.chooseOptional();
          slope = slopePool.chooseRequired(); // third required slope, unique
          description = 'required slope, slope variable';
        }
        else {
          point = pointPool.chooseRequired();
          slope = slopePool.chooseOptional();
          description = 'require point, point variable';
        }

        // challenge
        challenges.push( new GraphTheLine( description,
          Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator ),
          EquationForm.POINT_SLOPE, manipulationMode,
          this.xRange, this.yRange ) );
      }

      // CHALLENGE 6: Make-the-Equation, point-slope form, point or slope variable (whichever was not chosen above)
      {
        // manipulation mode
        manipulationMode = RandomChooser.choose( pointSlopeManipulationModes );

        if ( manipulationMode === ManipulationMode.SLOPE ) {
          point = pointPool.chooseOptional();
          slope = slopePool.chooseRequired();
          description = 'required slope, slope variable';
        }
        else {
          point = pointPool.chooseRequired();
          slope = slopePool.chooseOptional();
          description = 'required point, point variable';
        }

        // challenge
        challenges.push( new MakeTheEquation( description,
          Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator ),
          EquationForm.POINT_SLOPE, manipulationMode,
          this.xRange, this.yRange ) );
      }

      return challenges;
    },

    /**
     * Creates the points used in point manipulation challenges.
     * (x1,y1) must be in Quadrant 1 (both coordinates positive) or Quadrant 3 (both coordinates negative)
     * @returns {Vector2[][]}
     */
    createPointArrays: function() {

      var x1Range = new Range( -9, 4 );
      var y1Range = new Range( -9, 4 );
      assert && assert( this.xRange.containsRange( x1Range ) && this.yRange.containsRange( y1Range ) );

      var x;
      var y;

      // all points in Quadrant 1
      var quadrant1Points = [];
      for ( x = 1; x < this.xRange.max; x++ ) {
        for ( y = 1; y < this.yRange.max; y++ ) {
          quadrant1Points.push( new Vector2( x, y ) );
        }
      }

      // all points in Quadrant 3
      var quadrant3Points = [];
      for ( x = x1Range.min; x < 0; x++ ) {
        for ( y = y1Range.min; y < 0; y++ ) {
          quadrant3Points.push( new Vector2( x, y ) );
        }
      }

      return [ quadrant1Points, quadrant3Points ];
    },

    /**
     * Creates the sets of slopes used for generating challenges.
     * @returns {Fraction[][]}
     * @protected
     */
    createSlopeArrays: function() {
      return [
        [ new Fraction( 3, 2 ), new Fraction( 4, 3 ), new Fraction( 5, 2 ), new Fraction( 5, 3 ) ],
        [ new Fraction( 1, 2 ), new Fraction( 1, 3 ), new Fraction( 1, 4 ), new Fraction( 1, 5 ) ],
        [ new Fraction( 2, 3 ), new Fraction( 3, 4 ), new Fraction( 3, 5 ), new Fraction( 2, 5 ) ]
      ];
    },

    /**
     * Creates the sets of y-intercepts used for generating challenges.
     * @returns {number[][]}
     * @protected
     */
    createYInterceptArrays: function() {
      var yRangeSubset = new Range( -6, 4 );
      assert && assert( this.yRange.containsRange( yRangeSubset ), 'values are out of range' );
      return [
        ValuePool.rangeToArray( new Range( yRangeSubset.min, -1 ) ), // negative intercepts
        ValuePool.rangeToArray( new Range( 1, yRangeSubset.max ) )   // positive intercepts
      ];
    }
  } );
} );