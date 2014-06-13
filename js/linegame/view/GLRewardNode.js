// Copyright 2002-2014, University of Colorado Boulder

//TODO port
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  function GLRewardNode() {
    Node.call( this );
  }

  return inherit( Node, GLRewardNode, {

    isRunning: function() {
      return false; //TODO
    },

    setRunning: function( running ) {
      //TODO
    },

    setLevel: function( level ) {
      //TODO
    }
  } );
} );
