// Copyright 2002-2014, University of Colorado Boulder

/**
 * When a line's slope is undefined, we display "x = # (slope undefined)" in place of an equation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var slopeUndefinedString = require( 'string!GRAPHING_LINES/slopeUndefined' );
  var symbolXString = require( 'string!GRAPHING_LINES/symbol.x' );

  /**
   * @param {Line} line
   * @param {*} options
   * @constructor
   */
  function SlopeUndefinedNode( line, options ) {
    Text.call( this, StringUtils.format( slopeUndefinedString, symbolXString, line.x1 ), options );
  }

  return inherit( Text, SlopeUndefinedNode );
} );