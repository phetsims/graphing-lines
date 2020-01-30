// Copyright 2013-2019, University of Colorado Boulder

/**
 * Renderer for point-slope equations, with optional interactivity of point and slope.
 * General point-slope form is: (y - y1) = m(x - x1)
 *
 * Point and/or slope may be interactive.
 * Pickers are used to increment/decrement parts of the equation that are specified as being interactive.
 * Non-interactive parts of the equation are expressed in a form that is typical of how the equation
 * would normally be written. For example, if the slope is -1, then only the sign is written, not '-1'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DynamicValueNode = require( 'GRAPHING_LINES/common/view/DynamicValueNode' );
  const EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  const GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  const GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  const GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  const GLSymbols = require( 'GRAPHING_LINES/common/GLSymbols' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'GRAPHING_LINES/common/model/Line' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const merge = require( 'PHET_CORE/merge' );
  const MinusNode = require( 'SCENERY_PHET/MinusNode' );
  const NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PlusNode = require( 'SCENERY_PHET/PlusNode' );
  const Property = require( 'AXON/Property' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const SceneryLine = require( 'SCENERY/nodes/Line' ); // eslint-disable-line require-statement-match
  const SlopePicker = require( 'GRAPHING_LINES/common/view/picker/SlopePicker' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const UndefinedSlopeIndicator = require( 'GRAPHING_LINES/common/view/UndefinedSlopeIndicator' );
  const Utils = require( 'DOT/Utils' );

  // strings
  const slopeUndefinedString = require( 'string!GRAPHING_LINES/slopeUndefined' );

  /**
   * @param {Property.<Line>} lineProperty
   * @param {Object} [options]
   * @constructor
   */
  function PointSlopeEquationNode( lineProperty, options ) {

    options = merge( {

      // Don't show 'slope undefined' after non-interactive equations with undefined slope
      // See https://github.com/phetsims/graphing-slope-intercept/issues/7
      slopeUndefinedVisible: true,

      // components that can be interactive
      interactivePoint: true,
      interactiveSlope: true,

      // dynamic range of components
      x1RangeProperty: new Property( GLConstants.X_AXIS_RANGE ),
      y1RangeProperty: new Property( GLConstants.Y_AXIS_RANGE ),
      riseRangeProperty: new Property( GLConstants.Y_AXIS_RANGE ),
      runRangeProperty: new Property( GLConstants.X_AXIS_RANGE ),

      // style
      fontSize: GLConstants.INTERACTIVE_EQUATION_FONT_SIZE,
      staticColor: 'black'

    }, options );

    const self = this;

    EquationNode.call( self, options.fontSize ); // call first, because supertype constructor computes various layout metrics

    const fullyInteractive = ( options.interactivePoint && options.interactiveSlope );
    const interactiveFont = new GLFont( { size: options.fontSize, weight: GLConstants.EQUATION_FONT_WEIGHT } );
    const staticFont = new GLFont( { size: options.fontSize, weight: GLConstants.EQUATION_FONT_WEIGHT } );
    const staticOptions = { font: staticFont, fill: options.staticColor };
    const fractionLineOptions = { stroke: options.staticColor, lineWidth: self.fractionLineThickness };

    const numberPropertyOptions = {
      numberType: 'Integer'
    };

    // internal properties that are connected to pickers
    const x1Property = new NumberProperty( lineProperty.get().x1, numberPropertyOptions );
    const y1Property = new NumberProperty( lineProperty.get().y1, numberPropertyOptions );
    const riseProperty = new NumberProperty( lineProperty.get().rise, numberPropertyOptions );
    const runProperty = new NumberProperty( lineProperty.get().run, numberPropertyOptions );

    /*
     * Flag that allows us to update all controls atomically when the model changes.
     * When a picker's value changes, it results in the creation of a new Line.
     * So if you don't change the pickers atomically to match a new Line instance,
     * the new Line will be inadvertently replaced with an incorrect line.
     */
    let updatingControls = false;

    // Determine the max width of the rise and run pickers.
    const maxSlopePickerWidth = EquationNode.computeMaxSlopePickerWidth( options.riseRangeProperty, options.runRangeProperty, interactiveFont, self.DECIMAL_PLACES );

    // Nodes that appear in all possible forms of the equation: (y-y1) = rise/run (x-x1)
    const yLeftParenNode = new Text( '(', staticOptions );
    const yNode = new RichText( GLSymbols.y, staticOptions );
    const yPlusNode = new PlusNode( merge( { size: self.operatorLineSize }, staticOptions ) );
    const yMinusNode = new MinusNode( merge( { size: self.operatorLineSize }, staticOptions ) );
    let y1Node;
    if ( options.interactivePoint ) {
      y1Node = new NumberPicker( y1Property, options.y1RangeProperty, merge( {}, GLConstants.PICKER_OPTIONS, {
        color: GLColors.POINT_X1_Y1,
        font: interactiveFont
      } ) );
    }
    else {
      y1Node = new DynamicValueNode( y1Property, merge( { absoluteValue: true }, staticOptions ) );
    }
    const yRightParenNode = new Text( ')', staticOptions );
    const y1MinusSignNode = new MinusNode( merge( { size: self.signLineSize }, staticOptions ) ); // for y=-y1 case
    const equalsNode = new Text( '=', staticOptions );
    const slopeMinusSignNode = new MinusNode( merge( { size: self.signLineSize }, staticOptions ) );
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
    const fractionLineNode = new SceneryLine( 0, 0, maxSlopePickerWidth, 0, fractionLineOptions );
    const xLeftParenNode = new Text( '(', staticOptions );
    const xNode = new RichText( GLSymbols.x, staticOptions );
    const xPlusNode = new PlusNode( merge( { size: self.operatorLineSize }, staticOptions ) );
    const xMinusNode = new MinusNode( merge( { size: self.operatorLineSize }, staticOptions ) );
    let x1Node;
    if ( options.interactivePoint ) {
      x1Node = new NumberPicker( x1Property, options.x1RangeProperty, merge( {}, GLConstants.PICKER_OPTIONS, {
        color: GLColors.POINT_X1_Y1,
        font: interactiveFont
      } ) );
    }
    else {
      x1Node = new DynamicValueNode( x1Property, merge( { absoluteValue: true }, staticOptions ) );
    }
    const xRightParenNode = new Text( ')', staticOptions );
    const slopeUndefinedNode = new RichText( '?', staticOptions );

    // add all nodes, we'll set which ones are visible bases on desired simplification
    self.children = [
      yLeftParenNode, yNode, yPlusNode, yMinusNode, y1Node, yRightParenNode, y1MinusSignNode, equalsNode,
      slopeMinusSignNode, riseNode, runNode, fractionLineNode, xLeftParenNode, xNode, xPlusNode, xMinusNode, x1Node, xRightParenNode,
      slopeUndefinedNode
    ];

    /*
     * Updates the layout to match the desired form of the equation.
     * This is based on which parts of the equation are interactive, and what the
     * non-interactive parts of the equation should look like when written in simplified form.
     */
    const updateLayout = function( line ) {

      const interactive = options.interactivePoint || options.interactiveSlope;
      const lineColor = line.color;

      // Start with all children invisible and at x=0.
      // See https://github.com/phetsims/graphing-lines/issues/120
      const len = self.children.length;
      for ( let i = 0; i < len; i++ ) {
        self.children[ i ].visible = false;
        self.children[ i ].x = 0;
      }
      slopeUndefinedNode.text = ''; // workaround for #114 and #117

      if ( line.undefinedSlope() && !interactive ) {
        // slope is undefined and nothing is interactive
        slopeUndefinedNode.visible = true;
        slopeUndefinedNode.fill = lineColor;
        slopeUndefinedNode.text = ( options.slopeUndefinedVisible ) ?
                                  StringUtils.format( slopeUndefinedString, GLSymbols.x, line.x1 ) :
                                  StringUtils.format( GLConstants.PATTERN_0VALUE_EQUALS_1VALUE, GLSymbols.x, line.x1 );
        return;
      }
      else if ( !interactive && line.same( Line.Y_EQUALS_X_LINE ) ) {
        // use slope-intercept form for y=x
        yNode.visible = equalsNode.visible = xNode.visible = true;
        yNode.fill = equalsNode.fill = xNode.fill = lineColor;
        equalsNode.left = yNode.right + self.relationalOperatorXSpacing;
        xNode.left = equalsNode.right + self.relationalOperatorXSpacing;
        return;
      }
      else if ( !interactive && line.same( Line.Y_EQUALS_NEGATIVE_X_LINE ) ) {
        // use slope-intercept form for y=-x
        yNode.visible = equalsNode.visible = slopeMinusSignNode.visible = xNode.visible = true;
        yNode.fill = equalsNode.fill = slopeMinusSignNode.fill = xNode.fill = lineColor;
        equalsNode.left = yNode.right + self.relationalOperatorXSpacing;
        slopeMinusSignNode.left = equalsNode.right + self.relationalOperatorXSpacing;
        slopeMinusSignNode.centerY = equalsNode.centerY + self.operatorYFudgeFactor;
        xNode.left = slopeMinusSignNode.right + self.integerSignXSpacing;
        return;
      }

      // Select the operators based on the signs of x1 and y1.
      const xOperatorNode = ( options.interactivePoint || line.x1 >= 0 ) ? xMinusNode : xPlusNode;
      const yOperatorNode = ( options.interactivePoint || line.y1 >= 0 ) ? yMinusNode : yPlusNode;

      if ( line.rise === 0 && !options.interactiveSlope && !options.interactivePoint ) {
        // y1 is on the right side of the equation
        yNode.visible = equalsNode.visible = y1Node.visible = true;
        yNode.fill = equalsNode.fill = y1Node.fill = lineColor;
        equalsNode.left = yNode.right + self.relationalOperatorXSpacing;
        if ( options.interactivePoint || line.y1 >= 0 ) {
          // y = y1
          y1Node.left = equalsNode.right + self.relationalOperatorXSpacing;
          y1Node.y = yNode.y;
        }
        else {
          // y = -y1
          y1MinusSignNode.visible = true;
          y1MinusSignNode.fill = lineColor;
          y1MinusSignNode.left = equalsNode.right + self.relationalOperatorXSpacing;
          y1MinusSignNode.centerY = equalsNode.centerY + self.operatorYFudgeFactor;
          y1Node.left = y1MinusSignNode.right + self.integerSignXSpacing;
          y1Node.y = yNode.y;
        }
      }
      else {  // y1 is on the left side of the equation

        let previousNode;

        if ( !options.interactivePoint && line.y1 === 0 ) {
          // y
          yNode.x = 0;
          yNode.y = 0;
          yNode.fill = lineColor;
          yNode.visible = true;
          previousNode = yNode;
        }
        else if ( !interactive ) {
          // y - y1
          yNode.visible = yOperatorNode.visible = y1Node.visible = true;
          yNode.fill = yOperatorNode.fill = y1Node.fill = lineColor;
          yNode.x = 0;
          yNode.y = 0;
          yOperatorNode.left = yNode.right + self.operatorXSpacing;
          yOperatorNode.centerY = yNode.centerY + self.operatorYFudgeFactor;
          y1Node.left = yOperatorNode.right + self.operatorXSpacing;
          y1Node.centerY = yNode.centerY;
          previousNode = y1Node;
        }
        else {
          // (y - y1)
          yLeftParenNode.visible = yNode.visible = yOperatorNode.visible = y1Node.visible = yRightParenNode.visible = true;
          yLeftParenNode.fill = yNode.fill = yOperatorNode.fill = y1Node.fill = yRightParenNode.fill = lineColor;
          yLeftParenNode.x = 0;
          yLeftParenNode.y = 0;
          yNode.left = yLeftParenNode.right + self.parenXSpacing;
          yNode.y = yLeftParenNode.y;
          yOperatorNode.left = yNode.right + self.operatorXSpacing;
          yOperatorNode.centerY = yNode.centerY + self.operatorYFudgeFactor;
          y1Node.left = yOperatorNode.right + self.operatorXSpacing;
          y1Node.centerY = yNode.centerY;
          yRightParenNode.left = y1Node.right + self.parenXSpacing;
          yRightParenNode.y = yNode.y;
          previousNode = yRightParenNode;
        }

        // =
        equalsNode.visible = true;
        equalsNode.fill = lineColor;
        equalsNode.left = previousNode.right + self.relationalOperatorXSpacing;
        equalsNode.y = yNode.y + self.equalsSignFudgeFactor;

        // slope
        let previousXOffset;
        if ( options.interactiveSlope ) {
          // (rise/run), where rise and run are pickers, and the sign is integrated into the pickers
          riseNode.visible = runNode.visible = fractionLineNode.visible = true;
          riseNode.fill = runNode.fill = fractionLineNode.fill = lineColor;
          fractionLineNode.left = equalsNode.right + self.relationalOperatorXSpacing;
          fractionLineNode.centerY = equalsNode.centerY;
          riseNode.centerX = fractionLineNode.centerX;
          riseNode.bottom = fractionLineNode.top - self.pickersYSpacing;
          runNode.centerX = fractionLineNode.centerX;
          runNode.top = fractionLineNode.bottom + self.pickersYSpacing;
          previousNode = fractionLineNode;
          previousXOffset = self.fractionalSlopeXSpacing;
        }
        else {
          // slope is not interactive, so here we put it in the desired form

          // slope properties, used to determine correct form
          const slope = line.getSlope();
          const zeroSlope = ( slope === 0 );
          const unitySlope = ( Math.abs( slope ) === 1 );
          const integerSlope = Utils.isInteger( slope );
          const positiveSlope = ( slope > 0 );
          const fractionalSlope = ( !zeroSlope && !unitySlope && !integerSlope );

          // adjust fraction line width, use max width of rise or run
          const lineWidth = Math.max( riseNode.width, runNode.width );
          fractionLineNode.setLine( 0, 0, lineWidth, 0 );

          // decide whether to include the slope minus sign
          if ( positiveSlope || zeroSlope ) {
            // no sign
            previousNode = equalsNode;
            previousXOffset = self.relationalOperatorXSpacing;
          }
          else {
            // -
            slopeMinusSignNode.visible = true;
            slopeMinusSignNode.fill = lineColor;
            slopeMinusSignNode.left = equalsNode.right + self.relationalOperatorXSpacing;
            slopeMinusSignNode.centerY = equalsNode.centerY + self.slopeSignYFudgeFactor + self.slopeSignYOffset;
            previousNode = slopeMinusSignNode;
            previousXOffset = ( fractionalSlope ? self.fractionSignXSpacing : self.integerSignXSpacing );
          }

          if ( line.undefinedSlope() || fractionalSlope ) {
            // rise/run
            riseNode.visible = runNode.visible = fractionLineNode.visible = true;
            riseNode.fill = runNode.fill = fractionLineNode.stroke = lineColor;
            fractionLineNode.left = previousNode.right + previousXOffset;
            fractionLineNode.centerY = equalsNode.centerY;
            riseNode.centerX = fractionLineNode.centerX;
            riseNode.bottom = fractionLineNode.top - self.ySpacing;
            runNode.centerX = fractionLineNode.centerX;
            runNode.top = fractionLineNode.bottom + self.ySpacing;
            previousNode = fractionLineNode;
            previousXOffset = self.fractionalSlopeXSpacing;
          }
          else if ( zeroSlope ) {
            // 0
            riseNode.visible = true;
            riseNode.fill = lineColor;
            riseNode.left = equalsNode.right + self.relationalOperatorXSpacing;
            riseNode.y = yNode.y;
            previousNode = riseNode;
            previousXOffset = self.integerSlopeXSpacing;
          }
          else if ( unitySlope ) {
            // no slope term
            previousXOffset = self.relationalOperatorXSpacing;
          }
          else if ( integerSlope ) {
            // N
            riseNode.visible = true;
            riseNode.fill = lineColor;
            riseNode.left = previousNode.right + previousXOffset;
            riseNode.y = yNode.y;
            previousNode = riseNode;
            previousXOffset = self.integerSlopeXSpacing;
          }
          else {
            throw new Error( 'programming error, forgot to handle some slope case' );
          }
        }

        // x term
        if ( interactive || ( line.x1 !== 0 && line.getSlope() !== 0 && line.getSlope() !== 1 ) ) {
          // (x - x1)
          xLeftParenNode.visible = xNode.visible = xOperatorNode.visible = x1Node.visible = xRightParenNode.visible = true;
          xLeftParenNode.fill = xNode.fill = xOperatorNode.fill = x1Node.fill = xRightParenNode.fill = lineColor;
          xLeftParenNode.left = previousNode.right + previousXOffset;
          xLeftParenNode.y = yNode.y;
          xNode.left = xLeftParenNode.right + self.parenXSpacing;
          xNode.y = yNode.y;
          xOperatorNode.left = xNode.right + self.operatorXSpacing;
          xOperatorNode.centerY = xNode.centerY + self.operatorYFudgeFactor;
          x1Node.left = xOperatorNode.right + self.operatorXSpacing;
          x1Node.centerY = yNode.centerY;
          xRightParenNode.left = x1Node.right + self.parenXSpacing;
          xRightParenNode.y = yNode.y;
        }
        else if ( line.getSlope() === 1 && line.x1 !== 0 ) {
          // x - x1
          xNode.visible = xOperatorNode.visible = x1Node.visible = true;
          xNode.fill = xOperatorNode.fill = x1Node.fill = lineColor;
          xNode.left = previousNode.right + previousXOffset;
          xNode.y = yNode.y;
          xOperatorNode.left = xNode.right + self.operatorXSpacing;
          xOperatorNode.centerY = xNode.centerY + self.operatorYFudgeFactor;
          x1Node.left = xOperatorNode.right + self.operatorXSpacing;
          x1Node.centerY = yNode.centerY;
        }
        else if ( line.x1 === 0  ) {
          // x
          xNode.visible = true;
          xNode.fill = lineColor;
          xNode.left = previousNode.right + previousXOffset;
          xNode.centerY = yNode.centerY;
        }
        else {
          throw new Error( 'programming error, forgot to handle some x-term case' );
        }
      }
    };

    // sync the model with the controls, unmultilink in dispose
    const controlsMultilink = Property.lazyMultilink( [ x1Property, y1Property, riseProperty, runProperty ],
      function() {
        if ( !updatingControls ) {
          lineProperty.set( Line.createPointSlope( x1Property.get(), y1Property.get(), riseProperty.get(), runProperty.get(), lineProperty.get().color ) );
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
        riseProperty.set( options.interactiveSlope ? line.rise : line.getSimplifiedRise() );
        runProperty.set( options.interactiveSlope ? line.run : line.getSimplifiedRun() );
      }
      updatingControls = false;

      // Fully-interactive equations have a constant form, no need to update layout when line changes.
      if ( !fullyInteractive ) { updateLayout( line ); }
    };
    lineProperty.link( lineObserver ); // unlink in dispose

    // For fully-interactive equations ...
    if ( fullyInteractive ) {

      // update layout once
      updateLayout( lineProperty.get() );

      // add undefinedSlopeIndicator
      const undefinedSlopeIndicator = new UndefinedSlopeIndicator( self.width, self.height, staticOptions );
      self.addChild( undefinedSlopeIndicator );
      undefinedSlopeIndicator.centerX = self.centerX;
      undefinedSlopeIndicator.centerY = fractionLineNode.centerY - self.undefinedSlopeYFudgeFactor;

      var undefinedSlopeUpdater = function( line ) {
        undefinedSlopeIndicator.visible = line.undefinedSlope();
      };
      lineProperty.link( undefinedSlopeUpdater ); // unlink in dispose
    }

    self.mutate( options );

    // @private called by dispose
    this.disposePointSlopeEquationNode = function() {
      x1Node.dispose();
      y1Node.dispose();
      riseNode.dispose();
      runNode.dispose();
      Property.unmultilink( controlsMultilink );
      lineProperty.unlink( lineObserver );
      undefinedSlopeUpdater && lineProperty.unlink( undefinedSlopeUpdater );
    };
  }

  graphingLines.register( 'PointSlopeEquationNode', PointSlopeEquationNode );


  return inherit( EquationNode, PointSlopeEquationNode, {

    dispose: function() {
      this.disposePointSlopeEquationNode();
      EquationNode.prototype.dispose.call( this );
    }
  }, {

    /**
     * Creates a node that displays the general form of this equation: (y - y1) = m(x - x1)
     * @param {Object} [options]
     * @returns {Node}
     * @public
     * @static
     */
    createGeneralFormNode: function( options ) {

      options = merge( {
        pickable: false,
        font: new GLFont( { size: 20, weight: GLConstants.EQUATION_FONT_WEIGHT } ),
        maxWidth: 300
      }, options );

      // (y - y1) = m(x - x1)
      const pattern = '({0} {1} {2}<sub>1</sub>) {3} {4}({5} {6} {7}<sub>1</sub>)';
      const html = StringUtils.format( pattern, GLSymbols.y, MathSymbols.MINUS, GLSymbols.y, MathSymbols.EQUAL_TO,
        GLSymbols.m, GLSymbols.x, MathSymbols.MINUS, GLSymbols.x );
      return new RichText( html, options );
    },

    /**
     * Creates a non-interactive equation, used to label a dynamic line.
     * @param {Property.<Line>} lineProperty
     * @param {Object} [options]
     * @returns {Node}
     * @public
     * @static
     */
    createDynamicLabel: function( lineProperty, options ) {

      options = merge( {
        pickable: false,
        interactivePoint: false,
        interactiveSlope: false,
        fontSize: 18,
        maxWidth: 200
      }, options );

      return new PointSlopeEquationNode( lineProperty, options );
    }
  } );
} );
