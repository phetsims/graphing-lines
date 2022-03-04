// Copyright 2013-2021, University of Colorado Boulder

/**
 * Base type for graphs, displays a 2D grid and axes.
 * The node's origin is at model coordinate (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Line } from '../../../../scenery/js/imports.js';
import { Node } from '../../../../scenery/js/imports.js';
import { Path } from '../../../../scenery/js/imports.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import { RichText } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';
import GLSymbols from '../GLSymbols.js';

//----------------------------------------------------------------------------------------
// constants
//----------------------------------------------------------------------------------------

// grid
const GRID_BACKGROUND = 'white';
const MINOR_GRID_LINE_WIDTH = 1.0;
const MINOR_GRID_LINE_COLOR = 'rgb( 230, 230, 230 )';
const MAJOR_GRID_LINE_WIDTH = 1.0;
const MAJOR_GRID_LINE_COLOR = 'rgb( 192, 192, 192 )';

// axes
const AXIS_ARROW_SIZE = new Dimension2( 10, 10 );
const AXIS_THICKNESS = 1;
const AXIS_COLOR = 'black';
const AXIS_EXTENT = 1.0; // how far the arrow extends past the min/max ticks, in model coordinates
const AXIS_LABEL_FONT = new PhetFont( { size: 16, weight: 'bold' } );
const AXIS_LABEL_SPACING = 2; // space between end of axis and label

// ticks
const MAJOR_TICK_SPACING = 5; // model units
const MINOR_TICK_LENGTH = 3; // how far a minor tick extends from the axis
const MINOR_TICK_LINE_WIDTH = 0.5;
const MINOR_TICK_COLOR = 'black';
const MAJOR_TICK_LENGTH = 6; // how far a major tick extends from the axis
const MAJOR_TICK_LINE_WIDTH = 1;
const MAJOR_TICK_COLOR = 'black';
const MAJOR_TICK_FONT = new PhetFont( 16 );
const TICK_LABEL_SPACING = 2;
const MINUS_SIGN_WIDTH = new Text( '-', { font: MAJOR_TICK_FONT } ).width;

class GraphNode extends Node {

  /**
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( graph, modelViewTransform ) {

    // (0,0) and quadrant 1 is visible
    assert && assert( graph.contains( new Vector2( 0, 0 ) ) && graph.contains( new Vector2( 1, 1 ) ) );

    const gridNode = new GridNode( graph, modelViewTransform );

    super( {
      children: [
        gridNode,
        new XAxisNode( graph, modelViewTransform ),
        new YAxisNode( graph, modelViewTransform )
      ]
    } );

    // @private
    this.gridNode = gridNode;
  }

  // @public Sets the visibility of the grid
  setGridVisible( visible ) {
    this.gridNode.setLinesVisible( visible );
  }
}

//----------------------------------------------------------------------------------------

/**
 * A major or minor line in the grid, drawn from (x1,y1) to (x2,y2).
 */
class GridLineNode extends Line {

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {boolean} isMajor
   */
  constructor( x1, y1, x2, y2, isMajor ) {
    super( x1, y1, x2, y2, {
      lineWidth: isMajor ? MAJOR_GRID_LINE_WIDTH : MINOR_GRID_LINE_WIDTH,
      stroke: isMajor ? MAJOR_GRID_LINE_COLOR : MINOR_GRID_LINE_COLOR
    } );
  }
}

/**
 * Major tick with label, orientation is vertical or horizontal
 */
