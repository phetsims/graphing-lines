// Copyright 2002-2013, University of Colorado

/**
 * A plotted point on a graph, not interactive.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  function PlottedPointNode( radius, color, options ) {
    options = _.extend( { lineWidth: 1, pickable: false }, options );
    options.outerColor = color;
    options.stroke = options.outerColor;
    ShadedSphereNode.call( this, radius, options );
  }

  return inherit( ShadedSphereNode, PlottedPointNode );
} );