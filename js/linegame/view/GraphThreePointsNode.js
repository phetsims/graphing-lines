// Copyright 2013-2015, University of Colorado Boulder

/**
 * Challenge graph with manipulators for 3 arbitrary points, which may or may not form a guess line.
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
  var PointManipulator = require( 'GRAPHING_LINES/common/view/manipulator/PointManipulator' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {PlaceThePoints} challenge
   * @constructor
   */
  function GraphThreePointsNode( challenge ) {

    ChallengeGraphNode.call( this, challenge, { slopeToolEnabled: false } );

    // manipulators
    var manipulatorRadius = challenge.modelViewTransform.modelToViewDeltaX( LineGameConstants.MANIPULATOR_RADIUS );
    var p1Manipulator = new PointManipulator( manipulatorRadius,
      challenge.p1Property, [ challenge.p2Property, challenge.p3Property ], challenge.graph.xRange, challenge.graph.yRange, challenge.modelViewTransform );
    var p2Manipulator = new PointManipulator( manipulatorRadius,
      challenge.p2Property, [ challenge.p1Property, challenge.p3Property ], challenge.graph.xRange, challenge.graph.yRange, challenge.modelViewTransform );
    var p3Manipulator = new PointManipulator( manipulatorRadius,
      challenge.p3Property, [ challenge.p1Property, challenge.p2Property ], challenge.graph.xRange, challenge.graph.yRange, challenge.modelViewTransform );

    // rendering order
    this.addChild( p1Manipulator );
    this.addChild( p2Manipulator );
    this.addChild( p3Manipulator );

    // Move the manipulators to match points, unmultilink in dispose
    var pointsMultilink = Property.multilink( [ challenge.p1Property, challenge.p2Property, challenge.p3Property ],
      function( p1, p2, p3 ) {
        p1Manipulator.translation = challenge.modelViewTransform.modelToViewPosition( p1 );
        p2Manipulator.translation = challenge.modelViewTransform.modelToViewPosition( p2 );
        p3Manipulator.translation = challenge.modelViewTransform.modelToViewPosition( p3 );
      } );

    // @private called by dispose
    this.disposeGraphThreePointsNode = function() {
      p1Manipulator.dispose();
      p2Manipulator.dispose();
      p3Manipulator.dispose();
      Property.unmultilink( pointsMultilink );
    };
  }

  graphingLines.register( 'GraphThreePointsNode', GraphThreePointsNode );

  return inherit( ChallengeGraphNode, GraphThreePointsNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeGraphThreePointsNode();
      ChallengeGraphNode.prototype.dispose.call( this );
    }
  } );
} );

