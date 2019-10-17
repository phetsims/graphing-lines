// Copyright 2013-2019, University of Colorado Boulder

/**
 * A number displayed on a rectangular background.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

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
      textNode.text = Util.toFixed( value, options.decimalPlaces );

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

  return inherit( Node, NumberBackgroundNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeNumberBackgroundNode();
      Node.prototype.dispose.call( this );
    }
  } );
} );