// Copyright 2013-2020, University of Colorado Boulder

/**
 * The 'Slope-Intercept' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import merge from '../../../phet-core/js/merge.js';
import GLColors from '../common/GLColors.js';
import GLIconFactory from '../common/view/GLIconFactory.js';
import graphingLines from '../graphingLines.js';
import GraphingLinesStrings from '../GraphingLinesStrings.js';
import SlopeInterceptModel from './model/SlopeInterceptModel.js';
import SlopeInterceptScreenView from './view/SlopeInterceptScreenView.js';

class SlopeInterceptScreen extends Screen {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {

    options = merge( {
      name: GraphingLinesStrings.screen.slopeIntercept,
      backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GLIconFactory.createSlopeInterceptScreenIcon()
    }, options );

    assert && assert( !options.tandem, 'tandem is a constructor parameter' );
    options.tandem = tandem;

    super(
      () => new SlopeInterceptModel(),
      model => new SlopeInterceptScreenView( model ),
      options
    );
  }
}

graphingLines.register( 'SlopeInterceptScreen', SlopeInterceptScreen );

export default SlopeInterceptScreen;