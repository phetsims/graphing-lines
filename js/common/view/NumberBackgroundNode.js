// Copyright 2002-2014, University of Colorado Boulder

/**
 * A number displayed on a rectangular background.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {Number} value
   * @param options
   * @constructor
   */
  function NumberBackgroundNode( value, options ) {

    options = _.extend( {
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

    this.decimalPlaces = options.decimalPlaces; // @private

    this.textNode = new Text( '?', { fill: options.textFill, font: options.font } ); // @private

    var backgroundWidth = Math.max( options.minWidth, this.textNode.width + options.xMargin + options.xMargin );
    var backgroundHeight = Math.max( options.minHeight, this.textNode.height + options.yMargin + options.yMargin );
    // @private
    this.backgroundNode = new Rectangle( 0, 0, backgroundWidth, backgroundHeight, options.cornerRadius, options.cornerRadius, {
      fill: options.backgroundFill,
      stroke: options.backgroundStroke
    } );

    options.children = [ this.backgroundNode, this.textNode ];
    Node.call( this, options );

    this.setValue( value );
  }

  return inherit( Node, NumberBackgroundNode, {

    setValue: function( value ) {
      this.textNode.text = Util.toFixed( value, this.decimalPlaces );
      this.textNode.centerX = this.backgroundNode.centerX;
      this.textNode.centerY = this.backgroundNode.centerY;
    }
  } );
} );