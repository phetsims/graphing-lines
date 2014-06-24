// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GameAudioPlayer = require( 'VEGAS/GameAudioPlayer' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PlayNode = require( 'GRAPHING_LINES/linegame/view/PlayNode' );
  var ResultsNode = require( 'GRAPHING_LINES/linegame/view/ResultsNode' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SettingsNode = require( 'GRAPHING_LINES/linegame/view/SettingsNode' );

  /**
   * @param {LineGameModel} model
   * @constructor
   */
  function LineGameView( model ) {

    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );

    // audio
    var audioPlayer = new GameAudioPlayer( model.soundEnabledProperty );

    // one parent node for each "phase" of the game
    thisView.settingsNode = new SettingsNode( model, thisView.layoutBounds.width, { center: thisView.layoutBounds.center } );
    thisView.playNode = new PlayNode( model, thisView.layoutBounds, audioPlayer );
    thisView.resultsNode = new ResultsNode( model, thisView.layoutBounds );

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
        if ( model.score === model.getPerfectScore() ) {
          audioPlayer.gameOverPerfectScore();
        }
        else {
          audioPlayer.gameOverImperfectScore();
        }
      }
    } );
  }

  return inherit( ScreenView, LineGameView, { layoutBounds: GLConstants.LAYOUT_BOUNDS } );
} );