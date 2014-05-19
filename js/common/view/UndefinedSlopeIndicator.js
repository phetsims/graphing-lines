// Copyright 2002-2013, University of Colorado Boulder

/**
 * A translucent red "X", to be placed on top of an equation whose slope is undefined.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );

  // constants
  var LINE_COLOR = new Color( 255, 0, 0, 0.3 );
  var LINE_WIDTH = 4;

  /**
   * @param {Number} width
   * @param {Number} height
   * @param {*} options
   * @constructor
   */
  function UndefinedSlopeIndicator( width, height, options ) {

    options = _.extend( {}, options );

    var lineOptions = { stroke: LINE_COLOR, lineWidth: LINE_WIDTH };
    this.line1 = new Line( 0, 0, width, height, lineOptions );
    this.line2 = new Line( 0, height, width, 0, lineOptions );
    options.children = [ this.line1, this.line2 ];

    Node.call( this, options );
  }

  return inherit( Node, UndefinedSlopeIndicator, {

    // sets the size of the 'X'
    setSize: function( width, height ) {
      this.line1.setLine( 0, 0, width, height );
      this.line2.setLine( 0, height, width, 0 );
    }
  } );
} );