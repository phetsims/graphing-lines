// Copyright 2002-2014, University of Colorado Boulder

/**
 * Graph that provides direct manipulation of a line in point-slope form.
 * Adds manipulators for (x1,y1) and (x2,y2) to the base class functionality.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsGraphNode = require( 'GRAPHING_LINES/common/view/LineFormsGraphNode' );
  var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var SlopeEquationNode = require( 'GRAPHING_LINES/slope/view/SlopeEquationNode' );
  var X1Y1Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X1Y1Manipulator' );
  var X2Y2Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/X2Y2Manipulator' );

  /**
   * @param {SlopeInterceptModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function SlopeGraphNode( model, viewProperties ) {

    var thisNode = this;
    LineFormsGraphNode.call( thisNode, model, viewProperties,
      // createLineNode: {Property<Line>} lineProperty, {Graph} graph, {ModelViewTransform2} mvt
      function( lineProperty, graph, mvt ) {
        return new LineNode( lineProperty, graph, mvt, {
          createEquationNode: function( line, fontSize, color ) {
            return SlopeEquationNode.createLabel( line, fontSize, color );
          }
        } );
      } );

    var manipulatorRadius = model.mvt.modelToViewDeltaX( model.manipulatorRadius );

    // (x1,y1) point manipulator
    var x1y1Manipulator = new X1Y1Manipulator(
      manipulatorRadius, model.interactiveLineProperty, model.x1RangeProperty, model.y1RangeProperty, model.mvt, false /* constantSlope */ );

    // (x2,y2) point manipulator
    var x2y2Manipulator = new X2Y2Manipulator(
      manipulatorRadius, model.interactiveLineProperty, model.x2RangeProperty, model.y2RangeProperty, model.mvt );

    // rendering order
    thisNode.addChild( x1y1Manipulator );
    thisNode.addChild( x2y2Manipulator );

    // visibility of manipulators
    var updateVisibility = function() {
      x1y1Manipulator.visible = x2y2Manipulator.visible = (viewProperties.linesVisible && viewProperties.interactiveLineVisible);
    };
    viewProperties.linesVisibleProperty.link( updateVisibility.bind( thisNode ) );
    viewProperties.interactiveLineVisibleProperty.link( updateVisibility.bind( thisNode ) );
  }

  return inherit( LineFormsGraphNode, SlopeGraphNode );
} );