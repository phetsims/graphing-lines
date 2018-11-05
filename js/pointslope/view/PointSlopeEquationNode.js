// Copyright 2013-2017, University of Colorado Boulder

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
define( function( require ) {
  'use strict';

  // modules
  var DynamicValueNode = require( 'GRAPHING_LINES/common/view/DynamicValueNode' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var GLSymbols = require( 'GRAPHING_LINES/common/GLSymbols' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var MinusNode = require( 'SCENERY_PHET/MinusNode' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var PlusNode = require( 'SCENERY_PHET/PlusNode' );
  var Property = require( 'AXON/Property' );
  var scenery = { Line: require( 'SCENERY/nodes/Line' ) }; // scenery.Line, workaround for name collision with graphing-lines.Line
  var RichText = require( 'SCENERY/nodes/RichText' );
  var SlopePicker = require( 'GRAPHING_LINES/common/view/picker/SlopePicker' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var UndefinedSlopeIndicator = require( 'GRAPHING_LINES/common/view/UndefinedSlopeIndicator' );
  var Util = require( 'DOT/Util' );

  // strings
  var slopeUndefinedString = require( 'string!GRAPHING_LINES/slopeUndefined' );

  /**
   * @param {Property.<Line>} lineProperty
   * @param {Object} [options]
   * @constructor
   */
  function PointSlopeEquationNode( lineProperty, options ) {

    options = _.extend( {

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

    var self = this;

    EquationNode.call( self, options.fontSize ); // call first, because supertype constructor computes various layout metrics

    var fullyInteractive = ( options.interactivePoint && options.interactiveSlope );
    var interactiveFont = new GLFont( { size: options.fontSize, weight: GLConstants.EQUATION_FONT_WEIGHT } );
    var staticFont = new GLFont( { size: options.fontSize, weight: GLConstants.EQUATION_FONT_WEIGHT } );
    var staticOptions = { font: staticFont, fill: options.staticColor };
    var fractionLineOptions = { stroke: options.staticColor, lineWidth: self.fractionLineThickness };

    var numberPropertyOptions = {
      numberType: 'Integer'
    };

    // internal properties that are connected to pickers
    var x1Property = new NumberProperty( lineProperty.get().x1, numberPropertyOptions );
    var y1Property = new NumberProperty( lineProperty.get().y1, numberPropertyOptions );
    var riseProperty = new NumberProperty( lineProperty.get().rise, numberPropertyOptions );
    var runProperty = new NumberProperty( lineProperty.get().run, numberPropertyOptions );

    /*
     * Flag that allows us to update all controls atomically when the model changes.
     * When a picker's value changes, it results in the creation of a new Line.
     * So if you don't change the pickers atomically to match a new Line instance,
     * the new Line will be inadvertently replaced with an incorrect line.
     */
    var updatingControls = false;

    // Determine the max width of the rise and run pickers.
    var maxSlopePickerWidth = EquationNode.computeMaxSlopePickerWidth( options.riseRangeProperty, options.runRangeProperty, interactiveFont, self.DECIMAL_PLACES );

    // Nodes that appear in all possible forms of the equation: (y-y1) = rise/run (x-x1)
    var yLeftParenNode = new Text( '(', staticOptions );
    var yNode = new RichText( GLSymbols.y, staticOptions );
    var yPlusNode = new PlusNode( _.extend( { size: self.operatorLineSize }, staticOptions ) );
    var yMinusNode = new MinusNode( _.extend( { size: self.operatorLineSize }, staticOptions ) );
    var y1Node;
    if ( options.interactivePoint ) {
      y1Node = new NumberPicker( y1Property, options.y1RangeProperty,
        { color: GLColors.POINT_X1_Y1, font: interactiveFont, touchAreaXDilation: 30 } );
    }
    else {
      y1Node = new DynamicValueNode( y1Property, _.extend( { absoluteValue: true }, staticOptions ) );
    }
    var yRightParenNode = new Text( ')', staticOptions );
    var y1MinusSignNode = new MinusNode( _.extend( { size: self.signLineSize }, staticOptions ) ); // for y=-y1 case
    var equalsNode = new Text( '=', staticOptions );
    var slopeMinusSignNode = new MinusNode( _.extend( { size: self.signLineSize }, staticOptions ) );
    var riseNode;
    var runNode;
    if ( options.interactiveSlope ) {
      riseNode = new SlopePicker( riseProperty, runProperty, options.riseRangeProperty, { font: interactiveFont } );
      runNode = new SlopePicker( runProperty, riseProperty, options.runRangeProperty, { font: interactiveFont } );
    }
    else {
      riseNode = new DynamicValueNode( riseProperty, _.extend( { absoluteValue: true }, staticOptions ) );
      runNode = new DynamicValueNode( runProperty, _.extend( { absoluteValue: true }, staticOptions ) );
    }
    var fractionLineNode = new scenery.Line( 0, 0, maxSlopePickerWidth, 0, fractionLineOptions );
    var xLeftParenNode = new Text( '(', staticOptions );
    var xNode = new RichText( GLSymbols.x, staticOptions );
    var xPlusNode = new PlusNode( _.extend( { size: self.operatorLineSize }, staticOptions ) );
    var xMinusNode = new MinusNode( _.extend( { size: self.operatorLineSize }, staticOptions ) );
    var x1Node;
    if ( options.interactivePoint ) {
      x1Node = new NumberPicker( x1Property, options.x1RangeProperty,
        {
          color: GLColors.POINT_X1_Y1,
          font: interactiveFont,
          touchAreaXDilation: GLConstants.PICKER_TOUCH_AREA_X_DILATION
        } );
    }
    else {
      x1Node = new DynamicValueNode( x1Property, _.extend( { absoluteValue: true }, staticOptions ) );
    }
    var xRightParenNode = new Text( ')', staticOptions );
    var slopeUndefinedNode = new RichText( '?', staticOptions );

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
    var updateLayout = function( line ) {

      var interactive = options.interactivePoint || options.interactiveSlope;
      var lineColor = line.color;

      // start with all children invisible
      var len = self.children.length;
      for ( var i = 0; i < len; i++ ) {
        self.children[ i ].visible = false;
      }

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
      var xOperatorNode = ( options.interactivePoint || line.x1 >= 0 ) ? xMinusNode : xPlusNode;
      var yOperatorNode = ( options.interactivePoint || line.y1 >= 0 ) ? yMinusNode : yPlusNode;

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

        var previousNode;

        if ( !options.interactivePoint && line.y1 === 0 ) {
          // y
          yNode.fill = lineColor;
          yNode.visible = true;
          previousNode = yNode;
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
        var previousXOffset;
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
          var slope = line.getSlope();
          var zeroSlope = ( slope === 0 );
          var unitySlope = ( Math.abs( slope ) === 1 );
          var integerSlope = Util.isInteger( slope );
          var positiveSlope = ( slope > 0 );
          var fractionalSlope = ( !zeroSlope && !unitySlope && !integerSlope );

          // adjust fraction line width, use max width of rise or run
          var lineWidth = Math.max( riseNode.width, runNode.width );
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
        if ( options.interactivePoint || options.interactiveSlope || ( line.rise !== 0 && line.x1 !== 0 ) ) {
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
        else if ( line.x1 === 0  ) {
          // x
          xNode.visible = true;
          xNode.left = previousNode.right + previousXOffset;
          xNode.centerY = yNode.centerY;
        }
        else {
          throw new Error( 'programming error, forgot to handle some x-term case' );
        }
      }
    };

    // sync the model with the controls, unmultilink in dispose
    var controlsMultilink = Property.lazyMultilink( [ x1Property, y1Property, riseProperty, runProperty ],
      function() {
        if ( !updatingControls ) {
          lineProperty.set( Line.createPointSlope( x1Property.get(), y1Property.get(), riseProperty.get(), runProperty.get(), lineProperty.get().color ) );
        }
      }
    );

    // sync the controls and layout with the model
    var lineObserver = function( line ) {

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
      var undefinedSlopeIndicator = new UndefinedSlopeIndicator( self.width, self.height, staticOptions );
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
      options = _.extend( { font: new GLFont( { size: 20, weight: GLConstants.EQUATION_FONT_WEIGHT } ) }, options );
      // (y - y1) = m(x - x1)
      var pattern = '({0} {1} {2}<sub>1</sub>) {3} {4}({5} {6} {7}<sub>1</sub>)';
      var html = StringUtils.format( pattern, GLSymbols.y, MathSymbols.MINUS, GLSymbols.y, MathSymbols.EQUAL_TO,
        GLSymbols.m, GLSymbols.x, MathSymbols.MINUS, GLSymbols.x );
      return new RichText( html, { font: options.font } );
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

      options = _.extend( {
        interactivePoint: false,
        interactiveSlope: false,
        fontSize: 18
      }, options );

      return new PointSlopeEquationNode( lineProperty, options );
    }
  } );
} );
