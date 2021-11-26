// Copyright 2013-2021, University of Colorado Boulder

/**
 * Text node that stays synchronized with a dynamic value. This is used in interactive equations,
 * to keep non-interactive parts of the equation synchronized with the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';

class DynamicValueNode extends Text {

  /**
   * @param {Property.<number>} valueProperty
   * @param {Object} [options]
   */
  constructor( valueProperty, options ) {

    options = merge( {
      fill: 'black',
      font: new PhetFont( 12 ),
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