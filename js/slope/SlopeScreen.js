// Copyright 2013-2019, University of Colorado Boulder

/**
 * The 'Slope' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import GLColors from '../common/GLColors.js';
import GLIconFactory from '../common/view/GLIconFactory.js';
import graphingLinesStrings from '../graphing-lines-strings.js';
import graphingLines from '../graphingLines.js';
import SlopeModel from './model/SlopeModel.js';
import SlopeScreenView from './view/SlopeScreenView.js';

const screenSlopeString = graphingLinesStrings.screen.slope;

/**
 * @param {Tandem} tandem
 * @constructor
 */
function SlopeScreen( tandem ) {

  const options = {
    name: screenSlopeString,
    backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
    homeScreenIcon: GLIconFactory.createSlopeScreenIcon(),
    tandem: tandem
  };

  Screen.call( this,
    function() { return new SlopeModel(); },
    function( model ) { return new SlopeScreenView( model ); },
    options );
}

graphingLines.register( 'SlopeScreen', SlopeScreen );

inherit( Screen, SlopeScreen );
export default SlopeScreen;