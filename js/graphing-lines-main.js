// Copyright 2013-2017, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Lines' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var LineGameScreen = require( 'GRAPHING_LINES/linegame/LineGameScreen' );
  var PointSlopeScreen = require( 'GRAPHING_LINES/pointslope/PointSlopeScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var SlopeInterceptScreen = require( 'GRAPHING_LINES/slopeintercept/SlopeInterceptScreen' );
  var SlopeScreen = require( 'GRAPHING_LINES/slope/SlopeScreen' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var graphingLinesTitleString = require( 'string!GRAPHING_LINES/graphing-lines.title' );

  // constants
  var tandem = Tandem.createRootTandem();

  var options = {
    credits: {
      leadDesign: 'Ariel Paul',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Bryce Gruneich, Karina K. R. Hensberry, Patricia Loeblein, Amanda McGarry, Kathy Perkins',
      graphicArts: 'Sharon Siman-Tov',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Oliver Orejola, Benjamin Roberts, Bryan Yoelin'
    }
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