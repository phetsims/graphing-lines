// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the 'Point-Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'GRAPHING_LINES/common/view/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {PointSlopeModel} model
   * @constructor
   */
  function PointSlopeView( model ) {

    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );

    // Reset All button
    var resetAllButton = new ResetAllButton( function() {
      model.reset();
    } );

    // rendering order
    thisView.addChild( resetAllButton );

    // layout
    resetAllButton.left = 100;
    resetAllButton.top = 100;

    //XXX test
    var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
    var Graph = require( 'GRAPHING_LINES/common/model/Graph' );
    var Range = require( 'DOT/Range' );
    var graph = new Graph( new Range( -10, 10 ), new Range( -10, 10 ) );
    thisView.addChild( new GraphNode( graph, model.mvt ) );

    //XXX test
    var SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );
    var Property = require( 'AXON/Property' );
    var Line = require( 'GRAPHING_LINES/common/model/Line');
    var line = new Line( 0, 0, 5, 5 );
    var lineProperty = new Property( line );
    thisView.addChild( new SlopeToolNode( lineProperty, model.mvt ) );

    //XXX test
    var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
    thisView.addChild( new LineNode( line, graph, model.mvt ) );

    //XXX test
    var GraphControls = require( 'GRAPHING_LINES/common/view/GraphControls' );
    var LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );
    var ObservableArray = require( 'AXON/ObservableArray' );
    var viewProperties = new LineFormsViewProperties();
    var standardLines = new ObservableArray( [ Line.Y_EQUALS_X_LINE, Line.Y_EQUALS_NEGATIVE_X_LINE ] );
    thisView.addChild( new GraphControls( viewProperties.linesVisibleProperty, viewProperties.slopeVisibleProperty, standardLines,
      { x: 800, y: 350 } ) );

    //XXX test
    var PointToolNode = require( 'GRAPHING_LINES/common/view/PointToolNode' );
    var PointTool = require( 'GRAPHING_LINES/common/model/PointTool' );
    var Vector2 = require( 'DOT/Vector2' );
    var pointTool = new PointTool( new Vector2( 0, 0 ), 'up', standardLines );
    var stageBounds = model.mvt.viewToModelBounds( this.layoutBounds );
    thisView.addChild( new PointToolNode( pointTool, model.mvt, graph, stageBounds, viewProperties.linesVisibleProperty ) );

    //XXX test
    var SlopeManipulatorNode = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulatorNode' );
    var Range = require( 'DOT/Range' );
    var riseRangeProperty = new Property( new Range( -5, 5 ) );
    var runRangeProperty = new Property( new Range( -5, 5 ) );
    var manipulatorDiameter = model.mvt.modelToViewDeltaX( 0.85 );
    thisView.addChild( new SlopeManipulatorNode( manipulatorDiameter, lineProperty, riseRangeProperty, runRangeProperty, model.mvt ) );

  }

  return inherit( ScreenView, PointSlopeView, { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) } );
} );