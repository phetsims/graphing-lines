// Copyright 2013-2020, University of Colorado Boulder

/**
 * Text node that stays synchronized with a dynamic value. This is used in interactive equations,
 * to keep non-interactive parts of the equation synchronized with the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import graphingLines from '../../graphingLines.js';
import GLFont from '../GLFont.js';

class DynamicValueNode extends Text {

  /**
   * @param {Property.<number>} valueProperty
   * @param {Object} [options]
   */
  constructor( valueProperty, options ) {

    options = merge( {
      fill: 'black',
      font: new GLFont( 12 ),
      decimalPlaces: 0,
      absoluteValue: false
    }, options );

    super( '', options );

    const valueObserver = value => {
      this.text = Utils.toFixed( ( options.absoluteValue ) ? Math.abs( value ) : value, options.decimalPlaces );
    };
    valueProperty.link( valueObserver ); // unlink in dispose

    // @private called by dispose
    this.disposeDynamicValueNode = () => {
      valueProperty.unlink( valueObserver );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeDynamicValueNode();
    super.dispose();
  }
}

graphingLines.register( 'DynamicValueNode', DynamicValueNode );

export default DynamicValueNode;