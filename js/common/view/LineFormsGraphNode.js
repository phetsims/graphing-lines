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
  var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );

  /**
   * @param {LineFormsModel } model
   * @param {LineFormsViewProperties} viewProperties
   * @param {Type} equationType a subtype of EquationNode
   * @constructor
   */
  function LineFormsGraphNode( model, viewProperties, equationType ) {

    var thisNode = this;
    GraphNode.call( thisNode, model.graph, model.mvt );

    thisNode.model = model;
    thisNode.viewProperties = viewProperties;
    this.equationType = equationType;

    // Nodes for each category of line (interactive, standard, saved) to maintain rendering order
    thisNode.interactiveLineNode = new LineNode( model.interactiveLineProperty, model.graph, model.mvt,
      { equationType: equationType } );
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
    Property.multilink( [ viewProperties.linesVisibleProperty, viewProperties.interactiveLineVisibleProperty, viewProperties.slopeVisibleProperty ],
      thisNode.updateLinesVisibility.bind( thisNode ) );

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
      this.standardLinesParentNode.addChild( new LineNode( new Property( line ), this.model.graph, this.model.mvt,
        { equationType: this.equationType } ) );
    },

    // Called when a standard line is removed from the model.
    standardLineRemoved: function( line ) {
      this.removeLineNode( line, this.standardLinesParentNode );
    },

    // @private Called when a saved line is added to the model.
    savedLineAdded: function( line ) {
      this.savedLinesParentNode.addChild( new LineNode( new Property( line ), this.model.graph, this.model.mvt,
        { equationType: this.equationType } ) );
    },

    // @private Called when a saved line is removed from the model.
    savedLineRemoved: function( line ) {
      this.removeLineNode( line, this.savedLinesParentNode );
    },

    // @private Removes the node that corresponds to the specified line.
    removeLineNode: function( line, parentNode ) {
      for ( var i = 0; i < parentNode.getChildrenCount(); i++ ) {
        var node = parentNode.getChildAt( i );
        if ( line.same( node.lineProperty.get() ) ) {
          parentNode.removeChild( node );
          break;
        }
      }
    }
  } );
} );






