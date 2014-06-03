// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation of a line.
 * By default, a line is not labeled with an equation. Clients are responsible for decorating the line
 * with an equation in the correct form (slope, slope-intercept, point-slope.) The line's equation is
 * positioned towards the tip, parallel with the line.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var HEAD_SIZE = new Dimension2( 10, 10 );
  var TAIL_WIDTH = 3;
  var LINE_EXTENT = 25; // how far the line extends past the grid
  var EQUATION_FONT_SIZE = 18;

  /**
   * @param {Property<Line>} lineProperty
   * @param {Graph} graph
   * @param {ModelViewTransform2} mvt
   * @param {*} options
   * @constructor
   */
  function LineNode( lineProperty, graph, mvt, options ) {

    options = _.extend( {
      // type for creating an equation node, must have static function createDynamicLabel( {Property<Line>} lineProperty, {Number} fontSize )
      equationType: null
    }, options );

    var thisNode = this;

    thisNode.lineProperty = lineProperty;
    thisNode.graph = graph; // @private
    thisNode.mvt = mvt; // @private
    thisNode.xExtent = mvt.viewToModelDeltaX( LINE_EXTENT ); // @private
    thisNode.yExtent = Math.abs( mvt.viewToModelDeltaY( LINE_EXTENT ) ); // @private

    // parent of all children
    thisNode.parentNode = new Node();

    // double-headed arrow
    thisNode.arrowNode = new ArrowNode( 0, 0, 0, 1,
      { doubleHead: true, tailWidth: TAIL_WIDTH, headWidth: HEAD_SIZE.width, headHeight: HEAD_SIZE.height, stroke: null } );
    thisNode.parentNode.addChild( thisNode.arrowNode );

    // optional equation
    if ( options.equationType ) {
      thisNode.equationNode = options.equationType.createDynamicLabel( lineProperty, EQUATION_FONT_SIZE );
      //TODO can this intermediate node go away?
      // intermediate node to handle line orientation, makes positioning the equation a little easier to grok
      thisNode.equationParentNode = new Node( { children: [ this.equationNode ] } );
      thisNode.parentNode.addChild( thisNode.equationParentNode );
    }

    Node.call( thisNode, { children: [ thisNode.parentNode ] } );

    lineProperty.link( function( line ) {
      thisNode.update( line );
    } );
  }

  return inherit( Node, LineNode, {

    setEquationVisible: function( visible ) {
      this.equationParentNode.visible = visible;
    },

    // @private updates the line and equation
    update: function( line ) {

      // line may be null, for example the user's guess in 'Place The Points' challenge
      this.parentNode.visible = line;
      if ( !line ) { return; }

      // compute the new tip and tail for the line
      var xRange = this.graph.xRange;
      var yRange = this.graph.yRange;
      var tailX, tailY, tipX, tipY;

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

      // line (arrow)
      //TODO transform x and y components individually to alloc less memory
      var tailLocation = this.mvt.modelToViewPosition( new Vector2( tailX, tailY ) );
      var tipLocation = this.mvt.modelToViewPosition( new Vector2( tipX, tipY ) );
      this.arrowNode.setTailAndTip( tailLocation.x, tailLocation.y, tipLocation.x, tipLocation.y );
      this.arrowNode.fill = line.color;

      // If this line has an equation, update its orientation and position.
      if ( this.equationParentNode ) {

        this.equationParentNode.rotation = line.undefinedSlope() ? Math.PI / 2 : -Math.atan( line.getSlope() );

        // Put equation where it won't interfere with slope tool or y-axis, at the end of the line that would have the slope manipulator.
        var X_OFFSET = 30;
        var Y_OFFSET = 12;
        if ( line.undefinedSlope() ) {
          // this puts the "undefined slope" label to the right of the y-axis, at the same end of the line as the slope manipulator
          if ( line.rise < 0 ) {
            this.equationParentNode.translation = tipLocation;
            this.equationNode.right = -X_OFFSET;
            this.equationNode.bottom = -Y_OFFSET;
          }
          else {
            this.equationParentNode.translation = tailLocation;
            this.equationNode.left = X_OFFSET;
            this.equationNode.bottom = -Y_OFFSET;
          }
        }
        else if ( line.rise <= 0 ) {
          if ( line.run >= 0 ) {
            // equation above the line, at tip
            this.equationParentNode.translation = tipLocation;
            this.equationNode.right = -X_OFFSET;
            this.equationNode.bottom = -Y_OFFSET;
          }
          else {
            // equation above the line, at tail
            this.equationParentNode.translation = tailLocation;
            this.equationNode.left = X_OFFSET;
            this.equationNode.bottom = -Y_OFFSET;
          }
        }
        else {
          if ( line.run > 0 ) {
            // equation below the line, at tip
            this.equationParentNode.translation = tipLocation;
            this.equationNode.right = -X_OFFSET;
            this.equationNode.bottom = this.equationNode.height + Y_OFFSET;
          }
          else {
            // equation below the line, at tail
            this.equationParentNode.translation = tailLocation;
            this.equationNode.left = X_OFFSET;
            this.equationNode.bottom = this.equationNode.height + Y_OFFSET;
          }
        }
      }
    }
  } );
} );