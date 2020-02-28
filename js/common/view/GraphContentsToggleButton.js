// Copyright 2018-2020, University of Colorado Boulder

/**
 * Button used to show/hide the contents of the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import EyeToggleButton from '../../../../scenery-phet/js/buttons/EyeToggleButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import graphingLines from '../../graphingLines.js';

class GraphContentsToggleButton extends EyeToggleButton {

  /**
   * @param {BooleanProperty} property
   * @param {Object} [options]
   */
  constructor( property, options ) {

    options = merge( {
      trueColor: 'white', // {Color|string} button color when property.value === true
      falseColor: PhetColorScheme.BUTTON_YELLOW  // {Color|string} button color when property.value === false
    }, options );

    super( property, options );

    // change the button color to emphasize when the graph contents are hidden
    property.link( visible => {
      this.setBaseColor( visible ? options.trueColor : options.falseColor );
    } );
  }
}

graphingLines.register( 'GraphContentsToggleButton', GraphContentsToggleButton );
export default GraphContentsToggleButton;