// Copyright 2013-2017, University of Colorado Boulder

/**
 * Renderer for slope equations.
 * General form is m = (y2 - y1) / (x2 - x1) = rise/run
 *
 * x1, y1, x2, and y2 are all interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CoordinatePicker = require( 'GRAPHING_LINES/common/view/picker/CoordinatePicker' );
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
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberBackgroundNode = require( 'GRAPHING_LINES/common/view/NumberBackgroundNode' );
  var Property = require( 'AXON/Property' );
  var scenery = { Line: require( 'SCENERY/nodes/Line' ) }; // scenery.Line, workaround for name collision with graphing-lines.Line
  var RichText = require( 'SCENERY/nodes/RichText' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var UndefinedSlopeIndicator = require( 'GRAPHING_LINES/common/view/UndefinedSlopeIndicator' );
  var Util = require( 'DOT/Util' );

  // strings
  var slopeIsString = require( 'string!GRAPHING_LINES/slopeIs' );
  var slopeString = require( 'string!GRAPHING_LINES/slope' );
  var undefinedString = require( 'string!GRAPHING_LINES/undefined' );

  /**
   * Creates an interactive equation. x1, y1, x2 and y2 are interactive.
   *
   * @param {Property.<Line>} lineProperty
   * @param {Object} [options]
   * @constructor
   */
  function SlopeEquationNode( lineProperty, options ) {

    options = _.extend( {
      x1RangeProperty: new Property( GLConstants.X_AXIS_RANGE ),
      x2RangeProperty: new Property( GLConstants.X_AXIS_RANGE ),
      y1RangeProperty: new Property( GLConstants.Y_AXIS_RANGE ),
      y2RangeProperty: new Property( GLConstants.Y_AXIS_RANGE ),
      fontSize: GLConstants.INTERACTIVE_EQUATION_FONT_SIZE,
      staticColor: 'black'
    }, options );

    EquationNode.call( this, options.fontSize ); // call first, because supertype constructor computes various layout metrics

    var interactiveFont = new GLFont( { size: options.fontSize, weight: 'bold' } );
    var staticFont = new GLFont( { size: options.fontSize, weight: 'bold' } );
    var staticOptions = { font: staticFont, fill: options.staticColor };
    var fractionLineOptions = { stroke: options.staticColor, lineWidth: this.fractionLineThickness };

    // internal properties that are connected to pickers
    var x1Property = new Property( lineProperty.get().x1 );
    var y1Property = new Property( lineProperty.get().y1 );
    var x2Property = new Property( lineProperty.get().x2 );
    var y2Property = new Property( lineProperty.get().y2 );

    // internal properties that are connected to number displays
    var riseProperty = new Property( lineProperty.get().rise );
    var runProperty = new Property( lineProperty.get().run );

    /*
     * Flag that allows us to update all controls atomically when the model changes.
     * When a picker's value changes, it results in the creation of a new Line.
     * So if you don't change the pickers atomically to match a new Line instance,
     * the new Line will be inadvertently replaced with an incorrect line.
     */
    var updatingControls = false;

    // Nodes that could appear is all possible ways to write the equation
    // m =
    var mNode = new RichText( GLSymbols.m, staticOptions );
    var interactiveEqualsNode = new Text( MathSymbols.EQUAL_TO, staticOptions );
    // y2 - y1
    var y2Node = new CoordinatePicker( y2Property, x2Property, y1Property, x1Property, options.y2RangeProperty, {
      font: interactiveFont,
      color: GLColors.POINT_X2_Y2
    } );
    var numeratorOperatorNode = new MinusNode( _.extend( { size: this.operatorLineSize }, staticOptions ) );
    var y1Node = new CoordinatePicker( y1Property, x1Property, y2Property, x2Property, options.y1RangeProperty, {
      font: interactiveFont,
      color: GLColors.POINT_X1_Y1
    } );
    // fraction line, correct length will be set later
    var interactiveFractionLineNode = new scenery.Line( 0, 0, 1, 0, fractionLineOptions );
    // x2 - x1
    var x2Node = new CoordinatePicker( x2Property, y2Property, x1Property, y1Property, options.x2RangeProperty, {
      font: interactiveFont,
      color: GLColors.POINT_X2_Y2
    } );
    var denominatorOperatorNode = new MinusNode( _.extend( { size: this.operatorLineSize }, staticOptions ) );
    var x1Node = new CoordinatePicker( x1Property, y1Property, x2Property, y2Property, options.x1RangeProperty, {
      font: interactiveFont,
      color: GLColors.POINT_X1_Y1
    } );
    // = unsimplified value
    var unsimplifiedSlopeOptions = {
      font: staticFont,
      decimalPlaces: 0,
      backgroundFill: GLColors.SLOPE,
      minWidth: y2Node.width,
      minHeight: y2Node.height - 20
    };
    var unsimplifiedEqualsNode = new RichText( MathSymbols.EQUAL_TO, staticOptions );
    var unsimplifiedRiseNode = new NumberBackgroundNode( riseProperty, unsimplifiedSlopeOptions );
    var unsimplifiedRunNode = new NumberBackgroundNode( runProperty, unsimplifiedSlopeOptions );
    var unsimplifiedFractionLineNode = new scenery.Line( 0, 0, 1, 0, fractionLineOptions ); // correct length will be set later

    var undefinedSlopeIndicator = new UndefinedSlopeIndicator( 1, 1 );

    // rendering order
    var parentNode = new Node();
    this.addChild( parentNode );
    this.addChild( undefinedSlopeIndicator );

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

    // sync the model with the controls, unmultilink in dispose
    var controlsMultilink = Property.lazyMultilink( [ x1Property, y1Property, x2Property, y2Property ],
      function() {
        if ( !updatingControls ) {
          lineProperty.set( new Line( x1Property.get(), y1Property.get(), x2Property.get(), y2Property.get(), lineProperty.get().color ) );
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
        x2Property.set( line.x2 );
        y2Property.set( line.y2 );
      }
      updatingControls = false;

      // Update the unsimplified slope
      riseProperty.set( line.rise );
      runProperty.set( line.run );

      // fraction line length
      var unsimplifiedFractionLineLength = Math.max( unsimplifiedRiseNode.width, unsimplifiedRunNode.width );
      unsimplifiedFractionLineNode.setLine( 0, 0, unsimplifiedFractionLineLength, 0 );

      // undefined-slope indicator
      undefinedSlopeIndicator.visible = line.undefinedSlope();
    };
    lineProperty.link( lineObserver ); // unlink in dispose

    // layout, after registering observers
    // m =
    mNode.x = 0;
    mNode.y = 0;
    interactiveEqualsNode.left = mNode.right + this.relationalOperatorXSpacing;
    interactiveEqualsNode.y = mNode.y;
    // fraction line
    interactiveFractionLineNode.left = interactiveEqualsNode.right + this.relationalOperatorXSpacing;
    interactiveFractionLineNode.centerY = interactiveEqualsNode.centerY + this.fractionLineYFudgeFactor;
    // y2 - y1
    y2Node.left = interactiveFractionLineNode.left;
    y2Node.bottom = interactiveFractionLineNode.top - this.pickersYSpacing;
    numeratorOperatorNode.left = y2Node.right + this.operatorXSpacing;
    numeratorOperatorNode.centerY = y2Node.centerY;
    y1Node.left = numeratorOperatorNode.right + this.operatorXSpacing;
    y1Node.y = y2Node.y;
    // fix fraction line length
    var fractionLineLength = y1Node.right - y2Node.left;
    interactiveFractionLineNode.setLine( 0, 0, fractionLineLength, 0 );
    // x2 - x1
    x2Node.left = y2Node.left;
    x2Node.top = interactiveFractionLineNode.bottom + this.pickersYSpacing;
    denominatorOperatorNode.left = x2Node.right + this.operatorXSpacing;
    denominatorOperatorNode.centerY = x2Node.centerY;
    x1Node.left = denominatorOperatorNode.right + this.operatorXSpacing;
    x1Node.y = x2Node.y;
    // = rise/run
    unsimplifiedEqualsNode.left = interactiveFractionLineNode.right + this.relationalOperatorXSpacing;
    unsimplifiedEqualsNode.y = interactiveEqualsNode.y;
    unsimplifiedFractionLineNode.left = unsimplifiedEqualsNode.right + this.relationalOperatorXSpacing;
    unsimplifiedFractionLineNode.y = interactiveFractionLineNode.y;
    // horizontally center rise and run above fraction line
    unsimplifiedRiseNode.centerX = unsimplifiedFractionLineNode.centerX;
    unsimplifiedRiseNode.bottom = unsimplifiedFractionLineNode.top - this.slopeYSpacing;
    unsimplifiedRunNode.centerX = unsimplifiedFractionLineNode.centerX;
    unsimplifiedRunNode.top = unsimplifiedFractionLineNode.bottom + this.slopeYSpacing;

    // set up undefined-slope indicator last
    undefinedSlopeIndicator.setSize( parentNode.getWidth(), parentNode.getHeight() );
    undefinedSlopeIndicator.centerX = parentNode.centerX;
    undefinedSlopeIndicator.centerY = parentNode.centerY + this.undefinedSlopeYFudgeFactor;

    this.mutate( options );

    // @private called by dispose
    this.disposeSlopeEquationNode = function() {
      x1Node.dispose();
      x2Node.dispose();
      y1Node.dispose();
      y2Node.dispose();
      unsimplifiedRiseNode.dispose();
      unsimplifiedRunNode.dispose();
      lineProperty.unlink( lineObserver );
      Property.unmultilink( controlsMultilink );
    };
  }

  graphingLines.register( 'SlopeEquationNode', SlopeEquationNode );

  inherit( EquationNode, SlopeEquationNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeSlopeEquationNode();
      EquationNode.prototype.dispose.call( this );
    }
  }, {

    /**
     * Creates a node that displays the general form of the slope equation: m = (y2-y1)/(x2-x1)
     * @param {Object} [options]
     * @public
     * @static
     */
    createGeneralFormNode: function( options ) {

      options = _.extend( {
        fontSize: 20,
        fontWeight: 'bold',
        fill: 'black'
      }, options );

      var equationNode = new EquationNode( options.fontSize );

      var font = new GLFont( { size: options.fontSize, weight: options.fontWeight } );

      // Slope m =
      var leftSideText = StringUtils.format( '{0}    {1} {2}', slopeString, GLSymbols.m, MathSymbols.EQUAL_TO );
      var leftSideNode = new RichText( leftSideText, {
        font: font,
        fill: options.fill,
        maxWidth: 125 // i18n, determined empirically
      } );

      // pattern for numerator and denominator
      var pattern = '{0}<sub>2</sub> {1} {2}<sub>1</sub>';

      // y2 - y1
      var numeratorText = StringUtils.format( pattern, GLSymbols.y, MathSymbols.MINUS, GLSymbols.y );
      var numeratorNode = new RichText( numeratorText, {
        font: font,
        fill: options.fill
      } );

      // x2 - x1
      var denominatorText = StringUtils.format( pattern, GLSymbols.x, MathSymbols.MINUS, GLSymbols.x );
      var denominatorNode = new RichText( denominatorText, {
        font: font,
        fill: options.fill
      } );

      // fraction line
      var length = Math.max( numeratorNode.width, denominatorNode.width );
      var fractionLineNode = new scenery.Line( 0, 0, length, 0, {
        stroke: options.fill,
        lineWidth: equationNode.fractionLineThickness
      } );

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
       return new DynamicLabelNode( lineProperty, options );
    }
  } );

  /**
   * A non-interactive equation, used to label a dynamic line.
   * This takes the form 'Slope is rise/run', which is different than the interactive equation form.
   * Note that while this is a sentence, it's order is not localized, due to the fact that it is
   * composed of multiple scenery.Text nodes.
   * @param {Property.<Line>} lineProperty
   * @param {Object} [options]
   * @constructor
   */
  function DynamicLabelNode( lineProperty, options ) {

    options = _.extend( {
      fontSize: 18
    }, options );

    var self = this;

    EquationNode.call( this, options.fontSize );

    var textOptions = {
      font: new GLFont( { size: options.fontSize, weight: 'bold' } ),
      maxWidth: 130
    };

    // allocate nodes needed to represent all simplified forms
    var slopeIsNode = new Text( slopeIsString, textOptions );
    var undefinedNode = new Text( undefinedString, textOptions );
    var minusSignNode = new MinusNode( { size: this.signLineSize } );
    var riseNode = new Text( '?', textOptions );
    var runNode = new Text( '?', textOptions );
    var fractionLineNode = new scenery.Line( 0, 0, 1, 0, { lineWidth: this.fractionLineThickness } );

    // add all nodes, we'll set which ones are visible bases on desired simplification
    assert && assert( this.getChildrenCount() === 0, 'supertype has unexpected children' );
    this.children = [ slopeIsNode, undefinedNode, minusSignNode, riseNode, runNode, fractionLineNode ];

    // update visibility, layout and properties of nodes to match the current line
    var update = function( line ) {

      var lineColor = line.color;

      // start with all children invisible
      var len = self.children.length;
      for ( var i = 0; i < len; i++ ) {
        self.children[ i ].visible = false;
      }

      // 'Slope is'
      slopeIsNode.visible = true;
      slopeIsNode.fill = lineColor;

      if ( line.undefinedSlope() ) {
        // 'undefined'
        undefinedNode.visible = true;
        undefinedNode.fill = lineColor;
        undefinedNode.left = slopeIsNode.right + self.relationalOperatorXSpacing;
        undefinedNode.y = slopeIsNode.y;
      }
      else if ( line.getSlope() === 0 ) {
        // 0
        riseNode.visible = true;
        riseNode.text = '0';
        riseNode.fill = lineColor;
        riseNode.left = slopeIsNode.right + self.relationalOperatorXSpacing;
        riseNode.y = slopeIsNode.y;
      }
      else {
        var nextXOffset;
        if ( line.getSlope() < 0 ) {
          // minus sign
          minusSignNode.visible = true;
          minusSignNode.fill = lineColor;
          minusSignNode.left = slopeIsNode.right + self.relationalOperatorXSpacing;
          minusSignNode.centerY = slopeIsNode.centerY + self.slopeSignYFudgeFactor + self.slopeSignYOffset;
          nextXOffset = minusSignNode.right + self.fractionalSlopeXSpacing;
        }
        else {
          // no sign
          nextXOffset = slopeIsNode.right + self.relationalOperatorXSpacing;
        }

        if ( Util.isInteger( line.getSlope() ) ) {
          // integer slope (rise/1)
          riseNode.visible = true;
          riseNode.text = Util.toFixed( Math.abs( line.getSlope() ), 0 );
          riseNode.fill = lineColor;
          riseNode.left = nextXOffset;
          riseNode.y = slopeIsNode.y;
        }
        else {
          // fractional slope
          riseNode.visible = runNode.visible = fractionLineNode.visible = true;

          riseNode.text = Util.toFixed( Math.abs( line.getSimplifiedRise() ), 0 );
          runNode.text = Util.toFixed( Math.abs( line.getSimplifiedRun() ), 0 );
          fractionLineNode.setLine( 0, 0, Math.max( riseNode.width, runNode.width ), 0 );
          riseNode.fill = runNode.fill = fractionLineNode.stroke = lineColor;

          // layout, values horizontally centered
          fractionLineNode.left = nextXOffset;
          fractionLineNode.centerY = slopeIsNode.centerY + self.fractionLineYFudgeFactor;
          riseNode.centerX = fractionLineNode.centerX;
          riseNode.bottom = fractionLineNode.top - self.ySpacing;
          runNode.centerX = fractionLineNode.centerX;
          runNode.top = fractionLineNode.bottom + self.ySpacing;
        }
      }
    };

    var lineObserver = function( line ) {
      update( line );
    };
    lineProperty.link( lineObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeDynamicLabelNode = function() {
      lineProperty.unlink( lineObserver );
    };
  }

  graphingLines.register( 'SlopeEquationNode.DynamicLabelNode', DynamicLabelNode );

  inherit( EquationNode, DynamicLabelNode, {

    // @public @override
    dispose: function() {
      this.disposeDynamicLabelNode();
      EquationNode.prototype.dispose.call( this );
    }
  } );

  return SlopeEquationNode;
} );
