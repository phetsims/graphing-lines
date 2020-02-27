// Copyright 2013-2019, University of Colorado Boulder

/**
 * Challenge graph with manipulators for point (x1,y1) and slope of the guess line.
 * The answer line is initially hidden.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import inherit from '../../../../phet-core/js/inherit.js';
import SlopeManipulator from '../../common/view/manipulator/SlopeManipulator.js';
import X1Y1Manipulator from '../../common/view/manipulator/X1Y1Manipulator.js';
import graphingLines from '../../graphingLines.js';
import PointSlopeParameterRange from '../../pointslope/model/PointSlopeParameterRange.js';
import LineGameConstants from '../LineGameConstants.js';
import ManipulationMode from '../model/ManipulationMode.js';
import ChallengeGraphNode from './ChallengeGraphNode.js';

/**
 * @param {Challenge} challenge
 * @constructor
 */
function GraphPointSlopeNode( challenge ) {

  ChallengeGraphNode.call( this, challenge );

  this.setGuessLineVisible( true );

  // dynamic ranges
  const pointSlopeParameterRange = new PointSlopeParameterRange();
  const x1RangeProperty = new Property( challenge.graph.xRange );
  const y1RangeProperty = new Property( challenge.graph.yRange );
  const riseRangeProperty = new Property( pointSlopeParameterRange.rise( challenge.guessProperty.get(), challenge.graph ) );
  const runRangeProperty = new Property( pointSlopeParameterRange.run( challenge.guessProperty.get(), challenge.graph ) );

  const manipulatorRadius = challenge.modelViewTransform.modelToViewDeltaX( LineGameConstants.MANIPULATOR_RADIUS );

  // point manipulator
  const pointManipulator = new X1Y1Manipulator( manipulatorRadius, challenge.guessProperty, x1RangeProperty, y1RangeProperty, challenge.modelViewTransform, true /* constantSlope */ );
  const pointIsVariable = ( challenge.manipulationMode === ManipulationMode.POINT || challenge.manipulationMode === ManipulationMode.POINT_SLOPE );
  if ( pointIsVariable ) {
    this.addChild( pointManipulator );
  }

  // slope manipulator
  const slopeManipulator = new SlopeManipulator( manipulatorRadius, challenge.guessProperty, riseRangeProperty, runRangeProperty, challenge.modelViewTransform );
  const slopeIsVariable = ( challenge.manipulationMode === ManipulationMode.SLOPE || challenge.manipulationMode === ManipulationMode.POINT_SLOPE );
  if ( slopeIsVariable ) {
    this.addChild( slopeManipulator );
  }

  // Sync with the guess
  const guessObserver = function( line ) {

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

export default inherit( ChallengeGraphNode, GraphPointSlopeNode, {

  /**
   * @public
   * @override
   */
  dispose: function() {
    this.disposeGraphPointSlopeNode();
    ChallengeGraphNode.prototype.dispose.call( this );
  }
} );