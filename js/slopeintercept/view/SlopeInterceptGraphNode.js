// Copyright 2002-2014, University of Colorado Boulder

/**
 * Graph that provides direct manipulation of a line in slope-intercept form.
 * Adds manipulators for slope and intercept to the base class functionality.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var LineFormsGraphNode = require( 'GRAPHING_LINES/common/view/LineFormsGraphNode' );
  var SlopeInterceptLineNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptLineNode' );
  var SlopeManipulator = require( 'GRAPHING_LINES/common/view/manipulator/SlopeManipulator' );
  var YInterceptManipulator = require( 'GRAPHING_LINES/common/view/manipulator/YInterceptManipulator' );

  /**
   * @param {SlopeInterceptModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @constructor
   */
  function SlopeInterceptGraphNode( model, viewProperties ) {

    var thisNode = this;
    LineFormsGraphNode.call( thisNode, model, viewProperties,
      function( line, graph, mvt ) {
        return new SlopeInterceptLineNode( line, graph, mvt );
      } );

    var manipulatorDiameter = model.mvt.modelToViewDeltaX( model.manipulatorDiameter );

    // slope manipulator
    var slopeManipulator = new SlopeManipulator(
      manipulatorDiameter, model.interactiveLineProperty, model.riseRangeProperty, model.runRangeProperty, model.mvt );

    // intercept manipulator
    var yInterceptManipulator = new YInterceptManipulator(
      manipulatorDiameter, model.interactiveLineProperty, model.y1RangeProperty, model.mvt );

    // rendering order
    thisNode.addChild( slopeManipulator );
    thisNode.addChild( yInterceptManipulator );

    // visibility of manipulators
    var updateVisibility = function() {
      slopeManipulator.visible = yInterceptManipulator.visibile = (viewProperties.linesVisible && viewProperties.interactiveLineVisible);
    };
    viewProperties.linesVisibleProperty.link( updateVisibility.bind( thisNode ) );
    viewProperties.interactiveLineVisibleProperty.link( updateVisibility.bind( thisNode ) );
  }

  return inherit( LineFormsGraphNode, SlopeInterceptGraphNode );
} );