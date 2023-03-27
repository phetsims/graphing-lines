// Copyright 2013-2023, University of Colorado Boulder

// @ts-nocheck
/**
 * Base class for all equations.
 * Dimensions and layout offsets are computed as percentages of the font's point size.
 * These multipliers were determined empirically by committee - modify at your peril!
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import { Node } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';
import SlopePicker from './picker/SlopePicker.js';

export default class EquationNode extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      fontSize: 18
    }, options );

    super();

    this.decimalPlaces = 0; // @public (read-only)

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
     * In Java, they were a function of fontSize.
     * We're keeping this feature in case future 'tweaks' are needed.
     */
    this.slopeSignYFudgeFactor = 0;
    this.operatorYFudgeFactor = 0;
    this.fractionLineYFudgeFactor = 0;
    this.undefinedSlopeYFudgeFactor = 0;
    this.equalsSignFudgeFactor = 0;
    
    const fontSize = options.fontSize;

    // @protected (read-only) thickness of the fraction divisor line
    this.fractionLineThickness = 0.06 * fontSize;

    // @protected (read-only) size of the lines used to create + and - operators
    this.operatorLineSize = new Dimension2( 0.54 * fontSize, 0.07 * fontSize );

    // @protected (read-only) size of the lines used to create + and - signs
    this.signLineSize = new Dimension2( 0.54 * fontSize, 0.11 * fontSize );

    // @protected (read-only) spacing between components of an equation (set by visual inspection)
    this.integerSignXSpacing = 0.18 * fontSize; // spacing between a sign and the integer to the right of it
    this.fractionSignXSpacing = 0.36 * fontSize; // spacing between a sign and the fraction to the right of it
    this.integerSlopeXSpacing = 0.04 * fontSize; // spacing between a fractional slope and what's to the right of it
    this.fractionalSlopeXSpacing = 0.15 * fontSize; // spacing between an integer slope and what's to the right of it
    this.operatorXSpacing = 0.25 * fontSize; // space around an operator (eg, +)
    this.relationalOperatorXSpacing = 0.35 * fontSize; // space around the relational operator (eg, =)
    this.parenXSpacing = 0.07 * fontSize; // space between a parenthesis and the thing it encloses
    this.pickersYSpacing = 0.2 * fontSize; // y spacing between spinners and fraction line
    this.slopeYSpacing = 0.4 * fontSize; // y spacing between rise and run values (with blue backgrounds) and fraction line
    this.ySpacing = 0.1 * fontSize; // all other y spacing

    this.mutate( options );
  }

  /**
   * Gets the max width for the rise and run pickers used in an interactive equation.
   * @param {Property.<Range>} riseRangeProperty
   * @param {Property.<Range>} runRangeProperty
   * @param {PhetFont} font
   * @param {number} decimalPlaces
   * @static
   * @public
   */
  static computeMaxSlopePickerWidth( riseRangeProperty, runRangeProperty, font, decimalPlaces ) {

    const pickerOptions = {
      font: font,
      decimalPlaces: decimalPlaces
    };

    // Create prototypical pickers.
    const maxRiseNode = new SlopePicker( new Property( riseRangeProperty.value.max ),
      new Property( runRangeProperty.value.max ), riseRangeProperty, pickerOptions );

    const minRiseNode = new SlopePicker( new Property( riseRangeProperty.value.min ),
      new Property( runRangeProperty.value.max ), riseRangeProperty, pickerOptions );

    const maxRunNode = new SlopePicker(
      new Property( runRangeProperty.value.max ),
      new Property( riseRangeProperty.value.max ), runRangeProperty, pickerOptions );

    const minRunNode = new SlopePicker( new Property( runRangeProperty.value.min ),
      new Property( riseRangeProperty.value.min ), runRangeProperty, pickerOptions );

    // Compute the max width
    const maxRiseWidth = Math.max( maxRiseNode.width, minRiseNode.width );
    const maxRunWidth = Math.max( maxRunNode.width, minRunNode.width );
    return Math.max( maxRiseWidth, maxRunWidth );
  }
}

graphingLines.register( 'EquationNode', EquationNode );