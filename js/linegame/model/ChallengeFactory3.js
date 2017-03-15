// Copyright 2013-2015, University of Colorado Boulder

/**
 * Creates game challenges for Level 3, as specified in the design document.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ChallengeFactory = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory' );
  var ChallengeFactory2 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory2' );
  var EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var MakeTheEquation = require( 'GRAPHING_LINES/linegame/model/MakeTheEquation' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var RandomChooser = require( 'GRAPHING_LINES/linegame/model/RandomChooser' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function ChallengeFactory3( options ) {
    ChallengeFactory.call( this, options );
  }

  graphingLines.register( 'ChallengeFactory3', ChallengeFactory3 );

  return inherit( ChallengeFactory, ChallengeFactory3, {

    /**
     * Creates challenges for this game level.
     * @param {Range} xRange - range of the graph's x axis
     * @param {Range} yRange - range of the graph's y axis
     * @return {Challenge[]} array of challenges
     * @public
     * @override
     */
    createChallenges: function() {

      // all variables, manually hoisted
      var challenges = [];
      var slopeArrays;
      var slopeArrayIndices;
      var yInterceptArrays;
      var yInterceptArrayIndices;
      var equationForms;
      var slope;
      var yIntercept;
      var point;

      var xRange = this.xRange;
      var yRange = this.yRange;

      // for slope manipulation challenges, 1 slope must come from each list
      slopeArrays = ChallengeFactory2.createSlopeArrays(); // same slopes as level 1
      slopeArrayIndices = RandomChooser.rangeToArray( new RangeWithValue( 0, slopeArrays.length - 1 ) );

      // for y-intercept manipulation challenges, one must be positive, one negative
      yInterceptArrays = [
        RandomChooser.rangeToArray( new RangeWithValue( yRange.min, -1 ) ),
        RandomChooser.rangeToArray( new RangeWithValue( 1, yRange.max ) )
      ];
      yInterceptArrayIndices = RandomChooser.rangeToArray( new RangeWithValue( 0, yInterceptArrays.length - 1 ) );

      // equation form for 3rd challenge of each type
      equationForms = [ EquationForm.SLOPE_INTERCEPT, EquationForm.POINT_SLOPE ];

      // CHALLENGE 1: Graph-the-Line, slope-intercept form, slope and intercept variable
      slope = RandomChooser.chooseFromArrays( slopeArrays ); // unique slope
      yIntercept = RandomChooser.chooseFromArrays( yInterceptArrays, yInterceptArrayIndices ); // first required y-intercept, unique
      challenges.push( new GraphTheLine( '1 of 2 required y-intercepts',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE_INTERCEPT, xRange, yRange ) );

      // CHALLENGE 2: Graph-the-Line, point-slope form, point and slope variable
      slope = RandomChooser.chooseFromArrays( slopeArrays, slopeArrayIndices ); // first required slope, unique
      point = ChallengeFactory.choosePointForSlope( slope, xRange, yRange ); // random point, not necessarily unique
      challenges.push( new GraphTheLine( '1 of 3 required slopes',
        Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator ),
        EquationForm.POINT_SLOPE, ManipulationMode.POINT_SLOPE, xRange, yRange ) );

      // CHALLENGE 3: Graph-the-Line, slope-intercept or point-slope form (random choice), 2 variables
      if ( RandomChooser.choose( equationForms ) === EquationForm.SLOPE_INTERCEPT ) {

        // Graph-the-Line, slope-intercept form, slope and intercept variable
        slope = RandomChooser.chooseFromArrays( slopeArrays, slopeArrayIndices ); // second required slope, unique
        yIntercept = RandomChooser.chooseFromArrays( yInterceptArrays ); // unique y-intercept
        challenges.push( new GraphTheLine( 'random choice of slope-intercept, 2 of 2 required slopes',
          Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
          EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE_INTERCEPT, xRange, yRange ) );
      }
      else {

        // Graph-the-Line, point-slope form, point and slope variable
        slope = RandomChooser.chooseFromArrays( slopeArrays ); // unique slope
        point = ChallengeFactory.choosePointForSlope( slope, xRange, yRange ); // random point, not necessarily unique
        challenges.push( new GraphTheLine( 'random choice of point-slope',
          Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator ),
          EquationForm.POINT_SLOPE, ManipulationMode.POINT_SLOPE, xRange, yRange ) );
      }

      // CHALLENGE 4: Make-the-Equation, slope-intercept form, slope and intercept variable
      slope = RandomChooser.chooseFromArrays( slopeArrays ); // unique slope
      yIntercept = RandomChooser.chooseFromArrays( yInterceptArrays, yInterceptArrayIndices ); // second required y-intercept
      challenges.push( new MakeTheEquation( '2 of 2 required y-intercepts',
        Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
        EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE_INTERCEPT, xRange, yRange ) );

      // CHALLENGE 5: Make-the-Equation, point-slope form, point and slope variable
      slope = RandomChooser.chooseFromArrays( slopeArrays, slopeArrayIndices ); // 3rd required slope, unique
      point = ChallengeFactory.choosePointForSlope( slope, xRange, yRange ); // random point, not necessarily unique
      challenges.push( new MakeTheEquation( '3 of 3 required slopes',
        Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator ),
        EquationForm.POINT_SLOPE, ManipulationMode.POINT_SLOPE, xRange, yRange ) );

      // CHALLENGE 6: Make-the-Equation, slope-intercept or point-slope form (whichever wasn't chosen above), 2 variables
      if ( RandomChooser.choose( equationForms ) === EquationForm.SLOPE_INTERCEPT ) {

        // Make-the-Equation, slope-intercept, slope and intercept variable
        slope = RandomChooser.chooseFromArrays( slopeArrays ); // unique slope
        yIntercept = RandomChooser.chooseFromArrays( yInterceptArrays ); // unique y-intercept
        challenges.push( new MakeTheEquation( 'slope-intercept because Graph-the-Line uses point-slope',
          Line.createSlopeIntercept( slope.numerator, slope.denominator, yIntercept ),
          EquationForm.SLOPE_INTERCEPT, ManipulationMode.SLOPE_INTERCEPT, xRange, yRange ) );
      }
      else {

        // Make-the-Equation, point-slope form, point and slope variable
        slope = RandomChooser.chooseFromArrays( slopeArrays ); // unique slope
        point = ChallengeFactory.choosePointForSlope( slope, xRange, yRange ); // random point, not necessarily unique
        challenges.push( new MakeTheEquation( 'point-slope because Graph-the-Line uses slope-intercept',
          Line.createPointSlope( point.x, point.y, slope.numerator, slope.denominator ),
          EquationForm.POINT_SLOPE, ManipulationMode.POINT_SLOPE, xRange, yRange ) );
      }

      return challenges;
    }
  } );
} );