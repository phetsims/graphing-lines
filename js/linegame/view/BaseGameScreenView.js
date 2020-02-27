// Copyright 2013-2019, University of Colorado Boulder

/**
 * The base type for the 'Line Game' view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import inherit from '../../../../phet-core/js/inherit.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import GLConstants from '../../common/GLConstants.js';
import graphingLines from '../../graphingLines.js';
import GamePhase from '../model/GamePhase.js';
import PlayNode from './PlayNode.js';
import ResultsNode from './ResultsNode.js';
import SettingsNode from './SettingsNode.js';

/**
 * @param {BaseGameModel} model
 * @param {HTMLImageElement[][]} levelImages - grid of images for the level-selection buttons, ordered by level
 * @param {function[]} rewardFactoryFunctions - functions that create nodes for the game reward, ordered by level
 * @constructor
 */
function BaseGameScreenView( model, levelImages, rewardFactoryFunctions ) {

  ScreenView.call( this, GLConstants.SCREEN_VIEW_OPTIONS );

  // sounds
  const audioPlayer = new GameAudioPlayer( model.soundEnabledProperty );

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
  const self = this;
  model.gamePhaseProperty.link( function( gamePhase ) {
    self.settingsNode.visible = ( gamePhase === GamePhase.SETTINGS );
    self.playNode.visible = ( gamePhase === GamePhase.PLAY );
    self.resultsNode.visible = ( gamePhase === GamePhase.RESULTS );
  } );
}

graphingLines.register( 'BaseGameScreenView', BaseGameScreenView );

export default inherit( ScreenView, BaseGameScreenView, {

  // @public
  step: function( elapsedTime ) {
    if ( this.resultsNode.visible ) {
      this.resultsNode.step( elapsedTime );
    }
  }
} );