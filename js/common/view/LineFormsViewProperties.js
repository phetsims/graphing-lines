// Copyright 2002-2013, University of Colorado

/**
 * Properties that are specific to the view for the "Slope", "Slope-Intercept" and "Point-Slope" tabs.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
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
