// Copyright 2013-2020, University of Colorado Boulder

/**
 * View for the 'Point-Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import GraphControlPanel from '../../common/view/GraphControlPanel.js';
import LineFormsScreenView from '../../common/view/LineFormsScreenView.js';
import LineFormsViewProperties from '../../common/view/LineFormsViewProperties.js';
import graphingLines from '../../graphingLines.js';
import PointSlopeEquationNode from './PointSlopeEquationNode.js';
import PointSlopeGraphNode from './PointSlopeGraphNode.js';

class PointSlopeScreenView extends LineFormsScreenView {

  /**
   * @param {PointSlopeModel} model
   */
  constructor( model ) {

    const viewProperties = new LineFormsViewProperties();

    super( model, viewProperties,

      // graph
      new PointSlopeGraphNode( model, viewProperties ),

      // graph control panel
      new GraphControlPanel(
        viewProperties.gridVisibleProperty,
        viewProperties.slopeToolVisibleProperty,
        model.standardLines
      ),

      // equation accordion box
      new EquationAccordionBox(
        // title
        PointSlopeEquationNode.createGeneralFormNode(),

        // interactive equation
        new PointSlopeEquationNode( model.interactiveLineProperty, {
          x1RangeProperty: model.x1RangeProperty,
          y1RangeProperty: model.y1RangeProperty,
          riseRangeProperty: model.riseRangeProperty,
          runRangeProperty: model.runRangeProperty,
          maxWidth: 400
        } ),

        // Properties
        model.interactiveLineProperty,
        model.savedLines,
        viewProperties.interactiveEquationVisibleProperty
      )
    );
  }
}

graphingLines.register( 'PointSlopeScreenView', PointSlopeScreenView );

export default PointSlopeScreenView;