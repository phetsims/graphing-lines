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
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

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
    return new Text( "m = (y2-y1)/(x2-x1)", { fontSize: 18 } ); //TODO this is a placeholder
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
