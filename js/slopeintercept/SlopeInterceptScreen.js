// Copyright 2013-2015, University of Colorado Boulder

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
  var Screen = require( 'JOIST/Screen' );
  var SlopeInterceptModel = require( 'GRAPHING_LINES/slopeintercept/model/SlopeInterceptModel' );
  var SlopeInterceptView = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptView' );

  // strings
  var screenSlopeInterceptString = require( 'string!GRAPHING_LINES/screen.slopeIntercept' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SlopeInterceptScreen( tandem ) {
    Screen.call( this, screenSlopeInterceptString,
      GLIconFactory.createSlopeInterceptScreenIcon(),
      function() { return new SlopeInterceptModel(); },
      function( model ) { return new SlopeInterceptView( model ); }, {
        backgroundColor: GLColors.SCREEN_BACKGROUND,
        tandem: tandem
      }
    );
  }

  graphingLines.register( 'SlopeInterceptScreen', SlopeInterceptScreen );

  return inherit( Screen, SlopeInterceptScreen );
} );