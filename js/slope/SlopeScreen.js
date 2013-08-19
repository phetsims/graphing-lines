// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Slope' screen. Conforms to the contract specified in joist/Tab
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
  var SlopeModel = require( 'slope/model/SlopeModel' );
  var SlopeView = require( 'slope/view/SlopeView' );
  var Vector2 = require( 'DOT/Vector2' );

  function SlopeScreen() {

    this.name = GLStrings[ "tab.slope" ];
    this.icon = new Image( GLImages.getImage( 'Slope-icon.jpg' ) );
    this.backgroundColor = 'white';

    var mvt = ModelViewTransform2.createIdentity();

    this.createModel = function() {
      return new SlopeModel();
    };

    this.createView = function( model ) {
      return new SlopeView( model, mvt );
    };
  }

  return SlopeScreen;
} );