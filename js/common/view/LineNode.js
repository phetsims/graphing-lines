// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of a line.
 * <p>
 * By default, a line is not labeled with an equation. Subtypes are responsible for decorating the line
 * with an equation in the correct form (slope, slope-intercept, point-slope.) The line's equation is
 * positioned towards the tip, parallel with the line.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var HEAD_SIZE = new Dimension2( 10, 10 );
  var TAIL_WIDTH = 3;
  var LINE_EXTENT = 25; // how far the line extends past the grid
  var EQUATION_FONT_SIZE = 18;

  /**
   * @param {Line} line
   * @param {Graph} graph
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function LineNode( line, graph, mvt ) {
    Node.call( this, { pickable: false } );

    this.line = line;

    var xExtent = mvt.viewToModelDeltaX( LINE_EXTENT );
    var yExtent = Math.abs( mvt.viewToModelDeltaY( LINE_EXTENT ) );
    var tailX, tailY, tipX, tipY;

    if ( line.run === 0 ) {
      // x = 0
      tailX = line.x1;
      tailY = graph.yRange.max + yExtent;
      tipX = line.x1;
      tipY = graph.yRange.min - yExtent;
    }
    else if ( line.rise === 0 ) {
      // y = b
      tailX = graph.xRange.min - xExtent;
      tailY = line.y1;
      tipX = graph.xRange.max + yExtent;
      tipY = line.y1;
    }
    else {
      // tail is the left-most end point. Compute x such that the point is inside the grid.
      tailX = graph.xRange.min - xExtent;
      tailY = line.solveY( tailX );
      if ( tailY < graph.yRange.min - yExtent ) {
        tailX = line.solveX( graph.yRange.min - yExtent );
        tailY = line.solveY( tailX );
      }
      else if ( tailY > graph.yRange.max + yExtent ) {
        tailX = line.solveX( graph.yRange.max + yExtent );
        tailY = line.solveY( tailX );
      }

      // tip is the right-most end point. Compute x such that the point is inside the grid.
      tipX = graph.xRange.max + xExtent;
      tipY = line.solveY( tipX );
      if ( tipY < graph.yRange.min - yExtent ) {
        tipX = line.solveX( graph.yRange.min - yExtent );
        tipY = line.solveY( tipX );
      }
      else if ( tipY > graph.yRange.max + yExtent ) {
        tipX = line.solveX( graph.yRange.max + yExtent );
        tipY = line.solveY( tipX );
      }
    }

    // double-headed arrow
    this.tailLocation = mvt.modelToViewPosition( new Vector2( tailX, tailY ) );
    this.tipLocation = mvt.modelToViewPosition( new Vector2( tipX, tipY ) );
    this._arrowNode = new ArrowNode( this.tailLocation.x, this.tailLocation.y, this.tipLocation.x, this.tipLocation.y,
      { doubleHead: true, tailWidth: TAIL_WIDTH, headWidth: HEAD_SIZE.width, headHeight: HEAD_SIZE.height, fill: line.color, stroke: null } );
    this.addChild( this._arrowNode );

    // equation
    this._equationParentNode = new Node(); // intermediate node to handle line orientation, makes positioning the equation a little easier to grok
    this.addChild( this._equationParentNode );
    this._equationParentNode.rotation = line.undefinedSlope() ? Math.PI / 2 : -Math.atan( line.getSlope() );
    this._equationNode = this.createEquationNode( line, EQUATION_FONT_SIZE, line.color );
    this._equationParentNode.addChild( this._equationNode );

    // Put equation where it won't interfere with slope tool or y-axis, at the end of the line that would have the slope manipulator.
    var X_OFFSET = 30;
    var Y_OFFSET = 12;
    if ( line.undefinedSlope() ) {
      // this puts the "undefined slope" label to the right of the y-axis, at the same end of the line as the slope manipulator
      if ( line.rise < 0 ) {
        this._equationParentNode.translation = this.tipLocation;
        this._equationNode.right = -X_OFFSET;
        this._equationNode.bottom = -Y_OFFSET;
      }
      else {
        this._equationParentNode.translation = this.tailLocation;
        this._equationNode.left = X_OFFSET;
        this._equationNode.bottom = -Y_OFFSET;
      }
    }
    else if ( line.rise <= 0 ) {
      if ( line.run >= 0 ) {
        // equation above the line, at tip
        this._equationParentNode.translation = this.tipLocation;
        this._equationNode.right = -X_OFFSET;
        this._equationNode.bottom = -Y_OFFSET;
      }
      else {
        // equation above the line, at tail
        this._equationParentNode.translation = this.tailLocation;
        this._equationNode.left = X_OFFSET;
        this._equationNode.bottom = -Y_OFFSET;
      }
    }
    else {
      if ( line.run > 0 ) {
        // equation below the line, at tip
        this._equationParentNode.translation = this.tipLocation;
        this._equationNode.right = -X_OFFSET;
        this._equationNode.bottom = this._equationNode.height + Y_OFFSET;
      }
      else {
        // equation below the line, at tail
        this._equationParentNode.translation = this.tailLocation;
        this._equationNode.left = X_OFFSET;
        this._equationNode.bottom = this._equationNode.height + Y_OFFSET;
      }
    }
  }

  return inherit( Node, LineNode, {

    /*
     * By default, a line does not display an equation.
     * Subtypes must override this method to return an equation in the correct form.
     */
    createEquationNode: function( line, fontSize, color ) {
      return new Rectangle( 0, 0, 1, 1 ); // must have well-defined bounds
    },

    setEquationVisible: function( visible ) {
      this._equationParentNode.visible = visible;
    }
  } );
} );