// Copyright 2013-2018, University of Colorado Boulder

/**
 * Base ScreenView for the various screens that deal with line forms (Slope, Slope-Intercept, Point-Slope).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GraphContentsToggleButton = require( 'GRAPHING_LINES/common/view/GraphContentsToggleButton' );
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
   * @param {GraphControlPanel} graphControlPanel
   * @param {AccordionBox} equationAccordionBox
   * @constructor
   */
  function LineFormsScreenView( model, viewProperties, graphNode, graphControlPanel, equationAccordionBox ) {

    ScreenView.call( this, GLConstants.SCREEN_VIEW_OPTIONS );

    this.viewProperties = viewProperties; // @private

    // Create point tool nodes
    var pointTool1 = new PointToolNode( model.pointTool1, model.modelViewTransform, model.graph, viewProperties.linesVisibleProperty );
    var pointTool2 = new PointToolNode( model.pointTool2, model.modelViewTransform, model.graph, viewProperties.linesVisibleProperty );
    var pointToolParent = new Node(); // Point tools moveToFront when dragged, so we give them a common parent to preserve rendering order.
    pointToolParent.addChild( pointTool1 );
    pointToolParent.addChild( pointTool2 );

    // Toggle button for showing/hiding contents of graph
    var graphContentsToggleButton = new GraphContentsToggleButton( viewProperties.linesVisibleProperty, {
      scale: 0.75
    } );

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
    controlsParent.addChild( equationAccordionBox );
    controlsParent.addChild( graphControlPanel );

    // rendering order
    this.addChild( controlsParent );
    this.addChild( graphContentsToggleButton );
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
    if ( equationAccordionBox.width > availableControlPanelWidth ) {
      equationAccordionBox.scale = availableControlPanelWidth / equationAccordionBox.width;
    }
    if ( graphControlPanel.width > availableControlPanelWidth ) {
      graphControlPanel.scale = availableControlPanelWidth / graphControlPanel.width;
    }

    // vertically stack controls, horizontally align centers
    equationAccordionBox.centerX = availableControlPanelWidth / 2;
    equationAccordionBox.y = 0;
    graphControlPanel.centerX = equationAccordionBox.centerX;
    graphControlPanel.top = equationAccordionBox.bottom + ySpacing;

    // center controls in the space to the right of the graph
    controlsParent.centerX = graphNode.right + xMargin + ( availableControlPanelWidth / 2 );
    controlsParent.top = yMargin;

    // graphContentsToggleButton at lower right of graph
    graphContentsToggleButton.left = model.modelViewTransform.modelToViewX( model.graph.xRange.max ) + 21;
    graphContentsToggleButton.bottom = model.modelViewTransform.modelToViewY( model.graph.yRange.min );
  }

  graphingLines.register( 'LineFormsScreenView', LineFormsScreenView );

  return inherit( ScreenView, LineFormsScreenView );
} );