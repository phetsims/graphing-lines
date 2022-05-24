// Copyright 2013-2022, University of Colorado Boulder

/**
 * Renderer for slope-intercept equations, with optional interactivity of slope and intercept.
 * General slope-intercept form is: y = mx + b
 *
 * Slope and/or intercept may be interactive.
 * Pickers are used to increment/decrement parts of the equation that are specified as being interactive.
 * Non-interactive parts of the equation are expressed in a form that is typical of how the equation
 * would normally be written.  For example, if the slope is -1, then only the sign is written, not '-1'.
 *
 * Note that both m and b may be improper fractions. b may be an improper fraction only if the y-intercept
 * is not interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import MinusNode from '../../../../scenery-phet/js/MinusNode.js';
import NumberPicker from '../../../../scenery-phet/js/NumberPicker.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import PlusNode from '../../../../scenery-phet/js/PlusNode.js';
import { Line as SceneryLine } from '../../../../scenery/js/imports.js';
import { RichText } from '../../../../scenery/js/imports.js';
import GLColors from '../../common/GLColors.js';
import GLConstants from '../../common/GLConstants.js';
import GLSymbols from '../../common/GLSymbols.js';
import Line from '../../common/model/Line.js';
import DynamicValueNode from '../../common/view/DynamicValueNode.js';
import EquationNode from '../../common/view/EquationNode.js';
import SlopePicker from '../../common/view/picker/SlopePicker.js';
import UndefinedSlopeIndicator from '../../common/view/UndefinedSlopeIndicator.js';
import graphingLines from '../../graphingLines.js';
import graphingLinesStrings from '../../graphingLinesStrings.js';

class SlopeInterceptEquationNode extends EquationNode {

  /**
   * @param {Property.<Line>} lineProperty
   * @param {Object} [options]
   */
  constructor( lineProperty, options ) {

    options = merge( {

      // Don't show 'slope undefined' after non-interactive equations with undefined slope
      // See https://github.com/phetsims/graphing-slope-intercept/issues/7
      slopeUndefinedVisible: true,

      // components that can be interactive
      interactiveSlope: true,
      interactiveIntercept: true,

      // dynamic range of components
      riseRangeProperty: new Property( GLConstants.Y_AXIS_RANGE ),
      runRangeProperty: new Property( GLConstants.X_AXIS_RANGE ),
      yInterceptRangeProperty: new Property( GLConstants.Y_AXIS_RANGE ),

      // style
      fontSize: GLConstants.INTERACTIVE_EQUATION_FONT_SIZE,
      staticColor: 'black'

    }, options );

    super( options.fontSize ); // call first, because supertype constructor computes various layout metrics

    const fullyInteractive = ( options.interactiveSlope && options.interactiveIntercept );
    const interactiveFont = new PhetFont( { size: options.fontSize, weight: GLConstants.EQUATION_FONT_WEIGHT } );
    const staticFont = new PhetFont( { size: options.fontSize, weight: GLConstants.EQUATION_FONT_WEIGHT } );
    const staticOptions = { font: staticFont, fill: options.staticColor };
    const fractionLineOptions = { stroke: options.staticColor, lineWidth: this.fractionLineThickness };

    const numberPropertyOptions = {
      numberType: 'Integer'
    };

    // internal properties that are connected to pickers
    const riseProperty = new NumberProperty( lineProperty.get().rise, numberPropertyOptions );
    const runProperty = new NumberProperty( lineProperty.get().run, numberPropertyOptions );
    const yInterceptProperty = new NumberProperty( lineProperty.get().y1, numberPropertyOptions );
    const fractionalIntercept = lineProperty.get().getYIntercept();
    const yInterceptNumeratorProperty = new NumberProperty( fractionalIntercept.numerator, numberPropertyOptions );
    const yInterceptDenominatorProperty = new NumberProperty( fractionalIntercept.denominator, numberPropertyOptions );

    /*
     * Flag that allows us to update all controls atomically when the model changes.
     * When a picker's value changes, it results in the creation of a new Line.
     * So if you don't change the pickers atomically to match a new Line instance,
     * the new Line will be inadvertently replaced with an incorrect line.
     */
    let updatingControls = false;

    // Determine the max width of the rise and run pickers.
    const maxSlopePickerWidth = EquationNode.computeMaxSlopePickerWidth( options.riseRangeProperty, options.runRangeProperty, interactiveFont, this.DECIMAL_PLACES );

    // Nodes that appear in all possible forms of the equation: y = -(rise/run)x + -b
    const yNode = new RichText( GLSymbols.y, staticOptions );
    const equalsNode = new RichText( MathSymbols.EQUAL_TO, staticOptions );
    const slopeMinusSignNode = new MinusNode( merge( { size: this.signLineSize }, staticOptions ) );
    let riseNode;
    let runNode;
    if ( options.interactiveSlope ) {
      riseNode = new SlopePicker( riseProperty, runProperty, options.riseRangeProperty, { font: interactiveFont } );
      runNode = new SlopePicker( runProperty, riseProperty, options.runRangeProperty, { font: interactiveFont } );
    }
    else {
      riseNode = new DynamicValueNode( riseProperty, merge( { absoluteValue: true }, staticOptions ) );
      runNode = new DynamicValueNode( runProperty, merge( { absoluteValue: true }, staticOptions ) );
    }
    const slopeFractionLineNode = new SceneryLine( 0, 0, maxSlopePickerWidth, 0, fractionLineOptions );
    const xNode = new RichText( GLSymbols.x, merge( { absoluteValue: true }, staticOptions ) );
    const plusNode = new PlusNode( merge( { size: this.operatorLineSize }, staticOptions ) );
    const minusNode = new MinusNode( merge( { size: this.operatorLineSize }, staticOptions ) );
    const yInterceptMinusSignNode = new MinusNode( merge( {
      size: this.signLineSize,
      absoluteValue: true
    }, staticOptions ) );
    let yInterceptNumeratorNode; // also used for integer values
    if ( options.interactiveIntercept ) {
      yInterceptNumeratorNode = new NumberPicker( yInterceptProperty, options.yInterceptRangeProperty,
        merge( {}, GLConstants.PICKER_OPTIONS, {
          color: GLColors.INTERCEPT,
          font: interactiveFont
        } ) );
    }
    else {
      yInterceptNumeratorNode = new DynamicValueNode( yInterceptNumeratorProperty, merge( { absoluteValue: true }, staticOptions ) );
    }
    const yInterceptDenominatorNode = new DynamicValueNode( yInterceptDenominatorProperty, merge( { absoluteValue: true }, staticOptions ) );
    const yInterceptFractionLineNode = new SceneryLine( 0, 0, maxSlopePickerWidth, 0, fractionLineOptions );
    const slopeUndefinedNode = new RichText( '?', staticOptions );

    // add all nodes, we'll set which ones are visible bases on desired simplification
    this.children = [ yNode, equalsNode, slopeMinusSignNode, riseNode, runNode, slopeFractionLineNode, xNode, plusNode, minusNode,
      yInterceptMinusSignNode, yInterceptNumeratorNode, yInterceptDenominatorNode, yInterceptFractionLineNode, slopeUndefinedNode ];

    /*
     * Updates the layout to match the desired form of the equation.
     * This is based on which parts of the equation are interactive, and what the
     * non-interactive parts of the equation should look like when written in simplified form.
     */
    const updateLayout = line => {

      const interactive = ( options.interactiveSlope || options.interactiveIntercept );
      const lineColor = line.color;

      // Start with all children invisible and at x=0.
      // See https://github.com/phetsims/graphing-lines/issues/120
      const len = this.children.length;
      for ( let i = 0; i < len; i++ ) {
        this.children[ i ].visible = false;
        this.children[ i ].x = 0;
      }
      slopeUndefinedNode.text = ''; // workaround for #114 and #117

      if ( line.undefinedSlope() && !interactive ) {
        // slope is undefined and nothing is interactive
        slopeUndefinedNode.visible = true;
        slopeUndefinedNode.fill = lineColor;
        slopeUndefinedNode.text = ( options.slopeUndefinedVisible ) ?
                                  StringUtils.format( graphingLinesStrings.slopeUndefined, GLSymbols.x, line.x1 ) :
                                  StringUtils.format( GLConstants.PATTERN_0VALUE_EQUALS_1VALUE, GLSymbols.x, line.x1 );
        return;
      }

      // slope properties
      const slope = line.getSlope();
      const zeroSlope = ( slope === 0 );
      const unitySlope = ( Math.abs( slope ) === 1 );
      const integerSlope = Number.isInteger( slope );
      const positiveSlope = ( slope > 0 );
      const fractionalSlope = ( !zeroSlope && !unitySlope && !integerSlope );

      let lineWidth;

      // y =
      yNode.visible = equalsNode.visible = true;
      yNode.fill = equalsNode.fill = lineColor;
      equalsNode.left = yNode.right + this.relationalOperatorXSpacing;
      equalsNode.y = yNode.y;

      // Layout the 'mx' part of the equation.
      if ( options.interactiveSlope ) {

        // slope is interactive, will be displayed as a fraction

        // (rise/run)x
        riseNode.visible = runNode.visible = slopeFractionLineNode.visible = xNode.visible = true;
        riseNode.fill = runNode.fill = slopeFractionLineNode.stroke = xNode.fill = lineColor;
        slopeFractionLineNode.left = equalsNode.right + this.relationalOperatorXSpacing;
        slopeFractionLineNode.centerY = equalsNode.centerY + this.fractionLineYFudgeFactor;
        riseNode.centerX = slopeFractionLineNode.centerX;
        riseNode.bottom = slopeFractionLineNode.top - this.pickersYSpacing;
        runNode.centerX = slopeFractionLineNode.centerX;
        runNode.top = slopeFractionLineNode.bottom + this.pickersYSpacing;
        xNode.left = slopeFractionLineNode.right + this.fractionalSlopeXSpacing;
        xNode.y = yNode.y;
      }
      else {
        // slope is not interactive, may be displayed as an integer or improper fraction

        // decide whether to include the slope minus sign
        let previousNode;
        let previousXOffset;
        if ( positiveSlope || zeroSlope ) {
          // no sign
          previousNode = equalsNode;
          previousXOffset = this.relationalOperatorXSpacing;
        }
        else {
          // -
          slopeMinusSignNode.visible = true;
          slopeMinusSignNode.fill = lineColor;
          slopeMinusSignNode.left = equalsNode.right + this.relationalOperatorXSpacing;
          slopeMinusSignNode.centerY = equalsNode.centerY + this.slopeSignYFudgeFactor + this.slopeSignYOffset;
          previousNode = slopeMinusSignNode;
          previousXOffset = ( fractionalSlope ? this.fractionSignXSpacing : this.integerSignXSpacing );
        }

        if ( line.undefinedSlope() || fractionalSlope ) {
          // rise/run x
          riseNode.visible = runNode.visible = slopeFractionLineNode.visible = xNode.visible = true;
          riseNode.fill = runNode.fill = slopeFractionLineNode.stroke = xNode.fill = lineColor;
          // adjust fraction line width
          lineWidth = Math.max( riseNode.width, runNode.width );
          slopeFractionLineNode.setLine( 0, 0, lineWidth, 0 );
          // layout
          slopeFractionLineNode.left = previousNode.right + previousXOffset;
          slopeFractionLineNode.centerY = equalsNode.centerY + this.fractionLineYFudgeFactor;
          riseNode.centerX = slopeFractionLineNode.centerX;
          riseNode.bottom = slopeFractionLineNode.top - this.ySpacing;
          runNode.centerX = slopeFractionLineNode.centerX;
          runNode.top = slopeFractionLineNode.bottom + this.ySpacing;
          xNode.left = slopeFractionLineNode.right + this.fractionalSlopeXSpacing;
          xNode.y = yNode.y;
        }
        else if ( zeroSlope ) {
          // no x term
        }
        else if ( unitySlope ) {
          // x
          xNode.visible = true;
          xNode.fill = lineColor;
          xNode.left = previousNode.right + previousXOffset;
          xNode.y = yNode.y;
        }
        else if ( integerSlope ) {
          // Nx
          riseNode.visible = xNode.visible = true;
          riseNode.fill = xNode.fill = lineColor;
          riseNode.left = previousNode.right + previousXOffset;
          riseNode.y = yNode.y;
          xNode.left = riseNode.right + this.integerSlopeXSpacing;
          xNode.y = yNode.y;
        }
        else {
          throw new Error( 'programming error, forgot to handle some slope case' );
        }
      }

      // Layout the '+ b' part of the equation.
      if ( options.interactiveIntercept ) {
        // intercept is interactive and will be an integer
        if ( zeroSlope && !options.interactiveSlope ) {
          // y = b
          yInterceptNumeratorNode.visible = true;
          yInterceptNumeratorNode.fill = lineColor;
          yInterceptNumeratorNode.left = equalsNode.right + this.relationalOperatorXSpacing;
          yInterceptNumeratorNode.centerY = yNode.centerY;
        }
        else {
          // y = (rise/run)x + b
          plusNode.visible = yInterceptNumeratorNode.visible = true;
          minusNode.visible = false;
          plusNode.fill = yInterceptNumeratorNode.fill = lineColor;
          plusNode.left = xNode.right + this.operatorXSpacing;
          plusNode.centerY = equalsNode.centerY + this.operatorYFudgeFactor;
          yInterceptNumeratorNode.left = plusNode.right + this.operatorXSpacing;
          yInterceptNumeratorNode.centerY = yNode.centerY;
        }
      }
      else {
        // intercept is not interactive and may be displayed as an integer or improper fraction

        // y-intercept properties
        const fractionalIntercept = line.getYIntercept();
        const zeroIntercept = ( fractionalIntercept.getValue() === 0 );
        const integerIntercept = fractionalIntercept.isInteger();
        const positiveIntercept = ( fractionalIntercept.getValue() > 0 );

        if ( zeroIntercept ) {
          if ( zeroSlope && !options.interactiveSlope ) {
            // y = 0
            yInterceptNumeratorNode.visible = true;
            yInterceptNumeratorNode.fill = lineColor;
            yInterceptNumeratorNode.left = equalsNode.right + this.relationalOperatorXSpacing;
            yInterceptNumeratorNode.centerY = yNode.centerY;
          }
          else {
            // no intercept
          }
        }
        else if ( positiveIntercept && zeroSlope && !options.interactiveSlope ) {
          // y = b
          yInterceptNumeratorNode.visible = true;
          yInterceptNumeratorNode.fill = lineColor;
          yInterceptNumeratorNode.left = equalsNode.right + this.relationalOperatorXSpacing;
          yInterceptNumeratorNode.centerY = yNode.centerY;
        }
        else if ( !positiveIntercept && zeroSlope && !options.interactiveSlope ) {
          // y = -b
          yInterceptMinusSignNode.visible = yInterceptNumeratorNode.visible = true;
          yInterceptMinusSignNode.fill = yInterceptNumeratorNode.fill = lineColor;
          yInterceptMinusSignNode.left = equalsNode.right + this.relationalOperatorXSpacing;
          yInterceptMinusSignNode.centerY = equalsNode.centerY + this.operatorYFudgeFactor;
          yInterceptNumeratorNode.left = yInterceptMinusSignNode.right + this.integerSignXSpacing;
          yInterceptNumeratorNode.centerY = yNode.centerY;
        }
        else {
          // y = mx +/- b
          const operatorNode = ( positiveIntercept ) ? plusNode : minusNode;
          operatorNode.visible = true;
          operatorNode.fill = lineColor;
          operatorNode.left = xNode.right + this.operatorXSpacing;
          operatorNode.centerY = equalsNode.centerY + this.operatorYFudgeFactor;

          if ( integerIntercept ) {
            // b is an integer
            yInterceptNumeratorNode.visible = true;
            yInterceptNumeratorNode.fill = lineColor;
            yInterceptNumeratorNode.left = operatorNode.right + this.operatorXSpacing;
            yInterceptNumeratorNode.centerY = yNode.centerY;
          }
          else {
            // b is an improper fraction
            yInterceptNumeratorNode.visible = yInterceptDenominatorNode.visible = yInterceptFractionLineNode.visible = true;
            yInterceptNumeratorNode.fill = yInterceptDenominatorNode.fill = yInterceptFractionLineNode.stroke = lineColor;
            // adjust fraction line width
            lineWidth = Math.max( yInterceptNumeratorNode.width, yInterceptDenominatorNode.width );
            yInterceptFractionLineNode.setLine( 0, 0, lineWidth, 0 );
            // layout
            yInterceptFractionLineNode.left = operatorNode.right + this.operatorXSpacing;
            yInterceptFractionLineNode.centerY = equalsNode.centerY + this.fractionLineYFudgeFactor;
            yInterceptNumeratorNode.centerX = yInterceptFractionLineNode.centerX;
            yInterceptNumeratorNode.bottom = yInterceptFractionLineNode.top - this.ySpacing;
            yInterceptDenominatorNode.centerX = yInterceptFractionLineNode.centerX;
            yInterceptDenominatorNode.top = yInterceptFractionLineNode.bottom + this.ySpacing;
          }
        }
      }
    };

    //***************************************************************

    // sync the model with the controls, unmultilink in dispose
    const controlsMultilink = Multilink.lazyMultilink( [ riseProperty, runProperty, yInterceptProperty ],
      () => {
        if ( !updatingControls ) {
          if ( options.interactiveIntercept ) {
            lineProperty.set( Line.createSlopeIntercept( riseProperty.get(), runProperty.get(), yInterceptProperty.get(), lineProperty.get().color ) );
          }
          else {
            const line = lineProperty.get();
            lineProperty.set( new Line( line.x1, line.y1, line.x1 + runProperty.get(), line.y1 + riseProperty.get(), lineProperty.get().color ) );
          }
        }
      }
    );

    // sync the controls and layout with the model
    const lineObserver = line => {

      // If intercept is interactive, then (x1,y1) must be on a grid line on the y intercept.
      assert && assert( !options.interactiveIntercept || ( line.x1 === 0 && Number.isInteger( line.y1 ) ) );

      // Synchronize the controls atomically.
      updatingControls = true;
      {
        riseProperty.set( options.interactiveSlope ? line.rise : line.getSimplifiedRise() );
        runProperty.set( options.interactiveSlope ? line.run : line.getSimplifiedRun() );

        if ( options.interactiveIntercept ) {
          yInterceptProperty.set( line.y1 );
        }
        else {
          const fractionalIntercept = lineProperty.get().getYIntercept();
          yInterceptNumeratorProperty.set( fractionalIntercept.numerator );
          yInterceptDenominatorProperty.set( fractionalIntercept.denominator );
        }
      }
      updatingControls = false;

      // Fully-interactive equations have a constant form, no need to update layout when line changes.
      if ( !fullyInteractive ) { updateLayout( line ); }
    };
    lineProperty.link( lineObserver ); // unlink in dispose

    // For fully-interactive equations ...
    let undefinedSlopeUpdater = null;
    if ( fullyInteractive ) {

      // update layout once
      updateLayout( lineProperty.get() );

      // add undefinedSlopeIndicator
      const undefinedSlopeIndicator = new UndefinedSlopeIndicator( this.width, this.height, staticOptions );
      this.addChild( undefinedSlopeIndicator );
      undefinedSlopeIndicator.centerX = this.centerX;
      undefinedSlopeIndicator.centerY = slopeFractionLineNode.centerY - this.undefinedSlopeYFudgeFactor;

      undefinedSlopeUpdater = line => {
        undefinedSlopeIndicator.visible = line.undefinedSlope();
      };
      lineProperty.link( undefinedSlopeUpdater ); // unlink in dispose
    }

    this.mutate( options );

    // @private called by dispose
    this.disposeSlopeInterceptEquationNode = () => {
      riseNode.dispose();
      runNode.dispose();
      yInterceptNumeratorNode.dispose();
      yInterceptDenominatorNode.dispose();
      Multilink.unmultilink( controlsMultilink );
      lineProperty.unlink( lineObserver );
      undefinedSlopeUpdater && lineProperty.unlink( undefinedSlopeUpdater );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeSlopeInterceptEquationNode();
    super.dispose();
  }

  /**
   * Creates a node that displays the general form of this equation: y = mx + b
   * @param {Object} [options]
   * @returns {Node}
   * @public
   * @static
   */
  static createGeneralFormNode( options ) {

    options = merge( {
      pickable: false,
      font: new PhetFont( { size: 20, weight: GLConstants.EQUATION_FONT_WEIGHT } ),
      maxWidth: 300
    }, options );

    // y = mx + b
    const text = StringUtils.format( '{0} {1} {2}{3} {4} {5}',
      GLSymbols.y, MathSymbols.EQUAL_TO, GLSymbols.m, GLSymbols.x, MathSymbols.PLUS, GLSymbols.b );
    return new RichText( text, options );
  }

  /**
   * Creates a non-interactive equation, used to label a dynamic line.
   * @param {Property.<Line>} lineProperty
   * @param {Object} [options]
   * @returns {Node}
   * @public
   * @static
   */
  static createDynamicLabel( lineProperty, options ) {

    options = merge( {
      interactiveSlope: false,
      interactiveIntercept: false,
      fontSize: 18,
      maxWidth: 200
    }, options );

    return new SlopeInterceptEquationNode( lineProperty, options );
  }
}

graphingLines.register( 'SlopeInterceptEquationNode', SlopeInterceptEquationNode );

export default SlopeInterceptEquationNode;