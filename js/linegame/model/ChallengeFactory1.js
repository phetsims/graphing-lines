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

      // all variables, manually hoisted
      var challenges = [];
      var x;
      var y;
      var x1Range;
      var y1Range;
      var yInterceptRange;
      var pointArrays;
      var pointArrayIndices;
      var quadrant1Points;
      var quadrant3Points;
      var slopeArrays;
      var slopeArrayIndices;
      var yInterceptArrays;
      var yInterceptArrayIndices;
      var pointSlopeManipulationModes;
      var slope;
      var yIntercept;
      var point;
      var description;
      var manipulationMode;

      var xRange = this.xRange;
      var yRange = this.yRange;

      // for point manipulation challenges, (x1,y1) must be in Quadrant 1 (both coordinates positive) or Quadrant 3 (both coordinates negative)
      {
        x1Range = new Range( -9, 4 );
        y1Range = new Range( -9, 4 );
        assert && assert( xRange.containsRange( x1Range ) && yRange.containsRange( y1Range ) );

        // all points in Quadrant 1
        quadrant1Points = [];
        for ( x = 1; x < xRange.max; x++ ) {
          for ( y = 1; y < yRange.max; y++ ) {
            quadrant1Points.push( new Vector2( x, y ) );
          }
        }

        // all points in Quadrant 3
        quadrant3Points = [];
        for ( x = x1Range.min; x < 0; x++ ) {
          for ( y = y1Range.min; y < 0; y++ ) {
            quadrant3Points.push( new Vector2( x, y ) );
          }
        }

        pointArrays = [ quadrant1Points, quadrant3Points ];
        pointArrayIndices = RandomChooser.rangeToArray( new Range( 0, pointArrays.length - 1 ) );
      }

      // for slope manipulation challenges, 1 slope must come from each list
      slopeArrays = [
        [ new Fraction( 3, 2 ), new Fraction( 4, 3 ), new Fraction( 5, 2 ), new Fraction( 5, 3 ) ],
        [ new Fraction( 1, 2 ), new Fraction( 1, 3 ), new Fraction( 1, 4 ), new Fraction( 1, 5 ) ],
        [ new Fraction( 2, 3 ), new Fraction( 3, 4 ), new Fraction( 3, 5 ), new Fraction( 2, 5 ) ]
      ];
      slopeArrayIndices = RandomChooser.rangeToArray( new Range( 0, slopeArrays.length - 1 ) );

      // for y-intercept manipulation challenges, one must be positive, one negative
      yInterceptRange = new Range( -6, 4 );
      assert && assert( yRange.containsRange( yInterceptRange ) );
      yInterceptArrays = [
        RandomChooser.rangeToArray( new Range( yInterceptRange.min, -1 ) ),
        RandomChooser.rangeToArray( new Range( 1, yInterceptRange.max ) )
      ];
      yInterceptArrayIndices = RandomChooser.rangeToArray( new Range( 0, yInterceptArrays.length - 1 ) );

      // for point-slope form, one of each manipulation mode
      pointSlopeManipulationModes = [ ManipulationMode.POINT, ManipulationMode.SLOPE ];

      // CHALLENGE 1: Graph-the-Line, slope-intercept form, slope variable
      slope = RandomChooser.chooseFromArrays( slopeArrays, slopeArrayIndices ); // first required slope
      yIntercept = RandomChooser.chooseFromArrays( yInterceptArrays ); // unique y-intercept
      challenges.push( new GraphTheLine( '1 of 3 required slopes',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE, xRange, yRange ) );

      // CHALLENGE 2: Graph-the-Line, slope-intercept form, intercept variable
      slope = RandomChooser.chooseFromArrays( slopeArrays ); // unique slope
      yIntercept = RandomChooser.chooseFromArrays( yInterceptArrays, yInterceptArrayIndices ); // first required y-intercept, unique
      challenges.push( new GraphTheLine( '1 of 2 required y-intercepts',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT, ManipulationMode.INTERCEPT, xRange, yRange ) );

      // CHALLENGE 3: Make-the-Equation, slope-intercept form, slope variable
      slope = RandomChooser.chooseFromArrays( slopeArrays, slopeArrayIndices ); // second required slope, unique
      yIntercept = RandomChooser.chooseFromArrays( yInterceptArrays ); // unique y-intercept
      challenges.push( new MakeTheEquation( '2 of 3 required slopes',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE, xRange, yRange ) );

      // CHALLENGE 4: Make-the-Equation, slope-intercept form, intercept variable
      slope = RandomChooser.chooseFromArrays( slopeArrays ); // unique slope
      yIntercept = RandomChooser.chooseFromArrays( yInterceptArrays, yInterceptArrayIndices ); // second required y-intercept, unique
      challenges.push( new MakeTheEquation( '2 of 2 required y-intercepts',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT, ManipulationMode.INTERCEPT, xRange, yRange ) );

      // CHALLENGE 5: Graph-the-Line, point-slope form, point or slope variable (random choice)
      {
        // manipulation mode
        manipulationMode = RandomChooser.choose( pointSlopeManipulationModes );

        if ( manipulationMode === ManipulationMode.SLOPE ) {
          point = RandomChooser.chooseFromArrays( pointArrays ); // unique point
          slope = RandomChooser.chooseFromArrays( slopeArrays, slopeArrayIndices ); // third required slope, unique
          description = 'random choice to manipulate slope, 3 of 3 required slopes';
        }
        else {
          point = RandomChooser.chooseFromArrays( pointArrays, pointArrayIndices ); // first required point, unique
          slope = RandomChooser.chooseFromArrays( slopeArrays ); // unique slope
          description = 'random choice to manipulate point, 1 of 2 required points';
        }

        // challenge
        challenges.push( new GraphTheLine( description,
          Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator ),
          EquationForm.POINT_SLOPE, manipulationMode, xRange, yRange ) );
      }

      // CHALLENGE 6: Make-the-Equation, point-slope form, point or slope variable (whichever was not chosen above)
      {
        // manipulation mode
        manipulationMode = RandomChooser.choose( pointSlopeManipulationModes );

        if ( manipulationMode === ManipulationMode.SLOPE ) {
          point = RandomChooser.chooseFromArrays( pointArrays ); // unique point
          slope = RandomChooser.chooseFromArrays( slopeArrays, slopeArrayIndices ); // third required slope, unique
          description = 'manipulate slope because Graph-the-Line uses point, 3 of 3 required slopes';
        }
        else {
          point = RandomChooser.chooseFromArrays( pointArrays, pointArrayIndices ); // second required point, unique
          slope = RandomChooser.chooseFromArrays( slopeArrays ); // unique slope
          description = 'manipulate point because Graph-the-Line uses slope, 2 of 2 required points';
        }

        // challenge
        challenges.push( new MakeTheEquation( description,
          Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator ),
          EquationForm.POINT_SLOPE, manipulationMode, xRange, yRange ) );
      }

      return challenges;
    }
  } );
} );