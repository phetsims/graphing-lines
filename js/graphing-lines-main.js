// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Beer's Law Lab' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
require( [
  'JOIST/SimLauncher',
  'JOIST/Sim',
  'GRAPHING_LINES/slope/SlopeScreen',
  'GRAPHING_LINES/slopeIntercept/SlopeInterceptScreen',
  'GRAPHING_LINES/pointSlope/PointSlopeScreen',
  'GRAPHING_LINES/linegame/LineGameScreen',
  'GRAPHING_LINES/common/GLStrings' ],
  function( SimLauncher, Sim, SlopeScreen, SlopeInterceptScreen, PointSlopeScreen, LineGameScreen, GLStrings ) {
    'use strict';

    //TODO i18n?
    var simOptions = {
      credits: 'PhET Development Team -\n' +
               'Lead Design: Ariel Paul\n' +
               'Software Development: Chris Malley\n' +
               'Design Team: Karina Hensberry, Patricia Loeblein, Kathy Perkins'
    };

    // Appending '?dev' to the URL will enable developer-only features.
    if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
      simOptions = _.extend( {
        // add dev-specific options here
//        showHomeScreen: false,
//        screenIndex: 2
      }, simOptions );
    }

    SimLauncher.launch( {imageNames: []}, function() {
      var sim = new Sim( GLStrings[ "graphing-lines.name" ], [
        new SlopeScreen(), new SlopeInterceptScreen(), new PointSlopeScreen(), new LineGameScreen() ],
        simOptions );
      sim.start();
    } );
  } );
