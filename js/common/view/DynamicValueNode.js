// Copyright 2002-2013, University of Colorado Boulder

/**
 * Text node that stays synchronized with a dynamic value. This is used in interactive equations,
 * to keep non-interactive parts of the equation synchronized with the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {Property<Number>} valueProperty
   * @param options
   * @constructor
   */
  function DynamicValueNode( valueProperty, options ) {

    options = _.extend( {
      fill: 'black',
      font: new PhetFont( 12 ),
      decimalPlaces: 0,
      absoluteValue: false
    }, options );

    var thisNode = this;
    Text.call( this, "", options );

    valueProperty.link( function( value ) {
      thisNode.text = Util.toFixed( ( options.absoluteValue ) ? Math.abs( value ) : value, options.decimalPlaces );
    } );
  }

  return inherit( Text, DynamicValueNode );
} );