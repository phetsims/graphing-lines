// Copyright 2013-2019, University of Colorado Boulder

/**
 * Model for the 'Slope-Intercept' screen.
 * This is a specialization of the Point-Slope model.
 * x1 is fixed at zero, so that y1 is synonymous with y-intercept.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'GRAPHING_LINES/common/model/Line' );
  const PointSlopeModel = require( 'GRAPHING_LINES/pointslope/model/PointSlopeModel' );
  const SlopeInterceptParameterRange = require( 'GRAPHING_LINES/slopeintercept/model/SlopeInterceptParameterRange' );

  /**
   * @constructor
   */
  function SlopeInterceptModel() {
    PointSlopeModel.call( this, Line.createSlopeIntercept( 2, 3, 1, GLColors.INTERACTIVE_LINE ), new SlopeInterceptParameterRange() );
  }

  graphingLines.register( 'SlopeInterceptModel', SlopeInterceptModel );

  return inherit( PointSlopeModel, SlopeInterceptModel );
} );