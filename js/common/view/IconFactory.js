// Copyright 2002-2013, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'common/GLColors' );

  return {
    // Creates an icon for the slope-tool feature
    createSlopeToolIcon: function( width ) {
      //TODO placeholder, port this from java.SlopeToolNode
      var Rectangle = require( 'SCENERY/nodes/Rectangle' );
      return new Rectangle( 0, 0, width, width, { fill: 'blue', stroke: 'black' } );
    },

    // Creates an icon for the "y = +x" feature
    createYEqualsXIcon: function( width ) {
      //TODO placeholder, port this from java.GraphNode
      var Rectangle = require( 'SCENERY/nodes/Rectangle' );
      return new Rectangle( 0, 0, width, width, { fill: GLColors.Y_EQUALS_X, stroke: 'black' } );
    },

    // Creates an icon for the "y = -x" feature
    createYEqualsNegativeXIcon: function( width ) {
      //TODO placeholder, port this from java.GraphNode
      var Rectangle = require( 'SCENERY/nodes/Rectangle' );
      return new Rectangle( 0, 0, width, width, { fill: GLColors.Y_EQUALS_NEGATIVE_X, stroke: 'black' } );
    }
  };
} );