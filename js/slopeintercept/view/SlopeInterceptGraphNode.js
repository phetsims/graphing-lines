// Copyright 2013-2019, University of Colorado Boulder

/**
 * Graph that provides direct manipulation of a line in slope-intercept form.
 * Adds manipulators for slope and intercept to the base class functionality.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LineFormsGraphNode = require( 'GRAPHING_LINES/common/view/LineFormsGraphNode' );
  const SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );
  const SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  const YInterceptManipulator = require( 'GRAPHING_LINES/common/view/manipulator/YInterceptManipulator' );

  /**
   * @param {SlopeInterceptModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function SlopeInterceptGraphNode( model, viewProperties ) {

    LineFormsGraphNode.call( this, model, viewProperties, SlopeInterceptEquationNode );

    const manipulatorRadius = model.modelViewTransform.modelToViewDeltaX( model.manipulatorRadius );

    // slope manipulator
    const slopeManipulator = new SlopeManipulator(
      manipulatorRadius, model.interactiveLineProperty, model.riseRangeProperty, model.runRangeProperty, model.modelViewTransform );

    // intercept manipulator
    const yInterceptManipulator = new YInterceptManipulator(
      manipulatorRadius, model.interactiveLineProperty, model.y1RangeProperty, model.modelViewTransform );

    // rendering order
    this.addChild( slopeManipulator );
    this.addChild( yInterceptManipulator );

    // visibility of manipulators
    // unlink unnecessary because SlopeInterceptGraphNode exists for the lifetime of the sim.
    viewProperties.linesVisibleProperty.link( function( linesVisible ) {
      slopeManipulator.visible = yInterceptManipulator.visible = linesVisible;
    } );
  }

  graphingLines.register( 'SlopeInterceptGraphNode', SlopeInterceptGraphNode );

  return inherit( LineFormsGraphNode, SlopeInterceptGraphNode );
} );