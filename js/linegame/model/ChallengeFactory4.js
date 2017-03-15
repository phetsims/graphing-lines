// Copyright 2013-2015, University of Colorado Boulder

/**
 * Creates game challenges for Level 4, as specified in the design document.
 * Uses the same sets of slopes and y-intercepts as Level 2, but generates different challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ChallengeFactory = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory' );
  var ChallengeFactory2 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory2' );
  var EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MakeTheEquation = require( 'GRAPHING_LINES/linegame/model/MakeTheEquation' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var ValuePool = require( 'GRAPHING_LINES/linegame/model/ValuePool' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function ChallengeFactory4( options ) {
    ChallengeFactory2.call( this, options );
  }

  graphingLines.register( 'ChallengeFactory4', ChallengeFactory4 );

  return inherit( ChallengeFactory2, ChallengeFactory4, {

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
      var point;
      var positiveSlopes;

      // pools of values for slope and y-intercept
      var slopePool = new ValuePool( this.createSlopeArrays() );
      var yInterceptPool = new ValuePool( this.createYInterceptArrays() );

      // equation form for 3rd challenge of each type
      var equationForms = [ EquationForm.SLOPE_INTERCEPT, EquationForm.POINT_SLOPE ];

      // CHALLENGE 1: Make-the-Equation, slope-intercept form
      challenges.push( new MakeTheEquation( 'required y-intercepts, slope and intercept variable',
        this.createSlopeInterceptLine( slopePool.chooseOptional(), yInterceptPool.chooseRequired() ),
        EquationForm.SLOPE_INTERCEPT,
        ManipulationMode.SLOPE_INTERCEPT,
        this.xRange, this.yRange ) );

      // CHALLENGE 2: Make-the-Equation, point-slope form
      slope = slopePool.chooseRequired();
      point = ChallengeFactory.choosePointForSlope( slope, this.xRange, this.yRange );
      challenges.push( new MakeTheEquation( 'required slope, point and slope variable',
        this.createPointSlopeLine( point, slope ),
        EquationForm.POINT_SLOPE,
        ManipulationMode.POINT_SLOPE,
        this.xRange, this.yRange ) );

      // CHALLENGE 3: Make-the-Equation, slope-intercept or point-slope form (random choice)
      if ( ValuePool.choose( equationForms ) === EquationForm.SLOPE_INTERCEPT ) {

        // Make-the-Equation, slope-intercept form
        challenges.push( new MakeTheEquation( 'slope and intercept variable',
          this.createSlopeInterceptLine( slopePool.chooseOptional(), yInterceptPool.chooseOptional() ),
          EquationForm.SLOPE_INTERCEPT,
          ManipulationMode.SLOPE_INTERCEPT,
          this.xRange, this.yRange ) );
      }
      else {

        // Make-the-Equation, point-slope form
        slope = slopePool.chooseRequired();
        point = ChallengeFactory.choosePointForSlope( slope, this.xRange, this.yRange );
        challenges.push( new MakeTheEquation( 'required slopes, point and slope variable',
          this.createPointSlopeLine( point, slope ),
          EquationForm.POINT_SLOPE,
          ManipulationMode.POINT_SLOPE,
          this.xRange, this.yRange ) );
      }

      // CHALLENGE 4: Graph-the-Line, slope-intercept form, slope and intercept variable
      challenges.push( new GraphTheLine( 'required y-intercept, slope and intercept variable',
        this.createSlopeInterceptLine( slopePool.chooseOptional(), yInterceptPool.chooseRequired() ),
        EquationForm.SLOPE_INTERCEPT,
        ManipulationMode.SLOPE_INTERCEPT,
        this.xRange, this.yRange ) );

      // CHALLENGE 5: Graph-the-Line, point-slope form
      slope = slopePool.chooseRequired();
      point = ChallengeFactory.choosePointForSlope( slope, this.xRange, this.yRange );
      challenges.push( new GraphTheLine( 'required slope, point and slope variable',
        this.createPointSlopeLine( point, slope ),
        EquationForm.POINT_SLOPE,
        ManipulationMode.POINT_SLOPE,
        this.xRange, this.yRange ) );

      // CHALLENGE 6: Graph-the-Line, slope-intercept or point-slope form (random choice), 2 points.
      // Choose y-intercept or point such that (x2,y2) is off the graph, so that user is forced to invert the slope.
      {
        // choose a positive fractional slope
        positiveSlopes = ChallengeFactory2.createPositiveFractionalSlopes();
        positiveSlopes.push( new Fraction( 2, 1 ) );
        positiveSlopes.push( new Fraction( 3, 1 ) );
        positiveSlopes.push( new Fraction( 4, 1 ) );
        positiveSlopes.push( new Fraction( 5, 1 ) );
        slope = ValuePool.choose( positiveSlopes );

        point = ChallengeFactory.choosePointForSlopeInversion( slope, this.xRange, this.yRange );

        if ( ValuePool.choose( equationForms ) === EquationForm.SLOPE_INTERCEPT ) {

          // Graph-the-Line, slope-intercept, 2 points variable
          challenges.push( new GraphTheLine( 'force slope inversion, 2 points variable',
            this.createSlopeInterceptLine( slope, point.y ),
            EquationForm.SLOPE_INTERCEPT,
            ManipulationMode.TWO_POINTS,
            this.xRange, this.yRange ) );
        }
        else {

          // Graph-the-Line, point-slope, 2 points variable
          challenges.push( new GraphTheLine( 'force slope inversion, 2 points variable',
            this.createPointSlopeLine( point, slope ),
            EquationForm.POINT_SLOPE,
            ManipulationMode.TWO_POINTS,
            this.xRange, this.yRange ) );
        }
      }

      return challenges;
    }
  } );
} );