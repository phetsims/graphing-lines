// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Point Slope' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLIconFactory = require( 'GRAPHING_LINES/common/view/GLIconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PointSlopeModel = require( 'GRAPHING_LINES/pointslope/model/PointSlopeModel' );
  var PointSlopeView = require( 'GRAPHING_LINES/pointslope/view/PointSlopeView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var title = require( 'string!GRAPHING_LINES/tab.pointSlope' );

  function PointSlopeScreen() {
    Screen.call( this, title,
      GLIconFactory.createPointSlopeScreenIcon(),
      function() { return new PointSlopeModel(); },
      function( model ) { return new PointSlopeView( model ); },
      { backgroundColor: GLColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, PointSlopeScreen );
} );