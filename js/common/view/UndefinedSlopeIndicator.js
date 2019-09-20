// Copyright 2013-2019, University of Colorado Boulder

/**
 * A translucent red 'X', to be placed on top of an equation whose slope is undefined.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {number} width
   * @param {number} height
   * @param {Object} [options]
   * @constructor
   */
  function UndefinedSlopeIndicator( width, height, options ) {

    options = _.extend( {
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

  return inherit( Node, UndefinedSlopeIndicator, {

    // @public sets the size of the 'X'
    setSize: function( width, height ) {
      this.line1.setLine( 0, 0, width, height );
      this.line2.setLine( 0, height, width, 0 );
    }
  } );
} );