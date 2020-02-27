// Copyright 2013-2019, University of Colorado Boulder

/**
 * View for the 'Slope-Intercept' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import EquationAccordionBox from '../../common/view/EquationAccordionBox.js';
import GraphControlPanel from '../../common/view/GraphControlPanel.js';
import LineFormsScreenView from '../../common/view/LineFormsScreenView.js';
import LineFormsViewProperties from '../../common/view/LineFormsViewProperties.js';
import graphingLines from '../../graphingLines.js';
import SlopeInterceptEquationNode from './SlopeInterceptEquationNode.js';
import SlopeInterceptGraphNode from './SlopeInterceptGraphNode.js';

/**
 * @param {SlopeInterceptModel} model
 * @constructor
 */
function SlopeInterceptScreenView( model ) {

  const viewProperties = new LineFormsViewProperties();

  LineFormsScreenView.call( this, model, viewProperties,

    // graph
    new SlopeInterceptGraphNode( model, viewProperties ),

    // graph control panel
    new GraphControlPanel(
      viewProperties.gridVisibleProperty,
      viewProperties.slopeToolVisibleProperty,
      model.standardLines
    ),

    // equation accordion box
    new EquationAccordionBox(
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
      viewProperties.interactiveEquationVisibleProperty
    )
  );
}

graphingLines.register( 'SlopeInterceptScreenView', SlopeInterceptScreenView );

inherit( LineFormsScreenView, SlopeInterceptScreenView );
export default SlopeInterceptScreenView;