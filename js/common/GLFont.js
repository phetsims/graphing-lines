// Copyright 2014-2020, University of Colorado Boulder

/**
 * Font used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../phet-core/js/merge.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import graphingLines from '../graphingLines.js';

class GLFont extends PhetFont {

  /**
   * @param {number|*} options font size or font options
   */
  constructor( options ) {

    // convenience for specifying font size only, e.g. new GLFont(24)
    if ( typeof options === 'number' ) {
      options = { size: options };
    }

    // font attributes, as specified in the design document
    options = merge( {
      family: 'Arial'
    }, options );

    super( options );
  }
}

graphingLines.register( 'GLFont', GLFont );

export default GLFont;