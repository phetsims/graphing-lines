// Copyright 2002-2014, University of Colorado Boulder

/**
 * Challenge graph with manipulators for 3 arbitrary points, which may or may not form a guess line.
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
  var PointManipulator = require( 'GRAPHING_LINES/common/view/manipulator/PointManipulator' );

  /**
   * @param {PlaceThePoints} challenge
   * @constructor
   */
  function ThreePointsGraphNode( challenge ) {

    var thisNode = this;
    ChallengeGraphNode.call( thisNode, challenge, false /* slopeToolEnabled */ );

    // manipulators
    var manipulatorDiameter = challenge.mvt.modelToViewDeltaX( LineGameConstants.MANIPULATOR_DIAMETER );
    var p1Manipulator = new PointManipulator( manipulatorDiameter, GLColors.POINT_1,
      challenge.p1Property, [ challenge.p2Property, challenge.p3Property ], challenge.graph.xRange, challenge.graph.yRange, challenge.mvt );
    var p2Manipulator = new PointManipulator( manipulatorDiameter, GLColors.POINT_2,
      challenge.p2Property, [ challenge.p1Property, challenge.p3Property ], challenge.graph.xRange, challenge.graph.yRange, challenge.mvt );
    var p3Manipulator = new PointManipulator( manipulatorDiameter, GLColors.POINT_3,
      challenge.p3Property, [ challenge.p1Property, challenge.p2Property ], challenge.graph.xRange, challenge.graph.yRange, challenge.mvt );

    // rendering order
    thisNode.addChild( p1Manipulator );
    thisNode.addChild( p2Manipulator );
    thisNode.addChild( p3Manipulator );

    // Move the manipulators to match points
    var updateManipulators = function() {
      p1Manipulator.translation = challenge.mvt.modelToViewPosition( challenge.p1 );
      p2Manipulator.translation = challenge.mvt.modelToViewPosition( challenge.p2 );
      p3Manipulator.translation = challenge.mvt.modelToViewPosition( challenge.p3 );
    };
    challenge.p1Property.link( updateManipulators.bind( thisNode ) );
    challenge.p2Property.link( updateManipulators.bind( thisNode ) );
    challenge.p3Property.link( updateManipulators.bind( thisNode ) );
  }

  return inherit( ChallengeGraphNode, ThreePointsGraphNode );
} );

