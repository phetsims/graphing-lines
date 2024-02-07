// Copyright 2013-2023, University of Colorado Boulder

/**
 * The 'Line Game' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GLColors from '../common/GLColors.js';
import GLIconFactory from '../common/view/GLIconFactory.js';
import graphingLines from '../graphingLines.js';
import GraphingLinesStrings from '../GraphingLinesStrings.js';
import LineGameModel from './model/LineGameModel.js';
import LineGameScreenView from './view/LineGameScreenView.js';
import PreferencesModel from '../../../joist/js/preferences/PreferencesModel.js';

export default class LineGameScreen extends Screen<LineGameModel, LineGameScreenView> {

  public constructor( preferencesModel: PreferencesModel, tandem: Tandem ) {

    const options = {
      name: GraphingLinesStrings.screen.lineGameStringProperty,
      backgroundColorProperty: GLColors.screenBackgroundColorProperty,
      homeScreenIcon: GLIconFactory.createGameScreenIcon(),
      tandem: tandem
    };

    super(
      () => new LineGameModel( preferencesModel, tandem.createTandem( 'model' ) ),
      model => new LineGameScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

graphingLines.register( 'LineGameScreen', LineGameScreen );