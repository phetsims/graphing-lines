// Copyright 2002-2013, University of Colorado Boulder

/**
 * Challenge graph with manipulators for point (x1,y1) and slope of the guess line.
 * The answer line is initially hidden.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ChallengeGraphNode = require( 'GRAPHING_LINES/linegame/view/ChallengeGraphNode' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var PointSlopeParameterRange = require( 'GRAPHING_LINES/pointslope/model/PointSlopeParameterRange' );
  var Property = require( 'AXON/Property' );
  var SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  var X1Y1Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X1Y1Manipulator' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Challenge} challenge
   * @constructor
   */
  function PointSlopeGraphNode( challenge ) {

    var thisNode = this;
    ChallengeGraphNode.call( thisNode, challenge, true /* slopeToolEnabled */ );

    thisNode.setGuessVisible( true );

    // dynamic ranges
    var pointSlopeParameterRange = new PointSlopeParameterRange();
    var x1RangeProperty = new Property( challenge.graph.xRange );
    var y1RangeProperty = new Property( challenge.graph.yRange );
    var riseRangeProperty = new Property( pointSlopeParameterRange.rise( challenge.guessProperty.get(), challenge.graph ) );
    var runRangeProperty = new Property( pointSlopeParameterRange.run( challenge.guessProperty.get(), challenge.graph ) );

    var manipulatorDiameter = challenge.mvt.modelToViewDeltaX( LineGameConstants.MANIPULATOR_DIAMETER );

    // point manipulator
    var pointManipulator = new X1Y1Manipulator( manipulatorDiameter, challenge.guessProperty, x1RangeProperty, y1RangeProperty, challenge.mvt, true /* constantSlope */ );
    var pointIsVariable = ( challenge.manipulationMode === ManipulationMode.POINT || challenge.manipulationMode === ManipulationMode.POINT_SLOPE );
    if ( pointIsVariable ) {
      thisNode.addChild( pointManipulator );
    }

    // slope manipulator
    var slopeManipulator = new SlopeManipulator( manipulatorDiameter, challenge.guessProperty, riseRangeProperty, runRangeProperty, challenge.mvt );
    var slopeIsVariable = ( challenge.manipulationMode === ManipulationMode.SLOPE || challenge.manipulationMode === ManipulationMode.POINT_SLOPE );
    if ( slopeIsVariable ) {
      this.addChild( slopeManipulator );
    }

    // Sync with the guess
    challenge.guessProperty.link( function( line ) {

      // move the manipulators
      pointManipulator.translation = challenge.mvt.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
      slopeManipulator.translation = challenge.mvt.modelToViewPosition( new Vector2( line.x2, line.y2 ) );

      // adjust ranges
      if ( challenge.manipulationMode === ManipulationMode.POINT_SLOPE ) {
        x1RangeProperty.set( pointSlopeParameterRange.x1( line, challenge.graph ) );
        y1RangeProperty.set( pointSlopeParameterRange.y1( line, challenge.graph ) );
        riseRangeProperty.set( pointSlopeParameterRange.rise( line, challenge.graph ) );
        runRangeProperty.set( pointSlopeParameterRange.run( line, challenge.graph ) );
      }
    } );
  }

  return inherit( ChallengeGraphNode, PointSlopeGraphNode );
} );