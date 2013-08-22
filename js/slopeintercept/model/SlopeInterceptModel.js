// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Slope-Intercept' screen.
 * This is a specialization of the Point-Slope model.
 * x1 is fixed at zero, so that y1 is synonymous with y-intercept.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'common/model/Line' );
  var PointSlopeModel = require( 'pointslope/model/PointSlopeModel' );
  var SlopeInterceptParameterRange = require( 'slopeintercept/model/SlopeInterceptParameterRange' );

  function SlopeInterceptModel() {
    PointSlopeModel.call( this, Line.createSlopeIntercept( 2, 3, 1, GLColors.INTERACTIVE_LINE ), new SlopeInterceptParameterRange() );
  }

  return inherit( PointSlopeModel, SlopeInterceptModel );
} );