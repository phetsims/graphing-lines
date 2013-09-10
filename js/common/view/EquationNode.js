// Copyright 2002-2013, University of Colorado

/**
 * Base type for all equations.
 * Dimensions and layout offsets are computed as percentages of the font's point size.
 * These multipliers were determined by laborious visual inspection.
 * Modify at your peril.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Shape = require( 'KITE/Shape' );
  var SlopeSpinner = require( 'GRAPHING_LINES/common/view/spinner/SlopeSpinner' );

  /**
   * @param {Number} pointSize point size of the font used to render the equation
   * @constructor
   */
  function EquationNode( pointSize ) {

    assert && assert( typeof pointSize === 'number' );

    Node.call( this );

    this.DECIMAL_PLACES = 0;

    /*
     * Controls the vertical offset of the slope's sign.
     * Zero is vertically centered on the equals sign, positive values move it down, negative move it up.
     * This was created because there was a great deal of discussion and disagreement about where the sign should be placed.
     */
    this.slopeSignYOffset = 0;

    // fudge factors for horizontal lines, to vertically center them with equals sign (set by visual inspection)
    this.slopeSignYFudgeFactor = 0.07 * pointSize;
    this.operatorYFudgeFactor = 0.07 * pointSize;
    this.fractionLineYFudgeFactor = 0.07 * pointSize;
    this.undefinedSlopeYFudgeFactor = 0.07 * pointSize;
    this.equalsSignFudgeFactor = 0.1 * pointSize;

    // thickness of the fraction divisor line
    this.fractionLineThickness = 0.06 * pointSize;

    // size of the lines used to create + and - operators
    this.operatorLineSize = new Dimension2( 0.54 * pointSize, 0.07 * pointSize );

    // size of the lines used to create + and - signs
    this.signLineSize = new Dimension2( 0.54 * pointSize, 0.11 * pointSize );

    // spacing between components of an equation (set by visual inspection)
    this.integerSignXSpacing = 0.18 * pointSize; // spacing between a sign and the integer to the right of it
    this.fractionSignXSpacing = 0.36 * pointSize; // spacing between a sign and the fraction to the right of it
    this.integerSlopeXSpacing = 0.04 * pointSize; // spacing between a fractional slope and what's to the right of it
    this.fractionalSlopeXSpacing = 0.15 * pointSize; // spacing between an integer slope and what's to the right of it
    this.operatorXSpacing = 0.25 * pointSize; // space around an operator (eg, +)
    this.relationalOperatorXSpacing = 0.35 * pointSize; // space around the relational operator (eg, =)
    this.parenXSpacing = 0.07 * pointSize; // space between a parenthesis and the thing it encloses
    this.spinnersYSpacing = 0.2 * pointSize; // y spacing between spinners and fraction line
    this.slopeYSpacing = 0.4 * pointSize; // y spacing between rise and run values (with blue backgrounds) and fraction line
    this.ySpacing = 0.1 * pointSize; // all other y spacing
  }

  return inherit( Node, EquationNode, {

    // Creates the shape for the fraction division line.
    createFractionLineShape: function( length ) {
      return new Shape.rectangle( 0, 0, length, this.fractionLineThickness );
    },

    /**
     * Gets the max width for the rise and run spinners used in an interactive equation.
     * @param {Property<Range>} riseRange
     * @param {Property<Range>} runRange
     * @param {PhetFont} font
     * @param {Number} decimalPlaces
     */
    computeMaxSlopeSpinnerWidth: function( riseRange, runRange, font, decimalPlaces ) {

      // Create prototypical spinners.
      var maxRiseNode = new SlopeSpinner( new Property( riseRange.get().max ), new Property( runRange.get().max ), riseRange, { font: font, decimalPlaces: decimalPlaces } );
      var minRiseNode = new SlopeSpinner( new Property( riseRange.get().min ), new Property( runRange.get().max ), riseRange, { font: font, decimalPlaces: decimalPlaces } );
      var maxRunNode = new SlopeSpinner( new Property( runRange.get().max ), new Property( riseRange.get().max ), runRange, { font: font, decimalPlaces: decimalPlaces } );
      var minRunNode = new SlopeSpinner( new Property( runRange.get().min ), new Property( riseRange.get().min ), runRange, { font: font, decimalPlaces: decimalPlaces } );

      // Compute the max
      var maxRiseWidth = Math.max( maxRiseNode.width, minRiseNode.width );
      var maxRunWidth = Math.max( maxRunNode.width, minRunNode.width );
      return Math.max( maxRiseWidth, maxRunWidth );
    }
  } );
} );