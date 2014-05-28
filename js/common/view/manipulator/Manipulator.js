// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base type for all line manipulators.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {number} diameter diameter of the sphere
   * @param {Color|String} color base color used to shade the sphere
   * @param {*} options
   * @constructor
   */
  function Manipulator( diameter, color, options ) {

    var radius = diameter / 2;

    var mainColor = Color.toColor( color );
    options = _.extend( {
      mainColor: mainColor,
      highlightColor: Color.WHITE,
      shadowColor: mainColor.darkerColor(),
      cursor: 'pointer',  // all manipulators are interactive
      lineWidth: 1,
      stroke: mainColor.darkerColor()
    }, options );

    var haloNode = new Circle( 1.75 * radius, { fill: mainColor.withAlpha( 0.15 ), pickable: false } );
    var sphereNode = new ShadedSphereNode( diameter, options );

    Node.call( this, { children: [ haloNode, sphereNode ] } );

    // expand pointer areas
    this.mouseArea = this.touchArea = Shape.circle( 0, 0, 1.5 * radius );
  }

  return inherit( Node, Manipulator );
} );