// Copyright 2013-2020, University of Colorado Boulder

/**
 * The 'Point Slope' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import GLColors from '../common/GLColors.js';
import GLIconFactory from '../common/view/GLIconFactory.js';
import graphingLinesStrings from '../graphingLinesStrings.js';
import graphingLines from '../graphingLines.js';
import PointSlopeModel from './model/PointSlopeModel.js';
import PointSlopeScreenView from './view/PointSlopeScreenView.js';

// strings
const screenPointSlopeString = graphingLinesStrings.screen.pointSlope;

class PointSlopeScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      name: screenPointSlopeString,
      backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GLIconFactory.createPointSlopeScreenIcon(),
      tandem: tandem
    };

    super(
      () => new PointSlopeModel(),
      model => new PointSlopeScreenView( model ),
      options
    );
  }
}

graphingLines.register( 'PointSlopeScreen', PointSlopeScreen );

export default PointSlopeScreen;