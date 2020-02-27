// Copyright 2018-2019, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import graphingLinesStrings from '../graphing-lines-strings.js';
import graphingLines from '../graphingLines.js';

const symbolInterceptString = graphingLinesStrings.symbol.intercept;
const symbolSlopeString = graphingLinesStrings.symbol.slope;
const symbolXString = graphingLinesStrings.symbol.x;
const symbolYString = graphingLinesStrings.symbol.y;

// constants
const SYMBOL_PATTERN = '<i style=\'font-family: ' + new MathSymbolFont( 10 ).family + '\'>{{symbol}}</i>';

const GLSymbols = {
  b: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: symbolInterceptString } ),
  m: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: symbolSlopeString } ),
  x: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: symbolXString } ),
  y: StringUtils.fillIn( SYMBOL_PATTERN, { symbol: symbolYString } )
};

graphingLines.register( 'GLSymbols', GLSymbols );
export default GLSymbols;