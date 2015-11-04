// Copyright 2002-2014, University of Colorado Boulder

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
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var SlopeModel = require( 'GRAPHING_LINES/slope/model/SlopeModel' );
  var SlopeView = require( 'GRAPHING_LINES/slope/view/SlopeView' );

  // strings
  var screenSlopeString = require( 'string!GRAPHING_LINES/screen.slope' );

  function SlopeScreen() {
    Screen.call( this, screenSlopeString,
      GLIconFactory.createSlopeScreenIcon(),
      function() { return new SlopeModel(); },
      function( model ) { return new SlopeView( model ); },
      { backgroundColor: GLColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, SlopeScreen );
} );