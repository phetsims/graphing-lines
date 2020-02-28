// Copyright 2013-2020, University of Colorado Boulder

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

import Property from '../../../../axon/js/Property.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import graphingLines from '../../graphingLines.js';
import GraphNode from './GraphNode.js';
import LineNode from './LineNode.js';
import SlopeToolNode from './SlopeToolNode.js';

/**
 * @param {LineFormsModel } model
 * @param {LineFormsViewProperties} viewProperties
 * @param {constructor} equationType a subtype of EquationNode
 * @constructor
 */
function LineFormsGraphNode( model, viewProperties, equationType ) {

  const self = this;

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

  // Rendering order. The order of lines should match the order of LineFormsModel.graph.lines.
  this.addChild( this.savedLinesParentNode );
  this.addChild( this.standardLinesParentNode );
  this.addChild( this.interactiveLineNode );
  this.addChild( this.slopeToolNode );

  // Add/remove standard lines
  // remove*Listener not needed because LineFormsGraphNode exists for the lifetime of the sim.
  model.standardLines.addItemAddedListener( this.standardLineAdded.bind( this ) );
  model.standardLines.addItemRemovedListener( this.standardLineRemoved.bind( this ) );

  // Add/remove saved lines
  // remove*Listener not needed because LineFormsGraphNode exists for the lifetime of the sim.
  model.savedLines.addItemAddedListener( this.savedLineAdded.bind( this ) );
  model.savedLines.addItemRemovedListener( this.savedLineRemoved.bind( this ) );

  // Visibility of lines
  // unmultilink is unnecessary since LineFormsGraphNode exists for the lifetime of the sim.
  Property.multilink( [ viewProperties.linesVisibleProperty, viewProperties.slopeToolVisibleProperty ],
    this.updateLinesVisibility.bind( this ) );

  // Visibility of the grid
  // unlink is unnecessary since LineFormsGraphNode exists for the lifetime of the sim.
  viewProperties.gridVisibleProperty.link( function( visible ) {
    self.setGridVisible( visible );
  } );

  // Visibility of the equation on the interactive line
  // unlink is unnecessary since LineFormsGraphNode exists for the lifetime of the sim.
  this.viewProperties.interactiveEquationVisibleProperty.link( function( visible ) {
    if ( self.interactiveLineNode ) {
      self.interactiveLineNode.setEquationVisible( visible );
    }
  } );
}

graphingLines.register( 'LineFormsGraphNode', LineFormsGraphNode );

export default inherit( GraphNode, LineFormsGraphNode, {

  // @private Updates the visibility of lines and associated decorations
  updateLinesVisibility: function() {

    const linesVisible = this.viewProperties.linesVisibleProperty.get();

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
    let removed = false;
    for ( let i = 0; i < parentNode.getChildrenCount() && !removed; i++ ) {
      const node = parentNode.getChildAt( i );
      if ( line === node.lineProperty.get() ) {
        assert && assert( node instanceof LineNode );
        parentNode.removeChild( node );
        node.dispose();
        removed = true;
      }
    }
    assert && assert( removed, 'no Node found for line ' + line.toString() );
  }
} );