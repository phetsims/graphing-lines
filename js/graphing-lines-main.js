// Copyright 2013-2022, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Lines' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import graphingLinesStrings from './graphingLinesStrings.js';
import LineGameScreen from './linegame/LineGameScreen.js';
import PointSlopeScreen from './pointslope/PointSlopeScreen.js';
import SlopeScreen from './slope/SlopeScreen.js';
import SlopeInterceptScreen from './slopeintercept/SlopeInterceptScreen.js';

const options = {
  credits: {
    leadDesign: 'Ariel Paul',
    softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
    team: 'Bryce Gruneich, Karina K. R. Hensberry, Patricia Loeblein, Amanda McGarry, Kathy Perkins',
    graphicArts: 'Megan Lai, Sharon Siman-Tov',
    qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Liam Mulhall, Oliver Orejola, Laura Rea, ' +
                      'Benjamin Roberts, Jacob Romero, Kathryn Woessner, Bryan Yoelin'
  }
};

simLauncher.launch( () => {
  const screens = [
    new SlopeScreen( Tandem.ROOT.createTandem( 'slopeScreen' ) ),
    new SlopeInterceptScreen( Tandem.ROOT.createTandem( 'slopeInterceptScreen' ) ),
    new PointSlopeScreen( Tandem.ROOT.createTandem( 'pointSlopeScreen' ) ),
    new LineGameScreen( Tandem.ROOT.createTandem( 'lineGameScreen' ) )
  ];
  const sim = new Sim( graphingLinesStrings[ 'graphing-lines' ].titleStringProperty, screens, options );
  sim.start();
} );