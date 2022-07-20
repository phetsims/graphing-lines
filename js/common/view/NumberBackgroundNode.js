// Copyright 2013-2021, University of Colorado Boulder

/**
 * A number displayed on a rectangular background.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';

class NumberBackgroundNode extends Node {

  /**
   * @param {Property.<number>} valueProperty
   * @param {Object} [options]
   */
  constructor( valueProperty, options ) {

    options = merge( {
      decimalPlaces: 0,
      font: new PhetFont( 12 ),
      textFill: 'black',
      backgroundFill: 'white',
      backgroundStroke: null,
      minWidth: 0,
      minHeight: 0,
      xMargin: 5,
      yMargin: 5,
      cornerRadius: 6
    }, options );

    // text and background
    const textNode = new Text( '?', { fill: options.textFill, font: options.font } ); // @private
    const backgroundNode = new Rectangle( 0, 0, 1, 1, {
      fill: options.backgroundFill,
      stroke: options.backgroundStroke,
      cornerRadius: options.cornerRadius
    } );
    options.children = [ backgroundNode, textNode ];

    super( options );

    const valueObserver = value => {

      // format the value
      textNode.text = Utils.toFixed( value, options.decimalPlaces );

      // adjust the background to fit the value
      const backgroundWidth = Math.max( options.minWidth, textNode.width + options.xMargin + options.xMargin );
      const backgroundHeight = Math.max( options.minHeight, textNode.height + options.yMargin + options.yMargin );
      backgroundNode.setRect( 0, 0, backgroundWidth, backgroundHeight );

      // center the value in the background
      textNode.centerX = backgroundNode.centerX;
      textNode.centerY = backgroundNode.centerY;
    };
    valueProperty.link( valueObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeNumberBackgroundNode = () => {
      valueProperty.unlink( valueObserver );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeNumberBackgroundNode();
    super.dispose();
  }
}

graphingLines.register( 'NumberBackgroundNode', NumberBackgroundNode );

export default NumberBackgroundNode;