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
  var Image = require( 'SCENERY/nodes/Image' );
  var SlopeModel = require( 'GRAPHING_LINES/slope/model/SlopeModel' );
  var SlopeView = require( 'GRAPHING_LINES/slope/view/SlopeView' );
  var strings = require( 'GRAPHING_LINES/graphing-lines-strings' );

  // images
  var slopeImage = require( 'image!GRAPHING_LINES/../images/Slope-icon.png' );

  function SlopeScreen() {

    this.name = strings[ "tab.slope" ];
    this.icon = new Image( slopeImage );
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