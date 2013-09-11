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
  var Text = require( 'SCENERY/nodes/Text' );

  function SlopeInterceptEquationNode() {
    var thisNode = this;
    EquationNode.call( this, 20 );
    thisNode.addChild( new Text( "[slope-intercept equation]" ) );//TODO this is a placeholder
  }

  return inherit( EquationNode, SlopeInterceptEquationNode );
} );
