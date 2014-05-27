// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base type for the 'Slope', 'Slope-Intercept' and 'Point-Slope' graphs.
 * <p>
 * Displays the following:
 * <ul>
 * <li>one interactive line</li>
 * <li>slope tool for interactive line</li>
 * <li>zero or more 'saved' lines</li>
 * <li>zero or more 'standard' lines</li>
 * </ul>
 * <p>
 * Note: All properties of this type should be considered private.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );

  /**
   * @param {LineFormsModel } model
   * @param {LineFormsViewProperties} viewProperties
   * @param {Function} createLineNode function with parameters {Line} line, {Graph} graph, and {ModelViewTransform2} mvt
   * @constructor
   */
  function LineFormsGraphNode( model, viewProperties, createLineNode ) {

    var thisNode = this;
    GraphNode.call( thisNode, model.graph, model.mvt );

    thisNode.model = model;
    thisNode.viewProperties = viewProperties;
    this.createLineNode = createLineNode;

    // Nodes for each category of line (interactive, standard, saved) to maintain rendering order
    thisNode.interactiveLineNode = createLineNode( model.interactiveLineProperty, model.graph, model.mvt );
    thisNode.standardLinesParentNode = new Node();
    thisNode.savedLinesParentNode = new Node();

    // Slope tool
    thisNode.slopeToolNode = new SlopeToolNode( model.interactiveLineProperty, model.mvt );

    // Rendering order
    thisNode.addChild( this.interactiveLineNode );
    thisNode.addChild( this.savedLinesParentNode );
    thisNode.addChild( this.standardLinesParentNode );
    thisNode.addChild( this.slopeToolNode );

    // Add/remove standard lines
    model.standardLines.addListeners( thisNode.standardLineAdded.bind( thisNode ), thisNode.standardLineRemoved.bind( thisNode ) );

    // Add/remove saved lines
    model.savedLines.addListeners( thisNode.savedLineAdded.bind( thisNode ), thisNode.savedLineRemoved.bind( thisNode ) );

    // Visibility of lines
    viewProperties.linesVisibleProperty.link( thisNode.updateLinesVisibility.bind( thisNode ) );
    viewProperties.interactiveLineVisibleProperty.link( thisNode.updateLinesVisibility.bind( thisNode ) );
    viewProperties.slopeVisibleProperty.link( thisNode.updateLinesVisibility.bind( thisNode ) );

    // Visibility of the equation on the interactive line
    thisNode.viewProperties.interactiveEquationVisibleProperty.link( function( visible ) {
      if ( thisNode.interactiveLineNode ) {
        thisNode.interactiveLineNode.setEquationVisible( visible );
      }
    } );
  }

  return inherit( GraphNode, LineFormsGraphNode, {

    // @private Updates the visibility of lines and associated decorations
    updateLinesVisibility: function() {
      // interactive line
      this.interactiveLineNode.visible = ( this.viewProperties.linesVisible && this.viewProperties.interactiveLineVisible );

      // saved & standard lines
      this.savedLinesParentNode.visible = this.viewProperties.linesVisible;
      this.standardLinesParentNode.visible = this.viewProperties.linesVisible;

      // slope tool
      this.slopeToolNode.visible = ( this.viewProperties.slopeVisible && this.viewProperties.linesVisible && this.viewProperties.interactiveLineVisible );
    },

    // @private Called when a standard line is added to the model.
    standardLineAdded: function( line ) {
      this.standardLinesParentNode.addChild( this.createLineNode( new Property( line ), this.model.graph, this.model.mvt ) );
    },

    // Called when a standard line is removed from the model.
    standardLineRemoved: function( line ) {
      this.removeLineNode( line, this.standardLinesParentNode );
    },

    // @private Called when a saved line is added to the model.
    savedLineAdded: function( line ) {
      this.savedLinesParentNode.addChild( this.createLineNode( new Property( line ), this.model.graph, this.model.mvt ) );
    },

    // @private Called when a saved line is removed from the model.
    savedLineRemoved: function( line ) {
      this.removeLineNode( line, this.savedLinesParentNode );
    },

     // @private Removes the node that corresponds to the specified line.
    removeLineNode: function( line, parentNode ) {
      for ( var i = 0; i < parentNode.getChildrenCount(); i++ ) {
        var node = parentNode.getChildAt( i );
        if ( node.lineProperty.get() === line ) {
          parentNode.removeChild( node );
          break;
        }
      }
    }
  } );
} );






