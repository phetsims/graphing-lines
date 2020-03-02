// Copyright 2013-2020, University of Colorado Boulder

/**
 * Renderer for slope equations.
 * General form is m = (y2 - y1) / (x2 - x1) = rise/run
 *
 * x1, y1, x2, and y2 are all interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import MinusNode from '../../../../scenery-phet/js/MinusNode.js';
import SceneryLine from '../../../../scenery/js/nodes/Line.js'; // eslint-disable-line require-statement-match
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import GLColors from '../../common/GLColors.js';
import GLConstants from '../../common/GLConstants.js';
import GLFont from '../../common/GLFont.js';
import GLSymbols from '../../common/GLSymbols.js';
import Line from '../../common/model/Line.js';
import EquationNode from '../../common/view/EquationNode.js';
import NumberBackgroundNode from '../../common/view/NumberBackgroundNode.js';
import CoordinatePicker from '../../common/view/picker/CoordinatePicker.js';
import UndefinedSlopeIndicator from '../../common/view/UndefinedSlopeIndicator.js';
import graphingLinesStrings from '../../graphing-lines-strings.js';
import graphingLines from '../../graphingLines.js';

// strings
const slopeIsString = graphingLinesStrings.slopeIs;
const slopeString = graphingLinesStrings.slope;
const undefinedString = graphingLinesStrings.undefined;

class SlopeEquationNode extends EquationNode {
  /**
   * Creates an interactive equation. x1, y1, x2 and y2 are interactive.
   *
   * @param {Property.<Line>} lineProperty
   * @param {Object} [options]
   */
  constructor( lineProperty, options ) {

    options = merge( {
      x1RangeProperty: new Property( GLConstants.X_AXIS_RANGE ),
      x2RangeProperty: new Property( GLConstants.X_AXIS_RANGE ),
      y1RangeProperty: new Property( GLConstants.Y_AXIS_RANGE ),
      y2RangeProperty: new Property( GLConstants.Y_AXIS_RANGE ),
      fontSize: GLConstants.INTERACTIVE_EQUATION_FONT_SIZE,
      staticColor: 'black'
    }, options );

    super( options.fontSize ); // call first, because supertype constructor computes various layout metrics

    const interactiveFont = new GLFont( { size: options.fontSize, weight: GLConstants.EQUATION_FONT_WEIGHT } );
    const staticFont = new GLFont( { size: options.fontSize, weight: GLConstants.EQUATION_FONT_WEIGHT } );
    const staticOptions = { font: staticFont, fill: options.staticColor };
    const fractionLineOptions = { stroke: options.staticColor, lineWidth: this.fractionLineThickness };

    const numberPropertyOptions = {
      numberType: 'Integer'
    };

    // internal properties that are connected to pickers
    const x1Property = new NumberProperty( lineProperty.get().x1, numberPropertyOptions );
    const y1Property = new NumberProperty( lineProperty.get().y1, numberPropertyOptions );
    const x2Property = new NumberProperty( lineProperty.get().x2, numberPropertyOptions );
    const y2Property = new NumberProperty( lineProperty.get().y2, numberPropertyOptions );

    // internal properties that are connected to number displays
    const riseProperty = new NumberProperty( lineProperty.get().rise, numberPropertyOptions );
    const runProperty = new NumberProperty( lineProperty.get().run, numberPropertyOptions );

    /*
     * Flag that allows us to update all controls atomically when the model changes.
     * When a picker's value changes, it results in the creation of a new Line.
     * So if you don't change the pickers atomically to match a new Line instance,
     * the new Line will be inadvertently replaced with an incorrect line.
     */
    let updatingControls = false;

    // Nodes that could appear is all possible ways to write the equation
    // m =
    const mNode = new RichText( GLSymbols.m, staticOptions );
    const interactiveEqualsNode = new Text( MathSymbols.EQUAL_TO, staticOptions );
    // y2 - y1
    const y2Node = new CoordinatePicker( y2Property, x2Property, y1Property, x1Property, options.y2RangeProperty, {
      font: interactiveFont,
      color: GLColors.POINT_X2_Y2
    } );
    const numeratorOperatorNode = new MinusNode( merge( { size: this.operatorLineSize }, staticOptions ) );
    const y1Node = new CoordinatePicker( y1Property, x1Property, y2Property, x2Property, options.y1RangeProperty, {
      font: interactiveFont,
      color: GLColors.POINT_X1_Y1
    } );
    // fraction line, correct length will be set later
    const interactiveFractionLineNode = new SceneryLine( 0, 0, 1, 0, fractionLineOptions );
    // x2 - x1
    const x2Node = new CoordinatePicker( x2Property, y2Property, x1Property, y1Property, options.x2RangeProperty, {
      font: interactiveFont,
      color: GLColors.POINT_X2_Y2
    } );
    const denominatorOperatorNode = new MinusNode( merge( { size: this.operatorLineSize }, staticOptions ) );
    const x1Node = new CoordinatePicker( x1Property, y1Property, x2Property, y2Property, options.x1RangeProperty, {
      font: interactiveFont,
      color: GLColors.POINT_X1_Y1
    } );
    // = unsimplified value
    const unsimplifiedSlopeOptions = {
      font: staticFont,
      decimalPlaces: 0,
      backgroundFill: GLColors.SLOPE,
      minWidth: y2Node.width,
      minHeight: y2Node.height - 20
    };
    const unsimplifiedEqualsNode = new RichText( MathSymbols.EQUAL_TO, staticOptions );
    const unsimplifiedRiseNode = new NumberBackgroundNode( riseProperty, unsimplifiedSlopeOptions );
    const unsimplifiedRunNode = new NumberBackgroundNode( runProperty, unsimplifiedSlopeOptions );
    const unsimplifiedFractionLineNode = new SceneryLine( 0, 0, 1, 0, fractionLineOptions ); // correct length will be set later

    const undefinedSlopeIndicator = new UndefinedSlopeIndicator( 1, 1 );

    // rendering order
    const parentNode = new Node();
    this.addChild( parentNode );
    this.addChild( undefinedSlopeIndicator );

    // m =
    parentNode.addChild( mNode );
    parentNode.addChild( interactiveEqualsNode );
    // y2 - y1
    parentNode.addChild( y2Node );
    parentNode.addChild( numeratorOperatorNode );
    parentNode.addChild( y1Node );
    // fraction line
    parentNode.addChild( interactiveFractionLineNode );
    // x2 - x1
    parentNode.addChild( x2Node );
    parentNode.addChild( denominatorOperatorNode );
    parentNode.addChild( x1Node );
    // = rise/run
    parentNode.addChild( unsimplifiedEqualsNode );
    parentNode.addChild( unsimplifiedRiseNode );
    parentNode.addChild( unsimplifiedFractionLineNode );
    parentNode.addChild( unsimplifiedRunNode );

    // sync the model with the controls, unmultilink in dispose
    const controlsMultilink = Property.lazyMultilink( [ x1Property, y1Property, x2Property, y2Property ],
      function() {
        if ( !updatingControls ) {
          lineProperty.set( new Line( x1Property.get(), y1Property.get(), x2Property.get(), y2Property.get(), lineProperty.get().color ) );
        }
      }
    );

    // sync the controls and layout with the model
    const lineObserver = function( line ) {

      // Synchronize the controls atomically.
      updatingControls = true;
      {
        x1Property.set( line.x1 );
        y1Property.set( line.y1 );
        x2Property.set( line.x2 );
        y2Property.set( line.y2 );
      }
      updatingControls = false;

      // Update the unsimplified slope
      riseProperty.set( line.rise );
      runProperty.set( line.run );

      // fraction line length
      const unsimplifiedFractionLineLength = Math.max( unsimplifiedRiseNode.width, unsimplifiedRunNode.width );
      unsimplifiedFractionLineNode.setLine( 0, 0, unsimplifiedFractionLineLength, 0 );

      // undefined-slope indicator
      undefinedSlopeIndicator.visible = line.undefinedSlope();
    };
    lineProperty.link( lineObserver ); // unlink in dispose

    // layout, after registering observers
    // m =
    mNode.x = 0;
    mNode.y = 0;
    interactiveEqualsNode.left = mNode.right + this.relationalOperatorXSpacing;
    interactiveEqualsNode.y = mNode.y;
    // fraction line
    interactiveFractionLineNode.left = interactiveEqualsNode.right + this.relationalOperatorXSpacing;
    interactiveFractionLineNode.centerY = interactiveEqualsNode.centerY + this.fractionLineYFudgeFactor;
    // y2 - y1
    y2Node.left = interactiveFractionLineNode.left;
    y2Node.bottom = interactiveFractionLineNode.top - this.pickersYSpacing;
    numeratorOperatorNode.left = y2Node.right + this.operatorXSpacing;
    numeratorOperatorNode.centerY = y2Node.centerY;
    y1Node.left = numeratorOperatorNode.right + this.operatorXSpacing;
    y1Node.y = y2Node.y;
    // fix fraction line length
    const fractionLineLength = y1Node.right - y2Node.left;
    interactiveFractionLineNode.setLine( 0, 0, fractionLineLength, 0 );
    // x2 - x1
    x2Node.left = y2Node.left;
    x2Node.top = interactiveFractionLineNode.bottom + this.pickersYSpacing;
    denominatorOperatorNode.left = x2Node.right + this.operatorXSpacing;
    denominatorOperatorNode.centerY = x2Node.centerY;
    x1Node.left = denominatorOperatorNode.right + this.operatorXSpacing;
    x1Node.y = x2Node.y;
    // = rise/run
    unsimplifiedEqualsNode.left = interactiveFractionLineNode.right + this.relationalOperatorXSpacing;
    unsimplifiedEqualsNode.y = interactiveEqualsNode.y;
    unsimplifiedFractionLineNode.left = unsimplifiedEqualsNode.right + this.relationalOperatorXSpacing;
    unsimplifiedFractionLineNode.y = interactiveFractionLineNode.y;
    // horizontally center rise and run above fraction line
    unsimplifiedRiseNode.centerX = unsimplifiedFractionLineNode.centerX;
    unsimplifiedRiseNode.bottom = unsimplifiedFractionLineNode.top - this.slopeYSpacing;
    unsimplifiedRunNode.centerX = unsimplifiedFractionLineNode.centerX;
    unsimplifiedRunNode.top = unsimplifiedFractionLineNode.bottom + this.slopeYSpacing;

    // set up undefined-slope indicator last
    undefinedSlopeIndicator.setSize( parentNode.getWidth(), parentNode.getHeight() );
    undefinedSlopeIndicator.centerX = parentNode.centerX;
    undefinedSlopeIndicator.centerY = parentNode.centerY + this.undefinedSlopeYFudgeFactor;

    this.mutate( options );

    // @private called by dispose
    this.disposeSlopeEquationNode = () => {
      x1Node.dispose();
      x2Node.dispose();
      y1Node.dispose();
      y2Node.dispose();
      unsimplifiedRiseNode.dispose();
      unsimplifiedRunNode.dispose();
      lineProperty.unlink( lineObserver );
      Property.unmultilink( controlsMultilink );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeSlopeEquationNode();
    super.dispose();
  }

  /**
   * Creates a node that displays the general form of the slope equation: m = (y2-y1)/(x2-x1)
   * @param {Object} [options]
   * @returns {Node}
   * @public
   * @static
   */
  static createGeneralFormNode( options ) {

    options = merge( {
      pickable: false,
      fontSize: 20,
      fontWeight: GLConstants.EQUATION_FONT_WEIGHT,
      fill: 'black',
      maxWidth: 300
    }, options );

    const equationNode = new EquationNode( options.fontSize, options );

    const font = new GLFont( { size: options.fontSize, weight: options.fontWeight } );

    // Slope m =
    const leftSideText = StringUtils.format( '{0}    {1} {2}', slopeString, GLSymbols.m, MathSymbols.EQUAL_TO );
    const leftSideNode = new RichText( leftSideText, {
      font: font,
      fill: options.fill,
      maxWidth: 125 // i18n, determined empirically
    } );

    // pattern for numerator and denominator
    const pattern = '{0}<sub>2</sub> {1} {2}<sub>1</sub>';

    // y2 - y1
    const numeratorText = StringUtils.format( pattern, GLSymbols.y, MathSymbols.MINUS, GLSymbols.y );
    const numeratorNode = new RichText( numeratorText, {
      font: font,
      fill: options.fill
    } );

    // x2 - x1
    const denominatorText = StringUtils.format( pattern, GLSymbols.x, MathSymbols.MINUS, GLSymbols.x );
    const denominatorNode = new RichText( denominatorText, {
      font: font,
      fill: options.fill
    } );

    // fraction line
    const length = Math.max( numeratorNode.width, denominatorNode.width );
    const fractionLineNode = new SceneryLine( 0, 0, length, 0, {
      stroke: options.fill,
      lineWidth: equationNode.fractionLineThickness
    } );

    // rendering order
    equationNode.addChild( leftSideNode );
    equationNode.addChild( fractionLineNode );
    equationNode.addChild( numeratorNode );
    equationNode.addChild( denominatorNode );

    // layout
    leftSideNode.x = 0;
    leftSideNode.y = 0;
    fractionLineNode.left = leftSideNode.right + 5;
    fractionLineNode.centerY = leftSideNode.centerY;
    numeratorNode.centerX = fractionLineNode.centerX;
    numeratorNode.bottom = fractionLineNode.top - 5;
    denominatorNode.centerX = fractionLineNode.centerX;
    denominatorNode.top = fractionLineNode.bottom + 1;

    return equationNode;
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
      pickable: false,
      maxWidth: 200
    }, options );

    return new DynamicLabelNode( lineProperty, options );
  }
}

