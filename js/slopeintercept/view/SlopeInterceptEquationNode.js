// Copyright 2013-2017, University of Colorado Boulder

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
define( function( require ) {
  'use strict';

  // modules
  var DynamicValueNode = require( 'GRAPHING_LINES/common/view/DynamicValueNode' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var MinusNode = require( 'SCENERY_PHET/MinusNode' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var PlusNode = require( 'SCENERY_PHET/PlusNode' );
  var Property = require( 'AXON/Property' );
  var scenery = { Line: require( 'SCENERY/nodes/Line' ) }; // scenery.Line, workaround for name collision with graphing-lines.Line
  var SlopePicker = require( 'GRAPHING_LINES/common/view/picker/SlopePicker' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var UndefinedSlopeIndicator = require( 'GRAPHING_LINES/common/view/UndefinedSlopeIndicator' );
  var Util = require( 'DOT/Util' );

  // strings
  var slopeUndefinedString = require( 'string!GRAPHING_LINES/slopeUndefined' );
  var symbolInterceptString = require( 'string!GRAPHING_LINES/symbol.intercept' );
  var symbolSlopeString = require( 'string!GRAPHING_LINES/symbol.slope' );
  var symbolXString = require( 'string!GRAPHING_LINES/symbol.x' );
  var symbolYString = require( 'string!GRAPHING_LINES/symbol.y' );

  /**
   * @param {Property.<Line>} lineProperty
   * @param {Object} [options]
   * @constructor
   */
  function SlopeInterceptEquationNode( lineProperty, options ) {

    options = _.extend( {

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

    var self = this;

    EquationNode.call( this, options.fontSize ); // call first, because supertype constructor computes various layout metrics

    var fullyInteractive = ( options.interactiveSlope && options.interactiveIntercept );
    var interactiveFont = new GLFont( { size: options.fontSize, weight: 'bold' } );
    var staticFont = new GLFont( { size: options.fontSize, weight: 'bold' } );
    var staticOptions = { font: staticFont, fill: options.staticColor };
    var fractionLineOptions = { stroke: options.staticColor, lineWidth: self.fractionLineThickness };

    // internal properties that are connected to pickers
    var riseProperty = new Property( lineProperty.get().rise );
    var runProperty = new Property( lineProperty.get().run );
    var yInterceptProperty = new Property( lineProperty.get().y1 );
    var fractionalIntercept = lineProperty.get().getYIntercept();
    var yInterceptNumeratorProperty = new Property( fractionalIntercept.numerator );
    var yInterceptDenominatorProperty = new Property( fractionalIntercept.denominator );

    /*
     * Flag that allows us to update all controls atomically when the model changes.
     * When a picker's value changes, it results in the creation of a new Line.
     * So if you don't change the pickers atomically to match a new Line instance,
     * the new Line will be inadvertently replaced with an incorrect line.
     */
    var updatingControls = false;

    // Determine the max width of the rise and run pickers.
    var maxSlopePickerWidth = EquationNode.computeMaxSlopePickerWidth( options.riseRangeProperty, options.runRangeProperty, interactiveFont, self.DECIMAL_PLACES );

    // Nodes that appear in all possible forms of the equation: y = -(rise/run)x + -b
    var yNode = new Text( symbolYString, staticOptions );
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
    var slopeFractionLineNode = new scenery.Line( 0, 0, maxSlopePickerWidth, 0, fractionLineOptions );
    var xNode = new Text( symbolXString, _.extend( { absoluteValue: true }, staticOptions ) );
    var plusNode = new PlusNode( _.extend( { size: self.operatorLineSize }, staticOptions ) );
    var minusNode = new MinusNode( _.extend( { size: self.operatorLineSize }, staticOptions ) );
    var yInterceptMinusSignNode = new MinusNode( _.extend( {
      size: self.signLineSize,
      absoluteValue: true
    }, staticOptions ) );
    var yInterceptNumeratorNode; // also used for integer values
    if ( options.interactiveIntercept ) {
      yInterceptNumeratorNode = new NumberPicker( yInterceptProperty, options.yInterceptRangeProperty,
        {
          color: GLColors.INTERCEPT,
          font: interactiveFont,
          touchAreaXDilation: GLConstants.PICKER_TOUCH_AREA_X_DILATION
        } );
    }
    else {
      yInterceptNumeratorNode = new DynamicValueNode( yInterceptNumeratorProperty, _.extend( { absoluteValue: true }, staticOptions ) );
    }
    var yInterceptDenominatorNode = new DynamicValueNode( yInterceptDenominatorProperty, _.extend( { absoluteValue: true }, staticOptions ) );
    var yInterceptFractionLineNode = new scenery.Line( 0, 0, maxSlopePickerWidth, 0, fractionLineOptions );
    var slopeUndefinedNode = new Text( '?', staticOptions );

    // add all nodes, we'll set which ones are visible bases on desired simplification
    self.children = [ yNode, equalsNode, slopeMinusSignNode, riseNode, runNode, slopeFractionLineNode, xNode, plusNode, minusNode,
      yInterceptMinusSignNode, yInterceptNumeratorNode, yInterceptDenominatorNode, yInterceptFractionLineNode, slopeUndefinedNode ];

    /*
     * Updates the layout to match the desired form of the equation.
     * This is based on which parts of the equation are interactive, and what the
     * non-interactive parts of the equation should look like when written in simplified form.
     */
    var updateLayout = function( line ) {

      var interactive = ( options.interactiveSlope || options.interactiveIntercept );
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
                                  StringUtils.format( slopeUndefinedString, symbolXString, line.x1 ) :
                                  StringUtils.format( GLConstants.PATTERN_0VALUE_EQUALS_1VALUE, symbolXString, line.x1 );
        return;
      }

      // slope properties
      var slope = line.getSlope();
      var zeroSlope = ( slope === 0 );
      var unitySlope = ( Math.abs( slope ) === 1 );
      var integerSlope = Util.isInteger( slope );
      var positiveSlope = ( slope > 0 );
      var fractionalSlope = ( !zeroSlope && !unitySlope && !integerSlope );

      var lineWidth;

      // y =
      yNode.visible = equalsNode.visible = true;
      yNode.fill = equalsNode.fill = lineColor;
      equalsNode.left = yNode.right + self.relationalOperatorXSpacing;
      equalsNode.y = yNode.y;

      // Layout the 'mx' part of the equation.
      if ( options.interactiveSlope ) {

        // slope is interactive, will be displayed as a fraction

        // (rise/run)x
        riseNode.visible = runNode.visible = slopeFractionLineNode.visible = xNode.visible = true;
        riseNode.fill = runNode.fill = slopeFractionLineNode.stroke = xNode.fill = lineColor;
        slopeFractionLineNode.left = equalsNode.right + self.relationalOperatorXSpacing;
        slopeFractionLineNode.centerY = equalsNode.centerY + self.fractionLineYFudgeFactor;
        riseNode.centerX = slopeFractionLineNode.centerX;
        riseNode.bottom = slopeFractionLineNode.top - self.pickersYSpacing;
        runNode.centerX = slopeFractionLineNode.centerX;
        runNode.top = slopeFractionLineNode.bottom + self.pickersYSpacing;
        xNode.left = slopeFractionLineNode.right + self.fractionalSlopeXSpacing;
        xNode.y = yNode.y;
      }
      else {
        // slope is not interactive, may be displayed as an integer or improper fraction

        // decide whether to include the slope minus sign
        var previousNode;
        var previousXOffset;
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
          // rise/run x
          riseNode.visible = runNode.visible = slopeFractionLineNode.visible = xNode.visible = true;
          riseNode.fill = runNode.fill = slopeFractionLineNode.stroke = xNode.fill = lineColor;
          // adjust fraction line width
          lineWidth = Math.max( riseNode.width, runNode.width );
          slopeFractionLineNode.setLine( 0, 0, lineWidth, 0 );
          // layout
          slopeFractionLineNode.left = previousNode.right + previousXOffset;
          slopeFractionLineNode.centerY = equalsNode.centerY + self.fractionLineYFudgeFactor;
          riseNode.centerX = slopeFractionLineNode.centerX;
          riseNode.bottom = slopeFractionLineNode.top - self.ySpacing;
          runNode.centerX = slopeFractionLineNode.centerX;
          runNode.top = slopeFractionLineNode.bottom + self.ySpacing;
          xNode.left = slopeFractionLineNode.right + self.fractionalSlopeXSpacing;
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
          xNode.left = riseNode.right + self.integerSlopeXSpacing;
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
          yInterceptNumeratorNode.left = equalsNode.right + self.relationalOperatorXSpacing;
          yInterceptNumeratorNode.centerY = yNode.centerY;
        }
        else {
          // y = (rise/run)x + b
          plusNode.visible = yInterceptNumeratorNode.visible = true;
          minusNode.visible = false;
          plusNode.fill = yInterceptNumeratorNode.fill = lineColor;
          plusNode.left = xNode.right + self.operatorXSpacing;
          plusNode.centerY = equalsNode.centerY + self.operatorYFudgeFactor;
          yInterceptNumeratorNode.left = plusNode.right + self.operatorXSpacing;
          yInterceptNumeratorNode.centerY = yNode.centerY;
        }
      }
      else {
        // intercept is not interactive and may be displayed as an integer or improper fraction

        // y-intercept properties
        var fractionalIntercept = line.getYIntercept();
        var zeroIntercept = ( fractionalIntercept.getValue() === 0 );
        var integerIntercept = fractionalIntercept.isInteger();
        var positiveIntercept = ( fractionalIntercept.getValue() > 0 );

        if ( zeroIntercept ) {
          if ( zeroSlope && !options.interactiveSlope ) {
            // y = 0
            yInterceptNumeratorNode.visible = true;
            yInterceptNumeratorNode.fill = lineColor;
            yInterceptNumeratorNode.left = equalsNode.right + self.relationalOperatorXSpacing;
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
          yInterceptNumeratorNode.left = equalsNode.right + self.relationalOperatorXSpacing;
          yInterceptNumeratorNode.centerY = yNode.centerY;
        }
        else if ( !positiveIntercept && zeroSlope && !options.interactiveSlope ) {
          // y = -b
          yInterceptMinusSignNode.visible = yInterceptNumeratorNode.visible = true;
          yInterceptMinusSignNode.fill = yInterceptNumeratorNode.fill = lineColor;
          yInterceptMinusSignNode.left = equalsNode.right + self.relationalOperatorXSpacing;
          yInterceptMinusSignNode.centerY = equalsNode.centerY + self.operatorYFudgeFactor;
          yInterceptNumeratorNode.left = yInterceptMinusSignNode.right + self.integerSignXSpacing;
          yInterceptNumeratorNode.centerY = yNode.centerY;
        }
        else {
          // y = mx +/- b
          var operatorNode = ( positiveIntercept ) ? plusNode : minusNode;
          operatorNode.visible = true;
          operatorNode.fill = lineColor;
          operatorNode.left = xNode.right + self.operatorXSpacing;
          operatorNode.centerY = equalsNode.centerY + self.operatorYFudgeFactor;

          if ( integerIntercept ) {
            // b is an integer
            yInterceptNumeratorNode.visible = true;
            yInterceptNumeratorNode.fill = lineColor;
            yInterceptNumeratorNode.left = operatorNode.right + self.operatorXSpacing;
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
            yInterceptFractionLineNode.left = operatorNode.right + self.operatorXSpacing;
            yInterceptFractionLineNode.centerY = equalsNode.centerY + self.fractionLineYFudgeFactor;
            yInterceptNumeratorNode.centerX = yInterceptFractionLineNode.centerX;
            yInterceptNumeratorNode.bottom = yInterceptFractionLineNode.top - self.ySpacing;
            yInterceptDenominatorNode.centerX = yInterceptFractionLineNode.centerX;
            yInterceptDenominatorNode.top = yInterceptFractionLineNode.bottom + self.ySpacing;
          }
        }
      }
    };

    //***************************************************************

    // sync the model with the controls, unmultilink in dispose
    var controlsMultilink = Property.lazyMultilink( [ riseProperty, runProperty, yInterceptProperty ],
      function() {
        if ( !updatingControls ) {
          if ( options.interactiveIntercept ) {
            lineProperty.set( Line.createSlopeIntercept( riseProperty.get(), runProperty.get(), yInterceptProperty.get(), lineProperty.get().color ) );
          }
          else {
            var line = lineProperty.get();
            lineProperty.set( new Line( line.x1, line.y1, line.x1 + runProperty.get(), line.y1 + riseProperty.get(), lineProperty.get().color ) );
          }
        }
      }
    );

    // sync the controls and layout with the model
    var lineObserver = function( line ) {

      // If intercept is interactive, then (x1,y1) must be on a grid line on the y intercept.
      assert && assert( !options.interactiveIntercept || ( line.x1 === 0 && Util.isInteger( line.y1 ) ) );

      // Synchronize the controls atomically.
      updatingControls = true;
      {
        riseProperty.set( options.interactiveSlope ? line.rise : line.getSimplifiedRise() );
        runProperty.set( options.interactiveSlope ? line.run : line.getSimplifiedRun() );

        if ( options.interactiveIntercept ) {
          yInterceptProperty.set( line.y1 );
        }
        else {
          var fractionalIntercept = lineProperty.get().getYIntercept();
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
    if ( fullyInteractive ) {

      // update layout once
      updateLayout( lineProperty.get() );

      // add undefinedSlopeIndicator
      var undefinedSlopeIndicator = new UndefinedSlopeIndicator( self.width, self.height, staticOptions );
      self.addChild( undefinedSlopeIndicator );
      undefinedSlopeIndicator.centerX = self.centerX;
      undefinedSlopeIndicator.centerY = slopeFractionLineNode.centerY - self.undefinedSlopeYFudgeFactor;

      var undefinedSlopeUpdater = function( line ) {
        undefinedSlopeIndicator.visible = line.undefinedSlope();
      };
      lineProperty.link( undefinedSlopeUpdater ); // unlink in dispose
    }

    self.mutate( options );

    // @private called by dispose
    this.disposeSlopeInterceptEquationNode = function() {
      riseNode.dispose();
      runNode.dispose();
      yInterceptNumeratorNode.dispose();
      yInterceptDenominatorNode.dispose();
      Property.unmultilink( controlsMultilink );
      lineProperty.unlink( lineObserver );
      undefinedSlopeUpdater && lineProperty.link( undefinedSlopeUpdater );
    };
  }

  graphingLines.register( 'SlopeInterceptEquationNode', SlopeInterceptEquationNode );

  return inherit( EquationNode, SlopeInterceptEquationNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeSlopeInterceptEquationNode();
      EquationNode.prototype.dispose.call( this );
    }
  }, {

    /**
     * Creates a node that displays the general form of this equation: y = mx + b
     * @param {Object} [options]
     * @returns {Node}
     * @public
     * @static
     */
    createGeneralFormNode: function( options ) {
      options = _.extend( { font: new GLFont( { size: 20, weight: 'bold' } ) }, options );
      var text = StringUtils.format( '{0} = {1}{2} + {3}',
        symbolYString, symbolSlopeString, symbolXString, symbolInterceptString );
      return new Text( text, { font: options.font, pickable: false } );
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
        interactiveSlope: false,
        interactiveIntercept: false,
        fontSize: 18
      }, options );

      return new SlopeInterceptEquationNode( lineProperty, options );
    }
  } );
} );
