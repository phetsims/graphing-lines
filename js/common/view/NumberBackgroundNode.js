// Copyright 2002-2012, University of Colorado

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
  var Path = require( 'SCENERY/nodes/Path' );
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
      textFill: 'black',
      backgroundFill: 'white',
      backgroundStroke: 'black',
      backgroundWidth: 0,
      font: new PhetFont( 12 ),
      xMargin: 5,
      yMargin: 5,
      cornerRadius: 3
    }, options );

    Node.call( this );

    var textNode = new Text( Util.toFixed( value, options.decimalPlaces ), {
      fill: options.textFill,
      font: options.font
    } );

    var backgroundWidth = Math.max( options.backgroundWidth, textNode.width + options.xMargin + options.xMargin );
    var backgroundHeight = textNode.width + options.yMargin + options.yMargin;
    var backgroundNode = new Rectangle( 0, 0, backgroundWidth, backgroundHeight, options.cornerRadius, options.cornerRadius, {
      fill: options.backgroundFill,
      stroke: options.backgroundStroke
    } );

    // rendering order
    this.addChild( backgroundNode );
    this.addChild( textNode );

    // layout
    textNode.centerX = backgroundNode.centerX;
    textNode.centerY = backgroundNode.centerY;

    this.mutate( options );
  }

  return inherit( Node, NumberBackgroundNode );
} );