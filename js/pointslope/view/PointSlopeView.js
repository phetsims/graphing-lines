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

  //XXX test imports
  var Color = require( 'SCENERY/util/Color' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  var GraphControls = require( 'GRAPHING_LINES/common/view/GraphControls' );
  var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PointManipulator = require( 'GRAPHING_LINES/common/view/manipulator/PointManipulator' );
  var PointTool = require( 'GRAPHING_LINES/common/model/PointTool' );
  var PointToolNode = require( 'GRAPHING_LINES/common/view/PointToolNode' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  var SlopeSpinner = require( 'GRAPHING_LINES/common/view/spinner/SlopeSpinner' );
  var SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );
  var Spinner = require( 'GRAPHING_LINES/common/view/spinner/Spinner' );
  var Vector2 = require( 'DOT/Vector2' );
  var X1Y1Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X1Y1Manipulator' );
  var X2Y2Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X2Y2Manipulator' );
  var YInterceptManipulator = require( 'GRAPHING_LINES/common/view/manipulator/YInterceptManipulator' );

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
    var graph = new Graph( new Range( -10, 10 ), new Range( -10, 10 ) );
    thisView.addChild( new GraphNode( graph, model.mvt ) );

    //XXX test
    var line = new Line( 0, 0, 5, 5 );
    var lineProperty = new Property( line );
    thisView.addChild( new SlopeToolNode( lineProperty, model.mvt ) );

    //XXX test
    var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
    thisView.addChild( new LineNode( line, graph, model.mvt ) );

    //XXX test
    var viewProperties = new LineFormsViewProperties();
    var standardLines = new ObservableArray( [ Line.Y_EQUALS_X_LINE, Line.Y_EQUALS_NEGATIVE_X_LINE ] );
    thisView.addChild( new GraphControls( viewProperties.linesVisibleProperty, viewProperties.slopeVisibleProperty, standardLines,
      { x: 800, y: 350 } ) );

    //XXX test
    var pointTool = new PointTool( new Vector2( 0, 0 ), 'up', standardLines );
    var stageBounds = model.mvt.viewToModelBounds( this.layoutBounds );
    thisView.addChild( new PointToolNode( pointTool, model.mvt, graph, stageBounds, viewProperties.linesVisibleProperty ) );

    //XXX test
    var x1RangeProperty = new Property( new Range( -5, 5 ) );
    var y1RangeProperty = new Property( new Range( -5, 5 ) );
    var x2RangeProperty = new Property( new Range( -10, 10 ) );
    var y2RangeProperty = new Property( new Range( -10, 10 ) );
    var riseRangeProperty = new Property( new Range( -5, 5 ) );
    var runRangeProperty = new Property( new Range( -5, 5 ) );
    var manipulatorDiameter = model.mvt.modelToViewDeltaX( 0.85 );
//    thisView.addChild( new X1Y1Manipulator( manipulatorDiameter, lineProperty, x1RangeProperty, y1RangeProperty, model.mvt, true ) );
//    thisView.addChild( new X2Y2Manipulator( manipulatorDiameter, lineProperty, x2RangeProperty, y2RangeProperty, model.mvt ) );
//    thisView.addChild( new SlopeManipulator( manipulatorDiameter, lineProperty, riseRangeProperty, runRangeProperty, model.mvt ) );
    thisView.addChild( new YInterceptManipulator( manipulatorDiameter, lineProperty, y1RangeProperty, model.mvt ) );

    //XXX test
    var pointProperty = new Property( new Vector2( 1, -1 ) );
    var otherPointProperties = [
      new Property( new Vector2( 2, -2 ) ),
      new Property( new Vector2( 3, -3 ) )
    ];
    thisView.addChild( new PointManipulator( manipulatorDiameter, GLColors.POINT_1, pointProperty, otherPointProperties, x1RangeProperty, y1RangeProperty, model.mvt ) );

    //XXX test
    var spinnerValueProperty = new Property( 3 );
    var spinnerRangeProperty = new Property( new Range( -10, 10 ) );
    thisView.addChild( new Spinner( spinnerValueProperty, spinnerRangeProperty,
      function() { return spinnerValueProperty.get() + 1; },
      function() { return spinnerValueProperty.get() - 1; },
      { x: 700, y: 100, font: new PhetFont( 80 ), color: Color.BLUE }
    ) );

    //XXX test
    var riseProperty = new Property( 1 );
    var runProperty = new Property( 5 );
    var riseRangeProperty = new Property( new Range( -10, 10 ) );
    var runRangeProperty = new Property( new Range( -10, 10 ) );
    var riseSpinner = new SlopeSpinner( riseProperty, runProperty, riseRangeProperty, { x: 900, y: 100, font: new PhetFont( 80 ) } );
    var runSpinner = new SlopeSpinner( runProperty, riseProperty, runRangeProperty, { font: new PhetFont( 80 ) } );
    runSpinner.centerX = riseSpinner.centerX;
    runSpinner.top = riseSpinner.bottom + 10;
    thisView.addChild( riseSpinner );
    thisView.addChild( runSpinner );
  }

  return inherit( ScreenView, PointSlopeView, { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) } );
} );