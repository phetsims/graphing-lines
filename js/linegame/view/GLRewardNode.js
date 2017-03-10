// Copyright 2013-2015, University of Colorado Boulder

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
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var GLIconFactory = require( 'GRAPHING_LINES/common/view/GLIconFactory' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PaperAirplaneNode = require( 'SCENERY_PHET/PaperAirplaneNode' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RewardNode = require( 'VEGAS/RewardNode' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var pointXYString = require( 'string!GRAPHING_LINES/point.XY' );

  // images
  var pointToolBodyImage = require( 'image!GRAPHING_LINES/point_tool_body.png' );
  var pointToolTipImage = require( 'image!GRAPHING_LINES/point_tool_tip.png' );

  // constants
  var NUMBER_OF_NODES = 150;
  var NODE_COLORS = [ 'yellow', PhetColorScheme.RED_COLORBLIND, 'orange', 'magenta', 'cyan', 'green' ];
  var EQUATION_FONT_SIZE = 24;
  var GRAPH_WIDTH = 60;
  var POINT_TOOL_FONT = new GLFont( 15 );
  var POINT_TOOL_WINDOW_CENTER_X = 44; // center of the value window relative to the left edge of point_tool_body.png
  var FACE_DIAMETER = 60;
  var AIRPLANE_SCALE = 1.76;

  /**
   * @params {Node[]} nodes to use in the reward
   * @constructor
   */
  function GLRewardNode( rewardNodes ) {
    RewardNode.call( this, { nodes: rewardNodes } );
  }

  graphingLines.register( 'GLRewardNode', GLRewardNode );

  //-----------------------------------------------------------------------------------------------
  // Misc. utility functions
  //-----------------------------------------------------------------------------------------------

  var getRandomX = function() {
    return getRandomNonZeroInteger( GLConstants.X_AXIS_RANGE.min, GLConstants.X_AXIS_RANGE.max );
  };

  var getRandomY = function() {
    return getRandomNonZeroInteger( GLConstants.Y_AXIS_RANGE.min, GLConstants.Y_AXIS_RANGE.max );
  };

  var getRandomNonZeroInteger = function( min, max ) {
    var i = Math.floor( min + ( phet.joist.random.nextDouble() * ( max - min ) ) );
    if ( i === 0 ) { i = 1; }
    return i;
  };

  //-----------------------------------------------------------------------------------------------
  // Functions that create specific types of nodes.
  // All of these function must have a {Color|String} color parameter.
  //-----------------------------------------------------------------------------------------------

  // Creates a random equation with the specified color.
  var createEquationNode = function( color ) {
    var node;
    if ( phet.joist.random.nextDouble() < 0.5 ) {
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

  // Creates a random graph with the specified color.
  var createGraphNode = function( color ) {
    var node;
    if ( phet.joist.random.nextDouble() < 0.5 ) {
      node = GLIconFactory.createGraphIcon( GRAPH_WIDTH, color, -3, -3, 3, 3 ); // y = +x
    }
    else {
      node = GLIconFactory.createGraphIcon( GRAPH_WIDTH, color, -3, 3, 3, -3 ); // y = -x
    }
    return node;
  };

  /*
   * Creates a random point tool with the specified color.
   * This does not use PointToolNode because it has too many model dependencies.
   */
  var createPointToolNode = function( color ) {
    var body = new Image( pointToolBodyImage );
    var tip = new Image( pointToolTipImage, { top: body.bottom, centerX: 0.25 * body.width } );
    var background = new Rectangle( 0, 0, 0.95 * body.width, 0.95 * body.height, { fill: color, center: body.center } );
    var value = new Text( StringUtils.format( pointXYString, getRandomX(), getRandomY() ),
      { font: POINT_TOOL_FONT, centerX: POINT_TOOL_WINDOW_CENTER_X, centerY: body.centerY } );
    return new Node( { children: [ background, body, tip, value ] } );
  };

  // Creates a smiley face with the specified color.
  var createFaceNode = function( color ) {
    return new FaceNode( FACE_DIAMETER, { headFill: color } );
  };

  // Creates a paper airplane with the specified color.
  var createPaperAirplaneNode = function( color ) {
    return new PaperAirplaneNode( { fill: color, scale: AIRPLANE_SCALE } ); // width of around 60px
  };

  /**
   * Creates an array of nodes for a specified array of colors.
   * The functions above serve as the creationFunction argument.
   *
   * @param {function} creationFunction a function with one parameter of type {Color|String}
   * @param {Color|String[]} colors
   * @returns {Node[]}
   */
  var createNodes = function( creationFunction, colors ) {
    var nodes = [];
    colors.forEach( function( color ) {
      nodes.push( creationFunction( color ) );
    } );
    return nodes;
  };

  return inherit( RewardNode, GLRewardNode, {}, {

    /**
     * Creates a set of equations nodes.
     * @returns {Node[]}
     * @public
     * @static
     */
    createEquationNodes: function() {
      return RewardNode.createRandomNodes( createNodes( createEquationNode, NODE_COLORS ), NUMBER_OF_NODES );
    },

    /**
     * Creates a set of equations graph.
     * @returns {Node[]}
     * @public
     * @static
     */
    createGraphNodes: function() {
      return RewardNode.createRandomNodes( createNodes( createGraphNode, NODE_COLORS ), NUMBER_OF_NODES );
    },

    /**
     * Creates a set of 'point tool' nodes.
     * @returns {Node[]}
     * @public
     * @static
     */
    createPointToolNodes: function() {
      return RewardNode.createRandomNodes( createNodes( createPointToolNode, NODE_COLORS ), NUMBER_OF_NODES );
    },

    /**
     * Creates a set of 'smiley face' nodes.
     * @returns {Node[]}
     * @public
     * @static
     */
    createSmileyFaceNodes: function() {
      return RewardNode.createRandomNodes( createNodes( createFaceNode, NODE_COLORS ), NUMBER_OF_NODES );
    },

    /**
     * Creates a set of paper airplane nodes, similar to the PhET logo.
     * @returns {Node[]}
     * @public
     * @static
     */
    createPaperAirplaneNodes: function() {
      return RewardNode.createRandomNodes( createNodes( createPaperAirplaneNode, NODE_COLORS ), NUMBER_OF_NODES );
    },

    /**
     * Creates an assortment of nodes, using all of the above types.
     * @returns {Node[]}
     * @public
     * @static
     */
    createAssortedNodes: function() {
      var nodes = createNodes( createEquationNode, NODE_COLORS )
        .concat( createNodes( createGraphNode, NODE_COLORS ) )
        .concat( createNodes( createPointToolNode, NODE_COLORS ) )
        .concat( createNodes( createFaceNode, NODE_COLORS ) )
        .concat( createNodes( createPaperAirplaneNode, NODE_COLORS ) );
      return RewardNode.createRandomNodes( nodes, NUMBER_OF_NODES );
    }
  } );
} );
