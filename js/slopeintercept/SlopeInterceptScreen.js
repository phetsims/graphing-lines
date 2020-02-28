// Copyright 2013-2020, University of Colorado Boulder

/**
 * The 'Slope-Intercept' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import merge from '../../../phet-core/js/merge.js';
import GLColors from '../common/GLColors.js';
import GLIconFactory from '../common/view/GLIconFactory.js';
import graphingLinesStrings from '../graphing-lines-strings.js';
import graphingLines from '../graphingLines.js';
import SlopeInterceptModel from './model/SlopeInterceptModel.js';
import SlopeInterceptScreenView from './view/SlopeInterceptScreenView.js';

const screenSlopeInterceptString = graphingLinesStrings.screen.slopeIntercept;

/**
 * @param {Tandem} tandem
 * @param {Object} [options]
 * @constructor
 */
function SlopeInterceptScreen( tandem, options ) {

  options = merge( {
    name: screenSlopeInterceptString,
    backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
    homeScreenIcon: GLIconFactory.createSlopeInterceptScreenIcon()
  }, options );

  assert && assert( !options.tandem, 'tandem is a constructor parameter' );
  options.tandem = tandem;

  Screen.call( this,
    function() { return new SlopeInterceptModel(); },
    function( model ) { return new SlopeInterceptScreenView( model ); },
    options );
}

graphingLines.register( 'SlopeInterceptScreen', SlopeInterceptScreen );

inherit( Screen, SlopeInterceptScreen );
export default SlopeInterceptScreen;