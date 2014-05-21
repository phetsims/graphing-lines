// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Point-Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var EquationControls = require( 'GRAPHING_LINES/common/view/EquationControls' );
  var GraphControls = require( 'GRAPHING_LINES/common/view/GraphControls' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsView = require( 'GRAPHING_LINES/common/view/LineFormsView' );
  var LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );
  var PointSlopeGraphNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeGraphNode' );

  /**
   * @param {PointSlopeModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function PointSlopeView( model ) {
    var viewProperties = new LineFormsViewProperties();
    LineFormsView.call( this, model, viewProperties,
      new PointSlopeGraphNode( model, viewProperties ),
      EquationControls.createPointSlopeEquationControls( model, viewProperties ),
      new GraphControls( viewProperties.linesVisibleProperty, viewProperties.slopeVisibleProperty, model.standardLines ) );
  }

  return inherit( LineFormsView, PointSlopeView );
} );