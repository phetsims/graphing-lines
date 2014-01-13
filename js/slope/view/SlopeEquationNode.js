// Copyright 2002-2013, University of Colorado Boulder

/**
 * Renderer for slope equations.
 * General form is m = (y2 - y1) / (x2 - x1) = rise/run
 * <p>
 * x1, y1, x2, and y2 are all interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var CoordinatePicker = require( 'GRAPHING_LINES/common/view/picker/CoordinatePicker' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var LineNode = require( 'SCENERY/nodes/Line' ); //NOTE: name collision!
  var MinusNode = require( 'GRAPHING_LINES/common/view/MinusNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberBackgroundNode = require( 'GRAPHING_LINES/common/view/NumberBackgroundNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var UndefinedSlopeIndicator = require( 'GRAPHING_LINES/common/view/UndefinedSlopeIndicator' );
  var Util = require( 'DOT/Util' );

  // strings
  var slopeString = require( 'string!GRAPHING_LINES/slope' );
  var slopeIsString = require( 'string!GRAPHING_LINES/slopeIs' );
  var symbolSlopeString = require( 'string!GRAPHING_LINES/symbol.slope' );
  var symbolXString = require( 'string!GRAPHING_LINES/symbol.x' );
  var symbolYString = require( 'string!GRAPHING_LINES/symbol.y' );
  var undefinedString = require( 'string!GRAPHING_LINES/undefined' );

  /**
   * @param {Property<Line>} interactiveLineProperty
   * @param {Property<Number>} xRangeProperty
   * @param {Property<Number>} yRangeProperty
   * @param {*} options
   * @constructor
   */
  function SlopeEquationNode( interactiveLineProperty, xRangeProperty, yRangeProperty, options ) {

    options = _.extend( {
      interactiveFontSize: 28,
      staticFontSize: 28,
      staticColor: 'black'
    }, options );

    var thisNode = this;
    EquationNode.call( this, options.staticFontSize );

    var interactiveFont = new PhetFont( { size: options.interactiveFontSize, weight: 'bold' } );
    var staticFont = new PhetFont( { size: options.staticFontSize, weight: 'bold' } );
    var staticOptions = { font: staticFont, fill: options.staticColor, pickable: false };
    var fractionLineOptions = { stroke: options.staticColor, lineWidth: thisNode.fractionLineThickness, pickable: false };

    // internal properties that are connected to pickers
    var x1Property = new Property( interactiveLineProperty.get().x1 );
    var y1Property = new Property( interactiveLineProperty.get().y1 );
    var x2Property = new Property( interactiveLineProperty.get().x2 );
    var y2Property = new Property( interactiveLineProperty.get().y2 );

    // flag that allows us to update all controls atomically when the model changes
    var updatingControls = false;

    // Nodes that could appear is all possible ways to write the equation
    // m =
    var mNode = new Text( symbolSlopeString, staticOptions );
    var interactiveEqualsNode = new Text( "=", staticOptions );
    // y2 - y2
    var y2Node = new CoordinatePicker( y2Property, x2Property, y1Property, x1Property, yRangeProperty, { font: interactiveFont, color: GLColors.POINT_X2_Y2 } );
    var numeratorOperatorNode = new MinusNode( thisNode.operatorLineSize, staticOptions );
    var y1Node = new CoordinatePicker( y1Property, x1Property, y2Property, x2Property, yRangeProperty, { font: interactiveFont, color: GLColors.POINT_X1_Y1 } );
    // fraction line, correct length will be set later
    var interactiveFractionLineNode = new LineNode( 0, 0, 1, 0, fractionLineOptions  );
    // x2 - x1
    var x2Node = new CoordinatePicker( x2Property, y2Property, x1Property, y1Property, xRangeProperty, { font: interactiveFont, color: GLColors.POINT_X2_Y2 } );
    var denominatorOperatorNode = new MinusNode( thisNode.operatorLineSize, staticOptions );
    var x1Node = new CoordinatePicker( x1Property, y1Property, x2Property, y2Property, xRangeProperty, { font: interactiveFont, color: GLColors.POINT_X1_Y1 } );
    // = unsimplified value
    var unsimplifiedEqualsNode = new Text( "=", staticOptions );
    var unsimplifiedRiseNode = new Node( staticOptions ); // non-null for now, proper node created later
    var unsimplifiedRunNode = new Node( staticOptions );  // non-null for now, proper node created later
    var unsimplifiedFractionLineNode = new LineNode( 0, 0, 1, 0, fractionLineOptions ); // correct length will be set later

    // Compute the size needed to display the unsimplified rise and run values.
    var maxUnsimplifiedWidth = y2Node.width;
    var maxUnsimplifiedHeight = y2Node.height - 20;

    // rendering order
    var parentNode = new Node();
    thisNode.addChild( parentNode );
    {
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
    }

    // static layout
    {
      // m =
      mNode.x = 0;
      mNode.y = 0;
      interactiveEqualsNode.left = mNode.right + thisNode.relationalOperatorXSpacing;
      interactiveEqualsNode.y = mNode.y;
      // fraction line
      interactiveFractionLineNode.left = interactiveEqualsNode.right + thisNode.relationalOperatorXSpacing;
      interactiveFractionLineNode.centerY = interactiveEqualsNode.centerY + thisNode.fractionLineYFudgeFactor;
      // y2 - y1
      y2Node.left = interactiveFractionLineNode.left;
      y2Node.bottom = interactiveFractionLineNode.top - thisNode.pickersYSpacing;
      numeratorOperatorNode.left = y2Node.right + thisNode.operatorXSpacing;
      numeratorOperatorNode.centerY = y2Node.centerY;
      y1Node.left = numeratorOperatorNode.right + thisNode.operatorXSpacing;
      y1Node.y = y2Node.y;
      // fix fraction line length
      var fractionLineLength = y1Node.right - y2Node.left;
      interactiveFractionLineNode.setLine( 0, 0, fractionLineLength, 1 );
      // x2 - x1
      x2Node.left = y2Node.left;
      x2Node.top = interactiveFractionLineNode.bottom + thisNode.pickersYSpacing;
      denominatorOperatorNode.left = x2Node.right + thisNode.operatorXSpacing;
      denominatorOperatorNode.centerY = x2Node.centerY;
      x1Node.left = denominatorOperatorNode.right + thisNode.operatorXSpacing;
      x1Node.y = x2Node.y;
      // = rise/run
      unsimplifiedEqualsNode.left = interactiveFractionLineNode.right + thisNode.relationalOperatorXSpacing;
      unsimplifiedEqualsNode.y = interactiveEqualsNode.y;
      unsimplifiedFractionLineNode.left = unsimplifiedEqualsNode.right + thisNode.relationalOperatorXSpacing;
      unsimplifiedFractionLineNode.y = interactiveFractionLineNode.y;
      // all other layout is done dynamically, in updateLayout
    }

    // dynamic layout
    var updateLayout = function( line ) {
      // horizontally center rise and run above fraction line
      unsimplifiedRiseNode.centerX = unsimplifiedFractionLineNode.centerX;
      unsimplifiedRiseNode.bottom = unsimplifiedFractionLineNode.top - thisNode.slopeYSpacing;
      unsimplifiedRunNode.centerX = unsimplifiedFractionLineNode.centerX;
      unsimplifiedRunNode.top = unsimplifiedFractionLineNode.bottom + thisNode.slopeYSpacing;
    };

    // sync the model with the controls
    var updateLine = function() {
      if ( !updatingControls ) {
        interactiveLineProperty.set( new Line( x1Property.get(), y1Property.get(), x2Property.get(), y2Property.get(), interactiveLineProperty.get().color ) );
      }
    };
    x1Property.link( updateLine.bind( thisNode ) );
    y1Property.link( updateLine.bind( thisNode ) );
    x2Property.link( updateLine.bind( thisNode ) );
    y2Property.link( updateLine.bind( thisNode ) );

    // sync the controls and layout with the model
    var undefinedSlopeIndicator = null;
    interactiveLineProperty.link( function( line ) {

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
      {
        var unsimplifiedSlopeOptions = {
          font: staticFont,
          decimalPlaces: 0,
          backgroundFill: GLColors.SLOPE,
          minWidth: maxUnsimplifiedWidth, minHeight: maxUnsimplifiedHeight
        };

        // rise
        parentNode.removeChild( unsimplifiedRiseNode );
        unsimplifiedRiseNode = new NumberBackgroundNode( line.rise, unsimplifiedSlopeOptions );
        parentNode.addChild( unsimplifiedRiseNode );

        // run
        parentNode.removeChild( unsimplifiedRunNode );
        unsimplifiedRunNode = new NumberBackgroundNode( line.run, unsimplifiedSlopeOptions );
        parentNode.addChild( unsimplifiedRunNode );

        // fraction line length
        var unsimplifiedFractionLineLength = Math.max( unsimplifiedRiseNode.width, unsimplifiedRunNode.width );
        unsimplifiedFractionLineNode.setLine( 0, 0, unsimplifiedFractionLineLength, 1  );
      }

      // do layout before adding undefined-slope indicator
      updateLayout( line );

      // undefined-slope indicator
      if ( undefinedSlopeIndicator !== null ) {
        thisNode.removeChild( undefinedSlopeIndicator );
        undefinedSlopeIndicator = null;
      }
      if ( line.undefinedSlope() ) {
        undefinedSlopeIndicator = new UndefinedSlopeIndicator( thisNode.getWidth(), thisNode.getHeight() );
        undefinedSlopeIndicator.centerX = parentNode.centerX;
        undefinedSlopeIndicator.centerY = parentNode.centerY + thisNode.undefinedSlopeYFudgeFactor;
        thisNode.addChild( undefinedSlopeIndicator );
      }
    } );
  }

  // Creates a node that displays the general form of this equation: m = (y2-y1)/(x2-x1)
  SlopeEquationNode.createGeneralFormNode = function( options ) {

    options = _.extend( {
      fontSize: 20,
      fontWeight: 'bold',
      fill: 'black'
    }, options );

    var equationNode = new EquationNode( options.fontSize, { pickable: false } );

    var font = new PhetFont( { size: options.fontSize, weight: options.fontWeight } );

    // m =
    var htmlLeftSide = StringUtils.format( "{0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{1} =", slopeString, symbolSlopeString );
    var leftSideNode = new HTMLText( htmlLeftSide, { font: font, fill: options.fill } );

    // pattern for numerator and denominator, with smaller subscripts
    var pattern = '<html>{0}<span style="font-size:70%"><sub>2</sub></span> - {1}<span style="font-size:70%"><sub>1</sub></span></html>';

    // y2 - y1
    var htmlNumerator = StringUtils.format( pattern, symbolYString, symbolYString );
    var numeratorNode = new HTMLText( htmlNumerator, { font: font, fill: options.fill } );

    // x2 - x1
    var htmlDenominator = StringUtils.format( pattern, symbolXString, symbolXString );
    var denominatorNode = new HTMLText( htmlDenominator, { font: font, fill: options.fill } );

    // fraction line
    var length = Math.max( numeratorNode.width, denominatorNode.width );
    var fractionLineNode = new LineNode( 0, 0, length, equationNode.fractionLineThickness, { stroke: options.fill } );

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
  };

  /**
   * @param {Line} line
   * @param {Number} fontSize
   * @param {Color} color
   */
  SlopeEquationNode.createStaticEquation = function( line, fontSize, color ) {

    var equationNode = new EquationNode( fontSize, { pickable: false } );

    var font = new PhetFont( { size: fontSize, weight: 'bold' } );

    // m is
    var slopeIsNode = new Text( slopeIsString, { font: font, fill: color } );
    equationNode.addChild( slopeIsNode );
    slopeIsNode.x = 0;
    slopeIsNode.y = 0;

    if ( line.undefinedSlope() ) {
      // "undefined slope"
      var undefinedSlope = new Text( undefinedString, { font: font, fill: color } );
      equationNode.addChild( undefinedSlope );
      undefinedSlope.left = slopeIsNode.right + equationNode.relationalOperatorXSpacing;
      undefinedSlope.y = slopeIsNode.y;
    }
    else if ( line.getSlope() === 0 ) {
      // 0
      var zeroNode = new Text( "0", { font: font, fill: color } );
      equationNode.addChild( zeroNode );
      zeroNode.left = slopeIsNode.right + equationNode.relationalOperatorXSpacing;
      zeroNode.y = slopeIsNode.y;
    }
    else {
      var nextXOffset;
      if ( line.getSlope() < 0 ) {
        // minus sign
        var minusSignNode = new MinusNode( equationNode.signLineSize, { fill: color } );
        equationNode.addChild( minusSignNode );
        minusSignNode.left = slopeIsNode.right + equationNode.relationalOperatorXSpacing;
        minusSignNode.centerY = slopeIsNode.centerY + equationNode.slopeSignYFudgeFactor + equationNode.slopeSignYOffset;
        nextXOffset = minusSignNode.right + equationNode.operatorXSpacing;
      }
      else {
        // no sign
        nextXOffset = slopeIsNode.right + equationNode.relationalOperatorXSpacing;
      }

      if ( Util.isInteger( line.getSlope() ) ) {
        // integer slope
        var slopeNode = new Text( Util.toFixed( line.getSlope(), 0 ), { font: font, fill: color } );
        equationNode.addChild( slopeNode );
        slopeNode.left = nextXOffset;
        slopeNode.y = slopeIsNode.y;
      }
      else {
        // fractional slope
        var riseString = Util.toFixed( Math.abs( line.getSimplifiedRise() ), 0 );
        var riseNode = new Text( riseString, { font: font, fill: color } );

        var runString = Util.toFixed( Math.abs( line.getSimplifiedRun() ), 0 );
        var runNode = new Text( runString, { font: font, fill: color } );

        var lineLength = Math.max( riseNode.width, runNode.width );
        var fractionLineNode = new LineNode( 0, 0, lineLength, 0, { stroke: color, lineWidth: equationNode.fractionLineThickness } );

        equationNode.addChild( fractionLineNode );
        equationNode.addChild( riseNode );
        equationNode.addChild( runNode );

        // layout, values horizontally centered
        fractionLineNode.left = nextXOffset;
        fractionLineNode.centerY = slopeIsNode.centerY + equationNode.fractionLineYFudgeFactor;
        riseNode.centerX = fractionLineNode.centerX;
        riseNode.bottom = fractionLineNode.top - equationNode.ySpacing;
        runNode.centerX = fractionLineNode.centerX;
        runNode.top = fractionLineNode.bottom + equationNode.ySpacing;
      }
    }
    return equationNode;
  };

  return inherit( EquationNode, SlopeEquationNode );
} );
