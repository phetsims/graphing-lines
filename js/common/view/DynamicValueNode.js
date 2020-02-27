// Copyright 2013-2019, University of Colorado Boulder

/**
 * Text node that stays synchronized with a dynamic value. This is used in interactive equations,
 * to keep non-interactive parts of the equation synchronized with the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import graphingLines from '../../graphingLines.js';
import GLFont from '../GLFont.js';

/**
 * @param {Property.<number>} valueProperty
 * @param {Object} [options]
 * @constructor
 */
function DynamicValueNode( valueProperty, options ) {

  options = merge( {
    fill: 'black',
    font: new GLFont( 12 ),
    decimalPlaces: 0,
    absoluteValue: false
  }, options );

  const self = this;

  Text.call( this, '', options );

  const valueObserver = function( value ) {
    self.text = Utils.toFixed( ( options.absoluteValue ) ? Math.abs( value ) : value, options.decimalPlaces );
  };
  valueProperty.link( valueObserver ); // unlink in dispose

  // @private called by dispose
  this.disposeDynamicValueNode = function() {
    valueProperty.unlink( valueObserver );
  };
}

graphingLines.register( 'DynamicValueNode', DynamicValueNode );

export default inherit( Text, DynamicValueNode, {

  /**
   * @public
   * @override
   */
  dispose: function() {
    this.disposeDynamicValueNode();
    Text.prototype.dispose.call( this );
  }
} );