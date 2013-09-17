// Copyright 2002-2013, University of Colorado Boulder

/**
 * A plotted point on a graph, not interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  /**
   * @param {Number} diameter
   * @param {Color} color
   * @param {*} options
   * @constructor
   */
  function PlottedPointNode( diameter, color, options ) {

    options = _.extend( {
      pickable: false,
      highlightColor: Color.WHITE,
      mainColor: color,
      shadowColor: color.darkerColor(),
      stroke: color.darkerColor().darkerColor(),
      lineWidth: 1
    }, options );

    ShadedSphereNode.call( this, diameter, options );
  }

  return inherit( ShadedSphereNode, PlottedPointNode );
} );