/**
 * A non-interactive equation, used to label a dynamic line.
 * This takes the form 'Slope is rise/run', which is different than the interactive equation form.
 * Note that while this is a sentence, it's order is not localized, due to the fact that it is
 * composed of multiple scenery.Text nodes.
 */
class DynamicLabelNode extends EquationNode {

  /**
   * @param {Property.<Line>} lineProperty
   * @param {Object} [options]
   */
  constructor( lineProperty, options ) {

    options = merge( {
      fontSize: 18
    }, options );

    super( options.fontSize );

    const textOptions = {
      font: new GLFont( { size: options.fontSize, weight: GLConstants.EQUATION_FONT_WEIGHT } )
    };

    // allocate nodes needed to represent all simplified forms
    const slopeIsNode = new Text( slopeIsString, textOptions );
    const minusSignNode = new MinusNode( { size: this.signLineSize } );
    const riseNode = new Text( '?', textOptions );
    const runNode = new Text( '?', textOptions );
    const fractionLineNode = new SceneryLine( 0, 0, 1, 0, { lineWidth: this.fractionLineThickness } );

    // add all nodes, we'll set which ones are visible bases on desired simplification
    assert && assert( this.getChildrenCount() === 0, 'supertype has unexpected children' );
    this.children = [ slopeIsNode, minusSignNode, riseNode, runNode, fractionLineNode ];

    // update visibility, layout and properties of nodes to match the current line
    const update = line => {

      const lineColor = line.color;

      // start with all children invisible
      const len = this.children.length;
      for ( let i = 0; i < len; i++ ) {
        this.children[ i ].visible = false;
      }

      // 'Slope is'
      slopeIsNode.visible = true;
      slopeIsNode.fill = lineColor;

      if ( line.undefinedSlope() ) {
        // 'undefined'
        riseNode.visible = true;
        riseNode.text = undefinedString;
        riseNode.fill = lineColor;
        riseNode.left = slopeIsNode.right + this.relationalOperatorXSpacing;
        riseNode.y = slopeIsNode.y;
      }
      else if ( line.getSlope() === 0 ) {
        // 0
        riseNode.visible = true;
        riseNode.text = '0';
        riseNode.fill = lineColor;
        riseNode.left = slopeIsNode.right + this.relationalOperatorXSpacing;
        riseNode.y = slopeIsNode.y;
      }
      else {
        let nextXOffset;
        if ( line.getSlope() < 0 ) {
          // minus sign
          minusSignNode.visible = true;
          minusSignNode.fill = lineColor;
          minusSignNode.left = slopeIsNode.right + this.relationalOperatorXSpacing;
          minusSignNode.centerY = slopeIsNode.centerY + this.slopeSignYFudgeFactor + this.slopeSignYOffset;
          nextXOffset = minusSignNode.right + this.fractionalSlopeXSpacing;
        }
        else {
          // no sign
          nextXOffset = slopeIsNode.right + this.relationalOperatorXSpacing;
        }

        if ( Utils.isInteger( line.getSlope() ) ) {
          // integer slope (rise/1)
          riseNode.visible = true;
          riseNode.text = Utils.toFixed( Math.abs( line.getSlope() ), 0 );
          riseNode.fill = lineColor;
          riseNode.left = nextXOffset;
          riseNode.y = slopeIsNode.y;
        }
        else {
          // fractional slope
          riseNode.visible = runNode.visible = fractionLineNode.visible = true;

          riseNode.text = Utils.toFixed( Math.abs( line.getSimplifiedRise() ), 0 );
          runNode.text = Utils.toFixed( Math.abs( line.getSimplifiedRun() ), 0 );
          fractionLineNode.setLine( 0, 0, Math.max( riseNode.width, runNode.width ), 0 );
          riseNode.fill = runNode.fill = fractionLineNode.stroke = lineColor;

          // layout, values horizontally centered
          fractionLineNode.left = nextXOffset;
          fractionLineNode.centerY = slopeIsNode.centerY + this.fractionLineYFudgeFactor;
          riseNode.centerX = fractionLineNode.centerX;
          riseNode.bottom = fractionLineNode.top - this.ySpacing;
          runNode.centerX = fractionLineNode.centerX;
          runNode.top = fractionLineNode.bottom + this.ySpacing;
        }
      }
    };

    const lineObserver = line => update( line );
    lineProperty.link( lineObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeDynamicLabelNode = () => {
      lineProperty.unlink( lineObserver );
    };

    this.mutate( options );
  }

  // @public @override
  dispose() {
    this.disposeDynamicLabelNode();
    super.dispose();
  }
}

graphingLines.register( 'SlopeEquationNode', SlopeEquationNode );

export default SlopeEquationNode;