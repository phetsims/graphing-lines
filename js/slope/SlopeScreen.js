// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Slope' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/SCREEN' );
  var SlopeModel = require( 'GRAPHING_LINES/slope/model/SlopeModel' );
  var SlopeView = require( 'GRAPHING_LINES/slope/view/SlopeView' );

  // strings
  var slopeString = require( 'string!GRAPHING_LINES/tab.slope' );

  // images
  var screenIcon = require( 'image!GRAPHING_LINES/Slope-screen-icon.png' );

  function SlopeScreen() {
    Screen.call( this, slopeString, new Image( screenIcon ),
      function() { return new SlopeModel(); },
      function( model ) { return new SlopeView( model ); },
      { backgroundColor: 'rgb( 255, 255, 214 )' }
    );
  }

  return inherit( Screen, SlopeScreen );
} );