// Copyright 2013-2019, University of Colorado Boulder

/**
 * Challenge graph with manipulators for 2 points, (x1,y1) and (x2,y2), of the guess line.
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
  var Property = require( 'AXON/Property' );
  var X1Y1Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X1Y1Manipulator' );
  var X2Y2Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X2Y2Manipulator' );

  /**
   * @param {PlaceThePoints} challenge
   * @constructor
   */
  function GraphTwoPointsNode( challenge ) {

    ChallengeGraphNode.call( this, challenge );

    this.setGuessLineVisible( true );

    var manipulatorRadius = challenge.modelViewTransform.modelToViewDeltaX( LineGameConstants.MANIPULATOR_RADIUS );

    var x1y1Manipulator = new X1Y1Manipulator( manipulatorRadius, challenge.guessProperty,
      new Property( challenge.graph.xRange ), new Property( challenge.graph.yRange ), challenge.modelViewTransform, false /* constantSlope */ );

    var x2y2Manipulator = new X2Y2Manipulator( manipulatorRadius, challenge.guessProperty,
      new Property( challenge.graph.xRange ), new Property( challenge.graph.yRange ), challenge.modelViewTransform );

    // Rendering order
    this.addChild( x1y1Manipulator );
    this.addChild( x2y2Manipulator );

    // Sync with the guess
    var guessObserver = function( line ) {
      // move the manipulators
      x1y1Manipulator.translation = challenge.modelViewTransform.modelToViewXY( line.x1, line.y1 );
      x2y2Manipulator.translation = challenge.modelViewTransform.modelToViewXY( line.x2, line.y2 );
    };
    challenge.guessProperty.link( guessObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeGraphTwoPointsNode = function() {
      x1y1Manipulator.dispose();
      x2y2Manipulator.dispose();
      challenge.guessProperty.unlink( guessObserver );
    };
  }

  graphingLines.register( 'GraphTwoPointsNode', GraphTwoPointsNode );

  return inherit( ChallengeGraphNode, GraphTwoPointsNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeGraphTwoPointsNode();
      ChallengeGraphNode.prototype.dispose.call( this );
    }
  } );
} );

