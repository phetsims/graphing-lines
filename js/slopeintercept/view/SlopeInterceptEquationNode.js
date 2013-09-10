// Copyright 2002-2013, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var EquationNode = require( 'GRAPHING_LINES/common/view/EquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  function SlopeInterceptEquationNode() {
    var thisNode = this;
    EquationNode.call( this, 20 );
    thisNode.addChild( new Text( "slope-intercept form" ) );//TODO this is a placeholder
  }

  return inherit( EquationNode, SlopeInterceptEquationNode );
} );