class MajorTickNode extends Node {

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} value
   * @param {boolean} isVertical
   */
  constructor( x, y, value, isVertical ) {

    super();

    // tick line
    const tickLineNode = new Path( isVertical ?
                                   Shape.lineSegment( x, y - MAJOR_TICK_LENGTH, x, y + MAJOR_TICK_LENGTH ) :
                                   Shape.lineSegment( x - MAJOR_TICK_LENGTH, y, x + MAJOR_TICK_LENGTH, y ), {
      stroke: MAJOR_TICK_COLOR,
      lineWidth: MAJOR_TICK_LINE_WIDTH
    } );
    this.addChild( tickLineNode );

    // tick label
    const tickLabelNode = new Text( value, { font: MAJOR_TICK_FONT, fill: MAJOR_TICK_COLOR } );
    this.addChild( tickLabelNode );

    // label position
    if ( isVertical ) {
      // center label under line, compensate for minus sign
      const signXOffset = ( value < 0 ) ? -( MINUS_SIGN_WIDTH / 2 ) : 0;
      tickLabelNode.left = tickLineNode.centerX - ( tickLabelNode.width / 2 ) + signXOffset;
      tickLabelNode.top = tickLineNode.bottom + TICK_LABEL_SPACING;
    }
    else {
      // center label to left of line
      tickLabelNode.right = tickLineNode.left - TICK_LABEL_SPACING;
      tickLabelNode.centerY = tickLineNode.centerY;
    }
  }
}

/**
 * Minor tick mark, no label, orientation is vertical or horizontal.
 */
class MinorTickNode extends Path {

  /**
   * @param {number} x
   * @param {number} y
   * @param {boolean} isVertical
   */
  constructor( x, y, isVertical ) {
    super( isVertical ?
           Shape.lineSegment( x, y - MINOR_TICK_LENGTH, x, y + MINOR_TICK_LENGTH ) :
           Shape.lineSegment( x - MINOR_TICK_LENGTH, y, x + MINOR_TICK_LENGTH, y ), {
      lineWidth: MINOR_TICK_LINE_WIDTH,
      stroke: MINOR_TICK_COLOR
    } );
  }
}

/**
 * X-axis (horizontal)
 */
class XAxisNode extends Node {

  /**
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( graph, modelViewTransform ) {

    super();

    // horizontal line with arrows at both ends
    const tailPosition = new Vector2( modelViewTransform.modelToViewX( graph.xRange.min - AXIS_EXTENT ), modelViewTransform.modelToViewY( 0 ) );
    const tipPosition = new Vector2( modelViewTransform.modelToViewX( graph.xRange.max + AXIS_EXTENT ), modelViewTransform.modelToViewY( 0 ) );
    const lineNode = new ArrowNode( tailPosition.x, tailPosition.y, tipPosition.x, tipPosition.y, {
      doubleHead: true,
      headHeight: AXIS_ARROW_SIZE.height,
      headWidth: AXIS_ARROW_SIZE.width,
      tailWidth: AXIS_THICKNESS,
      fill: AXIS_COLOR,
      stroke: null
    } );
    this.addChild( lineNode );

    // label at positive (right) end
    const labelNode = new RichText( GLSymbols.x, { font: AXIS_LABEL_FONT, maxWidth: 30 } );
    this.addChild( labelNode );
    labelNode.left = lineNode.right + AXIS_LABEL_SPACING;
    labelNode.centerY = lineNode.centerY;

    // ticks
    const numberOfTicks = graph.getWidth() + 1;
    for ( let i = 0; i < numberOfTicks; i++ ) {
      const modelX = graph.xRange.min + i;
      if ( modelX !== 0 ) { // skip the origin
        const x = modelViewTransform.modelToViewX( modelX );
        const y = modelViewTransform.modelToViewY( 0 );
        if ( Math.abs( modelX ) % MAJOR_TICK_SPACING === 0 ) {
          // major tick
          this.addChild( new MajorTickNode( x, y, modelX, true ) );
        }
        else {
          // minor tick
          this.addChild( new MinorTickNode( x, y, true ) );
        }
      }
    }
  }
}

/**
 * Y-axis (vertical)
 */
class YAxisNode extends Node {

