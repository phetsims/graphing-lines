// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the 'Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'common/view/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {SlopeModel} model
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function SlopeView( model, mvt ) {

    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );

    // Reset All button
    var resetAllButton = new ResetAllButton( function() {
      model.reset();
    } );

    // rendering order
    thisView.addChild( resetAllButton );

    // layout
    resetAllButton.left = 100;
    resetAllButton.top = 100;
  }

  return inherit( ScreenView, SlopeView, { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) } );
} );