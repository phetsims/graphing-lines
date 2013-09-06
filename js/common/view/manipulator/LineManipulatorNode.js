// Copyright 2002-2013, University of Colorado

/**
 * Manipulator for interacting directly with a line.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  /**
   * @param {number} diameter diameter of the sphere
   * @param {Color} color base color used to shade the sphere
   * @constructor
   */
  function LineManipulatorNode( diameter, color, options ) {

    options = _.extend( {
      mainColor: color,
      highlightColor: Color.WHITE,
      shadowColor: color.darkerColor(),
      cursor: 'pointer',  // all manipulators are interactive
      lineWidth: 1,
      stroke: color.darkerColor().darkerColor()
    }, options );

    ShadedSphereNode.call( this, diameter, options );
  }

  return inherit( ShadedSphereNode, LineManipulatorNode );
} );