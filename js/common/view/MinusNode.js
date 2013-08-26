// Copyright 2002-2013, University of Colorado

/**
 * Minus sign, created using scenery.Rectangle because scenery.Text("-") looks awful
 * on Windows and cannot be accurately centered.
 * Origin at upper left.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ){
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function MinusNode( width, height, options ) {
    assert && assert( width > height );
    options = _.extend( { fill: 'black' }, options );
    Rectangle.call( this, 0, 0, width, height, options );
  }

  return inherit( Rectangle, MinusNode );
});