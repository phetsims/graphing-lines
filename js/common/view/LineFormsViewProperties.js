// Copyright 2013-2019, University of Colorado Boulder

/**
 * Properties that are specific to subtypes of LineFormsView as well as graphing-quadratics
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function LineFormsViewProperties() {

    // @public determines whether all lines are visible on the graph
    this.linesVisibleProperty = new BooleanProperty( true );

    // @public determines whether the grid is visible on the graph
    this.gridVisibleProperty = new BooleanProperty( true );

    // @public determines whether the interactive line is visible in the control panel
    this.interactiveEquationVisibleProperty = new BooleanProperty( true );

    // @public determines whether the slope tool is visible on the graph
    this.slopeToolVisibleProperty = new BooleanProperty( true );
  }

  graphingLines.register( 'LineFormsViewProperties', LineFormsViewProperties );

  return inherit( Object, LineFormsViewProperties, {

    // @public
    reset: function() {
      this.linesVisibleProperty.reset();
      this.gridVisibleProperty.reset();
      this.interactiveEquationVisibleProperty.reset();
      this.slopeToolVisibleProperty.reset();
    }
  } );
} );
