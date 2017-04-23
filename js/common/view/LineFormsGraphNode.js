// Copyright 2013-2017, University of Colorado Boulder

/**
 * Base type for the 'Slope', 'Slope-Intercept' and 'Point-Slope' graphs.
 *
 * Displays the following:
 * - one interactive line
 * - slope tool for interactive line
 * - zero or more 'saved' lines
 * - zero or more 'standard' lines
 *
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
   * @param {constructor} equationType a subtype of EquationNode
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
    model.standardLines.addItemAddedListener( this.standardLineAdded.bind( this ) );
    model.standardLines.addItemRemovedListener( this.standardLineRemoved.bind( this ) );

    // Add/remove saved lines
    model.savedLines.addItemAddedListener( this.savedLineAdded.bind( this ) );
    model.savedLines.addItemRemovedListener( this.savedLineRemoved.bind( this ) );

    // Visibility of lines
    Property.multilink( [ viewProperties.linesVisibleProperty, viewProperties.slopeToolVisibleProperty ],
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

      var linesVisible = this.viewProperties.linesVisibleProperty.get();

      // interactive line
      this.interactiveLineNode.visible = linesVisible;

      // saved & standard lines
      this.savedLinesParentNode.visible = linesVisible;
      this.standardLinesParentNode.visible = linesVisible;

      // slope tool
      this.slopeToolNode.visible = ( this.viewProperties.slopeToolVisibleProperty.get() && linesVisible );
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






