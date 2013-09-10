// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Point Slope' screen. Conforms to the contract specified in joist/Screen.
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
  var PointSlopeModel = require( 'GRAPHING_LINES/pointSlope/model/PointSlopeModel' );
  var PointSlopeView = require( 'GRAPHING_LINES/pointSlope/view/PointSlopeTests' );

  function PointSlopeScreen() {

    this.name = GLStrings[ "tab.pointSlope" ];
    this.icon = new Image( GLImages.getImage( 'PointSlope-icon.png' ) );
    this.backgroundColor = new Color( 255, 255, 214 );

    this.createModel = function() {
      return new PointSlopeModel();
    };

    this.createView = function( model ) {
      return new PointSlopeView( model );
    };
  }

  return PointSlopeScreen;
} );