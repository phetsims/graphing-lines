// Copyright 2013-2019, University of Colorado Boulder

/**
 * The base type for the 'Line Game' view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GameAudioPlayer = require( 'VEGAS/GameAudioPlayer' );
  const GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  const GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PlayNode = require( 'GRAPHING_LINES/linegame/view/PlayNode' );
  const ResultsNode = require( 'GRAPHING_LINES/linegame/view/ResultsNode' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const SettingsNode = require( 'GRAPHING_LINES/linegame/view/SettingsNode' );

  /**
   * @param {BaseGameModel} model
   * @param {HTMLImageElement[][]} levelImages - grid of images for the level-selection buttons, ordered by level
   * @param {function[]} rewardFactoryFunctions - functions that create nodes for the game reward, ordered by level
   * @constructor
   */
  function BaseGameScreenView( model, levelImages, rewardFactoryFunctions ) {

    ScreenView.call( this, GLConstants.SCREEN_VIEW_OPTIONS );

    // sounds
    var audioPlayer = new GameAudioPlayer( model.soundEnabledProperty );

    // @private one parent node for each 'phase' of the game
    this.settingsNode = new SettingsNode( model, this.layoutBounds, levelImages );
    this.playNode = new PlayNode( model, this.layoutBounds, this.visibleBoundsProperty, audioPlayer );
    this.resultsNode = new ResultsNode( model, this.layoutBounds, audioPlayer, rewardFactoryFunctions );

    // rendering order
    this.addChild( this.resultsNode );
    this.addChild( this.playNode );
    this.addChild( this.settingsNode );

    // game 'phase' changes
    // unlink unnecessary because BaseGameScreenView exists for the lifetime of the sim.
    var self = this;
    model.gamePhaseProperty.link( function( gamePhase ) {
      self.settingsNode.visible = ( gamePhase === GamePhase.SETTINGS );
      self.playNode.visible = ( gamePhase === GamePhase.PLAY );
      self.resultsNode.visible = ( gamePhase === GamePhase.RESULTS );
    } );
  }

  graphingLines.register( 'BaseGameScreenView', BaseGameScreenView );

  return inherit( ScreenView, BaseGameScreenView, {

    // @public
    step: function( elapsedTime ) {
      if ( this.resultsNode.visible ) {
        this.resultsNode.step( elapsedTime );
      }
    }
  } );
} );