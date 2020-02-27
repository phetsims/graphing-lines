// Copyright 2013-2019, University of Colorado Boulder

/**
 * A number displayed on a rectangular background.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import graphingLines from '../../graphingLines.js';
import GLFont from '../GLFont.js';

/**
 * @param {Property.<number>} valueProperty
 * @param {Object} [options]
 * @constructor
 */
function NumberBackgroundNode( valueProperty, options ) {

  options = merge( {
    decimalPlaces: 0,
    font: new GLFont( 12 ),
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
  // @private
  const backgroundNode = new Rectangle( 0, 0, 1, 1, {
    fill: options.backgroundFill,
    stroke: options.backgroundStroke,
    cornerRadius: options.cornerRadius
  } );
  options.children = [ backgroundNode, textNode ];
  Node.call( this, options );

  const valueObserver = function( value ) {

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
  this.disposeNumberBackgroundNode = function() {
    valueProperty.unlink( valueObserver );
  };
}

graphingLines.register( 'NumberBackgroundNode', NumberBackgroundNode );

export default inherit( Node, NumberBackgroundNode, {

  /**
   * @public
   * @override
   */
  dispose: function() {
    this.disposeNumberBackgroundNode();
    Node.prototype.dispose.call( this );
  }
} );