  /**
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( graph, modelViewTransform ) {

    super();

    // vertical line with arrows at both ends
    const tailPosition = new Vector2( modelViewTransform.modelToViewX( 0 ), modelViewTransform.modelToViewY( graph.yRange.min - AXIS_EXTENT ) );
    const tipPosition = new Vector2( modelViewTransform.modelToViewX( 0 ), modelViewTransform.modelToViewY( graph.yRange.max + AXIS_EXTENT ) );
    const lineNode = new ArrowNode( tailPosition.x, tailPosition.y, tipPosition.x, tipPosition.y, {
      doubleHead: true,
      headHeight: AXIS_ARROW_SIZE.height,
      headWidth: AXIS_ARROW_SIZE.width,
      tailWidth: AXIS_THICKNESS,
      fill: AXIS_COLOR,
      stroke: null
    } );
    this.addChild( lineNode );

    // label at positive (top) end
    const labelNode = new RichText( GLSymbols.y, { font: AXIS_LABEL_FONT, maxWidth: 30 } );
    this.addChild( labelNode );
    labelNode.centerX = lineNode.centerX;
    labelNode.bottom = lineNode.top - AXIS_LABEL_SPACING;

    // ticks
    const numberOfTicks = graph.getHeight() + 1;
    for ( let i = 0; i < numberOfTicks; i++ ) {
      const modelY = graph.yRange.min + i;
      if ( modelY !== 0 ) { // skip the origin
        const x = modelViewTransform.modelToViewX( 0 );
        const y = modelViewTransform.modelToViewY( modelY );
        if ( Math.abs( modelY ) % MAJOR_TICK_SPACING === 0 ) {
          // major tick
          this.addChild( new MajorTickNode( x, y, modelY, false ) );
        }
        else {
          // minor tick
          this.addChild( new MinorTickNode( x, y, false ) );
        }
      }
    }
  }
}

/**
 * 2D grid
 */
class GridNode extends Node {

  /**
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   */
  constructor( graph, modelViewTransform ) {

    super();

    // background
    const backgroundNode = new Rectangle(
      modelViewTransform.modelToViewX( graph.xRange.min ), modelViewTransform.modelToViewY( graph.yRange.max ),
      modelViewTransform.modelToViewDeltaX( graph.getWidth() ), modelViewTransform.modelToViewDeltaY( -graph.getHeight() ), {
        fill: GRID_BACKGROUND,
        stroke: MAJOR_GRID_LINE_COLOR
      } );
    this.addChild( backgroundNode );

    // @private horizontal grid lines, one line for each unit of grid spacing
    this.horizontalGridLinesNode = new Node();
    this.addChild( this.horizontalGridLinesNode );
    const numberOfHorizontalGridLines = graph.getHeight() + 1;
    const minX = modelViewTransform.modelToViewX( graph.xRange.min );
    const maxX = modelViewTransform.modelToViewX( graph.xRange.max );
    for ( let i = 0; i < numberOfHorizontalGridLines; i++ ) {
      const modelY = graph.yRange.min + i;
      if ( modelY !== 0 ) { // skip origin, x axis will live here
        const yOffset = modelViewTransform.modelToViewY( modelY );
        const isMajorX = Math.abs( modelY ) % MAJOR_TICK_SPACING === 0;
        this.horizontalGridLinesNode.addChild( new GridLineNode( minX, yOffset, maxX, yOffset, isMajorX ) );
      }
    }

    // @private vertical grid lines, one line for each unit of grid spacing
    this.verticalGridLinesNode = new Node();
    this.addChild( this.verticalGridLinesNode );
    const numberOfVerticalGridLines = graph.getWidth() + 1;
    const minY = modelViewTransform.modelToViewY( graph.yRange.max ); // yes, swap min and max
    const maxY = modelViewTransform.modelToViewY( graph.yRange.min );
    for ( let j = 0; j < numberOfVerticalGridLines; j++ ) {
      const modelX = graph.xRange.min + j;
      if ( modelX !== 0 ) { // skip origin, y axis will live here
        const xOffset = modelViewTransform.modelToViewX( modelX );
        const isMajorY = Math.abs( modelX ) % MAJOR_TICK_SPACING === 0;
        this.verticalGridLinesNode.addChild( new GridLineNode( xOffset, minY, xOffset, maxY, isMajorY ) );
      }
    }
  }

  // @public Sets visibility of grid lines
  setLinesVisible( visible ) {
    this.horizontalGridLinesNode.visible = this.verticalGridLinesNode.visible = visible;
  }
}

graphingLines.register( 'GraphNode', GraphNode );

export default GraphNode;