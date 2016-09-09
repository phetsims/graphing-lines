// Copyright 2013-2015, University of Colorado Boulder

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
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PointSlopeModel = require( 'GRAPHING_LINES/pointslope/model/PointSlopeModel' );
  var PointSlopeView = require( 'GRAPHING_LINES/pointslope/view/PointSlopeView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenPointSlopeString = require( 'string!GRAPHING_LINES/screen.pointSlope' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function PointSlopeScreen( tandem ) {

    var options = {
      name: screenPointSlopeString,
      backgroundColor: GLColors.SCREEN_BACKGROUND,
      homeScreenIcon: GLIconFactory.createPointSlopeScreenIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new PointSlopeModel(); },
      function( model ) { return new PointSlopeView( model ); },
      options );
  }

  graphingLines.register( 'PointSlopeScreen', PointSlopeScreen );

  return inherit( Screen, PointSlopeScreen );
} );