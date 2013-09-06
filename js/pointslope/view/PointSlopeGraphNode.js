// Copyright 2002-2013, University of Colorado

/**
 * Graph that provides direct manipulation of a line in point-slope form.
 * Adds manipulators for point and slope to the base class functionality.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsGraphNode = require( 'PATH/LineFormsGraphNode' );
  var LineManipulatorNode = require( 'GRAPHING_LINES/common/view/manipulator/LineManipulatorNode' );
  var PointSlopeLineNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeLineNode' );
  var SlopeDragHandler = require( 'GRAPHING_LINES/common/view/manipulator/SlopeDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );
  var X1Y1DragHandler = require( 'GRAPHING_LINES/common/view/manipulator/X1Y1DragHandler' );

  /**
   * @param {PointSlopeModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function PointSlopeGraphNode( model, viewProperties ) {

    var thisNode = this;
    LineFormsGraphNode.call( thisNode, model, viewProperties );

    // point manipulator
    var pointManipulatorNode = new LineManipulatorNode( this.getManipulatorDiameter(), GLColors.POINT_X1_Y1 );
    pointManipulatorNode.addInputListener( new X1Y1DragHandler( pointManipulatorNode, model.mvt, model.interactiveLineProperty, model.x1Range, model.y1Range, true /* constantSlope */ ) );

    // slope manipulator
    var slopeManipulatorNode = new LineManipulatorNode( this.getManipulatorDiameter(), GLColors.SLOPE );
    slopeManipulatorNode.addInputListener( new SlopeDragHandler( slopeManipulatorNode, model.mvt, model.interactiveLineProperty, model.riseRange, model.runRange ) );

    // rendering order
    thisNode.addChild( pointManipulatorNode );
    thisNode.addChild( slopeManipulatorNode );

    // position of manipulators
    model.interactiveLineProperty.link( function( line ) {
      pointManipulatorNode.translation = model.mvt.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
      slopeManipulatorNode.translation = model.mvt.modelToViewPosition( new Vector2( line.x1 + line.run, line.y1 + line.rise ) );
    } );

    // visibility of manipulators
    var updateVisibility = function() {
      var visible = viewProperties.linesVisible && viewProperties.interactiveLineVisible;
      pointManipulatorNode.setVisible( visible );
      slopeManipulatorNode.setVisible( visible );
    };
    viewProperties.linesVisibleProperty.link( updateVisibility );
    viewProperties.interactiveLineVisibleProperty.link( updateVisibility );
  }

  return inherit( LineFormsGraphNode, PointSlopeGraphNode, {

    // Creates a line labeled with its point-slope equation.
    createLineNode: function( line, graph, mvt ) {
      return new PointSlopeLineNode( line, graph, mvt ); //TODO
    }
  } );
} );
