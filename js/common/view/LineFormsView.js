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

    thisView.viewProperties = viewProperties;

    // Create point tool nodes
    var pointTool1 = new PointToolNode( model.pointTool1, model.mvt, model.graph, viewProperties.linesVisibleProperty );
    var pointTool2 = new PointToolNode( model.pointTool2, model.mvt, model.graph, viewProperties.linesVisibleProperty );
    var pointToolParent = new Node(); // Point tools moveToFront when dragged, so we give them a common parent to preserve rendering order.
    pointToolParent.addChild( pointTool1 );
    pointToolParent.addChild( pointTool2 );

    // Reset All button
    var resetAllButton = new ResetAllButton( function() {
      model.reset();
      viewProperties.reset();
    } );

    // rendering order
    thisView.addChild( equationControls );
    thisView.addChild( graphControls );
    thisView.addChild( resetAllButton );
    thisView.addChild( graphNode );
    thisView.addChild( pointToolParent );

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
  }

  return inherit( ScreenView, LineFormsView, {

    layoutBounds: new Bounds2( 0, 0, 1100, 700 ),

    reset: function() {
      callSuper( ScreenView, "reset", this );
      this.viewProperties.reset();
    }
  } );
} );