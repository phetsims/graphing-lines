// Copyright 2015, University of Colorado Boulder

/**
 * Used to indicate that a guess in the game is not a line.
 * Occurs when the guess involves more than 2 points.
 * In this situation, we want to know that the user's guess has changed,
 * so a new object instance is required to trigger notifications.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );

  function NotALine() {}

  graphingLines.register( 'NotALine', NotALine );

  return inherit( Object, NotALine );
} );
