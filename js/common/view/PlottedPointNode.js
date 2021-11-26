// Copyright 2013-2020, University of Colorado Boulder

/**
 * A plotted point on a graph, not interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import { Color } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';

class PlottedPointNode extends ShadedSphereNode {

  /**
   * @param {number} radius
   * @param {Color|String} color
   * @param {Object} [options]
   */
  constructor( radius, color, options ) {

    const mainColor = Color.toColor( color );

    options = merge( {
      highlightColor: Color.WHITE,
      mainColor: mainColor,
      shadowColor: mainColor.darkerColor(),
      stroke: mainColor.darkerColor().darkerColor(),
      lineWidth: 1
    }, options );

    super( 2 * radius, options );
  }
}

graphingLines.register( 'PlottedPointNode', PlottedPointNode );

export default PlottedPointNode;