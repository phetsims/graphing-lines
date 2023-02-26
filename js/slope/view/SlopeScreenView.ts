// Copyright 2013-2023, University of Colorado Boulder

// @ts-nocheck
/**
 * View for the 'Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import GraphControlPanel from '../../common/view/GraphControlPanel.js';
import LineFormsScreenView from '../../common/view/LineFormsScreenView.js';
import LineFormsViewProperties from '../../common/view/LineFormsViewProperties.js';
import graphingLines from '../../graphingLines.js';
import SlopeEquationNode from './SlopeEquationNode.js';
import SlopeGraphNode from './SlopeGraphNode.js';

export default class SlopeScreenView extends LineFormsScreenView {

  /**
   * @param {SlopeModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    const viewProperties = new LineFormsViewProperties();

    super( model, viewProperties,

      // graph
      new SlopeGraphNode( model, viewProperties ),

      // graph control panel
      new GraphControlPanel(
        viewProperties.gridVisibleProperty,
        viewProperties.slopeToolVisibleProperty,
        model.standardLines, {
          includeStandardLines: false
        } ),

      // equation accordion box
      new EquationAccordionBox(
        // title
        SlopeEquationNode.createGeneralFormNode(),

        // interactive equation
        new SlopeEquationNode( model.interactiveLineProperty, {
          x1RangeProperty: model.x1RangeProperty,
          y1RangeProperty: model.y1RangeProperty,
          x2RangeProperty: model.x2RangeProperty,
          y2RangeProperty: model.y2RangeProperty,
          maxWidth: 400
        } ),

        // Properties
        model.interactiveLineProperty,
        model.savedLines,
        viewProperties.interactiveEquationVisibleProperty,
        tandem.createTandem( 'equationAccordionBox' )
      ),
      tandem
    );
  }
}

graphingLines.register( 'SlopeScreenView', SlopeScreenView );