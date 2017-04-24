// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the 'Slope-Intercept' screen.
 * This is a specialization of the Point-Slope model.
 * x1 is fixed at zero, so that y1 is synonymous with y-intercept.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var PointSlopeModel = require( 'GRAPHING_LINES/pointslope/model/PointSlopeModel' );
  var SlopeInterceptParameterRange = require( 'GRAPHING_LINES/slopeintercept/model/SlopeInterceptParameterRange' );

  /**
   * @constructor
   */
  function SlopeInterceptModel() {
    PointSlopeModel.call( this, Line.createSlopeIntercept( 2, 3, 1, GLColors.INTERACTIVE_LINE ), new SlopeInterceptParameterRange() );
  }

  graphingLines.register( 'SlopeInterceptModel', SlopeInterceptModel );

  return inherit( PointSlopeModel, SlopeInterceptModel );
} );