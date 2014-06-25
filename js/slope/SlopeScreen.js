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
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/SCREEN' );
  var SlopeModel = require( 'GRAPHING_LINES/slope/model/SlopeModel' );
  var SlopeView = require( 'GRAPHING_LINES/slope/view/SlopeView' );

  // strings
  var title = require( 'string!GRAPHING_LINES/tab.slope' );

  // images
  var screenImage = require( 'image!GRAPHING_LINES/Slope-screen.png' );

  function SlopeScreen() {
    Screen.call( this, title, new Image( screenImage ),
      function() { return new SlopeModel(); },
      function( model ) { return new SlopeView( model ); },
      { backgroundColor: GLColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, SlopeScreen );
} );