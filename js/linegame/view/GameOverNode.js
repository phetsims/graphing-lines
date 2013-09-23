// Copyright 2002-2013, University of Colorado Boulder

//TODO port
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  function GameOverNode( options ) {
    Node.call( this );

    var rectangle = new Rectangle( 0, 0, 300, 300, { fill: 'gray', stroke: 'black' } );
    var text = new Text( "Game Over", { font: new PhetFont( 30 ) } );

    this.addChild( rectangle );
    this.addChild( text );

    text.centerX = rectangle.centerX;
    text.centerY = rectangle.centerY;

    this.mutate( options );
  }

  return inherit( Node, GameOverNode, {
    addListener: function() {
      //TODO see ResultsNode
    }
  } );
} );
