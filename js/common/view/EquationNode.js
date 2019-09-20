// Copyright 2013-2019, University of Colorado Boulder

/**
 * Base type for all equations.
 * Dimensions and layout offsets are computed as percentages of the font's point size.
 * These multipliers were determined by laborious visual inspection.
 * Modify at your peril.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const SlopePicker = require( 'GRAPHING_LINES/common/view/picker/SlopePicker' );

  /**
   * @param {number} pointSize point size of the font used to render the equation
   * @param {Object} [options]
   * @constructor
   */
  function EquationNode( pointSize, options ) {

    assert && assert( typeof pointSize === 'number' );

    this.DECIMAL_PLACES = 0; // @private

    /*
     * @protected (read-only)
     * Controls the vertical offset of the slope's sign.
     * Zero is vertically centered on the equals sign, positive values move it down, negative move it up.
     * This was created because there was a great deal of discussion and disagreement about where the sign should be placed.
     */
    this.slopeSignYOffset = 0;

    /*
     * @protected (read-only)
     * Fudge factors for horizontal lines, to vertically center them with equals sign (set by visual inspection).
     * Note that these are currently all zero, and that looks good in JavaScript.
     * In Java, they were a function of pointSize.
     * We're keeping this feature in case future 'tweaks' are needed.
     */
    this.slopeSignYFudgeFactor = 0;
    this.operatorYFudgeFactor = 0;
    this.fractionLineYFudgeFactor = 0;
    this.undefinedSlopeYFudgeFactor = 0;
    this.equalsSignFudgeFactor = 0;

    // @protected (read-only) thickness of the fraction divisor line
    this.fractionLineThickness = 0.06 * pointSize;

    // @protected (read-only) size of the lines used to create + and - operators
    this.operatorLineSize = new Dimension2( 0.54 * pointSize, 0.07 * pointSize );

    // @protected (read-only) size of the lines used to create + and - signs
    this.signLineSize = new Dimension2( 0.54 * pointSize, 0.11 * pointSize );

    // @protected (read-only) spacing between components of an equation (set by visual inspection)
    this.integerSignXSpacing = 0.18 * pointSize; // spacing between a sign and the integer to the right of it
    this.fractionSignXSpacing = 0.36 * pointSize; // spacing between a sign and the fraction to the right of it
    this.integerSlopeXSpacing = 0.04 * pointSize; // spacing between a fractional slope and what's to the right of it
    this.fractionalSlopeXSpacing = 0.15 * pointSize; // spacing between an integer slope and what's to the right of it
    this.operatorXSpacing = 0.25 * pointSize; // space around an operator (eg, +)
    this.relationalOperatorXSpacing = 0.35 * pointSize; // space around the relational operator (eg, =)
    this.parenXSpacing = 0.07 * pointSize; // space between a parenthesis and the thing it encloses
    this.pickersYSpacing = 0.2 * pointSize; // y spacing between spinners and fraction line
    this.slopeYSpacing = 0.4 * pointSize; // y spacing between rise and run values (with blue backgrounds) and fraction line
    this.ySpacing = 0.1 * pointSize; // all other y spacing

    Node.call( this, options );
  }

  graphingLines.register( 'EquationNode', EquationNode );

  return inherit( Node, EquationNode, {
    // prototype functions go here
  }, {

    /**
     * Gets the max width for the rise and run pickers used in an interactive equation.
     * @param {Property.<Range>} riseRangeProperty
     * @param {Property.<Range>} runRangeProperty
     * @param {GLFont} font
     * @param {number} decimalPlaces
     * @static
     * @public
     */
    computeMaxSlopePickerWidth: function( riseRangeProperty, runRangeProperty, font, decimalPlaces ) {

      // Create prototypical pickers.
      const maxRiseNode = new SlopePicker( new Property( riseRangeProperty.get().max ), new Property( runRangeProperty.get().max ), riseRangeProperty, {
        font: font,
        decimalPlaces: decimalPlaces
      } );
      const minRiseNode = new SlopePicker( new Property( riseRangeProperty.get().min ), new Property( runRangeProperty.get().max ), riseRangeProperty, {
        font: font,
        decimalPlaces: decimalPlaces
      } );
      const maxRunNode = new SlopePicker( new Property( runRangeProperty.get().max ), new Property( riseRangeProperty.get().max ), runRangeProperty, {
        font: font,
        decimalPlaces: decimalPlaces
      } );
      const minRunNode = new SlopePicker( new Property( runRangeProperty.get().min ), new Property( riseRangeProperty.get().min ), runRangeProperty, {
        font: font,
        decimalPlaces: decimalPlaces
      } );

      // Compute the max
      const maxRiseWidth = Math.max( maxRiseNode.width, minRiseNode.width );
      const maxRunWidth = Math.max( maxRunNode.width, minRunNode.width );
      return Math.max( maxRiseWidth, maxRunWidth );
    }
  } );
} );