// Copyright 2002-2013, University of Colorado Boulder

//TODO port
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'PATH/Node' );

  function RewardNode() {
    Node.call( this );
  }

  return inherit( Node, RewardNode, {

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
