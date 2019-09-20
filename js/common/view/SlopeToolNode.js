// Copyright 2013-2019, University of Colorado Boulder

/**
 * Slope indicator that the design team referred to as the 'slope tool'.
 * It displays the rise and run values of the slope.
 * Drawn in the global coordinate frame of the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const DimensionalArrowNode = require( 'GRAPHING_LINES/common/view/DimensionalArrowNode' );
  const GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  const GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberBackgroundNode = require( 'GRAPHING_LINES/common/view/NumberBackgroundNode' );
  const NumberProperty = require( 'AXON/NumberProperty' );

  // constants
  const VALUE_X_SPACING = 6;
  const VALUE_Y_SPACING = 6;

  /**
   * @param {Property.<Line>} lineProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function SlopeToolNode( lineProperty, modelViewTransform ) {

    const self = this;

    this.lineProperty = lineProperty; // @private
    this.modelViewTransform = modelViewTransform; // @private

    // Values
    const numberOptions = {
      font: new GLFont( { size: 16, weight: 'bold' } ),
      decimalPlaces: 0,
      textFill: 'black',
      backgroundFill: GLColors.SLOPE,
      xMargin: 6,
      yMargin: 6,
      cornerRadius: 5
    };
    this.riseProperty = new NumberProperty( lineProperty.get().rise ); // @private
    this.runProperty = new NumberProperty( lineProperty.get().run ); // @private
    this.riseValueNode = new NumberBackgroundNode( this.riseProperty, numberOptions ); // @private
    this.runValueNode = new NumberBackgroundNode( this.runProperty, numberOptions ); // @private

    // Arrows
    const arrowOptions = {
      lineWidth: 1.75,
      stroke: GLColors.SLOPE_TOOL_DIMENSIONAL_LINES,
      arrowTipSize: new Dimension2( 10, 10 ),
      delimiterLength: 0.5 * modelViewTransform.modelToViewDeltaX( 1 ) // half of one cell in the graph
    };
    this.riseArrowNode = new DimensionalArrowNode( 0, 0, 0, 50, arrowOptions ); // @private
    this.runArrowNode = new DimensionalArrowNode( 0, 0, 0, 50, arrowOptions ); // @private

    // @private put all nodes under a common parent, so we can hide for zero or undefined slopes
    this.parentNode = new Node( {
      children: [
        this.riseArrowNode,
        this.riseValueNode,
        this.runArrowNode,
        this.runValueNode
      ]
    } );

    Node.call( this, { children: [ this.parentNode ] } );

    const lineObserver = function( line ) {
      self.update( line, modelViewTransform );
    };
    lineProperty.link( lineObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeSlopeToolNode = function() {
      self.riseValueNode.dispose();
      self.runValueNode.dispose();
      lineProperty.unlink( lineObserver );
    };
  }

  graphingLines.register( 'SlopeToolNode', SlopeToolNode );

  return inherit( Node, SlopeToolNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeSlopeToolNode();
      Node.prototype.dispose.call( this );
    },

    /*
     * Slope tool is not updated while invisible.
     * If it becomes visible, update it.
     * @override
     * @public
     */
    setVisible: function( visible ) {
      const doUpdate = ( visible && !this.visible );
      Node.prototype.setVisible.call( this, visible );
      if ( doUpdate ) {
        this.update( this.lineProperty.get(), this.modelViewTransform );
      }
    },

    // @private
    update: function( line, modelViewTransform ) {

      // update only if visible
      if ( !this.visible ) { return; }

      // Show nothing for horizontal or vertical lines.
      this.parentNode.visible = ( line.rise !== 0 && line.run !== 0 );
      if ( !this.parentNode.visible ) {
        return;
      }

      // update internal properties before doing any layout
      this.riseProperty.set( line.rise );
      this.runProperty.set( line.run );

      // compute view coordinates
      const gridXSpacing = modelViewTransform.modelToViewDeltaX( 1 );
      const gridYSpacing = modelViewTransform.modelToViewDeltaY( 1 );
      const x1 = modelViewTransform.modelToViewX( line.x1 );
      const y1 = modelViewTransform.modelToViewY( line.y1 );
      const x2 = modelViewTransform.modelToViewX( line.x2 );
      const y2 = modelViewTransform.modelToViewY( line.y2 );

      // rise
      const offsetFactor = 0.6;
      const xOffset = offsetFactor * gridXSpacing;
      if ( line.run > 0 ) {
        // vertical arrow to left of point
        this.riseArrowNode.setTailAndTip( x1 - xOffset, y1, x1 - xOffset, y2 );
        // value to left of arrow
        this.riseValueNode.right = this.riseArrowNode.left - VALUE_X_SPACING;
        this.riseValueNode.centerY = this.riseArrowNode.centerY;
      }
      else {
        // vertical arrow to right of point
        this.riseArrowNode.setTailAndTip( x1 + xOffset, y1, x1 + xOffset, y2 );
        // value to right of arrow
        this.riseValueNode.left = this.riseArrowNode.right + VALUE_X_SPACING;
        this.riseValueNode.centerY = this.riseArrowNode.centerY;
      }

      // run
      const yOffset = offsetFactor * gridYSpacing;
      if ( line.rise > 0 ) {
        // horizontal arrow below point
        this.runArrowNode.setTailAndTip( x1, y2 + yOffset, x2, y2 + yOffset );
        // value above arrow
        this.runValueNode.centerX = this.runArrowNode.centerX;
        this.runValueNode.bottom = this.runArrowNode.top - VALUE_Y_SPACING;
      }
      else {
        // horizontal arrow above point
        this.runArrowNode.setTailAndTip( x1, y2 - yOffset, x2, y2 - yOffset );
        // value below arrow
        this.runValueNode.centerX = this.runArrowNode.centerX;
        this.runValueNode.top = this.runArrowNode.bottom + VALUE_Y_SPACING;
      }
    }
  } );
} )
;