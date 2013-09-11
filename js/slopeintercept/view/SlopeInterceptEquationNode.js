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
  function SlopeInterceptEquationNode( interactiveLine, x1Range, y1Range, riseRange, runRange, options ) {
    var thisNode = this;
    EquationNode.call( this, 20 );
    thisNode.addChild( new Text( "<slope-intercept equation>", { fontSize: 18 } ) );//TODO this is a placeholder
  }

  // Creates a node that displays the general form of this equation: y = mx + b
  SlopeInterceptEquationNode.createGeneralFormNode = function( options ) {
    return new Text( "y = mx + b", { fontSize: 18 }  ); //TODO this is a placeholder
  };

  SlopeInterceptEquationNode.createStaticEquation = function( line, fontSize, color ) {
    return new SlopeInterceptEquationNode( new Property( line ),
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

  return inherit( EquationNode, SlopeInterceptEquationNode );
} );
