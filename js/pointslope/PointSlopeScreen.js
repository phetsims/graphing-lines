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
  var Image = require( 'SCENERY/nodes/Image' );
  var PointSlopeModel = require( 'GRAPHING_LINES/pointSlope/model/PointSlopeModel' );
  var PointSlopeView = require( 'GRAPHING_LINES/pointSlope/view/PointSlopeView' );
  var strings = require( 'GRAPHING_LINES/graphing-lines-strings' );

  // images
  var pointSlopeImage = require( 'image!GRAPHING_LINES/../images/PointSlope-icon.png' );

  function PointSlopeScreen() {

    this.name = strings[ "tab.pointSlope" ];
    this.icon = new Image( pointSlopeImage );
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