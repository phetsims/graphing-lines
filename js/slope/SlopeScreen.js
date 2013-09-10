// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Slope' screen. Conforms to the contract specified in joist/Screen.
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
  var SlopeModel = require( 'GRAPHING_LINES/slope/model/SlopeModel' );
  var SlopeView = require( 'GRAPHING_LINES/slope/view/SlopeView' );

  function SlopeScreen() {

    this.name = GLStrings[ "tab.slope" ];
    this.icon = new Image( GLImages.getImage( 'Slope-icon.png' ) );
    this.backgroundColor = new Color( 255, 255, 214 );

    this.createModel = function() {
      return new SlopeModel();
    };

    this.createView = function( model ) {
      return new SlopeView( model );
    };
  }

  return SlopeScreen;
} );