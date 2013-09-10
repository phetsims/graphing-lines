// Copyright 2002-2013, University of Colorado

/**
 * Renderer for point-slope equations, with optional interactivity of point and slope.
 * General point-slope form is: (y - y1) = m(x - x1)
 * <p>
 * Point and/or slope may be interactive.
 * Spinners are used to increment/decrement parts of the equation that are specified as being interactive.
 * Non-interactive parts of the equation are expressed in a form that is typical of how the equation
 * would normally be written. For example, if the slope is -1, then only the sign is written, not "-1".
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var DynamicValueNode = require( 'GRAPHING_LINES/common/view/DynamicValueNode' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLStrings = require( 'GRAPHING_LINES/common/GLStrings' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var MinusNode = require( 'GRAPHING_LINES/common/view/MinusNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PlusNode = require( 'GRAPHING_LINES/common/view/PlusNode' );
  var Property = require( 'AXON/Property' );
  var SlopeSpinner = require( 'GRAPHING_LINES/common/view/spinner/SlopeSpinner' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );
  var SlopeUndefinedNode = require( 'GRAPHING_LINES/common/view/SlopeUndefinedNode' );
  var Spinner = require( 'GRAPHING_LINES/common/view/spinner/Spinner' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var UndefinedSlopeIndicator = require( 'GRAPHING_LINES/common/view/UndefinedSlopeIndicator' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {Property<Line>} interactiveLine
   * @param {Property<Number>} x1Range
   * @param {Property<Number>} y1Range
   * @param {Property<Number>} riseRange
   * @param {Property<Number>} runRange
   * @param {*} options
   * @constructor
   */
  function PointSlopeEquationNode( interactiveLine, x1Range, y1Range, riseRange, runRange, options ) {

    options = _.extend( {
      interactiveX1: true,
      interactiveY1: true,
      interactiveSlope: true,
      interactiveFontSize: 28,
      staticFontSize: 28,
      staticColor: 'black'
    }, options );

    var interactiveFont = new PhetFont( { size: options.interactiveFontSize, weight: 'bold' } );
    var staticFont = new PhetFont( { size: options.staticFontSize } );

    var thisNode = this;
    EquationNode.call( thisNode, options.staticFontSize );

    // internal properties that are connected to spinners
    var x1 = new Property( interactiveLine.get().x1 );
    var y1 = new Property( interactiveLine.get().y1 );
    var rise = new Property( interactiveLine.get().rise );
    var run = new Property( interactiveLine.get().run );

    // flag that allows us to update all controls atomically when the model changes
    var updatingControls = false;

    // Determine the max width of the rise and run spinners.
    var maxSlopeSpinnerWidth = thisNode.computeMaxSlopeSpinnerWidth( riseRange, runRange, interactiveFont, thisNode.DECIMAL_PLACES );

    // Nodes that appear in all possible forms of the equation "(y - y1) = m(x - x1)"
    var yLeftParenNode, yNode, yOperatorNode, y1Node, yRightParenNode, equalsNode;
    var slopeMinusSignNode, riseNode, runNode, xLeftParenNode, xNode, xOperatorNode, x1Node, xRightParenNode;
    var y1MinusSignNode; // for "y = -y1" case
    var fractionLineNode;

    // nodes: (y-y1) = m(x-x1)
    yLeftParenNode = new Text( "(", staticFont, options.staticColor );
    yNode = new Text( GLStrings["symbol.y"], staticFont, options.staticColor );
    yOperatorNode = new Node(); // parent for + or - node
    if ( options.interactiveY1 ) {
      y1Node = new Spinner( y1, y1Range, { color: GLColors.POINT_X1_Y1, font: interactiveFont } );
    }
    else {
      y1Node = new DynamicValueNode( y1, { font: staticFont, fill: options.staticColor, absoluteValue: true } );
    }
    yRightParenNode = new Text( ")", { font: staticFont, stroke: options.staticColor } );
    y1MinusSignNode = new MinusNode( thisNode.signLineSize, { fill: options.staticColor } ); // for y=-y1 case
    equalsNode = new Text( "=", { font: staticFont, stroke: options.staticColor } );
    slopeMinusSignNode = new MinusNode( thisNode.signLineSize, { fill: options.staticColor } );
    if ( options.interactiveSlope ) {
      riseNode = new SlopeSpinner( rise, run, riseRange, { font: interactiveFont } );
      runNode = new SlopeSpinner( run, rise, runRange, { font: interactiveFont } );
    }
    else {
      riseNode = new DynamicValueNode( rise, { font: staticFont, fill: options.staticColor, absoluteValue: true } );
      runNode = new DynamicValueNode( run, { font: staticFont, fill: options.staticColor, absoluteValue: true } );
    }
    fractionLineNode = new Path( thisNode.createFractionLineShape( maxSlopeSpinnerWidth ), { fill: options.staticColor } );
    xLeftParenNode = new Text( "(", { font: staticFont, fill: options.staticColor } );
    xNode = new Text( GLStrings["symbol.x"], { font: staticFont, fill: options.staticColor } );
    xOperatorNode = new Node(); // parent for + or - node
    if ( options.interactiveX1 ) {
      x1Node = new Spinner( x1, x1Range, { color: GLColors.POINT_X1_Y1, font: interactiveFont } );
    }
    else {
      x1Node = new DynamicValueNode( x1, { font: staticFont, fill: options.staticColor, absoluteValue: true } );
    }
    xRightParenNode = new Text( ")", { font: staticFont, fill: options.staticColor } );

    //TODO can we update less? move this to prototype?
    /*
     * Updates the layout to match the desired form of the equation.
     * This is based on which parts of the equation are interactive, and what the
     * non-interactive parts of the equation should look like when written in simplified form.
     */
    var updateLayout = function( line, interactiveX1, interactiveY1, interactiveSlope, staticFont, staticColor ) {

      var interactive = interactiveX1 || interactiveY1 || interactiveSlope;

      // Start by removing all nodes, then we'll selectively add nodes based on the desired form of the equation.
      thisNode.removeAllChildren();
      xOperatorNode.removeAllChildren();
      yOperatorNode.removeAllChildren();

      if ( line.undefinedSlope() && !interactive ) {
        // slope is undefined and nothing is interactive
        thisNode.addChild( new SlopeUndefinedNode( line, staticFont, staticColor ) );
        return;
      }
      else if ( ( line.same( Line.Y_EQUALS_X_LINE ) || line.same( Line.Y_EQUALS_NEGATIVE_X_LINE ) ) && !interactive ) {
        // use slope-intercept form for y=x and y=-x, using a line with the proper slope and (x1,y1)=(0,0)
        thisNode.addChild( new SlopeInterceptEquationNode( Line.createSlopeIntercept( line.rise, line.run, 0, line.color ), staticFont, staticColor ) );
        return;
      }

      // Change the x operator to account for the signs of x1.
      if ( interactiveX1 || line.x1 >= 0 ) {
        xOperatorNode.addChild( new MinusNode( thisNode.operatorLineSize, staticColor ) );
      }
      else {
        xOperatorNode.addChild( new PlusNode( thisNode.operatorLineSize, staticColor ) );
      }

      // Change the y operator to account for the signs of y1.
      if ( interactiveY1 || line.y1 >= 0 ) {
        yOperatorNode.addChild( new MinusNode( thisNode.operatorLineSize, staticColor ) );
      }
      else {
        yOperatorNode.addChild( new PlusNode( thisNode.operatorLineSize, staticColor ) );
      }

      if ( line.rise === 0 && !interactiveSlope && !interactiveX1 ) {
        // y1 is on the right side of the equation
        thisNode.addChild( yNode );
        thisNode.addChild( equalsNode );
        thisNode.addChild( y1Node );
        yNode.x = 0;
        yNode.y = 0;
        equalsNode.left = yNode.right + thisNode.relationalOperatorXSpacing;
        if ( interactiveY1 || line.y1 >= 0 ) {
          // y = y1
          y1Node.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
          yNode.y = yNode.centerY - ( y1Node.height / 2 ); //TODO ??
        }
        else {
          // y = -y1
          thisNode.addChild( y1MinusSignNode );
          y1MinusSignNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
          y1MinusSignNode.centerY = equalsNode.centerY + thisNode.operatorYFudgeFactor;
          y1Node.left = y1MinusSignNode.right + thisNode.integerSignXSpacing;
          y1Node.y = yNode.centerY - ( y1Node.height / 2 );  //TODO ??
        }
      }
      else {  // y1 is on the left side of the equation

        var previousNode;

        // (y - y1)
        thisNode.addChild( yLeftParenNode );
        thisNode.addChild( yNode );
        thisNode.addChild( yOperatorNode );
        thisNode.addChild( y1Node );
        thisNode.addChild( yRightParenNode );
        yLeftParenNode.x = 0;
        yLeftParenNode.y = 0;
        yNode.left = yLeftParenNode.right + thisNode.parenXSpacing;
        yNode.y = yLeftParenNode.y;
        yOperatorNode.left = yNode.right + thisNode.operatorXSpacing;
        yOperatorNode.centerY = yNode.centerY + thisNode.operatorYFudgeFactor;
        y1Node.left = yOperatorNode.right + thisNode.operatorXSpacing;
        y1Node.centerY = yNode.centerY;
        yRightParenNode.left = y1Node.right + thisNode.parenXSpacing;
        yRightParenNode.y = yNode.y;

        // =
        thisNode.addChild( equalsNode );
        equalsNode.left = yRightParenNode.right + thisNode.relationalOperatorXSpacing;
        equalsNode.y = yNode.y + thisNode.equalsSignFudgeFactor;

        // slope
        var previousXOffset;
        if ( interactiveSlope ) {
          // (rise/run), where rise and run are spinners, and the sign is integrated into the spinners
          thisNode.addChild( riseNode );
          thisNode.addChild( fractionLineNode );
          thisNode.addChild( runNode );
          fractionLineNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
          fractionLineNode.centerY = equalsNode.centerY;
          riseNode.centerX = fractionLineNode.centerX;
          riseNode.bottom = fractionLineNode.top - thisNode.spinnersYSpacing;
          runNode.centerX = fractionLineNode.centerX;
          runNode.top = fractionLineNode.bottom + thisNode.spinnersYSpacing;
          previousNode = fractionLineNode;
          previousXOffset = thisNode.fractionalSlopeXSpacing;
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
          fractionLineNode.shape = thisNode.createFractionLineShape( lineWidth );

          // decide whether to include the slope minus sign
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
            // rise/run
            thisNode.addChild( riseNode );
            thisNode.addChild( fractionLineNode );
            thisNode.addChild( runNode );
            fractionLineNode.left = previousNode.right + previousXOffset;
            fractionLineNode.centerY = equalsNode.centerY;
            riseNode.centerX = fractionLineNode.centerX;
            riseNode.bottom = fractionLineNode.top - thisNode.ySpacing;
            runNode.centerX = fractionLineNode.centerX;
            runNode.top = fractionLineNode.bottom + thisNode.ySpacing;
            previousNode = fractionLineNode;
            previousXOffset = thisNode.fractionalSlopeXSpacing;
          }
          else if ( zeroSlope ) {
            // 0
            thisNode.addChild( riseNode );
            riseNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
            riseNode.y = yNode.y;
            previousNode = riseNode;
            previousXOffset = thisNode.integerSlopeXSpacing;
          }
          else if ( unitySlope ) {
            // no slope term
            previousXOffset = thisNode.relationalOperatorXSpacing;
          }
          else if ( integerSlope ) {
            // N
            thisNode.addChild( riseNode );
            riseNode.left = previousNode.right + previousXOffset;
            riseNode.y = yNode.y;
            previousNode = riseNode;
            previousXOffset = thisNode.integerSlopeXSpacing;
          }
          else {
            throw new Error( "programming error, didn't handle some slope case" );
          }
        }

        // x term
        if ( interactiveX1 || interactiveSlope || line.rise !== 0 ) {
          // (x - x1)
          thisNode.addChild( xLeftParenNode );
          thisNode.addChild( xNode );
          thisNode.addChild( xOperatorNode );
          thisNode.addChild( x1Node );
          thisNode.addChild( xRightParenNode );
          xLeftParenNode.left = previousNode.right + previousXOffset;
          xLeftParenNode.y = yNode.y;
          xNode.left = xLeftParenNode.right + thisNode.parenXSpacing;
          xNode.y = yNode.y;
          xOperatorNode.left = xNode.right + thisNode.operatorXSpacing;
          xOperatorNode.centerY = xNode.centerY + thisNode.operatorYFudgeFactor;
          x1Node.left = xOperatorNode.right + thisNode.operatorXSpacing;
          x1Node.centerY = yNode.centerY;
          xRightParenNode.left = x1Node.right + thisNode.parenXSpacing;
          xRightParenNode.y = yNode.y;
        }
        else if ( line.rise === 0 ) {
          // no x term
        }
        else {
          throw new Error( "programming error, didn't handle some x-term case" );
        }
      }

      // undefined-slope indicator, added after layout has been done
      if ( line.undefinedSlope() ) {
        var undefinedSlopeIndicator = new UndefinedSlopeIndicator( thisNode.width, thisNode.height );
        undefinedSlopeIndicator.x = 0;
        undefinedSlopeIndicator.centerY = fractionLineNode.centerY + thisNode.undefinedSlopeYFudgeFactor;
        thisNode.addChild( undefinedSlopeIndicator );
      }
    };

    // sync the model with the controls
    var lineUpdater = function() {
      if ( !updatingControls ) {
        interactiveLine.set( Line.createPointSlope( x1.get(), y1.get(), rise.get(), run.get(), interactiveLine.get().color ) );
      }
    };
    x1.link( lineUpdater );
    y1.link( lineUpdater );
    rise.link( lineUpdater );
    run.link( lineUpdater );

    // sync the controls and layout with the model
    interactiveLine.link( function( line ) {

      // Synchronize the controls atomically.
      updatingControls = true;
      {
        x1.set( line.x1 );
        y1.set( line.y1 );
        rise.set( options.interactiveSlope ? line.rise : line.getSimplifiedRise() );
        run.set( options.interactiveSlope ? line.run : line.getSimplifiedRun() );
      }
      updatingControls = false;

      // Update the layout
      updateLayout( line, options.interactiveX1, options.interactiveY1, options.interactiveSlope, staticFont, options.staticColor );
    } );

    thisNode.mutate( options );
  }

  // Creates a node that displays the general form of this equation: (y - y1) = m(x - x1)
  PointSlopeEquationNode.createGeneralFormNode = function( options ) {
    options = _.extend( { font: new PhetFont( { size: 20, weight: 'bold' } )}, options );
    //TODO Is this OK? <font> tag is deprecated in HTML4 and unsupported in HTML5.
    var html = StringUtils.format( "<html>({0} - {1}<font size='-1'><sub>1</sub></font>) = {2}({3} - {4}<font size='-1'><sub>1</sub></font>)</html>",
      GLStrings["symbol.y"], GLStrings["symbol.y"], GLStrings["symbol.slope"], GLStrings["symbol.x"], GLStrings["symbol.x"] );
    return new HTMLText( html, { font: options.font } );
  };

  return inherit( EquationNode, PointSlopeEquationNode );
} );