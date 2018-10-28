// Copyright 2018, University of Colorado Boulder

/**
 * Button used to show/hide the contents of the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EyeToggleButton = require( 'SCENERY_PHET/buttons/EyeToggleButton' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  class GraphContentsToggleButton extends EyeToggleButton {

    /**
     * @param {BooleanProperty} property
     * @param {Object} [options]
     */
    constructor( property, options ) {

      super( property, options );

      // change the button color to emphasize when the graph contents are hidden
      property.link( visible => {
        this.setBaseColor( visible ? 'white' : PhetColorScheme.BUTTON_YELLOW );
      } );
    }
  }

  return graphingLines.register( 'GraphContentsToggleButton', GraphContentsToggleButton );
} );