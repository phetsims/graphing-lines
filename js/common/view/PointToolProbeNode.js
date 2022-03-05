// Copyright 2021-2022, University of Colorado Boulder

/**
 * PointToolProbeNode is the probe for the point tool. It's a triangle that points down, described from the upper-left.
 * Origin is at the upper-left.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import { Path } from '../../../../scenery/js/imports.js';
import { Color } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';
import GLColors from '../GLColors.js';

class PointToolProbeNode extends Path {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      size: new Dimension2( 18, 21 ),
      fill: GLColors.POINT_TOOL_COLOR,
      stroke: Color.grayColor( 135 )
    }, options );

    const shape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( options.size.width, 0 )
      .lineTo( options.size.width / 2, options.size.height )
      .close();

    super( shape, options );
  }
}

graphingLines.register( 'PointToolProbeNode', PointToolProbeNode );
export default PointToolProbeNode;