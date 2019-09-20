// Copyright 2013-2019, University of Colorado Boulder

/**
 * The 'Slope' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  const GLIconFactory = require( 'GRAPHING_LINES/common/view/GLIconFactory' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const SlopeModel = require( 'GRAPHING_LINES/slope/model/SlopeModel' );
  const SlopeScreenView = require( 'GRAPHING_LINES/slope/view/SlopeScreenView' );

  // strings
  const screenSlopeString = require( 'string!GRAPHING_LINES/screen.slope' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SlopeScreen( tandem ) {

    const options = {
      name: screenSlopeString,
      backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GLIconFactory.createSlopeScreenIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new SlopeModel(); },
      function( model ) { return new SlopeScreenView( model ); },
      options );
  }

  graphingLines.register( 'SlopeScreen', SlopeScreen );

  return inherit( Screen, SlopeScreen );
} );