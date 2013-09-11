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
  var CoordinateSpinner = require( 'GRAPHING_LINES/common/view/spinner/CoordinateSpinner' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLStrings = require( 'GRAPHING_LINES/common/GLStrings' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberBackgroundNode = require( 'GRAPHING_LINES/common/view/NumberBackgroundNode' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var UndefinedSlopeIndicator = require( 'GRAPHING_LINES/common/view/UndefinedSlopeIndicator' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {Property<Line>} interactiveLine
   * @param {Property<Number>} xRange
   * @param {Property<Number>} yRange
   * @param {*} options
   * @constructor
   */
  function SlopeEquationNode( interactiveLine, xRange, yRange, options ) {

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
    var staticTextOptions = { font: staticFont, fill: options.staticColor };

    var thisNode = this;
    EquationNode.call( this, 20 );

    // internal properties that are connected to spinners
    var x1 = new Property( interactiveLine.get().x1 );
    var y1 = new Property( interactiveLine.get().y1 );
    var x2 = new Property( interactiveLine.get().x2 );
    var y2 = new Property( interactiveLine.get().y2 );

    // flag that allows us to update all controls atomically when the model changes
    var updatingControls = false;

    // Nodes that could appear is all possible ways to write the equation
    // m =
    var mNode = new Text( GLStrings["symbol.slope"], staticTextOptions );
    var interactiveEqualsNode = new Text( "=", staticTextOptions );
    // y2 - y2
    var y2Node = new CoordinateSpinner( y2, x2, y1, x1, yRange, { color: GLColors.POINT_X2_Y2 } );
    var numeratorOperatorNode = new Text( "-", staticTextOptions );
    var y1Node = new CoordinateSpinner( y1, x1, y2, x2, yRange, { font: interactiveFont, color: GLColors.POINT_X1_Y1 } );
    // fraction line
    var interactiveFractionLineNode = new Path( thisNode.createFractionLineShape( 1 ), { fill: options.staticColor } ); // correct length will be set later
    // x2 - x1
    var x2Node = new CoordinateSpinner( x2, y2, x1, y1, xRange, { font: interactiveFont, color: GLColors.POINT_X2_Y2 } );
    var denominatorOperatorNode = new Text( "-", staticTextOptions );
    var x1Node = new CoordinateSpinner( x1, y1, x2, y2, xRange, { font: interactiveFont, color: GLColors.POINT_X1_Y1 } );
    // = unsimplified value
    var unsimplifiedEqualsNode = new Text( "=", staticTextOptions );
    var unsimplifiedRiseNode = new Node(); // non-null for now, proper node created later
    var unsimplifiedRunNode = new Node();  // non-null for now, proper node created later
    var unsimplifiedFractionLineNode = new Path( thisNode.createFractionLineShape( 1 ), { fill: options.staticColor } ); // correct length will be set later

    // Compute the max width needed to display the unsimplified rise and run values.
    var maxRangeLength = Math.max( xRange.get().getLength(), yRange.get().getLength() );
    var maxUnsimplifiedWidth = new Text( Util.toFixed( -maxRangeLength, 0 ), { font: interactiveFont, color: 'black' } ).width;

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
      y2Node.bottom = interactiveFractionLineNode.top - thisNode.spinnersYSpacing;
      numeratorOperatorNode.left = y2Node.right + thisNode.operatorXSpacing;
      numeratorOperatorNode.centerY = y2Node.centerY;
      y1Node.left = numeratorOperatorNode.right + thisNode.operatorXSpacing;
      y1Node.y = y2Node.y;
      // fix fraction line length
      var fractionLineLength = y1Node.right - y2Node.left;
      interactiveFractionLineNode.shape = thisNode.createFractionLineShape( fractionLineLength );
      // x2 - x1
      x2Node.left = y2Node.left;
      x2Node.top = interactiveFractionLineNode.bottom + thisNode.spinnersYSpacing;
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
        interactiveLine.set( new Line( x1.get(), y1.get(), x2.get(), y2.get(), interactiveLine.get().color ) );
      }
    };
    x1.link( updateLine.bind( thisNode ) );
    y1.link( updateLine.bind( thisNode ) );
    x2.link( updateLine.bind( thisNode ) );
    y2.link( updateLine.bind( thisNode ) );

    // sync the controls and layout with the model
    var undefinedSlopeIndicator = null;
    interactiveLine.link( function( line ) {

      // Synchronize the controls atomically.
      updatingControls = true;
      {
        x1.set( line.x1 );
        y1.set( line.y1 );
        x2.set( line.x2 );
        y2.set( line.y2 );
      }
      updatingControls = false;

      // Update the unsimplified slope
      {
        var margin = 3;
        var cornerRadius = 10;
        var unsimplifiedSlopeOptions = { textOptions: { font: staticFont }, backgroundOptions: { fill: GLColors.SLOPE, width: maxUnsimplifiedWidth } }; //TODO yuck

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
        unsimplifiedFractionLineNode.shape = thisNode.createFractionLineShape( unsimplifiedFractionLineLength  );
      }

      // do layout before adding undefined-slope indicator
      updateLayout( line );

      // undefined-slope indicator
      if ( undefinedSlopeIndicator !== null ) {
        thisNode.removeChild( undefinedSlopeIndicator );
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
      fontSize: 18,
      fill: 'black'
    }, options );

    var font = new PhetFont( { size: options.fontSize, weight: 'bold' } );

    // m =
    var htmlLeftSide = StringUtils.format( "{0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{1} =", GLStrings.slope, GLStrings["symbol.slope"] );
    var leftSideNode = new HTMLText( htmlLeftSide, { font: font, fill: options.fill } );

    // y2 - y1
    //TODO is this OK?
    //NOTE: <font> tag is deprecated in HTML4 and unsupported in HTML5. But as of Java 1.7, Swing (supposedly) implements a subset of HTML3.
    var pattern = "<html>{0}<font size='-1'><sub>2</sub></font> - {1}<font size='-1'><sub>1</sub></font></html>"; // same for numerator and denominator
    var htmlNumerator = StringUtils.format( pattern, GLStrings["symbol.y"], GLStrings["symbol.y"] );
//    var numeratorNode = new HTMLText( htmlNumerator, { font: font, fill: options.fill } ); //TODO vertical layout problems with HTMLText, height wrong?
    var numeratorNode = new Text( "y2 - y1", { font: font, fill: options.fill } );

    // x2 - x1
    var htmlDenominator = StringUtils.format( pattern, GLStrings["symbol.x"], GLStrings["symbol.x"] );
//    var denominatorNode = new HTMLText( htmlDenominator, { font: font, fill: options.fill } ); //TODO vertical layout problems with HTMLText, height wrong?
    var denominatorNode = new Text( "x2 - x1", { font: font, fill: options.fill } );

    // fraction line
    var length = Math.max( numeratorNode.width, denominatorNode.width );
    var fractionLineNode = new Rectangle( 0, 0, length, 1, { fill: options.fill } );

    // rendering order
    var parentNode = new Node();
    parentNode.addChild( leftSideNode );
    parentNode.addChild( fractionLineNode );
    parentNode.addChild( numeratorNode );
    parentNode.addChild( denominatorNode );

    // layout
    var ySpacing = 2;
    leftSideNode.x = 0;
    leftSideNode.y = 0;
    fractionLineNode.left = leftSideNode.right + 5;
    fractionLineNode.centerY = leftSideNode.centerY;
    numeratorNode.centerX = fractionLineNode.centerX;
    numeratorNode.bottom = fractionLineNode.top - ySpacing; //TODO this is wrong with HTMLText
    denominatorNode.centerX = fractionLineNode.centerX;
    denominatorNode.top = fractionLineNode.bottom + ySpacing; //TODO this is wrong with HTMLText

    return parentNode;
  };

  SlopeEquationNode.createStaticEquation = function( line, fontSize, color ) {
    return new SlopeEquationNode( new Property( line ),
      new Property( new Range( 0, 1 ) ),
      new Property( new Range( 0, 1 ) ),
      new Property( new Range( 0, 1 ) ),
      new Property( new Range( 0, 1 ) ), {
        interactiveX1: false,
        interactiveY1: false,
        interactiveSlope: false,
        interactiveFontSize: fontSize,
        staticFontSize: fontSize,
        staticColor: color
      } );
  };

  return inherit( EquationNode, SlopeEquationNode );
} );
