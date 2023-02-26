// Copyright 2013-2023, University of Colorado Boulder

/**
 * View for the 'Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import GraphControlPanel from '../../common/view/GraphControlPanel.js';
import LineFormsScreenView from '../../common/view/LineFormsScreenView.js';
import LineFormsViewProperties from '../../common/view/LineFormsViewProperties.js';
import graphingLines from '../../graphingLines.js';
import SlopeModel from '../model/SlopeModel.js';
import SlopeEquationNode from './SlopeEquationNode.js';
import SlopeGraphNode from './SlopeGraphNode.js';

export default class SlopeScreenView extends LineFormsScreenView {

  public constructor( model: SlopeModel, tandem: Tandem ) {

    const viewProperties = new LineFormsViewProperties();

    const graphNode = new SlopeGraphNode( model, viewProperties );

    const graphControlPanel = new GraphControlPanel(
      viewProperties.gridVisibleProperty,
      viewProperties.slopeToolVisibleProperty,
      model.standardLines, {
        includeStandardLines: false
      } );

    const equationAccordionBox = new EquationAccordionBox(
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
    );

    super( model, viewProperties, graphNode, graphControlPanel, equationAccordionBox, tandem );
  }
}

graphingLines.register( 'SlopeScreenView', SlopeScreenView );