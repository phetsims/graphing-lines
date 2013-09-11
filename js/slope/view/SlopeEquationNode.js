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
  var Text = require( 'SCENERY/nodes/Text' );

  function SlopeInterceptEquationNode() {
    var thisNode = this;
    EquationNode.call( this, 20 );
    thisNode.addChild( new Text( "[slope equation]" ) );//TODO this is a placeholder
  }

  return inherit( EquationNode, SlopeInterceptEquationNode );
} );
