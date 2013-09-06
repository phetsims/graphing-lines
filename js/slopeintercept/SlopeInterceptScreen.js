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
  var GLImages = require( 'GRAPHING_LINES/common/GLImages' );
  var GLStrings = require( 'GRAPHING_LINES/common/GLStrings' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var SlopeInterceptModel = require( 'GRAPHING_LINES/slopeIntercept/model/SlopeInterceptModel' );
  var SlopeInterceptView = require( 'GRAPHING_LINES/slopeIntercept/view/SlopeInterceptView' );
  var Vector2 = require( 'DOT/Vector2' );

  function SlopeInterceptScreen() {

    this.name = GLStrings[ "tab.slopeIntercept" ];
    this.icon = new Image( GLImages.getImage( 'SlopeIntercept-icon.png' ) );
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