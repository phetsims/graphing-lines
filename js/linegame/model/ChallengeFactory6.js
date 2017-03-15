// Copyright 2013-2017, University of Colorado Boulder

/**
 * Creates game challenges for Level 6, as specified in the design document.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BaseChallengeFactory = require( 'GRAPHING_LINES/linegame/model/BaseChallengeFactory' );
  var ChallengeFactory5 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory5' );
  var Color = require( 'SCENERY/util/Color' );
  var EquationForm = require( 'GRAPHING_LINES/linegame/model/EquationForm' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GraphTheLine = require( 'GRAPHING_LINES/linegame/model/GraphTheLine' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var PlaceThePoints = require( 'GRAPHING_LINES/linegame/model/PlaceThePoints' );
  var Range = require( 'DOT/Range' );
  var ValuePool = require( 'GRAPHING_LINES/linegame/model/ValuePool' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function ChallengeFactory6( options ) {
    BaseChallengeFactory.call( this, options );
  }

  graphingLines.register( 'ChallengeFactory6', ChallengeFactory6 );

  return inherit( BaseChallengeFactory, ChallengeFactory6, {

    /**
     * Creates challenges for this game level.
     * @return {Challenge[]} array of challenges
     * @public
     * @override
     */
    createChallenges: function( ) {

      var challenges = [];

      // for y-intercept manipulation challenges
      var yIntercepts = ValuePool.rangeToArray( this.yRange );

      // CHALLENGE 1:Place-the-Point, slope-intercept form, slope=0 (horizontal line), slope and intercept variable
      var yIntercept = ValuePool.choose( yIntercepts );
      challenges.push( new PlaceThePoints( 'slope=0, slope and intercept variable',
        Line.createSlopeIntercept( 0, 1, yIntercept ),
        EquationForm.SLOPE_INTERCEPT,
        this.xRange, this.yRange ) );

      // CHALLENGES 2 & 3: 2 Place-the-Point challenges (same as level 5)
      ChallengeFactory5.addPlaceThePointsChallenges( challenges, this.xRange, this.yRange );

      // CHALLENGES 4, 5 & 6:
      // 3 Graph-the-Line challenges with mismatched representations
      // (eg, point-slope equation with slope-intercept manipulators)
      {
        // we'll pick 3 from here
        var equationForms = [ EquationForm.SLOPE_INTERCEPT, EquationForm.SLOPE_INTERCEPT, EquationForm.POINT_SLOPE, EquationForm.POINT_SLOPE ];
        assert && assert( equationForms.length === 4 );

        for ( var i = 0; i < 3; i++ ) {

          var equationForm = ValuePool.choose( equationForms );

          // random points
          var range = new Range( -7, 7 );
          assert && assert( this.xRange.containsRange( range ) && this.yRange.containsRange( range ) );
          var xList = ValuePool.rangeToArray( range );
          var yList = ValuePool.rangeToArray( range );
          var x1 = 0; // y-intercept must be an integer since we're mismatching representations
          var y1 = ValuePool.choose( yList );
          var x2 = ValuePool.choose( xList );
          if ( x2 === x1 ) {
            x2 = ValuePool.choose( xList ); // prevent undefined slope
          }
          var y2 = ValuePool.choose( yList );

          // exclude slopes of +1 and -1
          var slope = ( y2 - y1 ) / ( x2 - x1 );
          if ( slope === 1 || slope === -1 ) {
            y2 = ValuePool.choose( yList );
          }

          // challenge, with mismatched representations
          var line = new Line( x1, y1, x2, y2, Color.BLACK );
          if ( equationForm === EquationForm.SLOPE_INTERCEPT ) {
            challenges.push( new GraphTheLine( 'slope-intercept form, point and slope variable',
              line,
              equationForm,
              ManipulationMode.POINT_SLOPE,
              this.xRange, this.yRange ) );
          }
          else {
            challenges.push( new GraphTheLine( 'point-slope form, slope and intercept variable',
              line,
              equationForm,
              ManipulationMode.SLOPE_INTERCEPT,
              this.xRange, this.yRange ) );
          }
        }
      }
       
      return challenges;
    }
  } );
} );