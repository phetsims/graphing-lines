// Copyright 2002-2013, University of Colorado Boulder

/**
 * Images loader for this simulation.
 * <p>
 * This object will be extended lazily after the image loader completes.
 * Makes it possible to load through the module system rather having to
 * pass as a parameter everywhere or resort to using a global.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function() {
  'use strict';
  return {
    imageNames: [
      'Check-Mark-u2713.png',
      'Game-icon.png',
      'Heavy-Ballot-X-u2718.png',
      'point_tool_body.png',
      'point_tool_tip.png',
      'PointSlope-icon.png',
      'reset_button_disabled.png',
      'reset_button_down.png',
      'reset_button_over.png',
      'reset_button_up.png',
      'Slope-icon.png',
      'SlopeIntercept-icon.png'
    ]
  };
} );