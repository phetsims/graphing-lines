// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Point Slope' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLImages = require( 'common/GLImages' );
  var GLStrings = require( 'common/GLStrings' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var PointSlopeModel = require( 'pointSlope/model/PointSlopeModel' );
  var PointSlopeView = require( 'pointSlope/view/PointSlopeView' );
  var Vector2 = require( 'DOT/Vector2' );

  function PointSlopeScreen() {

    this.name = GLStrings[ "tab.pointSlope" ];
    this.icon = new Image( GLImages.getImage( 'PointSlope-icon.png' ) );
    this.backgroundColor = 'white';

    this.createModel = function() {
      return new PointSlopeModel();
    };

    this.createView = function( model ) {
      return new PointSlopeView( model );
    };
  }

  return PointSlopeScreen;
} );