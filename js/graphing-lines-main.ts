// Copyright 2013-2023, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Lines' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import GraphingLinesStrings from './GraphingLinesStrings.js';
import LineGameScreen from './linegame/LineGameScreen.js';
import PointSlopeScreen from './pointslope/PointSlopeScreen.js';
import SlopeScreen from './slope/SlopeScreen.js';
import SlopeInterceptScreen from './slopeintercept/SlopeInterceptScreen.js';
import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import ClimberImages from './linegame/view/ClimberImages.js';

simLauncher.launch( () => {

  const titleStringProperty = GraphingLinesStrings[ 'graphing-lines' ].titleStringProperty;

  const preferencesModel = new PreferencesModel( {
    localizationOptions: {
      portrayals: ClimberImages.CLIMBER_PORTRAYALS
    }
  } );

  const regionAndCulturePortrayalProperty = preferencesModel.localizationModel.regionAndCulturePortrayalProperty!;
  assert && assert( regionAndCulturePortrayalProperty, 'expected regionAndCulturePortrayalProperty to exist' );

  const screens = [
    new SlopeScreen( Tandem.ROOT.createTandem( 'slopeScreen' ) ),
    new SlopeInterceptScreen( Tandem.ROOT.createTandem( 'slopeInterceptScreen' ) ),
    new PointSlopeScreen( Tandem.ROOT.createTandem( 'pointSlopeScreen' ) ),
    new LineGameScreen( regionAndCulturePortrayalProperty, Tandem.ROOT.createTandem( 'lineGameScreen' ) )
  ];

  const options = {
    preferencesModel: preferencesModel,
    credits: {
      leadDesign: 'Ariel Paul',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Bryce Gruneich, Karina K. R. Hensberry, Patricia Loeblein, Amanda McGarry, Kathy Perkins',
      graphicArts: 'Megan Lai, Sharon Siman-Tov',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Liam Mulhall, Oliver Orejola, Laura Rea, ' +
                        'Benjamin Roberts, Jacob Romero, Kathryn Woessner, Bryan Yoelin'
    }
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );