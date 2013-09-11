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
  var GLStrings = require( 'GRAPHING_LINES/common/GLStrings' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' ); //TODO delete me?

  /**
   * @param {Property<Line>} interactiveLine
   * @param {Property<Number>} x1Range
   * @param {Property<Number>} y1Range
   * @param {Property<Number>} riseRange
   * @param {Property<Number>} runRange
   * @param {*} options
   * @constructor
   */
  function SlopeEquationNode( interactiveLine, x1Range, y1Range, riseRange, runRange, options ) {
    var thisNode = this;
    EquationNode.call( this, 20 );
    thisNode.addChild( new Text( "<slope equation>", { fontSize: 18 } ) );//TODO this is a placeholder
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
