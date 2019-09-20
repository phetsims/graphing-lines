// Copyright 2013-2019, University of Colorado Boulder

/**
 * The 'Slope-Intercept' screen. Conforms to the contract specified in joist/Screen.
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
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const SlopeInterceptModel = require( 'GRAPHING_LINES/slopeintercept/model/SlopeInterceptModel' );
  const SlopeInterceptScreenView = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptScreenView' );

  // strings
  const screenSlopeInterceptString = require( 'string!GRAPHING_LINES/screen.slopeIntercept' );

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function SlopeInterceptScreen( tandem, options ) {

    options = _.extend( {
      name: screenSlopeInterceptString,
      backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GLIconFactory.createSlopeInterceptScreenIcon()
    }, options );

    assert && assert( !options.tandem, 'tandem is a constructor parameter' );
    options.tandem = tandem;

    Screen.call( this,
      function() { return new SlopeInterceptModel(); },
      function( model ) { return new SlopeInterceptScreenView( model ); },
      options );
  }

  graphingLines.register( 'SlopeInterceptScreen', SlopeInterceptScreen );

  return inherit( Screen, SlopeInterceptScreen );
} );