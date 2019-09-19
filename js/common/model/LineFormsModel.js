// Copyright 2013-2019, University of Colorado Boulder

/**
 * Base type for the 'Slope', 'Slope-Intercept' and 'Point-Slope' models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  const Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const PointTool = require( 'GRAPHING_LINES/common/model/PointTool' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  var GRID_VIEW_UNITS = 530; // max dimension (width or height) of the grid in view coordinates
  var ORIGIN_OFFSET = new Vector2( 315, 330 ); // offset of the graph's origin in view coordinates

  /**
   * @param {Line} interactiveLine
   * @constructor
   */
  function LineFormsModel( interactiveLine ) {

    var self = this;

    // @public {Property.<Line>} the line that the user interacts with
    this.interactiveLineProperty = new Property( interactiveLine );
    
    // @public (read-only) radius of the manipulators
    this.manipulatorRadius = GLConstants.MANIPULATOR_RADIUS;

    // @public graph
    this.graph = new Graph( GLConstants.X_AXIS_RANGE, GLConstants.Y_AXIS_RANGE );

    // @public model-view transform, created in the model because it's dependent on graph axes ranges
    var modelViewTransformScale = GRID_VIEW_UNITS / Math.max( this.graph.xRange.getLength(), this.graph.yRange.getLength() ); // view units / model units
    this.modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( ORIGIN_OFFSET, modelViewTransformScale, -modelViewTransformScale ); // y is inverted

    // @public static lines
    this.savedLines = new ObservableArray();
    this.standardLines = new ObservableArray();

    // Update the lines seen by the graph.
    // unmultilink is unnecessary because we own these Properties, and the model exists for the lifetime of the sim.
    Property.multilink( [ this.interactiveLineProperty, this.savedLines.lengthProperty, this.standardLines.lengthProperty ],
      function() {
        self.graph.lines.clear();

        // Add lines in the order that PointTool will see them: interactiveLine, standardLines, savedLines
        // This should match the order of rendering in LineFormsGraphNode.
        self.graph.lines.add( self.interactiveLineProperty.get() );
        self.standardLines.forEach( function( line ) {
          self.graph.lines.add( line );
        } );
        self.savedLines.forEach( function( line ) {
          self.graph.lines.add( line );
        } );
      }
    );

    // @public point tools, drag bounds determined by 'eye balling' so that the point tool nodes remain on screen.
    this.pointTool1 = new PointTool( new Vector2( -5, -10.5 ), 'up', this.graph.lines,
      new Bounds2( this.graph.xRange.min - 1, this.graph.yRange.min - 1, this.graph.xRange.max + 3, this.graph.yRange.max + 3 ) );
    this.pointTool2 = new PointTool( new Vector2( 3, -13 ), 'down', this.graph.lines,
      new Bounds2( this.graph.xRange.min - 1, this.graph.yRange.min - 3, this.graph.xRange.max + 3, this.graph.yRange.max + 1 ) );
  }

  graphingLines.register( 'LineFormsModel', LineFormsModel );

  return inherit( Object, LineFormsModel, {

    // @override @public
    reset: function() {
      this.interactiveLineProperty.reset();
      this.savedLines.clear();
      this.standardLines.clear();
      this.pointTool1.reset();
      this.pointTool2.reset();
    }
  } );
} );