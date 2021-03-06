// Copyright 2013-2020, University of Colorado Boulder

/**
 * Graph that provides direct manipulation of a line in slope-intercept form.
 * Adds manipulators for slope and intercept to the base class functionality.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import LineFormsGraphNode from '../../common/view/LineFormsGraphNode.js';
import SlopeManipulator from '../../common/view/manipulator/SlopeManipulator.js';
import YInterceptManipulator from '../../common/view/manipulator/YInterceptManipulator.js';
import graphingLines from '../../graphingLines.js';
import SlopeInterceptEquationNode from './SlopeInterceptEquationNode.js';

class SlopeInterceptGraphNode extends LineFormsGraphNode {

  /**
   * @param {SlopeInterceptModel} model
   * @param {LineFormsViewProperties} viewProperties
   */
  constructor( model, viewProperties ) {

    super( model, viewProperties, SlopeInterceptEquationNode );

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
    viewProperties.linesVisibleProperty.link( linesVisible => {
      slopeManipulator.visible = yInterceptManipulator.visible = linesVisible;
    } );
  }
}

graphingLines.register( 'SlopeInterceptGraphNode', SlopeInterceptGraphNode );

export default SlopeInterceptGraphNode;