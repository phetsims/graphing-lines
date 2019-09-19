// Copyright 2013-2017, University of Colorado Boulder

/**
 * The 'Line Game' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  const GLIconFactory = require( 'GRAPHING_LINES/common/view/GLIconFactory' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LineGameModel = require( 'GRAPHING_LINES/linegame/model/LineGameModel' );
  const LineGameScreenView = require( 'GRAPHING_LINES/linegame/view/LineGameScreenView' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenLineGameString = require( 'string!GRAPHING_LINES/screen.lineGame' );

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