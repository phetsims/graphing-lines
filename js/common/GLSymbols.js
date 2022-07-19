// Copyright 2018-2021, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import graphingLines from '../graphingLines.js';
import graphingLinesStrings from '../graphingLinesStrings.js';

const GLSymbols = {
  b: MathSymbolFont.getRichTextMarkup( graphingLinesStrings.symbol.intercept ),
  m: MathSymbolFont.getRichTextMarkup( graphingLinesStrings.symbol.slope ),
  x: MathSymbolFont.getRichTextMarkup( graphingLinesStrings.symbol.x ),
  y: MathSymbolFont.getRichTextMarkup( graphingLinesStrings.symbol.y )
};

graphingLines.register( 'GLSymbols', GLSymbols );

export default GLSymbols;