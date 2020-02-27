// Copyright 2013-2019, University of Colorado Boulder

/**
 * A translucent red 'X', to be placed on top of an equation whose slope is undefined.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import graphingLines from '../../graphingLines.js';

/**
 * @param {number} width
 * @param {number} height
 * @param {Object} [options]
 * @constructor
 */
function UndefinedSlopeIndicator( width, height, options ) {

  options = merge( {
    stroke: 'rgba( 255, 0, 0, 0.3 )',
    lineWidth: 4
  }, options );

  this.line1 = new Line( 0, 0, 0, 1, options ); // @private
  this.line2 = new Line( 0, 0, 0, 1, options ); // @private

  Node.call( this, { children: [ this.line1, this.line2 ] } );

  // initialize
  this.setSize( width, height );
}

graphingLines.register( 'UndefinedSlopeIndicator', UndefinedSlopeIndicator );

export default inherit( Node, UndefinedSlopeIndicator, {

  // @public sets the size of the 'X'
  setSize: function( width, height ) {
    this.line1.setLine( 0, 0, width, height );
    this.line2.setLine( 0, height, width, 0 );
  }
} );