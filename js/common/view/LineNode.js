// Copyright 2013-2023, University of Colorado Boulder

/**
 * Visual representation of a line.
 * By default, a line is not labeled with an equation. Clients are responsible for decorating the line
 * with an equation in the correct form (slope, slope-intercept, point-slope.) The line's equation is
 * positioned towards the tip, parallel with the line.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Line as SceneryLine, Node } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';
import Line from '../model/Line.js';

// constants
const HEAD_SIZE = new Dimension2( 10, 10 );
const TAIL_WIDTH = 3;
const LINE_EXTENT = 25; // how far the line extends past the grid
const EQUATION_FONT_SIZE = 18;

// default options passed to SCENERY_PHET/ArrowNode
const ARROW_NODE_DEFAULT_OPTIONS = {
  doubleHead: true,
  tailWidth: TAIL_WIDTH,
  headWidth: HEAD_SIZE.width,
  headHeight: HEAD_SIZE.height,
  stroke: null
};

// default options pass to SCENERY/Line
const SCENERY_LINE_DEFAULT_OPTIONS = {
  lineWidth: TAIL_WIDTH
};

export default class LineNode extends Node {

  /**
   * @param {Property.<Line|NotALine>} lineProperty
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   */
  constructor( lineProperty, graph, modelViewTransform, options ) {

    options = merge( {

      // Function for creating a dynamic label that updates as the line changes.
      // function( {Property.<Line>} lineProperty, {Object} [options] )
      createDynamicLabel: null,

      // whether the line has arrows on its ends. true: use SCENERY_PHET/ArrowNode, false: use SCENERY/Line
      hasArrows: true,

      // filled in below
      lineOptions: null
    }, options );

    // fill in appropriate options based on whether the line has arrows
    if ( options.hasArrows ) {
      options.lineOptions = merge( {}, ARROW_NODE_DEFAULT_OPTIONS, options.lineOptions );
    }
    else {
      options.lineOptions = merge( {}, SCENERY_LINE_DEFAULT_OPTIONS, options.lineOptions );
    }

    super();

    this.lineProperty = lineProperty; // @public
    this.graph = graph; // @private
    this.modelViewTransform = modelViewTransform; // @private
    this.xExtent = modelViewTransform.viewToModelDeltaX( LINE_EXTENT ); // @private
    this.yExtent = Math.abs( modelViewTransform.viewToModelDeltaY( LINE_EXTENT ) ); // @private

    // @private parent of all children
    this.parentNode = new Node();

    // @private the line
    this.lineNode = null;
    if ( options.hasArrows ) {
      this.lineNode = new ArrowNode( 0, 0, 0, 1, options.lineOptions );
    }
    else {
      this.lineNode = new SceneryLine( 0, 0, 0, 0, options.lineOptions );
    }
    this.parentNode.addChild( this.lineNode );

    // @private optional equation
    if ( options.createDynamicLabel ) {
      this.equationNode = options.createDynamicLabel( lineProperty, {
        fontSize: EQUATION_FONT_SIZE
      } );
      // rotation is applied to equationParentNode, this makes positioning the equation a little easier to grok
      this.equationParentNode = new Node( { children: [ this.equationNode ] } );
      this.parentNode.addChild( this.equationParentNode );
    }

    this.addChild( this.parentNode );

    const lineObserver = line => this.update( line );
    lineProperty.link( lineObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeLineNode = () => {
      this.equationNode && this.equationNode.dispose();
      lineProperty.unlink( lineObserver );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeLineNode();
    super.dispose();
  }

  // @public
  setEquationVisible( visible ) {
    this.equationParentNode.visible = visible;
  }

  // @private updates the line and equation
  update( line ) {

    // line may be NotALine, for example the user's guess in 'Place The Points' challenge
    const isALine = ( line instanceof Line );
    this.parentNode.visible = isALine; // cast to boolean
    if ( !isALine ) { return; }

    // compute the new tip and tail for the line
    const xRange = this.graph.xRange;
    const yRange = this.graph.yRange;
    let tailX;
    let tailY;
    let tipX;
    let tipY;

    if ( line.run === 0 ) {
      // x = 0
      tailX = line.x1;
      tailY = yRange.max + this.yExtent;
      tipX = line.x1;
      tipY = yRange.min - this.yExtent;
    }
    else if ( line.rise === 0 ) {
      // y = b
      tailX = xRange.min - this.xExtent;
      tailY = line.y1;
      tipX = xRange.max + this.yExtent;
      tipY = line.y1;
    }
    else {
      // tail is the left-most end point. Compute x such that the point is inside the grid.
      tailX = xRange.min - this.xExtent;
      tailY = line.solveY( tailX );
      if ( tailY < yRange.min - this.yExtent ) {
        tailX = line.solveX( yRange.min - this.yExtent );
        tailY = line.solveY( tailX );
      }
      else if ( tailY > yRange.max + this.yExtent ) {
        tailX = line.solveX( yRange.max + this.yExtent );
        tailY = line.solveY( tailX );
      }

      // tip is the right-most end point. Compute x such that the point is inside the grid.
      tipX = xRange.max + this.xExtent;
      tipY = line.solveY( tipX );
      if ( tipY < yRange.min - this.yExtent ) {
        tipX = line.solveX( yRange.min - this.yExtent );
        tipY = line.solveY( tipX );
      }
      else if ( tipY > yRange.max + this.yExtent ) {
        tipX = line.solveX( yRange.max + this.yExtent );
        tipY = line.solveY( tipX );
      }
    }

    // line
    const tailPosition = this.modelViewTransform.modelToViewXY( tailX, tailY );
    const tipPosition = this.modelViewTransform.modelToViewXY( tipX, tipY );
    if ( this.lineNode instanceof ArrowNode ) {
      this.lineNode.setTailAndTip( tailPosition.x, tailPosition.y, tipPosition.x, tipPosition.y );
      this.lineNode.fill = line.color;
    }
    else {
      this.lineNode.setLine( tailPosition.x, tailPosition.y, tipPosition.x, tipPosition.y );
      this.lineNode.stroke = line.color;
    }

    /*
     * If this line has an equation, update its orientation and position.
     * Rotation is applied to equationParentNode.
     * Translation is applied to equationNode, relative to a horizontal line whose tip points right.
     */
    if ( this.equationParentNode ) {

      this.equationParentNode.rotation = line.undefinedSlope() ? Math.PI / 2 : -Math.atan( line.getSlope() );

      // equations have some invisible nodes, compensate so that layout is for visible nodes
      const equationBounds = this.equationNode.bounds;
      const equationVisibleBounds = this.equationNode.visibleBounds;
      const leftOffset = equationVisibleBounds.left - equationBounds.left;
      const rightOffset = equationBounds.right - equationVisibleBounds.right;
      const topOffset = equationVisibleBounds.top - equationBounds.top;
      const bottomOffset = equationBounds.bottom - equationVisibleBounds.bottom;

      // Put equation where it won't interfere with slope tool or y-axis, at the end of the line that would have the slope manipulator.
      const X_OFFSET = 60;
      const Y_OFFSET = 12;
      if ( line.undefinedSlope() ) {
        // this puts the 'undefined slope' label to the right of the y-axis, at the same end of the line as the slope manipulator
        if ( line.rise < 0 ) {
          this.equationParentNode.translation = tipPosition;
          this.equationNode.right = -X_OFFSET + rightOffset;
          this.equationNode.bottom = -Y_OFFSET + bottomOffset;
        }
        else {
          this.equationParentNode.translation = tailPosition;
          this.equationNode.left = X_OFFSET - leftOffset;
          this.equationNode.bottom = -Y_OFFSET + bottomOffset;
        }
      }
      else if ( line.rise <= 0 ) {
        if ( line.run >= 0 ) {
          // quadrant 4: equation above the line, at tip (right)
          this.equationParentNode.translation = tipPosition;
          this.equationNode.right = -X_OFFSET + rightOffset;
          this.equationNode.bottom = -Y_OFFSET + bottomOffset;
        }
        else {
          // quadrant 3: equation above the line, at tail (left)
          this.equationParentNode.translation = tailPosition;
          this.equationNode.left = X_OFFSET - leftOffset;
          this.equationNode.bottom = -Y_OFFSET + bottomOffset;
        }
      }
      else {
        if ( line.run > 0 ) {
          // quadrant 1: equation below the line, at tip (right)
          this.equationParentNode.translation = tipPosition;
          this.equationNode.right = -X_OFFSET + rightOffset;
          this.equationNode.top = Y_OFFSET - topOffset;
        }
        else {
          // quadrant 2: equation below the line, at tail (left)
          this.equationParentNode.translation = tailPosition;
          this.equationNode.left = X_OFFSET - leftOffset;
          this.equationNode.top = Y_OFFSET - topOffset;
        }
      }
    }
  }
}

graphingLines.register( 'LineNode', LineNode );