// Copyright 2018-2020, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import graphingLines from '../graphingLines.js';
import graphingLinesStrings from '../graphingLinesStrings.js';

// constants
const SYMBOL_PATTERN = `<i style='font-family: ${new MathSymbolFont( 10 ).family}'>{{symbol}}</i>`;

const GLSymbols = {
  b: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingLinesStrings.symbol.intercept } ),
  m: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingLinesStrings.symbol.slope } ),
  x: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingLinesStrings.symbol.x } ),
  y: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: graphingLinesStrings.symbol.y } )
};

graphingLines.register( 'GLSymbols', GLSymbols );

export default GLSymbols;