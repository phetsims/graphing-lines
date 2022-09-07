// Copyright 2013-2022, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the 'settings' game phase. (See GamePhase.SETTINGS)
 * The displays a panel with controls used to configure a game.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimerToggleButton from '../../../../scenery-phet/js/buttons/TimerToggleButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text, VBox } from '../../../../scenery/js/imports.js';
import GLConstants from '../../common/GLConstants.js';
import graphingLines from '../../graphingLines.js';
import GraphingLinesStrings from '../../GraphingLinesStrings.js';
import LineGameLevelSelectionButtonGroup from './LineGameLevelSelectionButtonGroup.js';

class SettingsNode extends Node {

  /**
   * @param {LineGameModel} model
   * @param {Bounds2} layoutBounds
   * @param {HTMLImageElement[]} levelImages - images for the level-selection buttons, ordered by level
   * @param {Object} [options]
   */
  constructor( model, layoutBounds, levelImages, options ) {

    assert && assert( levelImages.length === model.numberOfLevels, 'one image is required for each game level' );

    options = merge( {
      levelSelectionButtonGroupOptions: {}
    }, options );

    // Title
    const title = new Text( GraphingLinesStrings.chooseYourLevel, {
      font: new PhetFont( 40 ),
      maxWidth: 0.85 * layoutBounds.width
    } );

    // Group of LevelSelectionButtons
    const levelSelectionButtonGroup = new LineGameLevelSelectionButtonGroup( model, levelImages, options.levelSelectionButtonGroupOptions );

    // Timer and Sound controls
    const timerToggleButton = new TimerToggleButton( model.timerEnabledProperty, {
      stroke: 'gray',
      scale: 1.3,
      left: GLConstants.SCREEN_X_MARGIN,
      bottom: layoutBounds.height - GLConstants.SCREEN_Y_MARGIN
    } );

    // Reset All button, at rightBottom
    const resetAllButton = new ResetAllButton( {
      listener: () => model.reset(),
      scale: GLConstants.RESET_ALL_BUTTON_SCALE,
      right: layoutBounds.width - GLConstants.SCREEN_X_MARGIN,
      bottom: layoutBounds.height - GLConstants.SCREEN_Y_MARGIN
    } );

    assert && assert( !options.children );
    options.children = [
      // title and level-selection buttons centered
      new VBox( {
        children: [ title, levelSelectionButtonGroup ],
        align: 'center',
        spacing: 50,
        center: layoutBounds.center
      } ),
      timerToggleButton,
      resetAllButton
    ];

    super( options );
  }
}

graphingLines.register( 'SettingsNode', SettingsNode );

export default SettingsNode;