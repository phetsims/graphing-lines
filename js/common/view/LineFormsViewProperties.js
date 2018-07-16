// Copyright 2013-2016, University of Colorado Boulder

/**
 * Properties that are specific to subtypes of LineFormsView as well as graphing-quadratics
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function LineFormsViewProperties() {

    // @public determines whether all lines are visible on the graph
    this.linesVisibleProperty = new Property( true );

    // @public determines whether the grid is visible on the graph
    this.gridVisibleProperty = new Property( true );

    // @public determines whether the interactive line is visible in the control panel
    this.interactiveEquationVisibleProperty = new Property( true );

    // @public determines whether the slope tool is visible on the graph
    this.slopeToolVisibleProperty = new Property( true );

    // @public graphing-quadratics: determines whether a point is displayed to mark the vertex of the quadratic
    this.vertexVisibleProperty = new BooleanProperty( false );

    // @public graphing-quadratics: determines whether axis of symmetry on the quadratic is displayed
    this.axisOfSymmetryVisibleProperty = new BooleanProperty( false );

    // @public graphing-quadratics: determines points are displayed to mark roots of the quadratic
    this.rootsVisibleProperty = new BooleanProperty( false );

    // @public graphing-quadratics: determines whether a curve is displayed to reflect the quadratic term (y=ax^2)
    this.quadraticTermVisibleProperty = new BooleanProperty( false );

    // @public graphing-quadratics: determines whether a line is displayed to reflect the linear term (y=bx)
    this.linearTermVisibleProperty = new BooleanProperty( false );

    // @public graphing-quadratics: determines whether a line is displayed to reflect the constant term (y=c)
    this.constantTermVisibleProperty = new BooleanProperty( false );

    // @public graphing-quadratics: determines whether a point and a line are displayed to mark the focus and directrix
    this.directrixVisibleProperty = new BooleanProperty( false );
  }

  graphingLines.register( 'LineFormsViewProperties', LineFormsViewProperties );

  return inherit( Object, LineFormsViewProperties, {

    // @public
    reset: function() {
      this.linesVisibleProperty.reset();
      this.gridVisibleProperty.reset();
      this.interactiveEquationVisibleProperty.reset();
      this.slopeToolVisibleProperty.reset();
      this.vertexVisibleProperty.reset();
      this.axisOfSymmetryVisibleProperty.reset();
      this.rootsVisibleProperty.reset();
      this.quadraticTermVisibleProperty.reset();
      this.linearTermVisibleProperty.reset();
      this.constantTermVisibleProperty.reset();
      this.directrixVisibleProperty.reset();
    }
  } );
} );
