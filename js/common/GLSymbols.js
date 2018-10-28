// Copyright 2018, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var MathSymbolFont = require( 'SCENERY_PHET/MathSymbolFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var symbolInterceptString = require( 'string!GRAPHING_LINES/symbol.intercept' );
  var symbolSlopeString = require( 'string!GRAPHING_LINES/symbol.slope' );
  var symbolXString = require( 'string!GRAPHING_LINES/symbol.x' );
  var symbolYString = require( 'string!GRAPHING_LINES/symbol.y' );

  // constants
  var SYMBOL_PATTERN = '<i style=\'font-family: ' + new MathSymbolFont( 10 ).family + '\'>{{symbol}}</i>';

  var GLSymbols = {
    b: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: symbolInterceptString } ),
    m: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: symbolSlopeString } ),
    x: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: symbolXString } ),
    y: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: symbolYString } )
  };

  return graphingLines.register( 'GLSymbols', GLSymbols );
} );