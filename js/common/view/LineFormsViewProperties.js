// Copyright 2013-2020, University of Colorado Boulder

/**
 * Properties that are specific to subtypes of LineFormsView as well as graphing-quadratics
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import graphingLines from '../../graphingLines.js';

class LineFormsViewProperties {

  constructor() {

    // @public determines whether all lines are visible on the graph
    this.linesVisibleProperty = new BooleanProperty( true );

    // @public determines whether the grid is visible on the graph
    this.gridVisibleProperty = new BooleanProperty( true );

    // @public determines whether the interactive line is visible in the control panel
    this.interactiveEquationVisibleProperty = new BooleanProperty( true );

    // @public determines whether the slope tool is visible on the graph
    this.slopeToolVisibleProperty = new BooleanProperty( true );
  }

  // @public
  reset() {
    this.linesVisibleProperty.reset();
    this.gridVisibleProperty.reset();
    this.interactiveEquationVisibleProperty.reset();
    this.slopeToolVisibleProperty.reset();
  }
}

graphingLines.register( 'LineFormsViewProperties', LineFormsViewProperties );

export default LineFormsViewProperties;