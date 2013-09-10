// Copyright 2002-2013, University of Colorado

/**
 * Base type view for the "Slope", "Slope-Intercept" and "Point-Slope" screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2');
  var callSuper = require( 'PHET_CORE/callSuper' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PointToolNode = require( 'GRAPHING_LINES/common/view/PointToolNode' );
  var ResetAllButton = require( 'GRAPHING_LINES/common/view/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {LineFormsModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @param {Node} graphNode
   * @param {Node} equationControls
   * @param {Node} graphControls
   * @constructor
   */
  function LineFormsView( model, viewProperties, graphNode, equationControls, graphControls ) {

    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );

    this.viewProperties = viewProperties;

    // Reset All button
    var resetAllButton = new ResetAllButton( function() {
      model.reset();
    } );

    // rendering order
    this.addChild( equationControls );
    this.addChild( graphControls );
    this.addChild( resetAllButton );
    this.addChild( graphNode );

    // layout
    {
      // position of graphNode is determined by model

      // position of control panels:
      var xMargin = 5;
      var ySpacing = 25;

      // get the amount of canvas width that's available for the control panels
      var availableControlPanelWidth = thisView.layoutBounds.width - graphNode.right - ( 2 * xMargin );

      // if either control panel is too wide, scale it
      if ( equationControls.width > availableControlPanelWidth ) {
        equationControls.scale = availableControlPanelWidth / equationControls.width;
      }
      if ( graphControls.width > availableControlPanelWidth ) {
        graphControls.scale = availableControlPanelWidth / graphControls.width;
      }

      // determine the center line for the control panels
      var centerX = graphNode.right + xMargin + ( availableControlPanelWidth / 2 );
      equationControls.centerX = centerX;
      equationControls.y = 50;
      graphControls.centerX = equationControls.centerX;
      graphControls.top = equationControls.bottom + ySpacing;
      // centered below graph controls
      resetAllButton.centerX = graphControls.centerX;
      resetAllButton.top = graphControls.bottom + ySpacing;
    }

    // Point tools, added after centering root node, so that we can compute drag bounds.
    {
      var stageBounds = thisView.layoutBounds;

      // Create a dummy point tool, so we know its height for the purposes of computing drag bounds.
      var height = new PointToolNode( model.pointTool1, model.mvt, model.graph, stageBounds, viewProperties.linesVisibleProperty ).height;

      // Compute drag bounds such that 50% of the point tool node is always inside the stage.
      var dragBounds = Bounds2.rect( stageBounds.x1, stageBounds.y1 - ( height / 2 ), stageBounds.width, stageBounds.height - height );

      // Create point tool nodes
      var pointTool1 = new PointToolNode( model.pointTool1, model.mvt, model.graph, dragBounds, viewProperties.linesVisibleProperty );
      var pointTool2 = new PointToolNode( model.pointTool2, model.mvt, model.graph, dragBounds, viewProperties.linesVisibleProperty );

      // Point tools moveToFront when dragged, so we give them a common parent to preserve rendering order of the reset of the scenegraph.
      var pointToolParent = new Node();
      pointToolParent.addChild( pointTool1 );
      pointToolParent.addChild( pointTool2 );
      thisView.addChild( pointToolParent );
    }
  }

  return inherit( ScreenView, LineFormsView, {

    reset: function() {
      callSuper( ScreenView, "reset", this );
      this.viewProperties.reset();
    }
  } );
} );