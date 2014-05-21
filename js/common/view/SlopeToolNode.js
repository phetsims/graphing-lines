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
  var Dimension2 = require( 'DOT/Dimension2' );
  var DimensionalArrowNode = require( 'GRAPHING_LINES/common/view/DimensionalArrowNode' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberBackgroundNode = require( 'GRAPHING_LINES/common/view/NumberBackgroundNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );

  // constants
  var LINE_WIDTH = 1.25;
  var VALUE_X_SPACING = 6;
  var VALUE_Y_SPACING = 6;

  /**
   * @param {Property<Line>} lineProperty
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function SlopeToolNode( lineProperty, mvt ) {

    var thisNode = this;

    thisNode.lineProperty = lineProperty; // @private
    thisNode.mvt = mvt; // @private

    // Rise and run values
    var numberOptions = {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      decimalPlaces: 0,
      textFill: 'black',
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
    var arrowOptions = {
      lineWidth: LINE_WIDTH,
      stroke: GLColors.SLOPE,
      arrowTipSize: new Dimension2( 6, 8 ),
      delimiterLength: 0.5 * mvt.modelToViewDeltaX( 1 )
    };
    thisNode.riseArrowNode = new DimensionalArrowNode( 0, 0, 0, 50, arrowOptions ); // @private
    thisNode.runArrowNode = new DimensionalArrowNode( 0, 0, 0, 50, arrowOptions ); // @private

    // @private put all nodes under a common parent, so we can hide for zero or undefined slopes
    thisNode.parentNode = new Node( { children: [
      thisNode.riseArrowNode,
      thisNode.riseValueNode,
      thisNode.runArrowNode,
      thisNode.runValueNode
    ] } );

    Node.call( thisNode, { children: [ thisNode.parentNode ] } );

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

      // Show nothing for horizontal or vertical lines.
      this.parentNode.visible = ( line.rise !== 0 && line.run !== 0 );
      if ( !this.parentNode.visible ) {
        return;
      }

      // view coordinates
      var gridXSpacing = mvt.modelToViewDeltaX( 1 );
      var gridYSpacing = mvt.modelToViewDeltaY( 1 );
      var x1 = mvt.modelToViewX( line.x1 );
      var y1 = mvt.modelToViewY( line.y1 );
      var x2 = mvt.modelToViewX( line.x2 );
      var y2 = mvt.modelToViewY( line.y2 );

      // rise
      var offsetFactor = 0.6;
      var xOffset = offsetFactor * gridXSpacing;
      var tipFudgeY = ( line.rise > 0 ) ? LINE_WIDTH : -LINE_WIDTH; //TODO why do we need this?
      if ( line.run > 0 ) {
        this.riseArrowNode.setTailAndTip( x1 - xOffset, y1, x1 - xOffset, y2 + tipFudgeY );
        // value to left of line
        this.riseValueNode.right = this.riseArrowNode.left - VALUE_X_SPACING;
        this.riseValueNode.centerY = this.riseArrowNode.centerY;
      }
      else {
        this.riseArrowNode.setTailAndTip( x1 + xOffset, y1, x1 + xOffset, y2 + tipFudgeY );
        // value to right of line
        this.riseValueNode.left = this.riseArrowNode.right + VALUE_X_SPACING;
        this.riseValueNode.centerY = this.riseArrowNode.centerY;
      }

      // run
      var yOffset = offsetFactor * gridYSpacing;
      var tipFudgeX = ( line.run > 0 ) ? -1 : 1; //TODO why do we need this?
      if ( line.rise > 0 ) {
        this.runArrowNode.setTailAndTip( x1, y2 + yOffset, x2 + tipFudgeX, y2 + yOffset );
        // value above line
        this.runValueNode.centerX = this.runArrowNode.centerX;
        this.runValueNode.bottom = this.runArrowNode.top - VALUE_Y_SPACING;
      }
      else {
        this.runArrowNode.setTailAndTip( x1, y2 - yOffset, x2 + tipFudgeX, y2 - yOffset );
        // value below line
        this.runValueNode.centerX = this.runArrowNode.centerX;
        this.runValueNode.top = this.runArrowNode.bottom + VALUE_Y_SPACING;
      }
    }
  } );
} )
;