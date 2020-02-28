// Copyright 2013-2020, University of Colorado Boulder

/**
 * The 'Line Game' screen. Conforms to the contract specified in joist/Screen.
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
import LineGameModel from './model/LineGameModel.js';
import LineGameScreenView from './view/LineGameScreenView.js';

const screenLineGameString = graphingLinesStrings.screen.lineGame;

/**
 * @param {Tandem} tandem
 * @constructor
 */
function LineGameScreen( tandem ) {

  const options = {
    name: screenLineGameString,
    backgroundColorProperty: new Property( GLColors.SCREEN_BACKGROUND ),
    homeScreenIcon: GLIconFactory.createGameScreenIcon(),
    tandem: tandem
  };

  Screen.call( this,
    function() { return new LineGameModel(); },
    function( model ) { return new LineGameScreenView( model ); },
    options );
}

graphingLines.register( 'LineGameScreen', LineGameScreen );

inherit( Screen, LineGameScreen );
export default LineGameScreen;