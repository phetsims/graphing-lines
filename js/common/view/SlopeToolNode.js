// Copyright 2002-2014, University of Colorado Boulder

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
  var Property = require( 'AXON/Property' );
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

  // arrow
  var ARROW_TIP_SIZE = new Dimension2( 6, 8 ); // use even-number dimensions, or tip will look asymmetrical due to rounding

  //----------------------------------------------------------------------------------------
  // Arrow with a very specific tip style.
  //----------------------------------------------------------------------------------------

  function ArrowNode( tailX, tailY, tipX, tipY ) {
    this.lineNode = new Line( 0, 0, 0, 1, { lineWidth: LINE_WIDTH, stroke: LINE_COLOR } );  // @private
    this.tipNode = new Path( null, { lineWidth: LINE_WIDTH, stroke: LINE_COLOR } ); // @private
    Node.call( this, { children: [ this.lineNode, this.tipNode ] } );
    this.setTailAndTip( tailX, tailY, tipX, tipY );
  }

  inherit( Node, ArrowNode, {

    /**
     * Sets the tail and tip of the arrow.
     * @param {Number} tailX
     * @param {Number} tailY
     * @param {Number} tipX
     * @param {Number} tipY
     */
    setTailAndTip: function( tailX, tailY, tipX, tipY ) {

      this.lineNode.setLine( tailX, tailY, tipX, tipY );

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
      this.tipNode.shape = tipShape;
    }
  } );

  //----------------------------------------------------------------------------------------

  /**
   * @param {Property<Line>} lineProperty
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function SlopeToolNode( lineProperty, mvt ) {

    var thisNode = this;
    Node.call( this );

    thisNode.lineProperty = lineProperty; // @private
    thisNode.mvt = mvt; // @private

    // Rise and run values
    var numberOptions = {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      decimalPlaces: 0,
      textFill: Color.BLACK,
      backgroundFill: GLColors.SLOPE,
      xMargin: 6,
      yMargin: 6,
      cornerRadius: 5
    };
    var riseProperty = new Property( lineProperty.get().rise );
    var runProperty = new Property( lineProperty.get().run );
    thisNode.riseValueNode = new NumberBackgroundNode( riseProperty, numberOptions ); // @private
    thisNode.runValueNode = new NumberBackgroundNode( runProperty, numberOptions ); // @private

    // Arrows
    this.riseArrowNode = new ArrowNode( 0, 0, 0, 50 ); // @private
    this.runArrowNode = new ArrowNode( 0, 0, 0, 50 ); // @private

    // Delimiter lines, like those on the ends of a length line in a dimensional drawing.
    var delimiterOptions = { stroke: LINE_COLOR, lineWidth: LINE_WIDTH };
    this.riseTipDelimiterNode = new Line( 0, 0, 0, 1, delimiterOptions ); // @private
    this.riseTailDelimiterNode = new Line( 0, 0, 0, 1, delimiterOptions ); // @private
    this.runTipDelimiterNode = new Line( 0, 0, 0, 1, delimiterOptions ); // @private
    this.runTailDelimiterNode = new Line( 0, 0, 0, 1, delimiterOptions ); // @private

    lineProperty.link( function( line ) {

      // values
      riseProperty.set( lineProperty.get().rise );
      runProperty.set( lineProperty.get().run );

      // slope tool can be invisible, update only if visible
      if ( thisNode.visible ) {
        thisNode.update( line, mvt );
      }
    } );
  }

  return inherit( Node, SlopeToolNode, {

    /*
     * Slope tool is not updated while invisible.
     * If it becomes visible, update it.
     * @override
     */
    setVisible: function( visible ) {
      if ( visible && !this.visible ) {
        this.update( this.lineProperty.get(), this.mvt );
      }
      Node.prototype.setVisible.call( this, visible );
    },

    // @private
    update: function( line, mvt ) {

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
      var xOffset = offsetFactor * gridXSpacing;
      var riseDelimiterLength = delimiterLengthFactor * gridXSpacing;
      var tipFudgeY = ( line.rise > 0 ) ? LINE_WIDTH : -LINE_WIDTH;
      var arrowX;
      if ( line.run > 0 ) {
        // value to left of line
        arrowX = p1View.x - xOffset;
        this.riseArrowNode.setTailAndTip( arrowX, p1View.y, arrowX, p2View.y + tipFudgeY );
        this.riseValueNode.right = this.riseArrowNode.left - VALUE_X_SPACING;
        this.riseValueNode.centerY = this.riseArrowNode.centerY;
      }
      else {
        // value to right of line
        arrowX = p1View.x + xOffset;
        this.riseArrowNode.setTailAndTip( arrowX, p1View.y, arrowX, p2View.y + tipFudgeY );
        this.riseValueNode.left = this.riseArrowNode.right + VALUE_X_SPACING;
        this.riseValueNode.centerY = this.riseArrowNode.centerY;
      }
      this.riseTailDelimiterNode.setLine( arrowX - ( riseDelimiterLength / 2 ), p1View.y, arrowX + ( riseDelimiterLength / 2 ), p1View.y );
      this.riseTipDelimiterNode.setLine( arrowX - ( riseDelimiterLength / 2 ), p2View.y, arrowX + ( riseDelimiterLength / 2 ), p2View.y );

      // run
      var yOffset = offsetFactor * gridYSpacing;
      var runDelimiterLength = delimiterLengthFactor * gridYSpacing;
      var tipFudgeX = ( line.run > 0 ) ? -1 : 1;
      var arrowY;
      if ( line.rise > 0 ) {
        // value above line
        arrowY = p2View.y + yOffset;
        this.runArrowNode.setTailAndTip( p1View.x, arrowY, p2View.x + tipFudgeX, arrowY );
        this.runValueNode.centerX = this.runArrowNode.centerX;
        this.runValueNode.bottom = this.runArrowNode.top - VALUE_Y_SPACING;
      }
      else {
        // value below line
        arrowY = p2View.y - yOffset;
        this.runArrowNode.setTailAndTip( p1View.x, arrowY, p2View.x + tipFudgeX, arrowY );
        this.runValueNode.centerX = this.runArrowNode.centerX;
        this.runValueNode.top = this.runArrowNode.bottom + VALUE_Y_SPACING;
      }
      this.runTailDelimiterNode.setLine( p1View.x, arrowY - ( runDelimiterLength / 2 ), p1View.x, arrowY + ( runDelimiterLength / 2 ) );
      this.runTipDelimiterNode.setLine( p2View.x, arrowY - ( runDelimiterLength / 2 ), p2View.x, arrowY + ( runDelimiterLength / 2 ) );

      // rendering order
      this.addChild( this.riseTailDelimiterNode );
      this.addChild( this.riseTipDelimiterNode );
      this.addChild( this.riseArrowNode );
      this.addChild( this.runTailDelimiterNode );
      this.addChild( this.runTipDelimiterNode );
      this.addChild( this.runArrowNode );
      this.addChild( this.riseValueNode );
      this.addChild( this.runValueNode );
    }
  } );
} )
;