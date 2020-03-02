// Copyright 2013-2020, University of Colorado Boulder

/**
 * Challenge graph with manipulators for 2 points, (x1,y1) and (x2,y2), of the guess line.
 * The answer line is initially hidden.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import X1Y1Manipulator from '../../common/view/manipulator/X1Y1Manipulator.js';
import X2Y2Manipulator from '../../common/view/manipulator/X2Y2Manipulator.js';
import graphingLines from '../../graphingLines.js';
import LineGameConstants from '../LineGameConstants.js';
import ChallengeGraphNode from './ChallengeGraphNode.js';

class GraphTwoPointsNode extends ChallengeGraphNode {

  /**
   * @param {PlaceThePoints} challenge
   */
  constructor( challenge ) {

    super( challenge );

    this.setGuessLineVisible( true );

    const manipulatorRadius = challenge.modelViewTransform.modelToViewDeltaX( LineGameConstants.MANIPULATOR_RADIUS );

    const x1y1Manipulator = new X1Y1Manipulator( manipulatorRadius, challenge.guessProperty,
      new Property( challenge.graph.xRange ), new Property( challenge.graph.yRange ), challenge.modelViewTransform, false /* constantSlope */ );

    const x2y2Manipulator = new X2Y2Manipulator( manipulatorRadius, challenge.guessProperty,
      new Property( challenge.graph.xRange ), new Property( challenge.graph.yRange ), challenge.modelViewTransform );

    // Rendering order
    this.addChild( x1y1Manipulator );
    this.addChild( x2y2Manipulator );

    // Sync with the guess
    const guessObserver = line => {
      // move the manipulators
      x1y1Manipulator.translation = challenge.modelViewTransform.modelToViewXY( line.x1, line.y1 );
      x2y2Manipulator.translation = challenge.modelViewTransform.modelToViewXY( line.x2, line.y2 );
    };
    challenge.guessProperty.link( guessObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeGraphTwoPointsNode = () => {
      x1y1Manipulator.dispose();
      x2y2Manipulator.dispose();
      challenge.guessProperty.unlink( guessObserver );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeGraphTwoPointsNode();
    super.dispose();
  }
}

graphingLines.register( 'GraphTwoPointsNode', GraphTwoPointsNode );

export default GraphTwoPointsNode;