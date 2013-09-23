// Copyright 2002-2013, University of Colorado Boulder

/**
 * Challenge graph with manipulators for slope and y-intercept of the guess line.
 * The answer line is initially hidden.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ChallengeGraphNode = require( 'PATH/ChallengeGraphNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var ManipulationMode = require( 'GRAPHING_LINES/pointslope/model/ManipulationMode' );
  var Property = require( 'AXON/Property' );
  var SlopeInterceptParameterRange = require( 'GRAPHING_LINES/slopeintercept/model/SlopeInterceptParameterRange' );
  var SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  var Vector2 = require( 'DOT/Vector2' );
  var YInterceptManipulator = require( 'GRAPHING_LINES/common/view/manipulator/YInterceptManipulator' );

  /**
   * @param {Challenge} challenge
   * @constructor
   */
  function SlopeInterceptGraphNode( challenge ) {

    var thisNode = this;
    ChallengeGraphNode.call( thisNode, challenge, true /* slopeToolEnabled */ );

    thisNode.setGuessVisible( true );

    // dynamic ranges
    var parameterRange = new SlopeInterceptParameterRange();
    var riseRangeProperty = new Property( parameterRange.rise( challenge.guess.get(), challenge.graph ) );
    var runRangeProperty = new Property( parameterRange.run( challenge.guess.get(), challenge.graph ) );
    var y1RangeProperty = new Property( challenge.graph.yRange );

    var manipulatorDiameter = challenge.mvt.modelToViewDeltaX( LineGameConstants.MANIPULATOR_DIAMETER );

    // intercept manipulator
    var yInterceptManipulator = new YInterceptManipulator( manipulatorDiameter, challenge.guess, y1RangeProperty, challenge.mvt );
    var interceptIsVariable = ( challenge.manipulationMode === ManipulationMode.INTERCEPT || challenge.manipulationMode === ManipulationMode.SLOPE_INTERCEPT );
    if ( interceptIsVariable ) {
      thisNode.addChild( yInterceptManipulator );
    }

    // slope manipulator
    var slopeManipulator = new SlopeManipulator( manipulatorDiameter, challenge.guess, riseRangeProperty, runRangeProperty, challenge.mvt );
    var slopeIsVariable = ( challenge.manipulationMode === ManipulationMode.SLOPE || challenge.manipulationMode === ManipulationMode.SLOPE_INTERCEPT );
    if ( slopeIsVariable ) {
      thisNode.addChild( slopeManipulator );
    }

    // Sync with the guess
    challenge.guess.link( function( line ) {

      // move the manipulators
      slopeManipulator.translation = challenge.mvt.modelToViewPosition( new Vector2( line.x2, line.y2 ) );
      yInterceptManipulator.translation = challenge.mvt.modelToViewPosition( new Vector2( line.x1, line.y1 ) );

      // adjust ranges
      if ( challenge.manipulationMode === ManipulationMode.SLOPE_INTERCEPT ) {
        riseRangeProperty.set( parameterRange.rise( line, challenge.graph ) );
        y1RangeProperty.set( parameterRange.y1( line, challenge.graph ) );
      }
    } );
  }

  return inherit( ChallengeGraphNode, SlopeInterceptGraphNode );
} );