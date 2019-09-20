// Copyright 2013-2019, University of Colorado Boulder

/**
 * A plotted point on a graph, not interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  /**
   * @param {number} radius
   * @param {Color|String} color
   * @param {Object} [options]
   * @constructor
   */
  function PlottedPointNode( radius, color, options ) {

    const mainColor = Color.toColor( color );

    options = _.extend( {
      highlightColor: Color.WHITE,
      mainColor: mainColor,
      shadowColor: mainColor.darkerColor(),
      stroke: mainColor.darkerColor().darkerColor(),
      lineWidth: 1
    }, options );

    ShadedSphereNode.call( this, 2 * radius, options );
  }

  graphingLines.register( 'PlottedPointNode', PlottedPointNode );

  return inherit( ShadedSphereNode, PlottedPointNode );
} );