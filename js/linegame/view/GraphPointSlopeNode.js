// Copyright 2013-2019, University of Colorado Boulder

/**
 * Challenge graph with manipulators for point (x1,y1) and slope of the guess line.
 * The answer line is initially hidden.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ChallengeGraphNode = require( 'GRAPHING_LINES/linegame/view/ChallengeGraphNode' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  const ManipulationMode = require( 'GRAPHING_LINES/linegame/model/ManipulationMode' );
  const PointSlopeParameterRange = require( 'GRAPHING_LINES/pointslope/model/PointSlopeParameterRange' );
  const Property = require( 'AXON/Property' );
  const SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  const X1Y1Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X1Y1Manipulator' );

  /**
   * @param {Challenge} challenge
   * @constructor
   */
  function GraphPointSlopeNode( challenge ) {

    ChallengeGraphNode.call( this, challenge );

    this.setGuessLineVisible( true );

    // dynamic ranges
    var pointSlopeParameterRange = new PointSlopeParameterRange();
    var x1RangeProperty = new Property( challenge.graph.xRange );
    var y1RangeProperty = new Property( challenge.graph.yRange );
    var riseRangeProperty = new Property( pointSlopeParameterRange.rise( challenge.guessProperty.get(), challenge.graph ) );
    var runRangeProperty = new Property( pointSlopeParameterRange.run( challenge.guessProperty.get(), challenge.graph ) );

    var manipulatorRadius = challenge.modelViewTransform.modelToViewDeltaX( LineGameConstants.MANIPULATOR_RADIUS );

    // point manipulator
    var pointManipulator = new X1Y1Manipulator( manipulatorRadius, challenge.guessProperty, x1RangeProperty, y1RangeProperty, challenge.modelViewTransform, true /* constantSlope */ );
    var pointIsVariable = ( challenge.manipulationMode === ManipulationMode.POINT || challenge.manipulationMode === ManipulationMode.POINT_SLOPE );
    if ( pointIsVariable ) {
      this.addChild( pointManipulator );
    }

    // slope manipulator
    var slopeManipulator = new SlopeManipulator( manipulatorRadius, challenge.guessProperty, riseRangeProperty, runRangeProperty, challenge.modelViewTransform );
    var slopeIsVariable = ( challenge.manipulationMode === ManipulationMode.SLOPE || challenge.manipulationMode === ManipulationMode.POINT_SLOPE );
    if ( slopeIsVariable ) {
      this.addChild( slopeManipulator );
    }

    // Sync with the guess
    var guessObserver = function( line ) {

      // move the manipulators
      pointManipulator.translation = challenge.modelViewTransform.modelToViewXY( line.x1, line.y1 );
      slopeManipulator.translation = challenge.modelViewTransform.modelToViewXY( line.x2, line.y2 );

      // adjust ranges
      if ( challenge.manipulationMode === ManipulationMode.POINT_SLOPE ) {
        x1RangeProperty.set( pointSlopeParameterRange.x1( line, challenge.graph ) );
        y1RangeProperty.set( pointSlopeParameterRange.y1( line, challenge.graph ) );
        riseRangeProperty.set( pointSlopeParameterRange.rise( line, challenge.graph ) );
        runRangeProperty.set( pointSlopeParameterRange.run( line, challenge.graph ) );
      }
    };
    challenge.guessProperty.link( guessObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeGraphPointSlopeNode = function() {
      pointManipulator.dispose();
      slopeManipulator.dispose();
      challenge.guessProperty.unlink( guessObserver );
    };
  }

  graphingLines.register( 'GraphPointSlopeNode', GraphPointSlopeNode );

  return inherit( ChallengeGraphNode, GraphPointSlopeNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeGraphPointSlopeNode();
      ChallengeGraphNode.prototype.dispose.call( this );
    }
  } );
} );