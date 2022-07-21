// Copyright 2013-2022, University of Colorado Boulder

/**
 * A translucent red 'X', to be placed on top of an equation whose slope is undefined.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Line, Node } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';

class UndefinedSlopeIndicator extends Node {

  /**
   * @param {number} width
   * @param {number} height
   * @param {Object} [options]
   */
  constructor( width, height, options ) {

    options = merge( {
      stroke: 'rgba( 255, 0, 0, 0.3 )',
      lineWidth: 4
    }, options );

    const line1 = new Line( 0, 0, 0, 1, options );
    const line2 = new Line( 0, 0, 0, 1, options );

    super( { children: [ line1, line2 ] } );

    // @private
    this.line1 = line1;
    this.line2 = line2;

    // initialize
    this.setSize( width, height );
  }

  // @public sets the size of the 'X'
  setSize( width, height ) {
    this.line1.setLine( 0, 0, width, height );
    this.line2.setLine( 0, height, width, 0 );
  }
}

graphingLines.register( 'UndefinedSlopeIndicator', UndefinedSlopeIndicator );

export default UndefinedSlopeIndicator;