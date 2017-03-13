// Copyright 2013-2015, University of Colorado Boulder

/**
 * The 'Slope' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLIconFactory = require( 'GRAPHING_LINES/common/view/GLIconFactory' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var SlopeModel = require( 'GRAPHING_LINES/slope/model/SlopeModel' );
  var SlopeScreenView = require( 'GRAPHING_LINES/slope/view/SlopeScreenView' );

  // strings
  var screenSlopeString = require( 'string!GRAPHING_LINES/screen.slope' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SlopeScreen( tandem ) {

    var options = {
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