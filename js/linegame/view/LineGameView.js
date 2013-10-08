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
  var Dimension2 = require( 'DOT/Dimension2' );
  var GameAudioPlayer = require( 'GRAPHING_LINES/linegame/view/GameAudioPlayer' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PlayNode = require( 'GRAPHING_LINES/linegame/view/PlayNode' );
  var ResultsNode = require( 'GRAPHING_LINES/linegame/view/ResultsNode' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SettingsNode = require( 'GRAPHING_LINES/linegame/view/SettingsNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {LineGameModel} model
   * @constructor
   */
  function LineGameView( model ) {

    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );

    // audio
    var audioPlayer = new GameAudioPlayer( model.settings.soundEnabledProperty );

    // one parent node for each "phase" of the game
    var playAreaSize = new Dimension2( thisView.layoutBounds.width, thisView.layoutBounds.height );
    thisView.settingsNode = new SettingsNode( model, playAreaSize );
    thisView.playNode = new PlayNode( model, playAreaSize, audioPlayer );
    thisView.resultsNode = new ResultsNode( model, playAreaSize );

    // rendering order
    thisView.addChild( thisView.resultsNode );
    thisView.addChild( thisView.playNode );
    thisView.addChild( thisView.settingsNode );

    // game "phase" changes
    model.gamePhaseProperty.link( function( gamePhase ) {

      // visibility of scenegraph branches
      thisView.settingsNode.visible = ( gamePhase === GamePhase.SETTINGS );
      thisView.playNode.visible = ( gamePhase === GamePhase.PLAY );
      thisView.resultsNode.visible = ( gamePhase === GamePhase.RESULTS );

      // play audio when game ends
      if ( gamePhase === GamePhase.RESULTS ) {
        if ( model.results.scoreProperty.get() === model.getPerfectScore() ) {
          audioPlayer.gameOverPerfectScore();
        }
        else {
          audioPlayer.gameOverImperfectScore();
        }
      }
    } );

    //TODO add functionality to adjust the bounds of the reward, see java.LineGameCanvas
  }

  return inherit( ScreenView, LineGameView, { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) } );
} );