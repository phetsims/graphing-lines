// Copyright 2013-2015, University of Colorado Boulder

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
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
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

    ScreenView.call( this, GLConstants.SCREEN_VIEW_OPTIONS );

    // audio
    var audioPlayer = new GameAudioPlayer( model.soundEnabledProperty );

    // @private one parent node for each 'phase' of the game
    this.settingsNode = new SettingsNode( model, this.layoutBounds );
    this.playNode = new PlayNode( model, this.layoutBounds, audioPlayer );
    this.resultsNode = new ResultsNode( model, this.layoutBounds, audioPlayer );

    // rendering order
    this.addChild( this.resultsNode );
    this.addChild( this.playNode );
    this.addChild( this.settingsNode );

    // game 'phase' changes
    var self = this;
    model.gamePhaseProperty.link( function( gamePhase ) {
      self.settingsNode.visible = ( gamePhase === GamePhase.SETTINGS );
      self.playNode.visible = ( gamePhase === GamePhase.PLAY );
      self.resultsNode.visible = ( gamePhase === GamePhase.RESULTS );
    } );
  }

  graphingLines.register( 'LineGameView', LineGameView );

  return inherit( ScreenView, LineGameView, {

    // @public
    step: function( elapsedTime ) {
      if ( this.resultsNode.visible ) {
        this.resultsNode.step( elapsedTime );
      }
    }
  } );
} );