// Copyright 2013-2020, University of Colorado Boulder

/**
 * The 'Line Game' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import GLColors from '../common/GLColors.js';
import GLIconFactory from '../common/view/GLIconFactory.js';
import graphingLinesStrings from '../graphing-lines-strings.js';
import graphingLines from '../graphingLines.js';
import LineGameModel from './model/LineGameModel.js';
import LineGameScreenView from './view/LineGameScreenView.js';

// strings
const screenLineGameString = graphingLinesStrings.screen.lineGame;

class LineGameScreen extends Screen {
  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      name: screenLineGameString,
      backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GLIconFactory.createGameScreenIcon(),
      tandem: tandem
    };

    super(
      () => new LineGameModel(),
      model => new LineGameScreenView( model ),
      options
    );
  }
}

graphingLines.register( 'LineGameScreen', LineGameScreen );

export default LineGameScreen;