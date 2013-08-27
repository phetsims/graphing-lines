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

    //TODO uses hierarchical options, keep this approach?
    options = _.extend( {}, options );
    // options that are specific to the text
    options.textOptions = _.extend( {
      fill: 'black',
      decimalPlaces: 0,
      font: new PhetFont( 12 )
    }, options.textOptions );
    // options that are specific to the background
    options.backgroundOptions = _.extend( {
      fill: 'white',
      stroke: null,
      width: 0,
      xMargin: 5,
      yMargin: 5,
      cornerRadius: 3
    }, options.backgroundOptions );

    Node.call( this );

    var textNode = new Text( Util.toFixed( value, options.textOptions.decimalPlaces ), {
      fill: options.textOptions.fill,
      font: options.textOptions.font
    } );

    var backgroundWidth = Math.max( options.backgroundOptions.width, textNode.width + options.backgroundOptions.xMargin + options.backgroundOptions.xMargin );
    var backgroundHeight = textNode.width + options.backgroundOptions.yMargin + options.backgroundOptions.yMargin;
    var backgroundNode = new Rectangle( 0, 0, backgroundWidth, backgroundHeight, options.backgroundOptions.cornerRadius, options.backgroundOptions.cornerRadius, {
      fill: options.backgroundOptions.fill,
      stroke: options.backgroundOptions.stroke
    } );

    // rendering order
    this.addChild( backgroundNode );
    this.addChild( textNode );

    // layout
    textNode.centerX = backgroundNode.centerX;
    textNode.centerY = backgroundNode.centerY;

    // remove subtype-specific options before passing to supertype
    this.mutate( _.omit( options, [ 'textOptions', 'backgroundOptions' ] ) );
  }

  return inherit( Node, NumberBackgroundNode );
} );