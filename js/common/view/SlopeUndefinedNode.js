// Copyright 2002-2013, University of Colorado

/**
 * When a line's slope is undefined, we display "x = # (slope undefined)" in place of an equation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLStrings = require( 'common/GLStrings' );
  var inherit = require( 'PHET_CORE/inherit' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  function SlopeUndefinedNode( line, options ) {
    options = _.extend( { pickable: false }, options );
    Text.call( this, StringUtils.format( GLStrings.slopeUndefined, GLStrings["symbol.x"], line.x1 ), options );
  }

  return inherit( Text, SlopeUndefinedNode );
} );