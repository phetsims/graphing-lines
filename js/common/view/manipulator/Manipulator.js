// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base type for all line manipulators.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  /**
   * @param {number} diameter diameter of the sphere
   * @param {Color} color base color used to shade the sphere
   * @param {*} options
   * @constructor
   */
  function Manipulator( diameter, color, options ) {

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

  return inherit( ShadedSphereNode, Manipulator );
} );