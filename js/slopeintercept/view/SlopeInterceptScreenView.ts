// Copyright 2013-2023, University of Colorado Boulder

/**
 * View for the 'Slope-Intercept' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import GraphControlPanel from '../../common/view/GraphControlPanel.js';
import LineFormsScreenView from '../../common/view/LineFormsScreenView.js';
import LineFormsViewProperties from '../../common/view/LineFormsViewProperties.js';
import graphingLines from '../../graphingLines.js';
import SlopeInterceptModel from '../model/SlopeInterceptModel.js';
import SlopeInterceptEquationNode from './SlopeInterceptEquationNode.js';
import SlopeInterceptGraphNode from './SlopeInterceptGraphNode.js';

export default class SlopeInterceptScreenView extends LineFormsScreenView {

  public constructor( model: SlopeInterceptModel, tandem: Tandem ) {

    const viewProperties = new LineFormsViewProperties();

    const graphNode = new SlopeInterceptGraphNode( model, viewProperties );

    const graphControlPanel = new GraphControlPanel(
      viewProperties.gridVisibleProperty,
      viewProperties.slopeToolVisibleProperty,
      model.standardLines
    );

    const equationAccordionBox = new EquationAccordionBox(
      // title
      SlopeInterceptEquationNode.createGeneralFormNode(),

      // interactive equation
      new SlopeInterceptEquationNode( model.interactiveLineProperty, {
        riseRangeProperty: model.riseRangeProperty,
        runRangeProperty: model.runRangeProperty,
        yInterceptRangeProperty: model.y1RangeProperty,
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

graphingLines.register( 'SlopeInterceptScreenView', SlopeInterceptScreenView );