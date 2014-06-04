// Copyright 2002-2014, University of Colorado Boulder

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

  // modules
  var CoordinatePicker = require( 'GRAPHING_LINES/common/view/picker/CoordinatePicker' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var MinusNode = require( 'SCENERY_PHET/MinusNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberBackgroundNode = require( 'GRAPHING_LINES/common/view/NumberBackgroundNode' );
  var Property = require( 'AXON/Property' );
  var scenery = { Line: require( 'SCENERY/nodes/Line' ) }; // scenery.Line, workaround for name collision with graphing-lines.Line
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
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
   * Creates an interactive equation. x1, y1, x2 and y2 are interactive.
   *
   * @param {Property<Line>} lineProperty
   * @param {Property<Number>} xRangeProperty
   * @param {Property<Number>} yRangeProperty
   * @param {*} options
   * @constructor
   */
  function SlopeEquationNode( lineProperty, xRangeProperty, yRangeProperty, options ) {

    options = _.extend( {
      fontSize: GLConstants.INTERACTIVE_EQUATION_FONT_SIZE,
      staticColor: 'black'
    }, options );

    var thisNode = this;
    EquationNode.call( this, options.fontSize );

    var interactiveFont = new GLFont( { size: options.fontSize, weight: 'bold' } );
    var staticFont = new GLFont( { size: options.fontSize, weight: 'bold' } );
    var staticOptions = { font: staticFont, fill: options.staticColor };
    var fractionLineOptions = { stroke: options.staticColor, lineWidth: thisNode.fractionLineThickness };

    // internal properties that are connected to pickers
    var x1Property = new Property( lineProperty.get().x1 );
    var y1Property = new Property( lineProperty.get().y1 );
    var x2Property = new Property( lineProperty.get().x2 );
    var y2Property = new Property( lineProperty.get().y2 );

    // internal properties that are connected to number displays
    var riseProperty = new Property( lineProperty.get().rise );
    var runProperty = new Property( lineProperty.get().run );

    // flag that allows us to update all controls atomically when the model changes
    var updatingControls = false;

    // Nodes that could appear is all possible ways to write the equation
    // m =
    var mNode = new Text( symbolSlopeString, staticOptions );
    var interactiveEqualsNode = new Text( "=", staticOptions );
    // y2 - y2
    var y2Node = new CoordinatePicker( y2Property, x2Property, y1Property, x1Property, yRangeProperty, { font: interactiveFont, color: GLColors.POINT_X2_Y2 } );
    var numeratorOperatorNode = new MinusNode( _.extend( { size: thisNode.operatorLineSize }, staticOptions ) );
    var y1Node = new CoordinatePicker( y1Property, x1Property, y2Property, x2Property, yRangeProperty, { font: interactiveFont, color: GLColors.POINT_X1_Y1 } );
    // fraction line, correct length will be set later
    var interactiveFractionLineNode = new scenery.Line( 0, 0, 1, 0, fractionLineOptions  );
    // x2 - x1
    var x2Node = new CoordinatePicker( x2Property, y2Property, x1Property, y1Property, xRangeProperty, { font: interactiveFont, color: GLColors.POINT_X2_Y2 } );
    var denominatorOperatorNode = new MinusNode( _.extend( { size: thisNode.operatorLineSize }, staticOptions ) );
    var x1Node = new CoordinatePicker( x1Property, y1Property, x2Property, y2Property, xRangeProperty, { font: interactiveFont, color: GLColors.POINT_X1_Y1 } );
    // = unsimplified value
    var unsimplifiedSlopeOptions = {
      font: staticFont,
      decimalPlaces: 0,
      backgroundFill: GLColors.SLOPE,
      minWidth: y2Node.width,
      minHeight: y2Node.height - 20
    };
    var unsimplifiedEqualsNode = new Text( "=", staticOptions );
    var unsimplifiedRiseNode = new NumberBackgroundNode( riseProperty, unsimplifiedSlopeOptions );
    var unsimplifiedRunNode = new NumberBackgroundNode( runProperty, unsimplifiedSlopeOptions );
    var unsimplifiedFractionLineNode = new scenery.Line( 0, 0, 1, 0, fractionLineOptions ); // correct length will be set later

    var undefinedSlopeIndicator = new UndefinedSlopeIndicator( 1, 1 );

    // rendering order
    var parentNode = new Node();
    thisNode.addChild( parentNode );
    thisNode.addChild( undefinedSlopeIndicator );

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

    // sync the model with the controls
    var updateLine = function() {
      if ( !updatingControls ) {
        lineProperty.set( new Line( x1Property.get(), y1Property.get(), x2Property.get(), y2Property.get(), lineProperty.get().color ) );
      }
    };
    //TODO updateLine will fire 4 times on startup
    x1Property.link( updateLine.bind( thisNode ) );
    y1Property.link( updateLine.bind( thisNode ) );
    x2Property.link( updateLine.bind( thisNode ) );
    y2Property.link( updateLine.bind( thisNode ) );

    // sync the controls and layout with the model
    lineProperty.link( function( line ) {

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
        riseProperty.set( line.rise );
        runProperty.set( line.run );

        // fraction line length
        var unsimplifiedFractionLineLength = Math.max( unsimplifiedRiseNode.width, unsimplifiedRunNode.width );
        unsimplifiedFractionLineNode.setLine( 0, 0, unsimplifiedFractionLineLength, 1  );
      }

      // undefined-slope indicator
      if ( line.undefinedSlope() ) {
        undefinedSlopeIndicator.visible = true;
        undefinedSlopeIndicator.setSize( parentNode.getWidth(), parentNode.getHeight() );
        undefinedSlopeIndicator.centerX = parentNode.centerX;
        undefinedSlopeIndicator.centerY = parentNode.centerY + thisNode.undefinedSlopeYFudgeFactor;
      }
      else {
        undefinedSlopeIndicator.visible = false;
      }
    } );

    // layout, after registering observers
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
    // horizontally center rise and run above fraction line
    unsimplifiedRiseNode.centerX = unsimplifiedFractionLineNode.centerX;
    unsimplifiedRiseNode.bottom = unsimplifiedFractionLineNode.top - thisNode.slopeYSpacing;
    unsimplifiedRunNode.centerX = unsimplifiedFractionLineNode.centerX;
    unsimplifiedRunNode.top = unsimplifiedFractionLineNode.bottom + thisNode.slopeYSpacing;

    thisNode.mutate( options );
  }

  /**
   * Creates a node that displays the general form of this equation: m = (y2-y1)/(x2-x1)
   */
  SlopeEquationNode.createGeneralFormNode = function( options ) {

    options = _.extend( {
      fontSize: 20,
      fontWeight: 'bold',
      fill: 'black'
    }, options );

    var equationNode = new EquationNode( options.fontSize );

    var font = new GLFont( { size: options.fontSize, weight: options.fontWeight } );

    // m =
    var leftSideNode = new Text( StringUtils.format( "{0}      {1} =", slopeString, symbolSlopeString ), { font: font, fill: options.fill } );

    // pattern for numerator and denominator
    var pattern = '{0}<sub>2</sub> - {1}<sub>1</sub>';

    // y2 - y1
    var numeratorNode = new SubSupText( StringUtils.format( pattern, symbolYString, symbolYString ), { font: font, fill: options.fill } );

    // x2 - x1
    var denominatorNode = new SubSupText( StringUtils.format( pattern, symbolXString, symbolXString ), { font: font, fill: options.fill } );

    // fraction line
    var length = Math.max( numeratorNode.width, denominatorNode.width );
    var fractionLineNode = new scenery.Line( 0, 0, length, equationNode.fractionLineThickness, { stroke: options.fill } );

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
   * Creates a non-interactive equation, used to label a static line.
   * This takes the form 'Slope is rise/run', which is different than the interactive equation form.
   *
   * @param {Line} line
   * @param {Number} fontSize
   * @param {Color|String} color
   */
  SlopeEquationNode.createLabel = function( line, fontSize, color ) {

    var equationNode = new EquationNode( fontSize );

    var font = new GLFont( { size: fontSize, weight: 'bold' } );

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
        var minusSignNode = new MinusNode( { size: equationNode.signLineSize, fill: color } );
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
        var fractionLineNode = new scenery.Line( 0, 0, lineLength, 0, { stroke: color, lineWidth: equationNode.fractionLineThickness } );

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

  //TODO this is a temporary, until SlopeEquationNode is mutable
  /**
   * Creates a non-interactive equation, used to label a dynamic line.
   * @param {Property<Line>} lineProperty
   * @param {Number} fontSize
   * @returns {Node}
   */
  SlopeEquationNode.createDynamicLabel = function( lineProperty, fontSize ) {
    var parent = new Node();
    lineProperty.link( function( line ) {
      parent.removeAllChildren();
      parent.addChild( SlopeEquationNode.createLabel( line, fontSize, line.color ) );
    } );
    return parent;
  };

  return inherit( EquationNode, SlopeEquationNode );
} );
