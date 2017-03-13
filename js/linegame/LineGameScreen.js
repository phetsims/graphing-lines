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
  var LineGameScreenView = require( 'GRAPHING_LINES/linegame/view/LineGameScreenView' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenLineGameString = require( 'string!GRAPHING_LINES/screen.lineGame' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function LineGameScreen( tandem ) {

    var options = {
      name: screenLineGameString,
      backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GLIconFactory.createGameScreenIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new LineGameModel(); },
      function( model ) { return new LineGameScreenView( model ); },
      options );
  }

  graphingLines.register( 'LineGameScreen', LineGameScreen );

  return inherit( Screen, LineGameScreen );
} );