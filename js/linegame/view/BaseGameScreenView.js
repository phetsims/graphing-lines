// Copyright 2013-2023, University of Colorado Boulder

/**
 * The base type for the 'Line Game' view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import GameAudioPlayer from '../../../../vegas/js/GameAudioPlayer.js';
import GLConstants from '../../common/GLConstants.js';
import graphingLines from '../../graphingLines.js';
import GamePhase from '../model/GamePhase.js';
import PlayNode from './PlayNode.js';
import ResultsNode from './ResultsNode.js';
import SettingsNode from './SettingsNode.js';

export default class BaseGameScreenView extends ScreenView {

  /**
   * @param {BaseGameModel} model
   * @param {HTMLImageElement[]} levelImages - grid of images for the level-selection buttons, ordered by level
   * @param {function[]} rewardFactoryFunctions - functions that create nodes for the game reward, ordered by level
   * @param {Object} [options]
   */
  constructor( model, levelImages, rewardFactoryFunctions, options ) {

    options = merge( {
      settingsNodeOptions: {} // propagated to SettingsNode
    }, GLConstants.SCREEN_VIEW_OPTIONS, options );

    super( options );

    // sounds
    const audioPlayer = new GameAudioPlayer( model.soundEnabledProperty );

    // @private one parent node for each 'phase' of the game
    this.settingsNode = new SettingsNode( model, this.layoutBounds, levelImages, options.settingsNodeOptions );
    this.playNode = new PlayNode( model, this.layoutBounds, this.visibleBoundsProperty, audioPlayer );
    this.resultsNode = new ResultsNode( model, this.layoutBounds, audioPlayer, rewardFactoryFunctions );

    // rendering order
    this.addChild( this.resultsNode );
    this.addChild( this.playNode );
    this.addChild( this.settingsNode );

    // game 'phase' changes
    // unlink unnecessary because BaseGameScreenView exists for the lifetime of the sim.
    model.gamePhaseProperty.link( gamePhase => {
      this.settingsNode.visible = ( gamePhase === GamePhase.SETTINGS );
      this.playNode.visible = ( gamePhase === GamePhase.PLAY );
      this.resultsNode.visible = ( gamePhase === GamePhase.RESULTS );
    } );
  }

  // @public
  step( elapsedTime ) {
    if ( this.resultsNode.visible ) {
      this.resultsNode.step( elapsedTime );
    }
  }
}

graphingLines.register( 'BaseGameScreenView', BaseGameScreenView );