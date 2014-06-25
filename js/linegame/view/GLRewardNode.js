// Copyright 2002-2014, University of Colorado Boulder

/**
 * The reward that is displayed when a game is completed with a perfect score.
 * Various images (based on game level) move from top to bottom in the play area.
 * Run with the 'reward' query parameter to show the reward at the end of every game, regardless of score.
 *
 * Here's what you'll see at each level:
 *
 * Level 1 = equations
 * Level 2 = graphs
 * Level 3 = point tools
 * Level 4 = smiley faces
 * Level 5 = paper airplanes
 * Level 6 = all of the above
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  var IconFactory = require( 'GRAPHING_LINES/common/view/IconFactory' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var PaperAirplaneNode = require( 'SCENERY_PHET/PaperAirplaneNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );
  var PointTool = require( 'GRAPHING_LINES/common/model/PointTool' );
  var PointToolNode = require( 'GRAPHING_LINES/common/view/PointToolNode' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RewardNode = require( 'VEGAS/RewardNode' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var NUMBER_OF_NODES = 150;
  var NODE_COLORS = [ 'yellow', 'red', 'orange', 'magenta', 'cyan', 'green' ];
  var EQUATION_FONT_SIZE = 24;
  var GRAPH_WIDTH = 50;
  var FACE_DIAMETER = 40;
  var AIRPLANE_SIZE = new Dimension2( 60, 54 );

  /**
   * @param level game level, starting at zero
   * @constructor
   */
  function GLRewardNode( level ) {
    var nodes = nodeFactoryFunctions[level]();
    RewardNode.call( this, { nodes: nodes } );
  }

  //-----------------------------------------------------------------------------------------------
  // misc utility functions
  //-----------------------------------------------------------------------------------------------

  var getRandomX = function() {
    return getRandomNonZeroInteger( GLConstants.X_AXIS_RANGE.min, GLConstants.X_AXIS_RANGE.max );
  };

  var getRandomY = function() {
    return getRandomNonZeroInteger( GLConstants.Y_AXIS_RANGE.min, GLConstants.Y_AXIS_RANGE.max );
  };

  var getRandomNonZeroInteger = function( min, max ) {
    var i = Math.floor( min + ( Math.random() * ( max - min ) ) );
    if ( i == 0 ) { i = 1; }
    return i;
  };

  //-----------------------------------------------------------------------------------------------
  // functions that create specific types of nodes
  //-----------------------------------------------------------------------------------------------

  // Creates a random equation with the specified color.
  var createEquationNode = function( color ) {
    var node;
    if ( Math.random() < 0.5 ) {
      node = SlopeInterceptEquationNode.createDynamicLabel(
        new Property( Line.createSlopeIntercept( getRandomY(), getRandomX(), getRandomY(), color ) ),
        EQUATION_FONT_SIZE );
    }
    else {
      node = PointSlopeEquationNode.createDynamicLabel(
        new Property( Line.createPointSlope( getRandomX(), getRandomY(), getRandomX(), getRandomY(), color ) ),
        EQUATION_FONT_SIZE );
    }
    return node;
  };

  // Creates an array of random equations with the specified colors.
  var createEquationNodes = function( colors ) {
    var nodes = [];
    colors.forEach( function( color ) {
      nodes.push( createEquationNode( color ) );
    } );
    return nodes;
  };

  // Creates a random graph with the specified color.
  var createGraphNode = function( color ) {
    var node;
    if ( Math.random() < 0.5 ) {
      node = IconFactory.createGraphIcon( GRAPH_WIDTH, color, -3, -3, 3, 3 ); // y = +x
    }
    else {
      node = IconFactory.createGraphIcon( GRAPH_WIDTH, color, -3, 3, 3, -3 ); // y = -x
    }
    return node;
  };

  // Creates an array of random graphs with the specified colors.
  var createGraphNodes = function( colors ) {
    var nodes = [];
    colors.forEach( function( color ) {
      nodes.push( createGraphNode( color ) );
    } );
    return nodes;
  };

  //TODO this creates way too much model stuff
  // Creates a random point tool with the specified color.
  var createPointToolNode = function( color ) {
    var point = new Vector2( getRandomX(), getRandomY() );
    var orientation = ( Math.random() < 0.5 ? 'down' : 'up' );
    var pointTool = new PointTool( point, orientation, new ObservableArray(), new Bounds2( 0, 0, 1, 1 ) );
    var mvt = ModelViewTransform2.createIdentity();
    var graph = new Graph( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );
    var pointToolNode = new PointToolNode( pointTool, mvt, graph, new Property( true ), { backgroundNormalColor: color } );
    pointToolNode.scale( 0.75 );
    return pointToolNode;
  };

  // Creates an array of random point tools with the specified colors.
  var createPointToolNodes = function( colors ) {
    var nodes = [];
    colors.forEach( function( color ) {
      nodes.push( createPointToolNode( color ) );
    } );
    return nodes;
  };

  // Creates an array of smiley faces with the specified colors.
  var createFaceNodes = function( colors, diameter ) {
    var nodes = [];
    colors.forEach( function( color ) {
      nodes.push( new FaceNode( diameter, { headFill: color } ) );
    } );
    return nodes;
  };

  // Creates an array of paper airplanes (as in the PhET logo) with the specified colors.
  var createAirplaneNodes = function( colors, size ) {
    var nodes = [];
    colors.forEach( function( color ) {
      nodes.push( new PaperAirplaneNode( { fill: color, size: size } ) );
    } );
    return nodes;
  };

  //-----------------------------------------------------------------------------------------------
  // functions that create nodes for each level
  //-----------------------------------------------------------------------------------------------

  // Level 1 = equations
  var createNodesLevel1 = function() {
    return RewardNode.createRandomNodes( createEquationNodes( NODE_COLORS ), NUMBER_OF_NODES );
  };

  // Level 2 = graphs
  var createNodesLevel2 = function() {
    return RewardNode.createRandomNodes( createGraphNodes( NODE_COLORS ), NUMBER_OF_NODES );
  };

  // Level 3 = point tools
  var createNodesLevel3 = function() {
    return RewardNode.createRandomNodes( createPointToolNodes( NODE_COLORS ), NUMBER_OF_NODES );
  };

  // Level 4 = smiley faces
  var createNodesLevel4 = function() {
    return RewardNode.createRandomNodes( createFaceNodes( NODE_COLORS, FACE_DIAMETER ), NUMBER_OF_NODES );
  };

  // Level 5 = paper airplanes, as in the PhET logos
  var createNodesLevel5 = function() {
    return RewardNode.createRandomNodes( createAirplaneNodes( NODE_COLORS, AIRPLANE_SIZE ), NUMBER_OF_NODES );
  };

  // Level 6 = all of the above
  var createNodesLevel6 = function() {
    var nodes = createEquationNodes( NODE_COLORS )
      .concat( createGraphNodes( NODE_COLORS ) )
      .concat( createPointToolNodes( NODE_COLORS ) )
      .concat( createFaceNodes( NODE_COLORS, FACE_DIAMETER ) )
      .concat( createAirplaneNodes( NODE_COLORS, AIRPLANE_SIZE ) );
    return RewardNode.createRandomNodes( nodes, NUMBER_OF_NODES );
  };

  // Functions for creating nodes, indexed by level.
  var nodeFactoryFunctions = [
    createNodesLevel1,
    createNodesLevel2,
    createNodesLevel3,
    createNodesLevel4,
    createNodesLevel5,
    createNodesLevel6
  ];

  return inherit( RewardNode, GLRewardNode );
} );
