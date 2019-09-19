// Copyright 2013-2017, University of Colorado Boulder

/**
 * Text node that stays synchronized with a dynamic value. This is used in interactive equations,
 * to keep non-interactive parts of the equation synchronized with the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

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

    const self = this;

    Text.call( this, '', options );

    const valueObserver = function( value ) {
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