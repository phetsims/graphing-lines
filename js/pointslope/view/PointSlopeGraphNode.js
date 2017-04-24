// Copyright 2013-2015, University of Colorado Boulder

/**
 * Graph that provides direct manipulation of a line in point-slope form.
 * Extends the base type by adding manipulators for point and slope.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsGraphNode = require( 'GRAPHING_LINES/common/view/LineFormsGraphNode' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );
  var SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  var X1Y1Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X1Y1Manipulator' );

  /**
   * @param {PointSlopeModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function PointSlopeGraphNode( model, viewProperties ) {

    LineFormsGraphNode.call( this, model, viewProperties, PointSlopeEquationNode );

    var manipulatorRadius = model.modelViewTransform.modelToViewDeltaX( model.manipulatorRadius );

    // (x1,y1) point manipulator
    var x1y1Manipulator = new X1Y1Manipulator(
      manipulatorRadius, model.interactiveLineProperty, model.x1RangeProperty, model.y1RangeProperty, model.modelViewTransform, true /* constantSlope */ );

    // slope manipulator
    var slopeManipulator = new SlopeManipulator(
      manipulatorRadius, model.interactiveLineProperty, model.riseRangeProperty, model.runRangeProperty, model.modelViewTransform );

    // rendering order
    this.addChild( x1y1Manipulator );
    this.addChild( slopeManipulator );

    // visibility of manipulators
    // unlink unnecessary because PointSlopeGraphNode exists for the lifetime of the sim.
    viewProperties.linesVisibleProperty.link( function( linesVisible ) {
      x1y1Manipulator.visible = slopeManipulator.visible = linesVisible;
    } );
  }

  graphingLines.register( 'PointSlopeGraphNode', PointSlopeGraphNode );

  return inherit( LineFormsGraphNode, PointSlopeGraphNode );
} );
