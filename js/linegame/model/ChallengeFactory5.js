// Copyright 2013-2017, University of Colorado Boulder

/**
 * Creates game challenges for Level 5, as specified in the design document.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BaseChallengeFactory = require( 'GRAPHING_LINES/linegame/model/BaseChallengeFactory' );
  const Color = require( 'SCENERY/util/Color' );
  const EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  const Fraction = require( 'PHETCOMMON/model/Fraction' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'GRAPHING_LINES/common/model/Line' );
  const MakeTheEquation = require( 'GRAPHING_LINES/linegame/model/MakeTheEquation' );
  const ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  const PlaceThePoints = require( 'GRAPHING_LINES/linegame/model/PlaceThePoints' );
  const Range = require( 'DOT/Range' );
  const ValuePool = require( 'GRAPHING_LINES/linegame/model/ValuePool' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function ChallengeFactory5( options ) {
    BaseChallengeFactory.call( this, options );
  }

  graphingLines.register( 'ChallengeFactory5', ChallengeFactory5 );

  return inherit( BaseChallengeFactory, ChallengeFactory5, {

    /**
     * Creates challenges for this game level.
     * @returns {Array<Challenge>} array of challenges
     * @public
     * @override
     */
    createChallenges: function() {

      var challenges = [];

      // hoist vars
      var equationForm;
      var slope;
      var yIntercept;
      var point;
      var line;
      var x1;
      var y1;
      var x2;
      var y2;
      var rise;
      var run;

      // for y-intercept manipulation challenges
      var yIntercepts = ValuePool.rangeToArray( this.yRange );

      // CHALLENGE 1: Make-the-Equation, slope-intercept form, slope=0
      yIntercept = ValuePool.choose( yIntercepts );
      challenges.push( new MakeTheEquation(
        '1. MakeTheEquation, slope=0, slope and intercept variable',
        Line.createSlopeIntercept( 0, 1, yIntercept ),
        EquationForm.SLOPE_INTERCEPT,
        ManipulationMode.SLOPE_INTERCEPT,
        this.xRange, this.yRange ) );

      // CHALLENGE 2: Graph-the-Line, slope-intercept form, slope=0
      yIntercept = ValuePool.choose( yIntercepts );
      challenges.push( new GraphTheLine(
        '2. GraphTheLine, slope=0, slope and intercept variable',
        Line.createSlopeIntercept( 0, 1, yIntercept ),
        EquationForm.SLOPE_INTERCEPT,
        ManipulationMode.SLOPE_INTERCEPT,
        this.xRange, this.yRange ) );

      // CHALLENGE 3: Graph-the-Line, slope-intercept or point-slope form (random choice), 2 variables
      {
        // randomly choose equation form
        equationForm = ValuePool.choose( [ EquationForm.SLOPE_INTERCEPT, EquationForm.POINT_SLOPE ] );

        // random points
        var range = new Range( -5, 5 );
        assert && assert( this.xRange.containsRange( range ) && this.yRange.containsRange( range ) );
        var xList = ValuePool.rangeToArray( range );
        var yList = ValuePool.rangeToArray( range );
        x1 = ( equationForm === EquationForm.SLOPE_INTERCEPT ) ? 0 : ValuePool.choose( xList );
        y1 = ValuePool.choose( yList );
        x2 = ValuePool.choose( xList );
        if ( x2 === x1 ) {
          x2 = ValuePool.choose( xList ); // prevent undefined slope
        }
        y2 = ValuePool.choose( yList );

        // exclude slopes of +1 and -1
        slope = ( y2 - y1 ) / ( x2 - x1 );
        if ( slope === 1 || slope === -1 ) {
          y2 = ValuePool.choose( yList );
        }

        // challenge
        line = new Line( x1, y1, x2, y2, Color.BLACK );
        if ( equationForm === EquationForm.SLOPE_INTERCEPT ) {
          challenges.push( new GraphTheLine(
            '3. GraphTheLine, random choice of slope-intercept, points in [-5,5]',
            line, EquationForm.SLOPE_INTERCEPT,
            ManipulationMode.SLOPE_INTERCEPT,
            this.xRange, this.yRange ) );
        }
        else {
          challenges.push( new GraphTheLine(
            '3: GraphTheLine, random choice of point-slope, points in [-5,5]',
            line, EquationForm.POINT_SLOPE,
            ManipulationMode.POINT_SLOPE,
            this.xRange, this.yRange ) );
        }
      }

      // CHALLENGE 4: Make-the-Equation, slope-intercept or point-slope form (random choice), 2 variables,
      // random slope with exclusions
      {
        // randomly choose equation form
        equationForm = ValuePool.choose( [ EquationForm.SLOPE_INTERCEPT, EquationForm.POINT_SLOPE ] );

        // exclude slopes whose simplified absolute value matches these
        var excludedSlopes = [
          new Fraction( 1, 1 ),
          new Fraction( 2, 1 ),
          new Fraction( 1, 2 ),
          new Fraction( 1, 3 ),
          new Fraction( 1, 4 ),
          new Fraction( 2, 3 )
        ];

        // choose rise and run such that they don't make an undefined or excluded slope
        var riseList = ValuePool.rangeToArray( this.yRange );
        var runList = ValuePool.rangeToArray( this.xRange );
        rise = ValuePool.choose( riseList );
        run = ValuePool.choose( runList );
        var excluded = true;
        while ( excluded && runList.length > 0 ) {
          slope = new Fraction( rise, run ).getValue();
          excluded = false;
          // is this an excluded or undefined slope?
          for ( var i = 0; i < excludedSlopes.length; i++ ) {
            if ( run === 0 || slope === excludedSlopes[ i ].getValue() ) {
              excluded = true;
              run = ValuePool.choose( runList ); // choose a new run, and remove it from runList
              break;
            }
          }
        }
        if ( excluded ) {
          run = 5; // a run that's not in excludedSlopes
        }
        assert && assert( run !== 0 );

        // points
        point = BaseChallengeFactory.choosePointForSlope( new Fraction( rise, run ), this.xRange, this.yRange );
        x1 = ( equationForm === EquationForm.SLOPE_INTERCEPT ) ? 0 : point.x;
        y1 = point.y;
        x2 = x1 + run;
        y2 = y1 + rise;

        // challenge
        line = new Line( x1, y1, x2, y2, Color.BLACK );
        if ( equationForm === EquationForm.SLOPE_INTERCEPT ) {
          challenges.push( new GraphTheLine(
            '4: GraphTheLine, random choice of slope-intercept, some excluded slopes',
            line,
            EquationForm.SLOPE_INTERCEPT,
            ManipulationMode.SLOPE_INTERCEPT,
            this.xRange, this.yRange ) );
        }
        else {
          challenges.push( new GraphTheLine(
            '4: GraphTheLine, random choice of point-slope, some excluded slopes',
            line,
            EquationForm.POINT_SLOPE,
            ManipulationMode.POINT_SLOPE,
            this.xRange, this.yRange ) );
        }
      }

      // CHALLENGES 5 & 6: 2 Place-the-Point challenges
      ChallengeFactory5.addPlaceThePointsChallenges( challenges, this.xRange, this.yRange );

      return challenges;
    }
  }, {

    /**
     * Adds 2 'Place the Point' challenges, 1 slope-intercept form, 1 point-slope form.
     * Pulled out into a method that can be reused in level=6.
     *
     * @param {Challenge[]} challenges - add challenges to this array
     * @param {Range} xRange - range of the graph's x axis
     * @param {Range} yRange - range of the graph's y axis
     * @public
     * @static
     */
    addPlaceThePointsChallenges: function( challenges, xRange, yRange ) {

      // all ranges limited to [-5,5]
      var range = new Range( -5, 5 );
      assert && assert( xRange.containsRange( range ) && yRange.containsRange( range ) );
      var xList = ValuePool.rangeToArray( range );
      var yList = ValuePool.rangeToArray( range );
      var riseList = ValuePool.rangeToArray( range, { excludeZero: true } ); // prevent zero slope
      var runList = ValuePool.rangeToArray( range, { excludeZero: true } );  // prevent undefined slope

      // CHALLENGE 5: slope-intercept form, slope and intercept variable
      var x1 = 0; // y-intercept must be an integer
      var y1 = ValuePool.choose( yList );
      var rise = ValuePool.choose( riseList );
      var run = ValuePool.choose( runList );
      if ( Math.abs( rise / run ) === 1 ) { // prevent unit slope
        run = ValuePool.choose( runList );
      }
      challenges.push( new PlaceThePoints(
        '5: PlaceThePoints, slope-intercept, random points',
        new Line( x1, y1, x1 + run, y1 + rise, Color.BLACK ),
        EquationForm.SLOPE_INTERCEPT, xRange, yRange ) );

      // CHALLENGE 6: point-slope form, point and slope variable
      x1 = ValuePool.choose( xList );
      y1 = ValuePool.choose( yList );
      rise = ValuePool.choose( riseList );
      run = ValuePool.choose( runList );
      if ( Math.abs( rise / run ) === 1 ) { // prevent unit slope
        run = ValuePool.choose( runList );
      }
      challenges.push( new PlaceThePoints(
        '6: PlaceThePoints, point-slope, random points',
        new Line( x1, y1, x1 + run, y1 + rise, Color.BLACK ),
        EquationForm.POINT_SLOPE, xRange, yRange ) );
    }
  } );
} );