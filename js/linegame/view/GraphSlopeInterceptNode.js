// Copyright 2013-2015, University of Colorado Boulder

/**
 * Challenge graph with manipulators for slope and y-intercept of the guess line.
 * The answer line is initially hidden.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ChallengeGraphNode = require( 'GRAPHING_LINES/linegame/view/ChallengeGraphNode' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  var Property = require( 'AXON/Property' );
  var SlopeInterceptParameterRange = require( 'GRAPHING_LINES/slopeintercept/model/SlopeInterceptParameterRange' );
  var SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  var YInterceptManipulator = require( 'GRAPHING_LINES/common/view/manipulator/YInterceptManipulator' );

  /**
   * @param {Challenge} challenge
   * @constructor
   */
  function GraphSlopeInterceptNode( challenge ) {

    ChallengeGraphNode.call( this, challenge );

    this.setGuessVisible( true );

    // dynamic ranges
    var parameterRange = new SlopeInterceptParameterRange();
    var riseRangeProperty = new Property( parameterRange.rise( challenge.guessProperty.get(), challenge.graph ) );
    var runRangeProperty = new Property( parameterRange.run( challenge.guessProperty.get(), challenge.graph ) );
    var y1RangeProperty = new Property( challenge.graph.yRange );

    var manipulatorRadius = challenge.modelViewTransform.modelToViewDeltaX( LineGameConstants.MANIPULATOR_RADIUS );

    // intercept manipulator
    var yInterceptManipulator = new YInterceptManipulator( manipulatorRadius, challenge.guessProperty, y1RangeProperty, challenge.modelViewTransform );
    var interceptIsVariable = ( challenge.manipulationMode === ManipulationMode.INTERCEPT || challenge.manipulationMode === ManipulationMode.SLOPE_INTERCEPT );
    if ( interceptIsVariable ) {
      this.addChild( yInterceptManipulator );
    }

    // slope manipulator
    var slopeManipulator = new SlopeManipulator( manipulatorRadius, challenge.guessProperty, riseRangeProperty, runRangeProperty, challenge.modelViewTransform );
    var slopeIsVariable = ( challenge.manipulationMode === ManipulationMode.SLOPE || challenge.manipulationMode === ManipulationMode.SLOPE_INTERCEPT );
    if ( slopeIsVariable ) {
      this.addChild( slopeManipulator );
    }

    // Sync with the guess
    challenge.guessProperty.link( function( line ) {

      // move the manipulators
      slopeManipulator.translation = challenge.modelViewTransform.modelToViewXY( line.x2, line.y2 );
      yInterceptManipulator.translation = challenge.modelViewTransform.modelToViewXY( line.x1, line.y1 );

      // adjust ranges
      if ( challenge.manipulationMode === ManipulationMode.SLOPE_INTERCEPT ) {
        riseRangeProperty.set( parameterRange.rise( line, challenge.graph ) );
        y1RangeProperty.set( parameterRange.y1( line, challenge.graph ) );
      }
    } );
  }

  graphingLines.register( 'GraphSlopeInterceptNode', GraphSlopeInterceptNode );

  return inherit( ChallengeGraphNode, GraphSlopeInterceptNode );
} );