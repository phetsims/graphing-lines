// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Slope-Intercept' screen. Conforms to the contract specified in joist/Screen.
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
  var SlopeInterceptModel = require( 'GRAPHING_LINES/slopeintercept/model/SlopeInterceptModel' );
  var SlopeInterceptView = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptView' );

  // strings
  var screenSlopeInterceptString = require( 'string!GRAPHING_LINES/screen.slopeIntercept' );

  function SlopeInterceptScreen() {
    Screen.call( this, screenSlopeInterceptString,
      GLIconFactory.createSlopeInterceptScreenIcon(),
      function() { return new SlopeInterceptModel(); },
      function( model ) { return new SlopeInterceptView( model ); },
      { backgroundColor: GLColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, SlopeInterceptScreen );
} );