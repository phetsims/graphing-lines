// Copyright 2013-2021, University of Colorado Boulder

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

import Property from '../../../../axon/js/Property.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import FaceNode from '../../../../scenery-phet/js/FaceNode.js';
import PaperAirplaneNode from '../../../../scenery-phet/js/PaperAirplaneNode.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RewardNode from '../../../../vegas/js/RewardNode.js';
import pointToolBodyImage from '../../../images/point_tool_body_png.js';
import pointToolTipImage from '../../../images/point_tool_tip_png.js';
import GLConstants from '../../common/GLConstants.js';
import Line from '../../common/model/Line.js';
import GLIconFactory from '../../common/view/GLIconFactory.js';
import graphingLines from '../../graphingLines.js';
import graphingLinesStrings from '../../graphingLinesStrings.js';
import PointSlopeEquationNode from '../../pointslope/view/PointSlopeEquationNode.js';
import SlopeInterceptEquationNode from '../../slopeintercept/view/SlopeInterceptEquationNode.js';

// constants
const NUMBER_OF_NODES = 150;
const NODE_COLORS = [ 'yellow', PhetColorScheme.RED_COLORBLIND, 'orange', 'magenta', 'cyan', 'green' ];
const EQUATION_FONT_SIZE = 24;
const GRAPH_WIDTH = 60;
const POINT_TOOL_FONT = new PhetFont( 15 );
const POINT_TOOL_WINDOW_CENTER_X = 44; // center of the value window relative to the left edge of point_tool_body.png
const FACE_DIAMETER = 60;
const AIRPLANE_SCALE = 1.76;

class GLRewardNode extends RewardNode {

  /**
   * @params {Node[]} nodes to use in the reward
   */
  constructor( rewardNodes ) {
    super( { nodes: rewardNodes } );
  }

  /**
   * Creates a set of equations nodes.
   * @returns {Node[]}
   * @public
   * @static
   */
  static createEquationNodes() {
    return RewardNode.createRandomNodes( createNodes( createEquationNode, NODE_COLORS ), NUMBER_OF_NODES );
  }

  /**
   * Creates a set of equations graph.
   * @returns {Node[]}
   * @public
   * @static
   */
  static createGraphNodes() {
    return RewardNode.createRandomNodes( createNodes( createGraphNode, NODE_COLORS ), NUMBER_OF_NODES );
  }

  /**
   * Creates a set of 'point tool' nodes.
   * @returns {Node[]}
   * @public
   * @static
   */
  static createPointToolNodes() {
    return RewardNode.createRandomNodes( createNodes( createPointToolNode, NODE_COLORS ), NUMBER_OF_NODES );
  }

  /**
   * Creates a set of 'smiley face' nodes.
   * @returns {Node[]}
   * @public
   * @static
   */
  static createSmileyFaceNodes() {
    return RewardNode.createRandomNodes( createNodes( createFaceNode, NODE_COLORS ), NUMBER_OF_NODES );
  }

  /**
   * Creates a set of paper airplane nodes, similar to the PhET logo.
   * @returns {Node[]}
   * @public
   * @static
   */
  static createPaperAirplaneNodes() {
    return RewardNode.createRandomNodes( createNodes( createPaperAirplaneNode, NODE_COLORS ), NUMBER_OF_NODES );
  }

  /**
   * Creates an assortment of nodes, using all of the above types.
   * @returns {Node[]}
   * @public
   * @static
   */
  static createAssortedNodes() {
    const nodes = createNodes( createEquationNode, NODE_COLORS )
      .concat( createNodes( createGraphNode, NODE_COLORS ) )
      .concat( createNodes( createPointToolNode, NODE_COLORS ) )
      .concat( createNodes( createFaceNode, NODE_COLORS ) )
      .concat( createNodes( createPaperAirplaneNode, NODE_COLORS ) );
    return RewardNode.createRandomNodes( nodes, NUMBER_OF_NODES );
  }
}

//-----------------------------------------------------------------------------------------------
// Misc. utility functions
//-----------------------------------------------------------------------------------------------

function getRandomX() {
  return getRandomNonZeroInteger( GLConstants.X_AXIS_RANGE.min, GLConstants.X_AXIS_RANGE.max );
}

function getRandomY() {
  return getRandomNonZeroInteger( GLConstants.Y_AXIS_RANGE.min, GLConstants.Y_AXIS_RANGE.max );
}

function getRandomNonZeroInteger( min, max ) {
  let i = Utils.roundSymmetric( min + ( dotRandom.nextDouble() * ( max - min ) ) );
  if ( i === 0 ) { i = 1; }
  return i;
}

//-----------------------------------------------------------------------------------------------
// Functions that create specific types of nodes.
// All of these function must have a {Color|String} color parameter.
//-----------------------------------------------------------------------------------------------

// Creates a random equation with the specified color.
function createEquationNode( color ) {
  let node;
  if ( dotRandom.nextDouble() < 0.5 ) {
    node = SlopeInterceptEquationNode.createDynamicLabel(
      new Property( Line.createSlopeIntercept( getRandomY(), getRandomX(), getRandomY(), color ) ), {
        fontSize: EQUATION_FONT_SIZE
      } );
  }
  else {
    node = PointSlopeEquationNode.createDynamicLabel(
      new Property( Line.createPointSlope( getRandomX(), getRandomY(), getRandomX(), getRandomY(), color ) ), {
        fontSize: EQUATION_FONT_SIZE
      } );
  }
  return node;
}

// Creates a random graph with the specified color.
function createGraphNode( color ) {
  let node;
  if ( dotRandom.nextDouble() < 0.5 ) {
    node = GLIconFactory.createGraphIcon( GRAPH_WIDTH, color, -3, -3, 3, 3 ); // y = +x
  }
  else {
    node = GLIconFactory.createGraphIcon( GRAPH_WIDTH, color, -3, 3, 3, -3 ); // y = -x
  }
  return node;
}

/*
 * Creates a random point tool with the specified color.
 * This does not use PointToolNode because it has too many model dependencies.
 */
function createPointToolNode( color ) {
  const body = new Image( pointToolBodyImage );
  const tip = new Image( pointToolTipImage, { top: body.bottom, centerX: 0.25 * body.width } );
  const background = new Rectangle( 0, 0, 0.95 * body.width, 0.95 * body.height, { fill: color, center: body.center } );
  const value = new Text( StringUtils.format( graphingLinesStrings.point.XY, getRandomX(), getRandomY() ),
    { font: POINT_TOOL_FONT, centerX: POINT_TOOL_WINDOW_CENTER_X, centerY: body.centerY } );
  return new Node( { children: [ background, body, tip, value ] } );
}

// Creates a smiley face with the specified color.
function createFaceNode( color ) {
  return new FaceNode( FACE_DIAMETER, { headFill: color } );
}

// Creates a paper airplane with the specified color.
function createPaperAirplaneNode( color ) {
  return new PaperAirplaneNode( { fill: color, scale: AIRPLANE_SCALE } ); // width of around 60px
}

/**
 * Creates an array of nodes for a specified array of colors.
 * The functions above serve as the creationFunction argument.
 *
 * @param {function} creationFunction a function with one parameter of type {Color|String}
 * @param {Color|String[]} colors
 * @returns {Node[]}
 */
function createNodes( creationFunction, colors ) {
  const nodes = [];
  colors.forEach( color => nodes.push( creationFunction( color ) ) );
  return nodes;
}

graphingLines.register( 'GLRewardNode', GLRewardNode );

export default GLRewardNode;