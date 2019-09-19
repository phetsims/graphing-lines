// Copyright 2013-2017, University of Colorado Boulder

/**
 * The 'Point Slope' screen. Conforms to the contract specified in joist/Screen.
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
  const PointSlopeModel = require( 'GRAPHING_LINES/pointslope/model/PointSlopeModel' );
  const PointSlopeScreenView = require( 'GRAPHING_LINES/pointslope/view/PointSlopeScreenView' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenPointSlopeString = require( 'string!GRAPHING_LINES/screen.pointSlope' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function PointSlopeScreen( tandem ) {

    var options = {
      name: screenPointSlopeString,
      backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GLIconFactory.createPointSlopeScreenIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new PointSlopeModel(); },
      function( model ) { return new PointSlopeScreenView( model ); },
      options );
  }

  graphingLines.register( 'PointSlopeScreen', PointSlopeScreen );

  return inherit( Screen, PointSlopeScreen );
} );