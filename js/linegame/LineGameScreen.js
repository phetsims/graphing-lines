// Copyright 2013-2015, University of Colorado Boulder

/**
 * The 'Line Game' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLIconFactory = require( 'GRAPHING_LINES/common/view/GLIconFactory' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameModel = require( 'GRAPHING_LINES/linegame/model/LineGameModel' );
  var LineGameView = require( 'GRAPHING_LINES/linegame/view/LineGameView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenLineGameString = require( 'string!GRAPHING_LINES/screen.lineGame' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function LineGameScreen( tandem ) {
    Screen.call( this, screenLineGameString, GLIconFactory.createGameScreenIcon(),
      function() { return new LineGameModel(); },
      function( model ) { return new LineGameView( model ); }, {
        backgroundColor: GLColors.SCREEN_BACKGROUND,
        tandem: tandem
      }
    );
  }

  graphingLines.register( 'LineGameScreen', LineGameScreen );

  return inherit( Screen, LineGameScreen );
} );