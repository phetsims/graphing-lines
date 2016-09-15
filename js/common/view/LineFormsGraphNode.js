// Copyright 2013-2015, University of Colorado Boulder

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
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
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

    var self = this;
    
    GraphNode.call( this, model.graph, model.modelViewTransform );

    this.model = model; // @private
    this.viewProperties = viewProperties; // @private
    this.equationType = equationType; // @private

    // @private Nodes for each category of line (interactive, standard, saved) to maintain rendering order
    this.interactiveLineNode = new LineNode( model.interactiveLineProperty, model.graph, model.modelViewTransform,
      { equationType: equationType } ); // @private
    this.standardLinesParentNode = new Node(); // @private
    this.savedLinesParentNode = new Node(); // @private

    // @private Slope tool
    this.slopeToolNode = new SlopeToolNode( model.interactiveLineProperty, model.modelViewTransform ); // @private

    // Rendering order
    this.addChild( this.savedLinesParentNode );
    this.addChild( this.standardLinesParentNode );
    this.addChild( this.interactiveLineNode );
    this.addChild( this.slopeToolNode );

    // Add/remove standard lines
    model.standardLines.addListeners( this.standardLineAdded.bind( this ), this.standardLineRemoved.bind( this ) );

    // Add/remove saved lines
    model.savedLines.addListeners( this.savedLineAdded.bind( this ), this.savedLineRemoved.bind( this ) );

    // Visibility of lines
    viewProperties.multilink( [ 'linesVisible', 'slopeToolVisible' ],
      this.updateLinesVisibility.bind( this ) );

    // Visibility of the grid
    viewProperties.gridVisibleProperty.link( function( visible ) {
      self.setGridVisible( visible );
    } );

    // Visibility of the equation on the interactive line
    this.viewProperties.interactiveEquationVisibleProperty.link( function( visible ) {
      if ( self.interactiveLineNode ) {
        self.interactiveLineNode.setEquationVisible( visible );
      }
    } );
  }

  graphingLines.register( 'LineFormsGraphNode', LineFormsGraphNode );

  return inherit( GraphNode, LineFormsGraphNode, {

    // @private Updates the visibility of lines and associated decorations
    updateLinesVisibility: function() {
      // interactive line
      this.interactiveLineNode.visible = this.viewProperties.linesVisible;

      // saved & standard lines
      this.savedLinesParentNode.visible = this.viewProperties.linesVisible;
      this.standardLinesParentNode.visible = this.viewProperties.linesVisible;

      // slope tool
      this.slopeToolNode.visible = ( this.viewProperties.slopeToolVisible && this.viewProperties.linesVisible );
    },

    // @private Called when a standard line is added to the model.
    standardLineAdded: function( line ) {
      this.standardLinesParentNode.addChild( new LineNode( new Property( line ), this.model.graph, this.model.modelViewTransform,
        { equationType: this.equationType } ) );
    },

    // @private Called when a standard line is removed from the model.
    standardLineRemoved: function( line ) {
      this.removeLineNode( line, this.standardLinesParentNode );
    },

    // @private Called when a saved line is added to the model.
    savedLineAdded: function( line ) {
      this.savedLinesParentNode.addChild( new LineNode( new Property( line ), this.model.graph, this.model.modelViewTransform,
        { equationType: this.equationType } ) );
    },

    // @private Called when a saved line is removed from the model.
    savedLineRemoved: function( line ) {
      this.removeLineNode( line, this.savedLinesParentNode );
    },

    // @private Removes the node that corresponds to the specified line.
    removeLineNode: function( line, parentNode ) {
      var removed = false;
      for ( var i = 0; i < parentNode.getChildrenCount() && !removed; i++ ) {
        var node = parentNode.getChildAt( i );
        if ( line === node.lineProperty.get() ) {
          parentNode.removeChild( node );
          removed = true;
        }
      }
      assert && assert( removed, 'no Node found for line ' + line.toString() );
    }
  } );
} );






