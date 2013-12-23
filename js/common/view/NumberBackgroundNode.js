// Copyright 2002-2013, University of Colorado Boulder

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

    var defaultOptions = {
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
    };
    options = _.extend( defaultOptions, options );

    Node.call( this );

    var textNode = new Text( Util.toFixed( value, options.decimalPlaces ), {
      fill: options.textFill,
      font: options.font
    } );

    var backgroundWidth = Math.max( options.minWidth, textNode.width + options.xMargin + options.xMargin );
    var backgroundHeight = Math.max( options.minHeight, textNode.height + options.yMargin + options.yMargin );
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

    // remove subtype-specific options before passing to supertype
    this.mutate( _.omit( options, Object.keys( defaultOptions ) ) );
  }

  return inherit( Node, NumberBackgroundNode );
} );