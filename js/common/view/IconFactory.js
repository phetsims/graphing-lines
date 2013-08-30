// Copyright 2002-2013, University of Colorado Boulder

/**
 * Factory for creating icons that appear in control panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'common/GLColors' );

  //TODO this should go away
  var createRectangleIcon = function( width, fill, stroke ) {
    var Rectangle = require( 'SCENERY/nodes/Rectangle' );
    var icon = new Rectangle( 0, 0, width, width, { fill: fill, stroke: stroke } );
    icon.setEnabled = function( enabled ) {
      icon.fill = enabled ? fill : 'rgb(220,220,220)';
      icon.stroke = enabled ? stroke : 'rgb(180,180,180)';
    };
    return icon;
  };

  return {
    // Creates an icon for the slope-tool feature
    createSlopeToolIcon: function( width ) {
      //TODO placeholder, port this from java.SlopeToolNode
      return createRectangleIcon( width, 'blue', 'black' );
    },

    // Creates an icon for the "y = +x" feature
    createYEqualsXIcon: function( width ) {
      //TODO placeholder, port this from java.GraphNode
      return createRectangleIcon( width, GLColors.Y_EQUALS_X, 'black' );
    },

    // Creates an icon for the "y = -x" feature
    createYEqualsNegativeXIcon: function( width ) {
      //TODO placeholder, port this from java.GraphNode
      return createRectangleIcon( width, GLColors.Y_EQUALS_NEGATIVE_X, 'black' );
    }
  };
} );