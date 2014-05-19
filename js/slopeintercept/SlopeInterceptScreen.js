// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Slope-Intercept' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/SCREEN' );
  var SlopeInterceptModel = require( 'GRAPHING_LINES/slopeIntercept/model/SlopeInterceptModel' );
  var SlopeInterceptView = require( 'GRAPHING_LINES/slopeIntercept/view/SlopeInterceptView' );

  // strings
  var slopeInterceptString = require( 'string!GRAPHING_LINES/tab.slopeIntercept' );

  // images
  var screenIcon = require( 'image!GRAPHING_LINES/SlopeIntercept-screen-icon.png' );

  function SlopeInterceptScreen() {
    Screen.call( this, slopeInterceptString, new Image( screenIcon ),
      function() { return new SlopeInterceptModel(); },
      function( model ) { return new SlopeInterceptView( model ); },
      { backgroundColor: GLColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, SlopeInterceptScreen );
} );