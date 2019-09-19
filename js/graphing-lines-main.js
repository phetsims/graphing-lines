// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Lines' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const LineGameScreen = require( 'GRAPHING_LINES/linegame/LineGameScreen' );
  const PointSlopeScreen = require( 'GRAPHING_LINES/pointslope/PointSlopeScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const SlopeInterceptScreen = require( 'GRAPHING_LINES/slopeintercept/SlopeInterceptScreen' );
  const SlopeScreen = require( 'GRAPHING_LINES/slope/SlopeScreen' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const graphingLinesTitleString = require( 'string!GRAPHING_LINES/graphing-lines.title' );

  // constants
  var tandem = Tandem.rootTandem;

  var options = {
    credits: {
      leadDesign: 'Ariel Paul',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Bryce Gruneich, Karina K. R. Hensberry, Patricia Loeblein, Amanda McGarry, Kathy Perkins',
      graphicArts: 'Megan Lai, Sharon Siman-Tov',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Liam Mulhall, Oliver Orejola, Laura Rea, ' +
                        'Benjamin Roberts, Jacob Romero, Katie Woessner, Bryan Yoelin'
    },
    supportsSound: true
  };

  SimLauncher.launch( function() {
    var screens = [
      new SlopeScreen( tandem.createTandem( 'slopeScreen' ) ),
      new SlopeInterceptScreen( tandem.createTandem( 'slopeInterceptScreen' ) ),
      new PointSlopeScreen( tandem.createTandem( 'pointSlopeScreen' ) ),
      new LineGameScreen( tandem.createTandem( 'lineGameScreen' ) )
    ];
    var sim = new Sim( graphingLinesTitleString, screens, options );
    sim.start();
  } );
} );