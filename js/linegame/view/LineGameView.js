// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {LineGameModel} model
   * @constructor
   */
  function GameView( model ) {

    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );

    var underConstruction = new Text( "Under Construction", { fontSize: 50 } );
    underConstruction.centerX = this.layoutBounds.centerX;
    underConstruction.centerY = this.layoutBounds.centerY;
    thisView.addChild( underConstruction );
  }

  return inherit( ScreenView, GameView, { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) } );
} );