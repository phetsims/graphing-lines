// Copyright 2013-2022, University of Colorado Boulder

/**
 * The 'Slope' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import GLColors from '../common/GLColors.js';
import GLIconFactory from '../common/view/GLIconFactory.js';
import graphingLines from '../graphingLines.js';
import GraphingLinesStrings from '../GraphingLinesStrings.js';
import SlopeModel from './model/SlopeModel.js';
import SlopeScreenView from './view/SlopeScreenView.js';

class SlopeScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      name: GraphingLinesStrings.screen.slope,
      backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GLIconFactory.createSlopeScreenIcon(),
      tandem: tandem
    };

    super(
      () => new SlopeModel(),
      model => new SlopeScreenView( model ),
      options
    );
  }
}

graphingLines.register( 'SlopeScreen', SlopeScreen );

export default SlopeScreen;