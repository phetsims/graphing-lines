// Copyright 2013-2020, University of Colorado Boulder

/**
 * Challenge graph with manipulators for 3 arbitrary points, which may or may not form a guess line.
 * The answer line is initially hidden.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import PointManipulator from '../../common/view/manipulator/PointManipulator.js';
import graphingLines from '../../graphingLines.js';
import LineGameConstants from '../LineGameConstants.js';
import ChallengeGraphNode from './ChallengeGraphNode.js';

class GraphThreePointsNode extends ChallengeGraphNode {

  /**
   * @param {PlaceThePoints} challenge
   */
  constructor( challenge ) {

    super( challenge, { slopeToolEnabled: false } );

    // manipulators
    const manipulatorRadius = challenge.modelViewTransform.modelToViewDeltaX( LineGameConstants.MANIPULATOR_RADIUS );
    const p1Manipulator = new PointManipulator( manipulatorRadius, challenge.p1Property,
      [ challenge.p2Property, challenge.p3Property ], challenge.graph.xRange, challenge.graph.yRange,
      challenge.modelViewTransform );
    const p2Manipulator = new PointManipulator( manipulatorRadius, challenge.p2Property,
      [ challenge.p1Property, challenge.p3Property ], challenge.graph.xRange, challenge.graph.yRange,
      challenge.modelViewTransform );
    const p3Manipulator = new PointManipulator( manipulatorRadius, challenge.p3Property,
      [ challenge.p1Property, challenge.p2Property ], challenge.graph.xRange, challenge.graph.yRange,
      challenge.modelViewTransform );

    // rendering order
    this.addChild( p1Manipulator );
    this.addChild( p2Manipulator );
    this.addChild( p3Manipulator );

    // Move the manipulators to match points, unmultilink in dispose
    const pointsMultilink = Property.multilink(
      [ challenge.p1Property, challenge.p2Property, challenge.p3Property ],
      ( p1, p2, p3 ) => {
        p1Manipulator.translation = challenge.modelViewTransform.modelToViewPosition( p1 );
        p2Manipulator.translation = challenge.modelViewTransform.modelToViewPosition( p2 );
        p3Manipulator.translation = challenge.modelViewTransform.modelToViewPosition( p3 );
      } );

    // @private called by dispose
    this.disposeGraphThreePointsNode = () => {
      p1Manipulator.dispose();
      p2Manipulator.dispose();
      p3Manipulator.dispose();
      Property.unmultilink( pointsMultilink );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeGraphThreePointsNode();
    super.dispose();
  }
}

graphingLines.register( 'GraphThreePointsNode', GraphThreePointsNode );

export default GraphThreePointsNode;