// Copyright 2002-2013, University of Colorado Boulder

/**
 * Base type view for the "Slope", "Slope-Intercept" and "Point-Slope" screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLConstants = require( 'GRAPHING_LINES/common/GLConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PointToolNode = require( 'GRAPHING_LINES/common/view/PointToolNode' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
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
    ScreenView.call( thisView, { renderer: GLConstants.RENDERER } );

    thisView.viewProperties = viewProperties;

    // Create point tool nodes
    var pointTool1 = new PointToolNode( model.pointTool1, model.mvt, model.graph, viewProperties.linesVisibleProperty );
    var pointTool2 = new PointToolNode( model.pointTool2, model.mvt, model.graph, viewProperties.linesVisibleProperty );
    var pointToolParent = new Node(); // Point tools moveToFront when dragged, so we give them a common parent to preserve rendering order.
    pointToolParent.addChild( pointTool1 );
    pointToolParent.addChild( pointTool2 );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      scale: 1.32
    } );

    // Parent for all controls, to simplify layout
    var controlsParent = new Node();
    controlsParent.addChild( equationControls );
    controlsParent.addChild( graphControls );
    controlsParent.addChild( resetAllButton );

    // rendering order
    thisView.addChild( controlsParent );
    thisView.addChild( graphNode );
    thisView.addChild( pointToolParent );

    // layout
    {
      // position of graphNode is determined by model

      // position of control panels:
      var xMargin = 10;
      var yMargin = 10;
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

      // vertically stack controls, horizontally align centers
      equationControls.centerX = availableControlPanelWidth / 2;
      equationControls.y = 0;
      graphControls.centerX = equationControls.centerX;
      graphControls.top = equationControls.bottom + ySpacing;
      resetAllButton.centerX = graphControls.centerX;
      resetAllButton.top = graphControls.bottom + ySpacing;

      // if the entire control panel is too tall, scale all controls
      if ( controlsParent.height > thisView.layoutBounds.getHeight() - ( 2 * yMargin ) ) {
        controlsParent.setScaleMagnitude( (thisView.layoutBounds.getHeight() - ( 2 * yMargin )) / controlsParent.height );
      }

      // center controls in the space to the right of the graph
      controlsParent.centerX = graphNode.right + xMargin + ( availableControlPanelWidth / 2 );
      controlsParent.centerY = thisView.layoutBounds.height / 2;
    }
  }

  return inherit( ScreenView, LineFormsView, {

    layoutBounds: GLConstants.LAYOUT_BOUNDS,

    reset: function() {
      this.viewProperties.reset();
    }
  } );
} );