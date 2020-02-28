// Copyright 2013-2020, University of Colorado Boulder

/**
 * A plotted point on a graph, not interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import Color from '../../../../scenery/js/util/Color.js';
import graphingLines from '../../graphingLines.js';

/**
 * @param {number} radius
 * @param {Color|String} color
 * @param {Object} [options]
 * @constructor
 */
function PlottedPointNode( radius, color, options ) {

  const mainColor = Color.toColor( color );

  options = merge( {
    highlightColor: Color.WHITE,
    mainColor: mainColor,
    shadowColor: mainColor.darkerColor(),
    stroke: mainColor.darkerColor().darkerColor(),
    lineWidth: 1
  }, options );

  ShadedSphereNode.call( this, 2 * radius, options );
}

graphingLines.register( 'PlottedPointNode', PlottedPointNode );

inherit( ShadedSphereNode, PlottedPointNode );
export default PlottedPointNode;