// Copyright 2013-2017, University of Colorado Boulder

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
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var SlopeInterceptModel = require( 'GRAPHING_LINES/slopeintercept/model/SlopeInterceptModel' );
  var SlopeInterceptScreenView = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptScreenView' );

  // strings
  var screenSlopeInterceptString = require( 'string!GRAPHING_LINES/screen.slopeIntercept' );

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