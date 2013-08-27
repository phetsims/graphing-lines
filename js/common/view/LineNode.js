// Copyright 2002-2013, University of Colorado

/**
 * Visual representation of a line.
 * <p>
 * By default, a line is not labeled with an equation. Subclasses are responsible for decorating the line
 * with an equation in the correct form (slope, slope-intercept, point-slope.) The line's equation is
 * positioned towards the tip, parallel with the line.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var ARROW_HEAD_SIZE = new Dimension2( 10, 10 );
  var LINE_WIDTH = 3;
  var LINE_EXTENT = 25; // how far the line extends past the grid
  var EQUATION_FONT = new PhetFont( 18, 'bold' );

  /**
   * @param {Line} line
   * @param {Graph} graph
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function LineNode( line, graph, mvt ) {
    Node.call( this );

    this._line = line;

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
    this.tailLocation = new Vector2( mvt.modelToViewX( tailX ), mvt.modelToViewY( tailY ) );
    this.tipLocation = new Vector2( mvt.modelToViewX( tipX ), mvt.modelToViewY( tipY ) );

    //TODO replace with double-headed arrow
    this._arrowNode = new Path( {
      shape: Shape.lineSegment( this.tailLocation.x, this.tailLocation.y, this.tipLocation.x, this.tipLocation.y ),
      stroke: line.color,
      lineWidth: LINE_WIDTH
    } );
    this.addChild( this._arrowNode );

    // equation
    this._equationParentNode = new Node();
    this.addChild( this._equationParentNode );
    this._equationParentNode.translation = this.tipLocation;
    this._equationParentNode.rotation = line.undefinedSlope() ? Math.PI / 2 : -Math.atan( line.getSlope() );
    this._updateEquation( line, EQUATION_FONT, line.color );
  }

  return inherit( Node, LineNode, {

    /*
     * By default, a line does not display an equation.
     * Subclasses must override this method to return an equation in the correct form.
     */
    _createEquationNode: function( line, font, color ) {
      return new Node();
    },

    setEquationVisible: function( visible ) {
      this._equationParentNode.visible = visible;
    },

    updateColor: function( color ) {
      this._arrowNode.fill = color;
      this._updateEquation( this._line, EQUATION_FONT, color );
    },

    _updateEquation: function( line, font, color ) {

      this._equationParentNode.removeAllChildren();

      var equationNode = this._createEquationNode( line, font, color );
      this._equationParentNode.addChild( equationNode );

      // Put equation where it won't interfere with slope tool or y-axis, at the end of the line that would have the slope manipulator.
      if ( line.undefinedSlope() ) {
        // this puts the "undefined slope" label to the right of the y-axis, at the same end of the line as the slope manipulator
        if ( line.rise < 0 ) {
          this._equationParentNode.translation = this.tipLocation;
          equationNode.x = -equationNode.width - 30;
          equationNode.y = -equationNode.height - 12;
        }
        else {
          this._equationParentNode.translation = this.tailLocation;
          equationNode.x = 30;
          equationNode.y = -equationNode.height - 12;
        }
      }
      else if ( line.rise <= 0 ) {
        if ( line.run >= 0 ) {
          // equation above the line, at tip
          this._equationParentNode.translation = this.tipLocation
          equationNode.x = -equationNode.width - 30;
          equationNode.y = -equationNode.height - 12;
        }
        else {
          // equation above the line, at tail
          this._equationParentNode.translation = this.tailLocation;
          equationNode.x = -equationNode.width - 30;
          equationNode.y = -equationNode.height - 12;
        }
      }
      else {
        if ( line.run > 0 ) {
          // equation below the line, at tip
          this._equationParentNode.translation = this.tipLocation;
          equationNode.x = -equationNode.width - 30;
          equationNode.y = 10;
        }
        else {
          // equation below the line, at tail
          this._equationParentNode.translation = this.tailLocation;
          equationNode.x = 30;
          equationNode.y = 10;
        }
      }
    }
  } );
} );