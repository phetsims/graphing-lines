// Copyright 2002-2013, University of Colorado

/**
 * Base class for graphs, displays a 2D grid and axes.
 * The node's origin is at model coordinate (0,0).
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var GLStrings = require( 'common/GLStrings' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  //----------------------------------------------------------------------------------------
  // constants
  //----------------------------------------------------------------------------------------

  // grid
  var GRID_BACKGROUND = Color.WHITE;
  var MINOR_GRID_LINEWIDTH = 0.25;
  var MINOR_GRID_LINE_COLOR = Color.LIGHT_GRAY;
  var MAJOR_GRID_LINEWIDTH = 0.5;
  var MAJOR_GRID_LINE_COLOR = Color.LIGHT_GRAY;

  // axes                                                                                                                                          n
  var AXIS_ARROW_SIZE = new Dimension2( 10, 10 );
  var AXIS_THICKNESS = 1;
  var AXIS_COLOR = Color.BLACK;
  var AXIS_EXTENT = 1.0; // how far the arrow extends past the min/max ticks, in model coordinates
  var AXIS_LABEL_FONT = new PhetFont( 16, 'bold' );
  var AXIS_LABEL_SPACING = 2; // space between end of axis and label

  // ticks
  var MAJOR_TICK_SPACING = 5; // model units
  var MINOR_TICK_LENGTH = 3; // how far a minor tick extends from the axis
  var MINOR_TICK_LINEWIDTH = 0.5;
  var MINOR_TICK_COLOR = Color.BLACK;
  var MAJOR_TICK_LENGTH = 6; // how far a major tick extends from the axis
  var MAJOR_TICK_LINEWIDTH = 1;
  var MAJOR_TICK_COLOR = Color.BLACK;
  var MAJOR_TICK_FONT = new PhetFont( 16 );
  var TICK_LABEL_SPACING = 2;
  var MINUS_SIGN_WIDTH = new Text( "-", { font: MAJOR_TICK_FONT } ).width;

  //----------------------------------------------------------------------------------------
  // A major or minor line in the grid
  //----------------------------------------------------------------------------------------

  function GridLineNode( x1, y1, x2, y2, isMajor ) {
    Path.call( this, {
      shape: Shape.lineSegment( x1, y1, x2, y2 ),
      lineWidth: isMajor ? MAJOR_GRID_LINEWIDTH : MINOR_GRID_LINEWIDTH,
      stroke: isMajor ? MAJOR_GRID_LINE_COLOR : MINOR_GRID_LINE_COLOR
    } );
  }

  inherit( Path, GridLineNode );

  //----------------------------------------------------------------------------------------
  // major tick with label, orientation is vertical or horizontal
  //----------------------------------------------------------------------------------------

  function MajorTickNode( x, y, value, isVertical ) {

    Node.call( this );

    // tick line
    var tickLineNode = new Path( {
      shape: isVertical ?
             Shape.lineSegment( x, y - MAJOR_TICK_LENGTH, x, y + MAJOR_TICK_LENGTH ) :
             Shape.lineSegment( x - MAJOR_TICK_LENGTH, y, x + MAJOR_TICK_LENGTH, y ),
      stroke: MAJOR_TICK_COLOR,
      lineWidth: MAJOR_TICK_LINEWIDTH
    } );
    this.addChild( tickLineNode );

    // tick label
    var tickLabelNode = new Text( value, { font: MAJOR_TICK_FONT, fill: MAJOR_TICK_COLOR } );
    this.addChild( tickLabelNode );

    // label position
    if ( isVertical ) {
      // center label under line, compensate for minus sign
      var signXOffset = ( value < 0 ) ? -( MINUS_SIGN_WIDTH / 2 ) : 0;
      tickLabelNode.left = tickLineNode.centerX - ( tickLabelNode.width / 2 ) + signXOffset
      tickLabelNode.top = tickLineNode.bottom + TICK_LABEL_SPACING;
    }
    else {
      // center label to left of line
      tickLabelNode.right = tickLineNode.left - TICK_LABEL_SPACING;
      tickLabelNode.centerY = tickLineNode.centerY;
    }
  }

  inherit( Node, MajorTickNode );

  //----------------------------------------------------------------------------------------
  // minor tick mark, no label, orientation is vertical or horizontal
  //----------------------------------------------------------------------------------------

  function MinorTickNode( x, y, isVertical ) {
    Path.call( this, {
      shape: isVertical ?
             Shape.lineSegment( x, y - MINOR_TICK_LENGTH, x, y + MINOR_TICK_LENGTH ) :
             Shape.lineSegment( x - MINOR_TICK_LENGTH, y, x + MINOR_TICK_LENGTH, y ),
      lineWidth: MINOR_TICK_LINEWIDTH,
      stroke: MINOR_TICK_COLOR
    } );
  }

  inherit( Path, MinorTickNode );

  //----------------------------------------------------------------------------------------
  // x-axis (horizontal)
  //----------------------------------------------------------------------------------------

  function XAxisNode( graph, mvt ) {

    Node.call( this );

    // horizontal line with arrows at both ends
    var axisLength = Math.abs( mvt.modelToViewX( graph.xRange.max + AXIS_EXTENT ) - mvt.modelToViewX( graph.xRange.min - AXIS_EXTENT ) );
    assert && assert( AXIS_ARROW_SIZE.width > AXIS_THICKNESS );
    assert && assert( axisLength > 2 * AXIS_ARROW_SIZE.height );
    // shape definition is relative to (0,0), starts at left tip and moves clockwise.
    var shape = new Shape()
      .moveTo( -axisLength / 2, 0 )
      .lineTo( -axisLength / 2 + AXIS_ARROW_SIZE.height, -AXIS_ARROW_SIZE.width / 2 )
      .lineTo( -axisLength / 2 + AXIS_ARROW_SIZE.height, -AXIS_THICKNESS / 2 )
      .lineTo( axisLength / 2 - AXIS_ARROW_SIZE.height, -AXIS_THICKNESS / 2 )
      .lineTo( axisLength / 2 - AXIS_ARROW_SIZE.height, -AXIS_ARROW_SIZE.width / 2 )
      .lineTo( axisLength / 2, 0 )
      .lineTo( axisLength / 2 - AXIS_ARROW_SIZE.height, AXIS_ARROW_SIZE.width / 2 )
      .lineTo( axisLength / 2 - AXIS_ARROW_SIZE.height, AXIS_THICKNESS / 2 )
      .lineTo( -axisLength / 2 + AXIS_ARROW_SIZE.height, AXIS_THICKNESS / 2 )
      .lineTo( -axisLength / 2 + AXIS_ARROW_SIZE.height, AXIS_ARROW_SIZE.width / 2 )
      .close();
    var lineNode = new Path( { shape: shape, fill: AXIS_COLOR } );
    this.addChild( lineNode );
    lineNode.translation = mvt.modelToViewPosition( new Vector2( 0, 0 ) );

    // label at positive (right) end
    var labelNode = new Text( GLStrings["symbol.x"], { font: AXIS_LABEL_FONT } );
    this.addChild( labelNode );
    labelNode.left = lineNode.right + AXIS_LABEL_SPACING;
    labelNode.centerY = lineNode.centerY;

    // ticks
    var numberOfTicks = graph.getWidth() + 1;
    for ( var i = 0; i < numberOfTicks; i++ ) {
      var modelX = graph.xRange.min + i;
      if ( modelX != 0 ) { // skip the origin
        var x = mvt.modelToViewX( modelX );
        var y = mvt.modelToViewY( 0 );
        if ( Math.abs( modelX ) % MAJOR_TICK_SPACING == 0 ) {
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

  inherit( Node, XAxisNode );

  //----------------------------------------------------------------------------------------
  // y-axis (vertical)
  //----------------------------------------------------------------------------------------

  function YAxisNode( graph, mvt ) {

    Node.call( this );

    // vertical line with arrows at both ends
    var axisLength = Math.abs( mvt.modelToViewY( graph.yRange.max + AXIS_EXTENT ) - mvt.modelToViewY( graph.yRange.min - AXIS_EXTENT ) );
    assert && assert( AXIS_ARROW_SIZE.width > AXIS_THICKNESS );
    assert && assert( axisLength > 2 * AXIS_ARROW_SIZE.height );
    // shape definition is relative to (0,0), starts at top tip and moves clockwise.
    var shape = new Shape()
      .moveTo( 0, -axisLength / 2 )
      .lineTo( -AXIS_ARROW_SIZE.width / 2, -axisLength / 2 + AXIS_ARROW_SIZE.height )
      .lineTo( -AXIS_THICKNESS / 2, -axisLength / 2 + AXIS_ARROW_SIZE.height )
      .lineTo( -AXIS_THICKNESS / 2, axisLength / 2 - AXIS_ARROW_SIZE.height )
      .lineTo( -AXIS_ARROW_SIZE.width / 2, axisLength / 2 - AXIS_ARROW_SIZE.height )
      .lineTo( 0, axisLength / 2 )
      .lineTo( AXIS_ARROW_SIZE.width / 2, axisLength / 2 - AXIS_ARROW_SIZE.height )
      .lineTo( AXIS_THICKNESS / 2, axisLength / 2 - AXIS_ARROW_SIZE.height )
      .lineTo( AXIS_THICKNESS / 2, -axisLength / 2 + AXIS_ARROW_SIZE.height )
      .lineTo( AXIS_ARROW_SIZE.width / 2, -axisLength / 2 + AXIS_ARROW_SIZE.height )
      .close();
    var lineNode = new Path( { shape: shape, fill: AXIS_COLOR } );
    this.addChild( lineNode );
    lineNode.translation = mvt.modelToViewPosition( new Vector2( 0, 0 ) );

    // label at positive (top) end
    var labelNode = new Text( GLStrings["symbol.y"], { font: AXIS_LABEL_FONT } );
    this.addChild( labelNode );
    labelNode.centerX = lineNode.centerX;
    labelNode.bottom = lineNode.top - AXIS_LABEL_SPACING;

    // ticks
    var numberOfTicks = graph.getHeight() + 1;
    for ( var i = 0; i < numberOfTicks; i++ ) {
      var modelY = graph.yRange.min + i;
      if ( modelY != 0 ) { // skip the origin
        var x = mvt.modelToViewX( 0 );
        var y = mvt.modelToViewY( modelY );
        if ( Math.abs( modelY ) % MAJOR_TICK_SPACING == 0 ) {
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

  inherit( Node, YAxisNode );

  //----------------------------------------------------------------------------------------
  // 2D grid
  //----------------------------------------------------------------------------------------

  function GridNode( graph, mvt ) {
    Node.call( this );

    // background
    var backgroundNode = new Rectangle(
      mvt.modelToViewX( graph.xRange.min ), mvt.modelToViewY( graph.yRange.max ),
      mvt.modelToViewDeltaX( graph.getWidth() ), mvt.modelToViewDeltaY( -graph.getHeight() ),
      { fill: GRID_BACKGROUND } );
    this.addChild( backgroundNode );

    // horizontal grid lines, one line for each unit of grid spacing
    var horizontalGridLinesNode = new Node();
    this.addChild( horizontalGridLinesNode );
    var numberOfHorizontalGridLines = graph.getHeight() + 1;
    var minX = mvt.modelToViewX( graph.xRange.min );
    var maxX = mvt.modelToViewX( graph.xRange.max );
    for ( var i = 0; i < numberOfHorizontalGridLines; i++ ) {
      var modelY = graph.yRange.min + i;
      if ( modelY != 0 ) { // skip origin, x axis will live here
        var yOffset = mvt.modelToViewY( modelY );
        var isMajorX = Math.abs( modelY ) % MAJOR_TICK_SPACING == 0;
        horizontalGridLinesNode.addChild( new GridLineNode( minX, yOffset, maxX, yOffset, isMajorX ) );
      }
    }

    // vertical grid lines, one line for each unit of grid spacing
    var verticalGridLinesNode = new Node();
    this.addChild( verticalGridLinesNode );
    var numberOfVerticalGridLines = graph.getWidth() + 1;
    var minY = mvt.modelToViewY( graph.yRange.max ); // yes, swap min and max
    var maxY = mvt.modelToViewY( graph.yRange.min );
    for ( var j = 0; j < numberOfVerticalGridLines; j++ ) {
      var modelX = graph.xRange.min + j;
      if ( modelX != 0 ) { // skip origin, y axis will live here
        var xOffset = mvt.modelToViewX( modelX );
        var isMajorY = Math.abs( modelX ) % MAJOR_TICK_SPACING == 0;
        verticalGridLinesNode.addChild( new GridLineNode( xOffset, minY, xOffset, maxY, isMajorY ) );
      }
    }
  }

  inherit( Node, GridNode );

  //----------------------------------------------------------------------------------------

  /**
   * @param {Graph} graph
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function GraphNode( graph, mvt ) {
    assert && assert( graph.contains( new Vector2( 0, 0 ) ) && graph.contains( new Vector2( 1, 1 ) ) ); // (0,0) and quadrant 1 is visible
    Node.call( this, { pickable: false } );
    this.addChild( new GridNode( graph, mvt ) );
    this.addChild( new XAxisNode( graph, mvt ) );
    this.addChild( new YAxisNode( graph, mvt ) );
  }

  return inherit( Node, GraphNode );
} );