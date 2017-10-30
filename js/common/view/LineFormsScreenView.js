// Copyright 2013-2017, University of Colorado Boulder

/**
 * Base ScreenView for the various screens that deal with line forms (Slope, Slope-Intercept, Point-Slope).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PointToolNode = require( 'GRAPHING_LINES/common/view/PointToolNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {LineFormsModel} model
   * @param {LineFormsViewProperties} viewProperties
   * @param {Node} graphNode
   * @param {Node} graphControls
   * @param {Node} equationControls
   * @constructor
   */
  function LineFormsScreenView( model, viewProperties, graphNode, graphControls, equationControls ) {

    ScreenView.call( this, GLConstants.SCREEN_VIEW_OPTIONS );

    this.viewProperties = viewProperties; // @private

    // Create point tool nodes
    var pointTool1 = new PointToolNode( model.pointTool1, model.modelViewTransform, model.graph, viewProperties.linesVisibleProperty );
    var pointTool2 = new PointToolNode( model.pointTool2, model.modelViewTransform, model.graph, viewProperties.linesVisibleProperty );
    var pointToolParent = new Node(); // Point tools moveToFront when dragged, so we give them a common parent to preserve rendering order.
    pointToolParent.addChild( pointTool1 );
    pointToolParent.addChild( pointTool2 );

    // Reset All button, at bottom-right
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      scale: GLConstants.RESET_ALL_BUTTON_SCALE
    } );
    resetAllButton.right = this.layoutBounds.width - GLConstants.SCREEN_X_MARGIN;
    resetAllButton.bottom = this.layoutBounds.height - GLConstants.SCREEN_Y_MARGIN;

    // Parent for all controls, to simplify layout
    var controlsParent = new Node();
    controlsParent.addChild( equationControls );
    controlsParent.addChild( graphControls );

    // rendering order
    this.addChild( controlsParent );
    this.addChild( graphNode );
    this.addChild( pointToolParent );
    this.addChild( resetAllButton );

    // layout - position of graphNode is determined by model

    // position of control panels:
    var xMargin = 10;
    var yMargin = 20;
    var ySpacing = 15;

    // get the amount of canvas width that's available for the control panels
    var availableControlPanelWidth = this.layoutBounds.width - graphNode.right - ( 2 * xMargin );

    // if either control panel is too wide, scale it
    if ( equationControls.width > availableControlPanelWidth ) {
      equationControls.scale = availableControlPanelWidth / equationControls.width;
    }
    if ( graphControls.width > availableControlPanelWidth ) {
      graphControls.scale = availableControlPanelWidth / graphControls.width;
    }

    // vertically stack controls, horizontally align centers
    equationControls.centerX = availableControlPanelWidth / 2;
    equationControls.y = 0;
    graphControls.centerX = equationControls.centerX;
    graphControls.top = equationControls.bottom + ySpacing;

    // center controls in the space to the right of the graph
    controlsParent.centerX = graphNode.right + xMargin + ( availableControlPanelWidth / 2 );
    controlsParent.top = yMargin;
  }

  graphingLines.register( 'LineFormsScreenView', LineFormsScreenView );

  return inherit( ScreenView, LineFormsScreenView );
} );