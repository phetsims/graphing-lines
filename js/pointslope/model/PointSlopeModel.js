// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Point-Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsModel = require( 'common/model/LineFormsModel' );
  var PointSlopeParameterRange = require( 'pointslope/model/PointSlopeParameterRange' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );

  /**
   * @param {Line} interactiveLine
   * @param {PointSlopeParameterRange} parameterRange optional
   * @constructor
   */
  function PointSlopeModel( interactiveLine, parameterRange ) {

    parameterRange = parameterRange || new PointSlopeParameterRange();

    var thisModel = this;

    LineFormsModel.call( thisModel, interactiveLine );

    // ranges
    thisModel.x1Range = new Property( new Range( thisModel.graph.xRange ) );
    thisModel.y1Range = new Property( new Range( thisModel.graph.yRange ) );
    thisModel.riseRange = new Property( new Range( thisModel.graph.yRange ) );
    thisModel.runRange = new Property( new Range( thisModel.graph.xRange ) );

    // Dynamically adjust ranges so that variables are constrained to the bounds of the graph.
    thisModel.interactiveLine.link( function( line ) {
      thisModel.x1Range.set( parameterRange.x1( line, thisModel.graph ) );
      thisModel.y1Range.set( parameterRange.y1( line, thisModel.graph ) );
      thisModel.riseRange.set( parameterRange.rise( line, thisModel.graph ) );
      thisModel.runRange.set( parameterRange.run( line, thisModel.graph ) );
    } );
  }

  return inherit( LineFormsModel, PointSlopeModel, {
    step: function( deltaSeconds ) { /* do nothing */ }
  });
} );