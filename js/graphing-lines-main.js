// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Beer's Law Lab' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
require( [
  'JOIST/SimLauncher',
  'JOIST/Sim',
  'slope/SlopeScreen',
  'slopeIntercept/SlopeInterceptScreen',
  'pointSlope/PointSlopeScreen',
  'game/GameScreen',
  'common/GLStrings',
  'common/GLImages' ],
  function( SimLauncher, Sim, SlopeScreen, SlopeInterceptScreen, PointSlopeScreen, GameScreen, GLStrings, GLImages ) {
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
      }, simOptions );
    }

    SimLauncher.launch( GLImages, function() {
      var sim = new Sim( GLStrings[ "tab.slope" ], [
        new SlopeScreen(), new SlopeInterceptScreen(), new PointSlopeScreen(), new GameScreen() ],
        simOptions );
      sim.start();
    } );
  } );
