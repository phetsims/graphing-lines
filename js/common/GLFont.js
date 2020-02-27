// Copyright 2014-2019, University of Colorado Boulder

/**
 * Font used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../phet-core/js/inherit.js';
import merge from '../../../phet-core/js/merge.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import graphingLines from '../graphingLines.js';

/**
 * @param {number|*} options font size or font options
 * @constructor
 */
function GLFont( options ) {

  // convenience for specifying font size only, e.g. new GLFont(24)
  if ( typeof options === 'number' ) {
    options = { size: options };
  }

  // font attributes, as specified in the design document
  options = merge( {
    family: 'Arial'
  }, options );

  PhetFont.call( this, options );
}

graphingLines.register( 'GLFont', GLFont );

inherit( PhetFont, GLFont );
export default GLFont;