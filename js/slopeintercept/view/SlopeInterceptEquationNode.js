// Copyright 2002-2013, University of Colorado Boulder

/**
 * Renderer for slope-intercept equations, with optional interactivity of slope and intercept.
 * General slope-intercept form is: y = mx + b
 * <p>
 * Slope and/or intercept may be interactive.
 * Spinners are used to increment/decrement parts of the equation that are specified as being interactive.
 * Non-interactive parts of the equation are expressed in a form that is typical of how the equation
 * would normally be written.  For example, if the slope is -1, then only the sign is written, not "-1".
 * <p>
 * Note that both m and b may be improper fractions. b may be an improper fraction only if the y-intercept
 * is not interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var DynamicValueNode = require( 'GRAPHING_LINES/common/view/DynamicValueNode' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLStrings = require( 'GRAPHING_LINES/common/GLStrings' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var MinusNode = require( 'GRAPHING_LINES/common/view/MinusNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PlusNode = require( 'GRAPHING_LINES/common/view/PlusNode' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var SlopeSpinner = require( 'GRAPHING_LINES/common/view/spinner/SlopeSpinner' );
  var SlopeUndefinedNode = require( 'GRAPHING_LINES/common/view/SlopeUndefinedNode' );
  var Spinner = require( 'GRAPHING_LINES/common/view/spinner/Spinner' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var UndefinedSlopeIndicator = require( 'GRAPHING_LINES/common/view/UndefinedSlopeIndicator' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {Property<Line>} interactiveLineProperty
   * @param {Property<Number>} riseRangeProperty
   * @param {Property<Number>} runRangeProperty
   * @param {Property<Number>} yInterceptRangeProperty
   * @param {*} options
   * @constructor
   */
  function SlopeInterceptEquationNode( interactiveLineProperty, riseRangeProperty, runRangeProperty, yInterceptRangeProperty, options ) {

    options = _.extend( {
      interactiveSlope: true,
      interactiveIntercept: true,
      interactiveFontSize: 28,
      staticFontSize: 28,
      staticColor: 'black'
    }, options );

    var interactiveFont = new PhetFont( { size: options.interactiveFontSize, weight: 'bold' } );
    var staticFont = new PhetFont( { size: options.staticFontSize } );

    var thisNode = this;
    EquationNode.call( this, options.staticFontSize );

    // internal properties that are connected to spinners
    var rise = new Property( interactiveLineProperty.get().rise );
    var run = new Property( interactiveLineProperty.get().run );
    var yIntercept = new Property( interactiveLineProperty.get().y1 );
    var fractionalIntercept = interactiveLineProperty.get().getYIntercept();
    var yInterceptNumerator = new Property( fractionalIntercept.numerator );
    var yInterceptDenominator = new Property( fractionalIntercept.denominator );

    // flag that allows us to update all controls atomically when the model changes
    var updatingControls = false;

    // Nodes that appear in all possible forms of the equation "y = mx + b"
    var yNode, equalsNode, slopeMinusSignNode, riseNode, runNode, xNode, operatorNode;
    var yInterceptNode; // used for interactive, integer y-intercept
    var yInterceptNumeratorNode, yInterceptDenominatorNode; // used for non-interactive, fractional y-intercept
    var yInterceptMinusSignNode; // for "y = -b" case
    var slopeFractionLineNode, yInterceptFractionLineNode;

    // Determine the max width of the rise and run spinners.
    var maxSlopeSpinnerWidth = thisNode.computeMaxSlopeSpinnerWidth( riseRangeProperty, runRangeProperty, interactiveFont, thisNode.DECIMAL_PLACES );

    // nodes: y = -(rise/run)x + -b
    yNode = new Text( GLStrings["symbol.y"], { font: staticFont, fill: options.staticColor } );
    equalsNode = new Text( "=", { font: staticFont, fill: options.staticColor } );
    slopeMinusSignNode = new MinusNode( thisNode.signLineSize, {fill: options.staticColor } );
    if ( options.interactiveSlope ) {
      riseNode = new SlopeSpinner( rise, run, riseRangeProperty, { font: interactiveFont } );
      runNode = new SlopeSpinner( run, rise, runRangeProperty, { font: interactiveFont } );
    }
    else {
      riseNode = new DynamicValueNode( rise, { font: staticFont, fill: options.staticColor, absoluteValue: true } );
      runNode = new DynamicValueNode( run, { font: staticFont, fill: options.staticColor, absoluteValue: true } );
    }
    slopeFractionLineNode = new Path( thisNode.createFractionLineShape( maxSlopeSpinnerWidth ), { fill: options.staticColor } );
    xNode = new Text( GLStrings["symbol.x"], { font: staticFont, fill: options.staticColor } );
    operatorNode = new Node(); // parent for + or - node
    yInterceptMinusSignNode = new MinusNode( thisNode.signLineSize, { fill: options.staticColor } );
    yInterceptNode = new Spinner( yIntercept, yInterceptRangeProperty, { color: GLColors.INTERCEPT, font: interactiveFont } );
    yInterceptNumeratorNode = new DynamicValueNode( yInterceptNumerator, { font: staticFont, fill: options.staticColor, absoluteValue: true } );
    yInterceptDenominatorNode = new DynamicValueNode( yInterceptDenominator, { font: staticFont, fill: options.staticColor, absoluteValue: true } );
    yInterceptFractionLineNode = new Path( thisNode.createFractionLineShape( maxSlopeSpinnerWidth ), { fill: options.staticColor } );

    //TODO can we update less? move this to prototype?
    /*
     * Updates the layout to match the desired form of the equation.
     * This is based on which parts of the equation are interactive, and what the
     * non-interactive parts of the equation should look like when written in simplified form.
     */
    var updateLayout = function( line, interactiveSlope, interactiveIntercept, staticFont, staticColor ) {

      // Start by removing all nodes, then we'll selectively add nodes based on the desired form of the equation.
      thisNode.removeAllChildren();
      operatorNode.removeAllChildren();
      if ( line.undefinedSlope() && !interactiveSlope && !interactiveIntercept ) {
        // slope is undefined and nothing is interactive
        thisNode.addChild( new SlopeUndefinedNode( line, { font: staticFont, fill: options.staticColor } ) );
        return;
      }

      // slope properties
      var slope = line.getSlope();
      var zeroSlope = ( slope == 0 );
      var unitySlope = ( Math.abs( slope ) == 1 );
      var integerSlope = Util.isInteger( slope );
      var positiveSlope = ( slope > 0 );
      var fractionalSlope = ( !zeroSlope && !unitySlope && !integerSlope );

      var lineWidth;

      // y =
      thisNode.addChild( yNode );
      thisNode.addChild( equalsNode );
      yNode.x = 0;
      yNode.y = 0;
      equalsNode.left = yNode.right + thisNode.relationalOperatorXSpacing;
      equalsNode.y = yNode.y;

      // Layout the "mx" part of the equation.
      if ( interactiveSlope ) {

        // slope is interactive, will be displayed as a fraction

        // (rise/run)x
        thisNode.addChild( riseNode );
        thisNode.addChild( slopeFractionLineNode );
        thisNode.addChild( runNode );
        thisNode.addChild( xNode );
        slopeFractionLineNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
        slopeFractionLineNode.centerY = equalsNode.centerY + thisNode.fractionLineYFudgeFactor;
        riseNode.centerX = slopeFractionLineNode.centerX;
        riseNode.bottom = slopeFractionLineNode.top - thisNode.spinnersYSpacing;
        runNode.centerX = slopeFractionLineNode.centerX;
        runNode.top = slopeFractionLineNode.bottom + thisNode.spinnersYSpacing;
        xNode.left = slopeFractionLineNode.right + thisNode.fractionalSlopeXSpacing;
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
          previousXOffset = thisNode.relationalOperatorXSpacing;
        }
        else {
          // -
          thisNode.addChild( slopeMinusSignNode );
          slopeMinusSignNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
          slopeMinusSignNode.centerY = equalsNode.centerY + thisNode.slopeSignYFudgeFactor + thisNode.slopeSignYOffset;
          previousNode = slopeMinusSignNode;
          previousXOffset = ( fractionalSlope ? thisNode.fractionSignXSpacing : thisNode.integerSignXSpacing );
        }

        if ( line.undefinedSlope() || fractionalSlope ) {
          // rise/run x
          thisNode.addChild( riseNode );
          thisNode.addChild( slopeFractionLineNode );
          thisNode.addChild( runNode );
          thisNode.addChild( xNode );
          // adjust fraction line width
          lineWidth = Math.max( riseNode.width, runNode.width );
          slopeFractionLineNode.shape = thisNode.createFractionLineShape( lineWidth );
          // layout
          slopeFractionLineNode.left = previousNode.right + previousXOffset;
          slopeFractionLineNode.centerY = equalsNode.centerY + thisNode.fractionLineYFudgeFactor;
          riseNode.centerX = slopeFractionLineNode.centerX;
          riseNode.bottom = slopeFractionLineNode.top - thisNode.ySpacing;
          runNode.centerX = slopeFractionLineNode.centerX;
          runNode.top = slopeFractionLineNode.bottom + thisNode.ySpacing;
          xNode.left = slopeFractionLineNode.right + thisNode.fractionalSlopeXSpacing;
          xNode.y = yNode.y;
        }
        else if ( zeroSlope ) {
          // no x term
        }
        else if ( unitySlope ) {
          // x
          thisNode.addChild( xNode );
          xNode.left = previousNode.right + previousXOffset;
          xNode.y = yNode.y;
        }
        else if ( integerSlope ) {
          // Nx
          thisNode.addChild( riseNode );
          thisNode.addChild( xNode );
          riseNode.left = previousNode.right + previousXOffset;
          riseNode.y = yNode.y;
          xNode.left = riseNode.right + thisNode.integerSlopeXSpacing;
          xNode.y = yNode.y;
        }
        else {
          throw new Error( "programming error, didn't handle some slope case" );
        }
      }

      // Layout the "+ b" part of the equation.
      if ( interactiveIntercept ) {
        // intercept is interactive and will be an integer
        if ( zeroSlope && !interactiveSlope ) {
          // y = b
          thisNode.addChild( yInterceptNode );
          yInterceptNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing,
            yInterceptNode.centerY = yNode.centerY;
        }
        else {
          // y = (rise/run)x + b
          thisNode.addChild( operatorNode );
          thisNode.addChild( yInterceptNode );
          operatorNode.addChild( new PlusNode( thisNode.operatorLineSize, { fill: options.staticColor } ) );
          operatorNode.left = xNode.right + thisNode.operatorXSpacing;
          operatorNode.centerY = equalsNode.centerY + thisNode.operatorYFudgeFactor;
          yInterceptNode.left = operatorNode.right + thisNode.operatorXSpacing;
          yInterceptNode.centerY = yNode.centerY;
        }
      }
      else {
        // intercept is not interactive and may be displayed as an integer or improper fraction

        // y-intercept properties
        var fractionalIntercept = line.getYIntercept();
        var zeroIntercept = ( fractionalIntercept.valueOf() === 0 );
        var integerIntercept = fractionalIntercept.isInteger();
        var positiveIntercept = ( fractionalIntercept.valueOf() > 0 );

        if ( zeroIntercept ) {
          if ( zeroSlope && !interactiveSlope ) {
            // y = 0
            thisNode.addChild( yInterceptNumeratorNode );
            yInterceptNumeratorNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
            yInterceptNumeratorNode.centerY = yNode.centerY;
          }
          else {
            // no intercept
          }
        }
        else if ( positiveIntercept && zeroSlope && !interactiveSlope ) {
          // y = b
          thisNode.addChild( yInterceptNumeratorNode );
          yInterceptNumeratorNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
          yInterceptNumeratorNode.centerY = yNode.centerY;
        }
        else if ( !positiveIntercept && zeroSlope && !interactiveSlope ) {
          // y = -b
          thisNode.addChild( yInterceptMinusSignNode );
          thisNode.addChild( yInterceptNumeratorNode );
          yInterceptMinusSignNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
          yInterceptMinusSignNode.centerY = equalsNode.centerY + thisNode.operatorYFudgeFactor;
          yInterceptNumeratorNode.left = yInterceptMinusSignNode.right + thisNode.integerSignXSpacing;
          yInterceptNumeratorNode.centerY = yNode.centerY;
        }
        else {
          // y = mx +/- b
          thisNode.addChild( operatorNode );
          operatorNode.addChild( positiveIntercept ? new PlusNode( thisNode.operatorLineSize, { fill: staticColor } ) : new MinusNode( thisNode.operatorLineSize, { fill: staticColor } ) );
          operatorNode.left = xNode.right + thisNode.operatorXSpacing;
          operatorNode.centerY = equalsNode.centerY + thisNode.operatorYFudgeFactor;

          if ( integerIntercept ) {
            // b is an integer
            thisNode.addChild( yInterceptNumeratorNode );
            yInterceptNumeratorNode.left = operatorNode.right + thisNode.operatorXSpacing;
            yInterceptNumeratorNode.centerY = yNode.centerY;
          }
          else {
            // b is an improper fraction
            thisNode.addChild( yInterceptNumeratorNode );
            thisNode.addChild( yInterceptFractionLineNode );
            thisNode.addChild( yInterceptDenominatorNode );
            // adjust fraction line width
            lineWidth = Math.max( yInterceptNumeratorNode.width, yInterceptDenominatorNode.width );
            yInterceptFractionLineNode.shape = thisNode.createFractionLineShape( lineWidth );
            // layout
            yInterceptFractionLineNode.left = operatorNode.right + thisNode.operatorXSpacing;
            yInterceptFractionLineNode.centerY = equalsNode.centerY + thisNode.fractionLineYFudgeFactor;
            yInterceptNumeratorNode.centerY = yInterceptFractionLineNode.centerY;
            yInterceptNumeratorNode.bottom = yInterceptFractionLineNode.top - thisNode.ySpacing;
            yInterceptDenominatorNode.centerX = yInterceptFractionLineNode.centerX;
            yInterceptDenominatorNode.top = yInterceptFractionLineNode.bottom + thisNode.ySpacing;
          }
        }
      }

      // Add the undefined-slope indicator after layout has been done, so that it covers the entire equation.
      if ( line.undefinedSlope() ) {
        var undefinedSlopeIndicator = new UndefinedSlopeIndicator( thisNode.width, thisNode.height );
        undefinedSlopeIndicator.centerX = thisNode.centerX;
        undefinedSlopeIndicator.centerY = slopeFractionLineNode.centerY - thisNode.undefinedSlopeYFudgeFactor;
        thisNode.addChild( undefinedSlopeIndicator );
      }
    };

    //***************************************************************

    // sync the model with the controls
    var lineUpdater = function() {
      if ( !updatingControls ) {
        if ( options.interactiveIntercept ) {
          interactiveLineProperty.set( Line.createSlopeIntercept( rise.get(), run.get(), yIntercept.get(), interactiveLineProperty.get().color ) );
        }
        else {
          var line = interactiveLineProperty.get();
          interactiveLineProperty.set( new Line( line.x1, line.y1, line.x1 + run.get(), line.y1 + rise.get(), interactiveLineProperty.get().color ) );
        }
      }
    };
    rise.link( lineUpdater.bind( thisNode ) );
    run.link( lineUpdater.bind( thisNode ) );
    yIntercept.link( lineUpdater.bind( thisNode ) );

    // sync the controls and layout with the model
    interactiveLineProperty.link( function( line ) {

      // If intercept is interactive, then (x1,y1) must be on a grid line on the y intercept.
      assert && assert( !options.interactiveIntercept || ( line.x1 === 0 && Util.isInteger( line.y1 ) ) );

      // Synchronize the controls atomically.
      updatingControls = true;
      {
        rise.set( options.interactiveSlope ? line.rise : line.getSimplifiedRise() );
        run.set( options.interactiveSlope ? line.run : line.getSimplifiedRun() );

        if ( options.interactiveIntercept ) {
          yIntercept.set( line.y1 );
        }
        else {
          var fractionalIntercept = interactiveLineProperty.get().getYIntercept();
          yInterceptNumerator.set( fractionalIntercept.numerator );
          yInterceptDenominator.set( fractionalIntercept.denominator );
        }
      }
      updatingControls = false;

      // Update the layout.
      updateLayout( line, options.interactiveSlope, options.interactiveIntercept, staticFont, options.staticColor );

      thisNode.mutate( options );
    } );
  }

  // Creates a node that displays the general form of this equation: y = mx + b
  SlopeInterceptEquationNode.createGeneralFormNode = function( options ) {
    options = _.extend( { font: new PhetFont( { size: 20, weight: 'bold' } )}, options );
    var html = StringUtils.format( "{0} = {1}{2} + {3}",
      GLStrings["symbol.y"], GLStrings["symbol.slope"], GLStrings["symbol.x"], GLStrings["symbol.intercept"] );
    return new HTMLText( html, { font: options.font } );

  };

  SlopeInterceptEquationNode.createStaticEquation = function( line, fontSize, color ) {
    return new SlopeInterceptEquationNode( new Property( line ),
      new Property( new Range( 0, 1 ) ),
      new Property( new Range( 0, 1 ) ),
      new Property( new Range( 0, 1 ) ), {
        interactiveSlope: false,
        interactiveIntercept: false,
        interactiveFontSize: fontSize,
        staticFontSize: fontSize,
        staticColor: color
      } );
  };

  return inherit( EquationNode, SlopeInterceptEquationNode );
} );