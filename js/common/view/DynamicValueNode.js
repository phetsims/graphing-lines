// Copyright 2013-2017, University of Colorado Boulder

/**
 * Text node that stays synchronized with a dynamic value. This is used in interactive equations,
 * to keep non-interactive parts of the equation synchronized with the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {Property.<number>} valueProperty
   * @param {Object} [options]
   * @constructor
   */
  function DynamicValueNode( valueProperty, options ) {

    options = _.extend( {
      fill: 'black',
      font: new GLFont( 12 ),
      decimalPlaces: 0,
      absoluteValue: false
    }, options );

    var self = this;

    Text.call( this, '', options );

    var valueObserver = function( value ) {
      self.text = Util.toFixed( ( options.absoluteValue ) ? Math.abs( value ) : value, options.decimalPlaces );
    };
    valueProperty.link( valueObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeDynamicValueNode = function() {
      valueProperty.unlink( valueObserver );
    };
  }

  graphingLines.register( 'DynamicValueNode', DynamicValueNode );

  return inherit( Text, DynamicValueNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeDynamicValueNode();
      Text.prototype.dispose.call( this );
    }
  } );
} );