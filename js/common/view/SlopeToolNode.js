// Copyright 2002-2013, University of Colorado

/**
 * Slope indicator that the design team referred to as the "slope tool".
 * It displays the rise and run values of the slope.
 * Drawn in the global coordinate frame of the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberBackgroundNode = require( 'GRAPHING_LINES/common/view/NumberBackgroundNode' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  //----------------------------------------------------------------------------------------
  // constants
  //----------------------------------------------------------------------------------------

  // lines
  var LINE_COLOR = GLColors.SLOPE;
  var LINE_WIDTH = 1.25;

  // values
  var VALUE_X_SPACING = 6;
  var VALUE_Y_SPACING = 6;
  var VALUE_NUMBER_OF_DECIMAL_PLACES = 0;
  var VALUE_FONT = new PhetFont( { size: 16, weight: 'bold' } );
  var VALUE_TEXT_COLOR = Color.BLACK;
  var VALUE_X_MARGIN = 3;
  var VALUE_Y_MARGIN = 6;
  var VALUE_CORNER_RADIUS = 5;

  // arrow
  var ARROW_TIP_SIZE = new Dimension2( 6, 8 ); // use even-number dimensions, or tip will look asymmetrical due to rounding

  //----------------------------------------------------------------------------------------
  // Delimiter line that is at the end of a length line in a dimensional drawing.
  //----------------------------------------------------------------------------------------

  function DimensionalDelimiterNode( x1, y1, x2, y2 ) {
    Line.call( this, x1, y1, x2, y2, {
      stroke: LINE_COLOR,
      lineWidth: LINE_WIDTH
    } );
  }

  inherit( Line, DimensionalDelimiterNode );

  //----------------------------------------------------------------------------------------
  // Arrow with a very specific tip style.
  //----------------------------------------------------------------------------------------

  function ArrowNode( tailX, tailY, tipX, tipY ) {

    Node.call( this );

    var lineNode = new Line( tailX, tailY, tipX, tipY, { lineWidth: LINE_WIDTH, stroke: LINE_COLOR } );
    this.addChild( lineNode );

    var tipShape = new Shape();
    if ( tailX === tipX ) {
      // vertical arrow
      if ( tipY > tailY ) {
        // pointing down
        tipShape.moveTo( tipX - ( ARROW_TIP_SIZE.width / 2 ), tipY - ARROW_TIP_SIZE.height );
        tipShape.lineTo( tipX, tipY );
        tipShape.lineTo( tipX + ( ARROW_TIP_SIZE.width / 2 ), tipY - ARROW_TIP_SIZE.height );
      }
      else {
        // pointing up
        tipShape.moveTo( tipX - ( ARROW_TIP_SIZE.width / 2 ), tipY + ARROW_TIP_SIZE.height );
        tipShape.lineTo( tipX, tipY );
        tipShape.lineTo( tipX + ( ARROW_TIP_SIZE.width / 2 ), tipY + ARROW_TIP_SIZE.height );
      }
    }
    else if ( tailY === tipY ) {
      // horizontal arrow
      if ( tailX > tipX ) {
        // pointing left
        tipShape.moveTo( tipX + ARROW_TIP_SIZE.height, tipY - ( ARROW_TIP_SIZE.width / 2 ) );
        tipShape.lineTo( tipX, tipY );
        tipShape.lineTo( tipX + ARROW_TIP_SIZE.height, tipY + ( ARROW_TIP_SIZE.width / 2 ) );
      }
      else {
        // pointing right
        tipShape.moveTo( tipX - ARROW_TIP_SIZE.height, tipY - ( ARROW_TIP_SIZE.width / 2 ) );
        tipShape.lineTo( tipX, tipY );
        tipShape.lineTo( tipX - ARROW_TIP_SIZE.height, tipY + ( ARROW_TIP_SIZE.width / 2 ) );
      }
    }
    else {
      throw new Error( "this implementation supports only horizontal and vertical arrows" );
    }
    var tipNode = new Path( tipShape, { lineWidth: LINE_WIDTH, stroke: LINE_COLOR } );
    this.addChild( tipNode );
  }

  inherit( Node, ArrowNode );

  //----------------------------------------------------------------------------------------

  /**
   * @param {Property<Line>} lineProperty
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function SlopeToolNode( lineProperty, mvt ) {
    var thisNode = this;
    Node.call( this, { pickable: false } );
    lineProperty.link( function( line ) {
      thisNode._update( line, mvt );
    } );
  }

  return inherit( Node, SlopeToolNode, {

    _update: function( line, mvt ) {

      this.removeAllChildren();

      // Show nothing for horizontal or vertical lines.
      if ( line.rise === 0 || line.run === 0 ) {
        return;
      }

      // view coordinates
      var gridXSpacing = mvt.modelToViewDeltaX( 1 );
      var gridYSpacing = mvt.modelToViewDeltaY( 1 );
      var p1View = mvt.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
      var p2View = mvt.modelToViewPosition( new Vector2( line.x2, line.y2 ) );

      // rise
      var offsetFactor = 0.6;
      var delimiterLengthFactor = 0.5;
      var riseLineNode, riseTailDelimiterNode, riseTipDelimiterNode;
      var riseValueNode = new NumberBackgroundNode( line.rise, {
        textOptions: {
          font: VALUE_FONT,
          decimalPlaces: VALUE_NUMBER_OF_DECIMAL_PLACES,
          fill: VALUE_TEXT_COLOR
        },
        backgroundOptions: {
          fill: GLColors.SLOPE,
          xMargin: VALUE_X_MARGIN,
          yMargin: VALUE_Y_MARGIN,
          cornerRadius: VALUE_CORNER_RADIUS
        }
      } );
      var xOffset = offsetFactor * gridXSpacing;
      var riseDelimiterLength = delimiterLengthFactor * gridXSpacing;
      var tipFudgeY = ( line.rise > 0 ) ? LINE_WIDTH : -LINE_WIDTH;
      var arrowX;
      if ( line.run > 0 ) {
        // value to left of line
        arrowX = p1View.x - xOffset;
        riseLineNode = new ArrowNode( arrowX, p1View.y, arrowX, p2View.y + tipFudgeY );
        riseValueNode.right = riseLineNode.left - VALUE_X_SPACING;
        riseValueNode.centerY = riseLineNode.centerY;
      }
      else {
        // value to right of line
        arrowX = p1View.x + xOffset;
        riseLineNode = new ArrowNode( arrowX, p1View.y, arrowX, p2View.y + tipFudgeY );
        riseValueNode.left = riseLineNode.right + VALUE_X_SPACING;
        riseValueNode.centerY = riseLineNode.centerY;
      }
      riseTailDelimiterNode = new DimensionalDelimiterNode( arrowX - ( riseDelimiterLength / 2 ), p1View.y, arrowX + ( riseDelimiterLength / 2 ), p1View.y );
      riseTipDelimiterNode = new DimensionalDelimiterNode( arrowX - ( riseDelimiterLength / 2 ), p2View.y, arrowX + ( riseDelimiterLength / 2 ), p2View.y );

      // run
      var runLineNode, runTailDelimiterNode, runTipDelimiterNode, runValueNode;
      runValueNode = new NumberBackgroundNode( line.run, {
        textOptions: {
          font: VALUE_FONT,
          decimalPlaces: VALUE_NUMBER_OF_DECIMAL_PLACES,
          fill: VALUE_TEXT_COLOR
        },
        backgroundOptions: {
          fill: GLColors.SLOPE,
          xMargin: VALUE_X_MARGIN,
          yMargin: VALUE_Y_MARGIN,
          cornerRadius: VALUE_CORNER_RADIUS
        }
      } );
      var yOffset = offsetFactor * gridYSpacing;
      var runDelimiterLength = delimiterLengthFactor * gridYSpacing;
      var tipFudgeX = ( line.run > 0 ) ? -1 : 1;
      var arrowY;
      if ( line.rise > 0 ) {
        // value above line
        arrowY = p2View.y + yOffset;
        runLineNode = new ArrowNode( p1View.x, arrowY, p2View.x + tipFudgeX, arrowY );
        runValueNode.centerX = runLineNode.centerX;
        runValueNode.bottom = runLineNode.top - VALUE_Y_SPACING;
      }
      else {
        // value below line
        arrowY = p2View.y - yOffset;
        runLineNode = new ArrowNode( p1View.x, arrowY, p2View.x + tipFudgeX, arrowY );
        runValueNode.centerX = runLineNode.centerX;
        runValueNode.top = runLineNode.bottom + VALUE_Y_SPACING;
      }
      runTailDelimiterNode = new DimensionalDelimiterNode( p1View.x, arrowY - ( runDelimiterLength / 2 ), p1View.x, arrowY + ( runDelimiterLength / 2 ) );
      runTipDelimiterNode = new DimensionalDelimiterNode( p2View.x, arrowY - ( runDelimiterLength / 2 ), p2View.x, arrowY + ( runDelimiterLength / 2 ) );

      // rendering order
      this.addChild( riseTailDelimiterNode );
      this.addChild( riseTipDelimiterNode );
      this.addChild( riseLineNode );
      this.addChild( runTailDelimiterNode );
      this.addChild( runTipDelimiterNode );
      this.addChild( runLineNode );
      this.addChild( riseValueNode );
      this.addChild( runValueNode );
    }
  } );
} );