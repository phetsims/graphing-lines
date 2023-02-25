// Copyright 2013-2023, University of Colorado Boulder

// @ts-nocheck
/**
 * The 'Slope-Intercept' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import GLColors from '../common/GLColors.js';
import GLIconFactory from '../common/view/GLIconFactory.js';
import graphingLines from '../graphingLines.js';
import GraphingLinesStrings from '../GraphingLinesStrings.js';
import SlopeInterceptModel from './model/SlopeInterceptModel.js';
import SlopeInterceptScreenView from './view/SlopeInterceptScreenView.js';

export default class SlopeInterceptScreen extends Screen {

  /**
   * @param {Tandem} tandem
   * @param {Property} [backgroundColorProperty]
   */
  constructor( tandem, backgroundColorProperty = new Property( GLColors.SCREEN_BACKGROUND ) ) {

    const options = {
      name: GraphingLinesStrings.screen.slopeInterceptStringProperty,
      backgroundColorProperty: backgroundColorProperty,
      homeScreenIcon: GLIconFactory.createSlopeInterceptScreenIcon(),
      tandem: tandem
    };

    super(
      () => new SlopeInterceptModel(),
      model => new SlopeInterceptScreenView( model ),
      options
    );
  }
}

graphingLines.register( 'SlopeInterceptScreen', SlopeInterceptScreen );