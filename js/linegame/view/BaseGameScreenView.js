// Copyright 2013-2018, University of Colorado Boulder

/**
 * The base type for the 'Line Game' view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GameAudioPlayerOld = require( 'VEGAS/GameAudioPlayerOld' );
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PlayNode = require( 'GRAPHING_LINES/linegame/view/PlayNode' );
  var ResultsNode = require( 'GRAPHING_LINES/linegame/view/ResultsNode' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SettingsNode = require( 'GRAPHING_LINES/linegame/view/SettingsNode' );

  /**
   * @param {BaseGameModel} model
   * @param {HTMLImageElement[][]} levelImages - grid of images for the level-selection buttons, ordered by level
   * @param {function[]} rewardFactoryFunctions - functions that create nodes for the game reward, ordered by level
   * @constructor
   */
  function BaseGameScreenView( model, levelImages, rewardFactoryFunctions ) {

    ScreenView.call( this, GLConstants.SCREEN_VIEW_OPTIONS );

    // sounds
    var audioPlayer = new GameAudioPlayerOld( model.soundEnabledProperty );

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