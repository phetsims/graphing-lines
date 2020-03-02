// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Lines' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import graphingLinesStrings from './graphing-lines-strings.js';
import LineGameScreen from './linegame/LineGameScreen.js';
import PointSlopeScreen from './pointslope/PointSlopeScreen.js';
import SlopeScreen from './slope/SlopeScreen.js';
import SlopeInterceptScreen from './slopeintercept/SlopeInterceptScreen.js';

const graphingLinesTitleString = graphingLinesStrings[ 'graphing-lines' ].title;

// constants
const tandem = Tandem.ROOT;

const options = {
  credits: {
    leadDesign: 'Ariel Paul',
    softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
    team: 'Bryce Gruneich, Karina K. R. Hensberry, Patricia Loeblein, Amanda McGarry, Kathy Perkins',
    graphicArts: 'Megan Lai, Sharon Siman-Tov',
    qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Liam Mulhall, Oliver Orejola, Laura Rea, ' +
                      'Benjamin Roberts, Jacob Romero, Katie Woessner, Bryan Yoelin'
  }
};

SimLauncher.launch( () => {
  const screens = [
    new SlopeScreen( tandem.createTandem( 'slopeScreen' ) ),
    new SlopeInterceptScreen( tandem.createTandem( 'slopeInterceptScreen' ) ),
    new PointSlopeScreen( tandem.createTandem( 'pointSlopeScreen' ) ),
    new LineGameScreen( tandem.createTandem( 'lineGameScreen' ) )
  ];
  const sim = new Sim( graphingLinesTitleString, screens, options );
  sim.start();
} );