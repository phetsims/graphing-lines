// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Beer's Law Lab' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var LineGameScreen = require( 'GRAPHING_LINES/linegame/LineGameScreen' );
  var PointSlopeScreen = require( 'GRAPHING_LINES/pointSlope/PointSlopeScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var SlopeInterceptScreen = require( 'GRAPHING_LINES/slopeIntercept/SlopeInterceptScreen' );
  var SlopeScreen = require( 'GRAPHING_LINES/slope/SlopeScreen' );

  // strings
  var simTitle = require( 'string!GRAPHING_LINES/graphing-lines.name' );

  var simOptions = {
    credits: {
      leadDesign: 'Ariel Paul',
      softwareDevelopment: 'Chris Malley',
      designTeam: 'Karina Hensberry, Patricia Loeblein, Kathy Perkins'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
      showHomeScreen: false,
      screenIndex: 3
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [
      new SlopeScreen(), new SlopeInterceptScreen(), new PointSlopeScreen(), new LineGameScreen() ],
      simOptions );
    sim.start();
  } );
} );