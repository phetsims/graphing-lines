// Copyright 2013-2026, University of Colorado Boulder

/**
 * A plotted point on a graph, not interactive.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import Color from '../../../../scenery/js/util/Color.js';
import TColor from '../../../../scenery/js/util/TColor.js';

export default class PlottedPointNode extends ShadedSphereNode {

  public constructor( radius: number, color: TColor ) {

    const mainColor = Color.toColor( color );

    super( 2 * radius, {
      highlightColor: Color.WHITE,
      mainColor: mainColor,
      shadowColor: mainColor.darkerColor(),
      stroke: mainColor.darkerColor().darkerColor(),
      lineWidth: 1
    } );
  }
}
