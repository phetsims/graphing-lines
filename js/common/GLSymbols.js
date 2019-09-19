// Copyright 2018, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const MathSymbolFont = require( 'SCENERY_PHET/MathSymbolFont' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const symbolInterceptString = require( 'string!GRAPHING_LINES/symbol.intercept' );
  const symbolSlopeString = require( 'string!GRAPHING_LINES/symbol.slope' );
  const symbolXString = require( 'string!GRAPHING_LINES/symbol.x' );
  const symbolYString = require( 'string!GRAPHING_LINES/symbol.y' );

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