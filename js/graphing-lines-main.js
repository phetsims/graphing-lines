// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the 'Graphing Lines' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLQueryParameters = require( 'GRAPHING_LINES/common/GLQueryParameters' );
  var LineGameScreen = require( 'GRAPHING_LINES/linegame/LineGameScreen' );
  var PointSlopeScreen = require( 'GRAPHING_LINES/pointSlope/PointSlopeScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var SlopeInterceptScreen = require( 'GRAPHING_LINES/slopeIntercept/SlopeInterceptScreen' );
  var SlopeScreen = require( 'GRAPHING_LINES/slope/SlopeScreen' );

  // strings
  var simTitle = require( 'string!GRAPHING_LINES/graphing-lines.name' );

  var screens = [ new SlopeScreen(), new SlopeInterceptScreen(), new PointSlopeScreen(), new LineGameScreen() ];

  var options = {
    credits: {
      leadDesign: 'Ariel Paul',
      softwareDevelopment: 'Chris Malley',
      team: 'Bryce Gruneich, Karina K. R. Hensberry, Patricia Loeblein,\nAmanda McGarry, Kathy Perkins',
      graphicArts: 'Sharon Siman-Tov'
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, screens, options );
    sim.start();
  } );
} );