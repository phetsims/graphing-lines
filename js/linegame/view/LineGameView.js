// Copyright 2017, University of Colorado Boulder

/**
 * View for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BaseGameView = require( 'GRAPHING_LINES/linegame/view/BaseGameView' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var level1Image = require( 'image!GRAPHING_LINES/Level_1.png' );
  var level2Image = require( 'image!GRAPHING_LINES/Level_2.png' );
  var level3Image = require( 'image!GRAPHING_LINES/Level_3.png' );
  var level4Image = require( 'image!GRAPHING_LINES/Level_4.png' );
  var level5Image = require( 'image!GRAPHING_LINES/Level_5.png' );
  var level6Image = require( 'image!GRAPHING_LINES/Level_6.png' );

  /**
   * @param {LineGameModel} model
   * @constructor
   */
  function LineGameView( model ) {
    BaseGameView.call( this, model, [ level1Image, level2Image, level3Image, level4Image, level5Image, level6Image ] );
  }

  graphingLines.register( 'LineGameView', LineGameView );

  return inherit( BaseGameView, LineGameView );
} );
