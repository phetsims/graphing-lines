// Copyright 2002-2014, University of Colorado Boulder

/**
 * Renderer for point-slope equations, with optional interactivity of point and slope.
 * General point-slope form is: (y - y1) = m(x - x1)
 * <p>
 * Point and/or slope may be interactive.
 * Pickers are used to increment/decrement parts of the equation that are specified as being interactive.
 * Non-interactive parts of the equation are expressed in a form that is typical of how the equation
 * would normally be written. For example, if the slope is -1, then only the sign is written, not "-1".
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
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var MinusNode = require( 'SCENERY_PHET/MinusNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var PlusNode = require( 'SCENERY_PHET/PlusNode' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range');
  var scenery = { Line: require( 'SCENERY/nodes/Line' ) }; // scenery.Line, workaround for name collision with graphing-lines.Line
  var SlopePicker = require( 'GRAPHING_LINES/common/view/picker/SlopePicker' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );
  var SlopeUndefinedNode = require( 'GRAPHING_LINES/common/view/SlopeUndefinedNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var UndefinedSlopeIndicator = require( 'GRAPHING_LINES/common/view/UndefinedSlopeIndicator' );
  var Util = require( 'DOT/Util' );

  // strings
  var symbolSlopeString = require( 'string!GRAPHING_LINES/symbol.slope' );
  var symbolXString = require( 'string!GRAPHING_LINES/symbol.x' );
  var symbolYString = require( 'string!GRAPHING_LINES/symbol.y' );

  /**
   * @param {Property<Line>} lineProperty
   * @param {Property<Number>} x1RangeProperty
   * @param {Property<Number>} y1RangeProperty
   * @param {Property<Number>} riseRangeProperty
   * @param {Property<Number>} runRangeProperty
   * @param {*} options
   * @constructor
   */
  function PointSlopeEquationNode( lineProperty, x1RangeProperty, y1RangeProperty, riseRangeProperty, runRangeProperty, options ) {

    options = _.extend( {
      interactivePoint: true,
      interactiveSlope: true,
      fontSize: GLConstants.INTERACTIVE_EQUATION_FONT_SIZE,
      staticColor: 'black'
    }, options );

    var thisNode = this;
    EquationNode.call( thisNode, options.fontSize );

    var interactiveFont = new GLFont( { size: options.fontSize, weight: 'bold' } );
    var staticFont = new GLFont( { size: options.fontSize, weight: 'bold' } );
    var staticOptions = { font: staticFont, fill: options.staticColor };
    var fractionLineOptions = { stroke: options.staticColor, lineWidth: thisNode.fractionLineThickness };

    // internal properties that are connected to pickers
    var x1Property = new Property( lineProperty.get().x1 );
    var y1Property = new Property( lineProperty.get().y1 );
    var riseProperty = new Property( lineProperty.get().rise );
    var runProperty = new Property( lineProperty.get().run );

    // flag that allows us to update all controls atomically when the model changes
    var updatingControls = false;

    // Determine the max width of the rise and run pickers.
    var maxSlopePickerWidth = thisNode.computeMaxSlopePickerWidth( riseRangeProperty, runRangeProperty, interactiveFont, thisNode.DECIMAL_PLACES );

    // Nodes that appear in all possible forms of the equation "(y - y1) = m(x - x1)"
    var yLeftParenNode, yNode, yOperatorNode, y1Node, yRightParenNode, equalsNode;
    var slopeMinusSignNode, riseNode, runNode, xLeftParenNode, xNode, xOperatorNode, x1Node, xRightParenNode;
    var y1MinusSignNode; // for "y = -y1" case
    var fractionLineNode;

    // nodes: (y-y1) = m(x-x1)
    yLeftParenNode = new Text( "(", staticOptions );
    yNode = new Text( symbolYString, staticOptions );
    yOperatorNode = new Node(); // parent for + or - node
    if ( options.interactivePoint ) {
      y1Node = new NumberPicker( y1Property, y1RangeProperty,
        { color: GLColors.POINT_X1_Y1, font: interactiveFont, touchAreaExpandX: 30 } );
    }
    else {
      y1Node = new DynamicValueNode( y1Property, _.extend( { absoluteValue: true }, staticOptions ) );
    }
    yRightParenNode = new Text( ")", staticOptions );
    y1MinusSignNode = new MinusNode( _.extend( { size: thisNode.signLineSize }, staticOptions ) ); // for y=-y1 case
    equalsNode = new Text( "=", staticOptions );
    slopeMinusSignNode = new MinusNode( _.extend( { size: thisNode.signLineSize }, staticOptions ) );
    if ( options.interactiveSlope ) {
      riseNode = new SlopePicker( riseProperty, runProperty, riseRangeProperty, { font: interactiveFont } );
      runNode = new SlopePicker( runProperty, riseProperty, runRangeProperty, { font: interactiveFont } );
    }
    else {
      riseNode = new DynamicValueNode( riseProperty, _.extend( { absoluteValue: true }, staticOptions ) );
      runNode = new DynamicValueNode( runProperty, _.extend( { absoluteValue: true }, staticOptions ) );
    }
    fractionLineNode = new scenery.Line( 0, 0, maxSlopePickerWidth, 0, fractionLineOptions );
    xLeftParenNode = new Text( "(", staticOptions );
    xNode = new Text( symbolXString, staticOptions );
    xOperatorNode = new Node(); // parent for + or - node
    if ( options.interactivePoint ) {
      x1Node = new NumberPicker( x1Property, x1RangeProperty,
        { color: GLColors.POINT_X1_Y1, font: interactiveFont, touchAreaExpandX: GLConstants.PICKER_TOUCH_AREA_EXPAND_X } );
    }
    else {
      x1Node = new DynamicValueNode( x1Property, _.extend( { absoluteValue: true }, staticOptions ) );
    }
    xRightParenNode = new Text( ")", staticOptions );

    //TODO can we make fewer scenegraph changes here?
    /*
     * Updates the layout to match the desired form of the equation.
     * This is based on which parts of the equation are interactive, and what the
     * non-interactive parts of the equation should look like when written in simplified form.
     */
    var updateLayout = function( line ) {

      var interactive = options.interactivePoint || options.interactiveSlope;

      // Start by removing all nodes, then we'll selectively add nodes based on the desired form of the equation.
      thisNode.removeAllChildren();
      xOperatorNode.removeAllChildren();
      yOperatorNode.removeAllChildren();

      if ( line.undefinedSlope() && !interactive ) {
        // slope is undefined and nothing is interactive
        thisNode.addChild( new SlopeUndefinedNode( line, staticOptions ) );
        return;
      }
      else if ( ( line.same( Line.Y_EQUALS_X_LINE ) || line.same( Line.Y_EQUALS_NEGATIVE_X_LINE ) ) && !interactive ) {
        // use slope-intercept form for y=x and y=-x, using a line with the proper slope and (x1,y1)=(0,0)
        thisNode.addChild( SlopeInterceptEquationNode.createLabel(
          Line.createSlopeIntercept( line.rise, line.run, 0, line.color ), options.fontSize, options.staticColor ) );
        return;
      }

      // Change the x operator to account for the signs of x1.
      if ( options.interactivePoint || line.x1 >= 0 ) {
        xOperatorNode.addChild( new MinusNode( _.extend( { size: thisNode.operatorLineSize }, staticOptions ) ) );
      }
      else {
        xOperatorNode.addChild( new PlusNode( _.extend( { size: thisNode.operatorLineSize }, staticOptions ) ) );
      }

      // Change the y operator to account for the signs of y1.
      if ( options.interactivePoint || line.y1 >= 0 ) {
        yOperatorNode.addChild( new MinusNode( _.extend( { size: thisNode.operatorLineSize }, staticOptions ) ) );
      }
      else {
        yOperatorNode.addChild( new PlusNode( _.extend( { size: thisNode.operatorLineSize }, staticOptions ) ) );
      }

      if ( line.rise === 0 && !options.interactiveSlope && !options.interactivePoint ) {
        // y1 is on the right side of the equation
        thisNode.addChild( yNode );
        thisNode.addChild( equalsNode );
        thisNode.addChild( y1Node );
        yNode.x = 0;
        yNode.y = 0;
        equalsNode.left = yNode.right + thisNode.relationalOperatorXSpacing;
        if ( options.interactivePoint || line.y1 >= 0 ) {
          // y = y1
          y1Node.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
          y1Node.y = yNode.y;
        }
        else {
          // y = -y1
          thisNode.addChild( y1MinusSignNode );
          y1MinusSignNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
          y1MinusSignNode.centerY = equalsNode.centerY + thisNode.operatorYFudgeFactor;
          y1Node.left = y1MinusSignNode.right + thisNode.integerSignXSpacing;
          y1Node.y = yNode.y;
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
        if ( options.interactiveSlope ) {
          // (rise/run), where rise and run are pickers, and the sign is integrated into the pickers
          thisNode.addChild( riseNode );
          thisNode.addChild( fractionLineNode );
          thisNode.addChild( runNode );
          fractionLineNode.left = equalsNode.right + thisNode.relationalOperatorXSpacing;
          fractionLineNode.centerY = equalsNode.centerY;
          riseNode.centerX = fractionLineNode.centerX;
          riseNode.bottom = fractionLineNode.top - thisNode.pickersYSpacing;
          runNode.centerX = fractionLineNode.centerX;
          runNode.top = fractionLineNode.bottom + thisNode.pickersYSpacing;
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
          fractionLineNode.setLine( 0, 0, lineWidth, 0 );

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
        if ( options.interactivePoint || options.interactiveSlope || line.rise !== 0 ) {
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
    var updateLine = function() {
      if ( !updatingControls ) {
        lineProperty.set( Line.createPointSlope( x1Property.get(), y1Property.get(), riseProperty.get(), runProperty.get(), lineProperty.get().color ) );
      }
    };
    //TODO updateLine will fire 4 times on startup
    x1Property.link( updateLine.bind( thisNode ) );
    y1Property.link( updateLine.bind( thisNode ) );
    riseProperty.link( updateLine.bind( thisNode ) );
    runProperty.link( updateLine.bind( thisNode ) );

    // sync the controls and layout with the model
    lineProperty.link( function( line ) {

      // Synchronize the controls atomically.
      updatingControls = true;
      {
        x1Property.set( line.x1 );
        y1Property.set( line.y1 );
        riseProperty.set( options.interactiveSlope ? line.rise : line.getSimplifiedRise() );
        runProperty.set( options.interactiveSlope ? line.run : line.getSimplifiedRun() );
      }
      updatingControls = false;

      // Update the layout
      updateLayout( line );
    } );

    thisNode.mutate( options );
  }

  // Creates a node that displays the general form of this equation: (y - y1) = m(x - x1)
  PointSlopeEquationNode.createGeneralFormNode = function( options ) {
    options = _.extend( { font: new GLFont( { size: 20, weight: 'bold' } )}, options );
    var pattern = '({0} - {1}<sub>1</sub>) = {2}({3} - {4}<sub>1</sub>)';
    var html = StringUtils.format( pattern, symbolYString, symbolYString, symbolSlopeString, symbolXString, symbolXString );
    return new SubSupText( html, { font: options.font } );
  };

  /**
   * Creates a non-interactive equation, used to label the specified line.
   * @param {Line} line
   * @param {Number} fontSize
   * @param {Color|String} color
   */
  PointSlopeEquationNode.createLabel = function( line, fontSize, color ) {
    return new PointSlopeEquationNode( new Property( line ),
      new Property( new Range( 0, 1 ) ),
      new Property( new Range( 0, 1 ) ),
      new Property( new Range( 0, 1 ) ),
      new Property( new Range( 0, 1 ) ), {
        interactivePoint: false,
        interactiveSlope: false,
        fontSize: fontSize,
        staticColor: color
      } );
  };

  return inherit( EquationNode, PointSlopeEquationNode );
} );