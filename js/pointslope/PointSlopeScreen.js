// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Point Slope' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PointSlopeModel = require( 'GRAPHING_LINES/pointSlope/model/PointSlopeModel' );
  var PointSlopeView = require( 'GRAPHING_LINES/pointSlope/view/PointSlopeView' );
  var Screen = require( 'JOIST/SCREEN' );

  // strings
  var pointSlopeString = require( 'string!GRAPHING_LINES/tab.pointSlope' );

  // images
  var screenIcon = require( 'image!GRAPHING_LINES/PointSlope-screen-icon.png' );

  function PointSlopeScreen() {
    Screen.call( this, pointSlopeString, new Image( screenIcon ),
      function() { return new PointSlopeModel(); },
      function( model ) { return new PointSlopeView( model ); },
      { backgroundColor: GLColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, PointSlopeScreen );
} );