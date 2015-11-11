// Copyright 2013-2015, University of Colorado Boulder

/**
 * Properties that are specific to subtypes of LineFormsView.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  function LineFormsViewProperties() {
    PropertySet.call( this, {

      // @public
      linesVisible: true, // determines whether all lines are visible on the graph
      gridVisible: true, // determines whether the grid is visible on the graph
      interactiveEquationVisible: true, // determines whether the interactive line is visible in the control panel
      slopeToolVisible: true // determines whether the slope tool is visible on the graph
    } );
  }

  graphingLines.register( 'LineFormsViewProperties', LineFormsViewProperties );

  return inherit( PropertySet, LineFormsViewProperties );
} );
