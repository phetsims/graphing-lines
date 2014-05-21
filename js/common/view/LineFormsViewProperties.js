// Copyright 2002-2014, University of Colorado Boulder

/**
 * Properties that are specific to subtypes of LineFormsView.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  function LineFormsViewProperties() {
    PropertySet.call( this, {
      linesVisible: true,
      interactiveLineVisible: true,
      interactiveEquationVisible: true,
      slopeVisible: true
    } );
  }

  return inherit( PropertySet, LineFormsViewProperties );
} );
