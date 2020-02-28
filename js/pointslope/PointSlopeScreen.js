// Copyright 2013-2020, University of Colorado Boulder

/**
 * The 'Point Slope' screen. Conforms to the contract specified in joist/Screen.
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
import PointSlopeModel from './model/PointSlopeModel.js';
import PointSlopeScreenView from './view/PointSlopeScreenView.js';

const screenPointSlopeString = graphingLinesStrings.screen.pointSlope;

/**
 * @param {Tandem} tandem
 * @constructor
 */
function PointSlopeScreen( tandem ) {

  const options = {
    name: screenPointSlopeString,
    backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
    homeScreenIcon: GLIconFactory.createPointSlopeScreenIcon(),
    tandem: tandem
  };

  Screen.call( this,
    function() { return new PointSlopeModel(); },
    function( model ) { return new PointSlopeScreenView( model ); },
    options );
}

graphingLines.register( 'PointSlopeScreen', PointSlopeScreen );

inherit( Screen, PointSlopeScreen );
export default PointSlopeScreen;