// Copyright 2002-2013, University of Colorado

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
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // constants
  var LINE_COLOR = new Color( 255, 0, 0, 0.3 );
  var LINE_WIDTH = 4;

  function UndefinedSlopeIndicator( width, height, options ) {
    options = _.extend( { pickable: false }, options );
    Node.call( this );
    var lineOptions = { stroke: LINE_COLOR, lineWidth: LINE_WIDTH };
    this.addChild( new Path( _.extend( { shape: Shape.lineSegment( 0, 0, width, height ) }, lineOptions ) ) );
    this.addChild( new Path( _.extend( { shape: Shape.lineSegment( 0, height, width, 0 ) }, lineOptions ) ) );
    this.mutate( options );
  }

  return inherit( Node, UndefinedSlopeIndicator );
} );