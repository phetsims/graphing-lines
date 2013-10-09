// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Slope-Intercept' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var Image = require( 'SCENERY/nodes/Image' );
  var SlopeInterceptModel = require( 'GRAPHING_LINES/slopeIntercept/model/SlopeInterceptModel' );
  var SlopeInterceptView = require( 'GRAPHING_LINES/slopeIntercept/view/SlopeInterceptView' );

  // strings
  var slopeInterceptString = require( 'string!GRAPHING_LINES/tab.slopeIntercept' );

  // images
  var slopeInterceptImage = require( 'image!GRAPHING_LINES/SlopeIntercept-icon.png' );

  function SlopeInterceptScreen() {

    this.name = slopeInterceptString;
    this.icon = new Image( slopeInterceptImage );
    this.backgroundColor = new Color( 255, 255, 214 );

    this.createModel = function() {
      return new SlopeInterceptModel();
    };

    this.createView = function( model ) {
      return new SlopeInterceptView( model );
    };
  }

  return SlopeInterceptScreen;
} );