// Copyright 2013-2023, University of Colorado Boulder

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

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import { Node } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';
import GraphNode from './GraphNode.js';
import LineNode from './LineNode.js';
import SlopeToolNode from './SlopeToolNode.js';

export default class LineFormsGraphNode extends GraphNode {

  /**
   * @param {LineFormsModel } model
   * @param {LineFormsViewProperties} viewProperties
   * @param {function( {Property.<Line>} lineProperty, {Object}} createDynamicLabel
   */
  constructor( model, viewProperties, createDynamicLabel ) {

    super( model.graph, model.modelViewTransform );

    this.model = model; // @private
    this.viewProperties = viewProperties; // @private
    this.createDynamicLabel = createDynamicLabel; // @private

    // @private Nodes for each category of line (interactive, standard, saved) to maintain rendering order
    this.interactiveLineNode = new LineNode( model.interactiveLineProperty, model.graph, model.modelViewTransform,
      { createDynamicLabel: createDynamicLabel } ); // @private
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
    Multilink.multilink( [ viewProperties.linesVisibleProperty, viewProperties.slopeToolVisibleProperty ],
      this.updateLinesVisibility.bind( this ) );

    // Visibility of the grid
    // unlink is unnecessary since LineFormsGraphNode exists for the lifetime of the sim.
    viewProperties.gridVisibleProperty.link( visible => {
      this.setGridVisible( visible );
    } );

    // Visibility of the equation on the interactive line
    // unlink is unnecessary since LineFormsGraphNode exists for the lifetime of the sim.
    this.viewProperties.interactiveEquationVisibleProperty.link( visible => {
      if ( this.interactiveLineNode ) {
        this.interactiveLineNode.setEquationVisible( visible );
      }
    } );
  }

  // @private Updates the visibility of lines and associated decorations
  updateLinesVisibility() {

    const linesVisible = this.viewProperties.linesVisibleProperty.value;

    // interactive line
    this.interactiveLineNode.visible = linesVisible;

    // saved & standard lines
    this.savedLinesParentNode.visible = linesVisible;
    this.standardLinesParentNode.visible = linesVisible;

    // slope tool
    this.slopeToolNode.visible = ( this.viewProperties.slopeToolVisibleProperty.value && linesVisible );
  }

  // @private Called when a standard line is added to the model.
  standardLineAdded( line ) {
    this.standardLinesParentNode.addChild( new LineNode( new Property( line ), this.model.graph, this.model.modelViewTransform,
      { createDynamicLabel: this.createDynamicLabel } ) );
  }

  // @private Called when a standard line is removed from the model.
  standardLineRemoved( line ) {
    this.removeLineNode( line, this.standardLinesParentNode );
  }

  // @private Called when a saved line is added to the model.
  savedLineAdded( line ) {
    this.savedLinesParentNode.addChild( new LineNode( new Property( line ), this.model.graph, this.model.modelViewTransform,
      { createDynamicLabel: this.createDynamicLabel } ) );
  }

  // @private Called when a saved line is removed from the model.
  savedLineRemoved( line ) {
    this.removeLineNode( line, this.savedLinesParentNode );
  }

  // @private Removes the node that corresponds to the specified line.
  removeLineNode( line, parentNode ) {
    let removed = false;
    for ( let i = 0; i < parentNode.getChildrenCount() && !removed; i++ ) {
      const node = parentNode.getChildAt( i );
      if ( line === node.lineProperty.value ) {
        assert && assert( node instanceof LineNode );
        parentNode.removeChild( node );
        node.dispose();
        removed = true;
      }
    }
    assert && assert( removed, `no Node found for line ${line.toString()}` );
  }
}

graphingLines.register( 'LineFormsGraphNode', LineFormsGraphNode );