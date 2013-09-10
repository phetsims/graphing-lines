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
  var EquationControls = require( 'GRAPHING_LINES/common/view/EquationControls' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  var GraphControls = require( 'GRAPHING_LINES/common/view/GraphControls' );
  var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var LineFormsViewProperties = require( 'GRAPHING_LINES/common/view/LineFormsViewProperties' );
  var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PointManipulator = require( 'GRAPHING_LINES/common/view/manipulator/PointManipulator' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );
  var PointTool = require( 'GRAPHING_LINES/common/model/PointTool' );
  var PointToolNode = require( 'GRAPHING_LINES/common/view/PointToolNode' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  var SlopeSpinner = require( 'GRAPHING_LINES/common/view/spinner/SlopeSpinner' );
  var SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );
  var Spinner = require( 'GRAPHING_LINES/common/view/spinner/Spinner' );
  var Text = require( 'SCENERY/nodes/Text' );
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
    resetAllButton.left = 900;
    resetAllButton.top = 600;

    //XXX test
    var graph = new Graph( new Range( -10, 10 ), new Range( -10, 10 ) );
    var graphNode = new GraphNode( graph, model.mvt );
//    thisView.addChild( graphNode );

    //XXX test
    var line = Line.createPointSlope( 1, 2, 3, 4 );
    var lineProperty = new Property( line );
    var slopeToolNode = new SlopeToolNode( lineProperty, model.mvt );
//    thisView.addChild( slopeToolNode );

    //XXX test
    var lineNode = new LineNode( line, graph, model.mvt );
//    thisView.addChild( lineNode );

    //XXX test
    var viewProperties = new LineFormsViewProperties();
    var standardLines = new ObservableArray( [ Line.Y_EQUALS_X_LINE, Line.Y_EQUALS_NEGATIVE_X_LINE ] );
    var graphControls = new GraphControls( viewProperties.linesVisibleProperty, viewProperties.slopeVisibleProperty, standardLines,
      { x: 800, y: 350 } );
//    thisView.addChild( graphControls );

    //XXX test
    var pointTool = new PointTool( new Vector2( 0, 0 ), 'up', standardLines );
    var stageBounds = model.mvt.viewToModelBounds( this.layoutBounds );
    var pointToolNode = new PointToolNode( pointTool, model.mvt, graph, stageBounds, viewProperties.linesVisibleProperty );
//    thisView.addChild( pointToolNode );

    //XXX test
    var x1RangeProperty = new Property( new Range( -5, 5 ) );
    var y1RangeProperty = new Property( new Range( -5, 5 ) );
    var x2RangeProperty = new Property( new Range( -10, 10 ) );
    var y2RangeProperty = new Property( new Range( -10, 10 ) );
    var riseRangeProperty = new Property( new Range( -10, 10 ) );
    var runRangeProperty = new Property( new Range( -10, 10 ) );
    var manipulatorDiameter = model.mvt.modelToViewDeltaX( 0.85 );
//    thisView.addChild( new X1Y1Manipulator( manipulatorDiameter, lineProperty, x1RangeProperty, y1RangeProperty, model.mvt, true ) );
//    thisView.addChild( new X2Y2Manipulator( manipulatorDiameter, lineProperty, x2RangeProperty, y2RangeProperty, model.mvt ) );
//    thisView.addChild( new SlopeManipulator( manipulatorDiameter, lineProperty, riseRangeProperty, runRangeProperty, model.mvt ) );
//    thisView.addChild( new YInterceptManipulator( manipulatorDiameter, lineProperty, y1RangeProperty, model.mvt ) );

    //XXX test
    var pointProperty = new Property( new Vector2( 1, -1 ) );
    var otherPointProperties = [
      new Property( new Vector2( 2, -2 ) ),
      new Property( new Vector2( 3, -3 ) )
    ];
    var pointManipulator = new PointManipulator( manipulatorDiameter, GLColors.POINT_1, pointProperty, otherPointProperties, x1RangeProperty, y1RangeProperty, model.mvt );
//    thisView.addChild( pointManipulator );

    //XXX test
    var spinnerValueProperty = new Property( 3 );
    var spinnerRangeProperty = new Property( new Range( -10, 10 ) );
    var spinner = new Spinner( spinnerValueProperty, spinnerRangeProperty, {
        x: 700, y: 100,
        font: new PhetFont( 80 ),
        color: Color.BLUE,
        upFunction: function() { return spinnerValueProperty.get() + 1; },
        downFunction: function() { return spinnerValueProperty.get() - 1; }
      }
    );
//    thisView.addChild( spinner );

    //XXX test
    var riseProperty = new Property( 1 );
    var runProperty = new Property( 5 );
    var riseSpinner = new SlopeSpinner( riseProperty, runProperty, riseRangeProperty, { x: 900, y: 100, font: new PhetFont( 80 ) } );
    var runSpinner = new SlopeSpinner( runProperty, riseProperty, runRangeProperty, { font: new PhetFont( 80 ) } );
    runSpinner.centerX = riseSpinner.centerX;
    runSpinner.top = riseSpinner.bottom + 10;
//    thisView.addChild( riseSpinner );
//    thisView.addChild( runSpinner );

    //XXX test
    var titleNode = PointSlopeEquationNode.createGeneralFormNode( new PhetFont( { size: 18, weight: 'bold' } ) );
    var savedLinesProperty = new ObservableArray();
    var maximizedProperty = new Property( true );
    var interactiveEquationNode = new Rectangle( 0, 0, 200, 30, { fill: 'blue' } );
    var equationControls = new EquationControls( titleNode, lineProperty, savedLinesProperty,
      maximizedProperty, viewProperties.linesVisibleProperty, interactiveEquationNode, { x: 300, y: 200 } );
//    thisView.addChild( equationControls );

    //XXX test
    var equationNode = new PointSlopeEquationNode( lineProperty, x1RangeProperty, y1RangeProperty, riseRangeProperty, runRangeProperty,
      true, true, true, 60, 60, Color.BLACK, { x: 200, y: 200 } );
    thisView.addChild( equationNode );
  }

  return inherit( ScreenView, PointSlopeView, { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) } );
} );