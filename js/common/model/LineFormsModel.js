// Copyright 2013-2020, University of Colorado Boulder

/**
 * Base type for the 'Slope', 'Slope-Intercept' and 'Point-Slope' models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import createObservableArray from '../../../../axon/js/createObservableArray.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import graphingLines from '../../graphingLines.js';
import GLConstants from '../GLConstants.js';
import Graph from './Graph.js';
import PointTool from './PointTool.js';

// constants
const GRID_VIEW_UNITS = 530; // max dimension (width or height) of the grid in view coordinates
const ORIGIN_OFFSET = new Vector2( 315, 330 ); // offset of the graph's origin in view coordinates

class LineFormsModel {

  /**
   * @param {Line} interactiveLine
   */
  constructor( interactiveLine ) {

    // @public {Property.<Line>} the line that the user interacts with
    this.interactiveLineProperty = new Property( interactiveLine );

    // @public (read-only) radius of the manipulators
    this.manipulatorRadius = GLConstants.MANIPULATOR_RADIUS;

    // @public graph
    this.graph = new Graph( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );

    // @public model-view transform, created in the model because it's dependent on graph axes ranges
    const modelViewTransformScale = GRID_VIEW_UNITS / Math.max( this.graph.xRange.getLength(), this.graph.yRange.getLength() ); // view units / model units
    this.modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( ORIGIN_OFFSET, modelViewTransformScale, -modelViewTransformScale ); // y is inverted

    // @public static lines
    this.savedLines = createObservableArray();
    this.standardLines = createObservableArray();

    // Update the lines seen by the graph.
    // unmultilink is unnecessary because we own these Properties, and the model exists for the lifetime of the sim.
    Property.multilink(
      [ this.interactiveLineProperty, this.savedLines.lengthProperty, this.standardLines.lengthProperty ],
      () => {
        this.graph.lines.clear();

        // Add lines in the order that PointTool will see them: interactiveLine, standardLines, savedLines
        // This should match the order of rendering in LineFormsGraphNode.
        this.graph.lines.add( this.interactiveLineProperty.get() );
        this.standardLines.forEach( line => this.graph.lines.add( line ) );
        this.savedLines.forEach( line => this.graph.lines.add( line ) );
      }
    );

    // @public point tools, drag bounds determined by 'eye balling' so that the point tool nodes remain on screen.
    this.pointTool1 = new PointTool( new Vector2( -5, -10.5 ), 'up', this.graph.lines,
      new Bounds2( this.graph.xRange.min - 1, this.graph.yRange.min - 1, this.graph.xRange.max + 3, this.graph.yRange.max + 3 ) );
    this.pointTool2 = new PointTool( new Vector2( 3, -13 ), 'down', this.graph.lines,
      new Bounds2( this.graph.xRange.min - 1, this.graph.yRange.min - 3, this.graph.xRange.max + 3, this.graph.yRange.max + 1 ) );
  }

  // @public
  reset() {
    this.interactiveLineProperty.reset();
    this.savedLines.clear();
    this.standardLines.clear();
    this.pointTool1.reset();
    this.pointTool2.reset();
  }
}

graphingLines.register( 'LineFormsModel', LineFormsModel );

export default LineFormsModel;