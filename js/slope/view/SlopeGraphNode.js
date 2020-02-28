// Copyright 2013-2020, University of Colorado Boulder

/**
 * Graph that provides direct manipulation of a line in point-slope form.
 * Adds manipulators for (x1,y1) and (x2,y2) to the base class functionality.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import LineFormsGraphNode from '../../common/view/LineFormsGraphNode.js';
import X1Y1Manipulator from '../../common/view/manipulator/X1Y1Manipulator.js';
import X2Y2Manipulator from '../../common/view/manipulator/X2Y2Manipulator.js';
import graphingLines from '../../graphingLines.js';
import SlopeEquationNode from './SlopeEquationNode.js';

/**
 * @param {SlopeModel} model
 * @param {LineFormsViewProperties} viewProperties
 * @constructor
 */
function SlopeGraphNode( model, viewProperties ) {

  LineFormsGraphNode.call( this, model, viewProperties, SlopeEquationNode );

  const manipulatorRadius = model.modelViewTransform.modelToViewDeltaX( model.manipulatorRadius );

  // (x1,y1) point manipulator
  const x1y1Manipulator = new X1Y1Manipulator(
    manipulatorRadius, model.interactiveLineProperty, model.x1RangeProperty, model.y1RangeProperty, model.modelViewTransform, false /* constantSlope */ );

  // (x2,y2) point manipulator
  const x2y2Manipulator = new X2Y2Manipulator(
    manipulatorRadius, model.interactiveLineProperty, model.x2RangeProperty, model.y2RangeProperty, model.modelViewTransform );

  // rendering order
  this.addChild( x1y1Manipulator );
  this.addChild( x2y2Manipulator );

  // visibility of manipulators
  // unlink unnecessary because SlopeGraphNode exists for the lifetime of the sim.
  viewProperties.linesVisibleProperty.link( function( linesVisible ) {
    x1y1Manipulator.visible = x2y2Manipulator.visible = linesVisible;
  } );
}

graphingLines.register( 'SlopeGraphNode', SlopeGraphNode );

inherit( LineFormsGraphNode, SlopeGraphNode );
export default SlopeGraphNode;