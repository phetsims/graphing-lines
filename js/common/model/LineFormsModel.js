// Copyright 2002-2013, University of Colorado

/**
 * Base class for the 'Slope', 'Slope-Intercept' and 'Point-Slope' models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Graph = require( 'common/model/Graph' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var PointTool = require( 'common/model/PointTool' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var X_RANGE = new Range( -10, 10 ); // x-axis range
  var Y_RANGE = X_RANGE; // y-axis range
  var GRID_VIEW_UNITS = 530; // max dimension (width or height) of the grid in view coordinates
  var ORIGIN_OFFSET = new Vector2( 305, 320 ); // offset of the graph's origin in view coordinates

  /**
   * @param {Line} interactiveLine
   * @constructor
   */
  function LineFormsModel( interactiveLine ) {

    var thisModel = this;

    // graph
    thisModel.graph = new Graph( X_RANGE, Y_RANGE );

    // model-view transform, created in the model because it's dependent on graph axes ranges
    var mvtScale = GRID_VIEW_UNITS / Math.max( thisModel.graph.xRange.getLength(), thisModel.graph.yRange.getLength() ); // view units / model units
    thisModel.mvt = ModelViewTransform2.createOffsetXYScaleMapping( ORIGIN_OFFSET, mvtScale, -mvtScale ); // y is inverted

    // lines
    thisModel.interactiveLine = new Property( interactiveLine );
    thisModel.savedLines = new ObservableArray();
    thisModel.standardLines = new ObservableArray();

    // Update the lines seen by the graph.
    var updateGraphLines = function() {
      thisModel.graph.lines.clear();
      // add lines in the order that they would be rendered
      thisModel.graph.lines.add( thisModel.interactiveLine.get() );
      thisModel.savedLines.forEach( function( line ) {
        thisModel.graph.lines.add( line );
      } );
      thisModel.standardLines.forEach( function( line ) {
        thisModel.graph.lines.add( line );
      } );
    };
    thisModel.interactiveLine.link( updateGraphLines );
    thisModel.savedLines.addListener( updateGraphLines );
    thisModel.standardLines.addListener( updateGraphLines );

    // point tools
    var initialPosition1 = new Vector2( thisModel.graph.xRange.min + ( 0.35 * thisModel.graph.xRange.getLength() ), thisModel.graph.yRange.min - 0.25 );
    var initialPosition2 = new Vector2( thisModel.graph.xRange.min + ( 0.65 * thisModel.graph.xRange.getLength() ), thisModel.graph.yRange.min - 2.75 );
    thisModel.pointTool1 = new PointTool( initialPosition1, 'up', thisModel.graph.lines );
    thisModel.pointTool2 = new PointTool( initialPosition2, 'down', thisModel.graph.lines );
  }

  LineFormsModel.prototype = {

    reset: function() {
      this.interactiveLine.reset();
      this.savedLines.clear();
      this.standardLines.clear();
      this.pointTool1.reset();
      this.pointTool2.reset();
    }
  };

  return LineFormsModel;
} );