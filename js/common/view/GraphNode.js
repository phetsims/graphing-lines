// Copyright 2013-2019, University of Colorado Boulder

/**
 * Base type for graphs, displays a 2D grid and axes.
 * The node's origin is at model coordinate (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  const GLSymbols = require( 'GRAPHING_LINES/common/GLSymbols' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Shape = require( 'KITE/Shape' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Vector2 = require( 'DOT/Vector2' );

  //----------------------------------------------------------------------------------------
  // constants
  //----------------------------------------------------------------------------------------

  // grid
  var GRID_BACKGROUND = 'white';
  var MINOR_GRID_LINE_WIDTH = 1.0;
  var MINOR_GRID_LINE_COLOR = 'rgb( 230, 230, 230 )';
  var MAJOR_GRID_LINE_WIDTH = 1.0;
  var MAJOR_GRID_LINE_COLOR = 'rgb( 192, 192, 192 )';

  // axes
  var AXIS_ARROW_SIZE = new Dimension2( 10, 10 );
  var AXIS_THICKNESS = 1;
  var AXIS_COLOR = 'black';
  var AXIS_EXTENT = 1.0; // how far the arrow extends past the min/max ticks, in model coordinates
  var AXIS_LABEL_FONT = new GLFont( { size: 16, weight: 'bold' } );
  var AXIS_LABEL_SPACING = 2; // space between end of axis and label

  // ticks
  var MAJOR_TICK_SPACING = 5; // model units
  var MINOR_TICK_LENGTH = 3; // how far a minor tick extends from the axis
  var MINOR_TICK_LINE_WIDTH = 0.5;
  var MINOR_TICK_COLOR = 'black';
  var MAJOR_TICK_LENGTH = 6; // how far a major tick extends from the axis
  var MAJOR_TICK_LINE_WIDTH = 1;
  var MAJOR_TICK_COLOR = 'black';
  var MAJOR_TICK_FONT = new GLFont( 16 );
  var TICK_LABEL_SPACING = 2;
  var MINUS_SIGN_WIDTH = new Text( '-', { font: MAJOR_TICK_FONT } ).width;

  /**
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function GraphNode( graph, modelViewTransform ) {

    assert && assert( graph.contains( new Vector2( 0, 0 ) ) && graph.contains( new Vector2( 1, 1 ) ) ); // (0,0) and quadrant 1 is visible

    this.gridNode = new GridNode( graph, modelViewTransform ); // @private

    Node.call( this, {
        children: [
          this.gridNode,
          new XAxisNode( graph, modelViewTransform ),
          new YAxisNode( graph, modelViewTransform )
        ]
      }
    );
  }

  graphingLines.register( 'GraphNode', GraphNode );

  inherit( Node, GraphNode, {

    // @public Sets the visibility of the grid
    setGridVisible: function( visible ) {
      this.gridNode.setLinesVisible( visible );
    }
  } );

  //----------------------------------------------------------------------------------------

  /**
   * A major or minor line in the grid, drawn from (x1,y1) to (x2,y2).
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {boolean} isMajor
   * @constructor
   */
  function GridLineNode( x1, y1, x2, y2, isMajor ) {
    Line.call( this, x1, y1, x2, y2, {
      lineWidth: isMajor ? MAJOR_GRID_LINE_WIDTH : MINOR_GRID_LINE_WIDTH,
      stroke: isMajor ? MAJOR_GRID_LINE_COLOR : MINOR_GRID_LINE_COLOR
    } );
  }

  inherit( Line, GridLineNode );

  //----------------------------------------------------------------------------------------

  /**
   * Major tick with label, orientation is vertical or horizontal
   * @param {number} x
   * @param {number} y
   * @param {number} value
   * @param {boolean} isVertical
   * @constructor
   */
  function MajorTickNode( x, y, value, isVertical ) {

    Node.call( this );

    // tick line
    var tickLineNode = new Path( isVertical ?
                                 Shape.lineSegment( x, y - MAJOR_TICK_LENGTH, x, y + MAJOR_TICK_LENGTH ) :
                                 Shape.lineSegment( x - MAJOR_TICK_LENGTH, y, x + MAJOR_TICK_LENGTH, y ), {
      stroke: MAJOR_TICK_COLOR,
      lineWidth: MAJOR_TICK_LINE_WIDTH
    } );
    this.addChild( tickLineNode );

    // tick label
    var tickLabelNode = new Text( value, { font: MAJOR_TICK_FONT, fill: MAJOR_TICK_COLOR } );
    this.addChild( tickLabelNode );

    // label position
    if ( isVertical ) {
      // center label under line, compensate for minus sign
      var signXOffset = ( value < 0 ) ? -( MINUS_SIGN_WIDTH / 2 ) : 0;
      tickLabelNode.left = tickLineNode.centerX - ( tickLabelNode.width / 2 ) + signXOffset;
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

  /**
   * Minor tick mark, no label, orientation is vertical or horizontall
   * @param {number} x
   * @param {number} y
   * @param {boolean} isVertical
   * @constructor
   */
  function MinorTickNode( x, y, isVertical ) {
    Path.call( this, isVertical ?
                     Shape.lineSegment( x, y - MINOR_TICK_LENGTH, x, y + MINOR_TICK_LENGTH ) :
                     Shape.lineSegment( x - MINOR_TICK_LENGTH, y, x + MINOR_TICK_LENGTH, y ), {
      lineWidth: MINOR_TICK_LINE_WIDTH,
      stroke: MINOR_TICK_COLOR
    } );
  }

  inherit( Path, MinorTickNode );

  //----------------------------------------------------------------------------------------

  /**
   * x-axis (horizontal)
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function XAxisNode( graph, modelViewTransform ) {

    Node.call( this );

    // horizontal line with arrows at both ends
    var tailLocation = new Vector2( modelViewTransform.modelToViewX( graph.xRange.min - AXIS_EXTENT ), modelViewTransform.modelToViewY( 0 ) );
    var tipLocation = new Vector2( modelViewTransform.modelToViewX( graph.xRange.max + AXIS_EXTENT ), modelViewTransform.modelToViewY( 0 ) );
    var lineNode = new ArrowNode( tailLocation.x, tailLocation.y, tipLocation.x, tipLocation.y, {
      doubleHead: true,
      headHeight: AXIS_ARROW_SIZE.height,
      headWidth: AXIS_ARROW_SIZE.width,
      tailWidth: AXIS_THICKNESS,
      fill: AXIS_COLOR,
      stroke: null
    } );
    this.addChild( lineNode );

    // label at positive (right) end
    var labelNode = new RichText( GLSymbols.x, { font: AXIS_LABEL_FONT, maxWidth: 30 } );
    this.addChild( labelNode );
    labelNode.left = lineNode.right + AXIS_LABEL_SPACING;
    labelNode.centerY = lineNode.centerY;

    // ticks
    var numberOfTicks = graph.getWidth() + 1;
    for ( var i = 0; i < numberOfTicks; i++ ) {
      var modelX = graph.xRange.min + i;
      if ( modelX !== 0 ) { // skip the origin
        var x = modelViewTransform.modelToViewX( modelX );
        var y = modelViewTransform.modelToViewY( 0 );
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

  inherit( Node, XAxisNode );

  //----------------------------------------------------------------------------------------

  /**
   * y-axis (vertical)
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function YAxisNode( graph, modelViewTransform ) {

    Node.call( this );

    // vertical line with arrows at both ends
    var tailLocation = new Vector2( modelViewTransform.modelToViewX( 0 ), modelViewTransform.modelToViewY( graph.yRange.min - AXIS_EXTENT ) );
    var tipLocation = new Vector2( modelViewTransform.modelToViewX( 0 ), modelViewTransform.modelToViewY( graph.yRange.max + AXIS_EXTENT ) );
    var lineNode = new ArrowNode( tailLocation.x, tailLocation.y, tipLocation.x, tipLocation.y, {
      doubleHead: true,
      headHeight: AXIS_ARROW_SIZE.height,
      headWidth: AXIS_ARROW_SIZE.width,
      tailWidth: AXIS_THICKNESS,
      fill: AXIS_COLOR,
      stroke: null
    } );
    this.addChild( lineNode );

    // label at positive (top) end
    var labelNode = new RichText( GLSymbols.y, { font: AXIS_LABEL_FONT, maxWidth: 30 } );
    this.addChild( labelNode );
    labelNode.centerX = lineNode.centerX;
    labelNode.bottom = lineNode.top - AXIS_LABEL_SPACING;

    // ticks
    var numberOfTicks = graph.getHeight() + 1;
    for ( var i = 0; i < numberOfTicks; i++ ) {
      var modelY = graph.yRange.min + i;
      if ( modelY !== 0 ) { // skip the origin
        var x = modelViewTransform.modelToViewX( 0 );
        var y = modelViewTransform.modelToViewY( modelY );
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

  inherit( Node, YAxisNode );

  //----------------------------------------------------------------------------------------

  /**
   * 2D grid
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function GridNode( graph, modelViewTransform ) {
    Node.call( this );

    // background
    var backgroundNode = new Rectangle(
      modelViewTransform.modelToViewX( graph.xRange.min ), modelViewTransform.modelToViewY( graph.yRange.max ),
      modelViewTransform.modelToViewDeltaX( graph.getWidth() ), modelViewTransform.modelToViewDeltaY( -graph.getHeight() ), {
        fill: GRID_BACKGROUND,
        stroke: MAJOR_GRID_LINE_COLOR
      } );
    this.addChild( backgroundNode );

    // @private horizontal grid lines, one line for each unit of grid spacing
    this.horizontalGridLinesNode = new Node();
    this.addChild( this.horizontalGridLinesNode );
    var numberOfHorizontalGridLines = graph.getHeight() + 1;
    var minX = modelViewTransform.modelToViewX( graph.xRange.min );
    var maxX = modelViewTransform.modelToViewX( graph.xRange.max );
    for ( var i = 0; i < numberOfHorizontalGridLines; i++ ) {
      var modelY = graph.yRange.min + i;
      if ( modelY !== 0 ) { // skip origin, x axis will live here
        var yOffset = modelViewTransform.modelToViewY( modelY );
        var isMajorX = Math.abs( modelY ) % MAJOR_TICK_SPACING === 0;
        this.horizontalGridLinesNode.addChild( new GridLineNode( minX, yOffset, maxX, yOffset, isMajorX ) );
      }
    }

    // @private vertical grid lines, one line for each unit of grid spacing
    this.verticalGridLinesNode = new Node();
    this.addChild( this.verticalGridLinesNode );
    var numberOfVerticalGridLines = graph.getWidth() + 1;
    var minY = modelViewTransform.modelToViewY( graph.yRange.max ); // yes, swap min and max
    var maxY = modelViewTransform.modelToViewY( graph.yRange.min );
    for ( var j = 0; j < numberOfVerticalGridLines; j++ ) {
      var modelX = graph.xRange.min + j;
      if ( modelX !== 0 ) { // skip origin, y axis will live here
        var xOffset = modelViewTransform.modelToViewX( modelX );
        var isMajorY = Math.abs( modelX ) % MAJOR_TICK_SPACING === 0;
        this.verticalGridLinesNode.addChild( new GridLineNode( xOffset, minY, xOffset, maxY, isMajorY ) );
      }
    }
  }

  inherit( Node, GridNode, {

    // Sets visibility of grid lines
    setLinesVisible: function( visible ) {
      this.horizontalGridLinesNode.visible = this.verticalGridLinesNode.visible = visible;
    }
  } );

  //----------------------------------------------------------------------------------------

  return GraphNode;
} );