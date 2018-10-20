// Copyright 2013-2015, University of Colorado Boulder

/**
 * Base type for all line manipulators.
 * A pseudo-3D sphere with a halo that appears during interactions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Color = require( 'SCENERY/util/Color' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {number} radius radius of the sphere
   * @param {Color|String} color base color used to shade the sphere
   * @param {Object} [options]
   * @constructor
   */
  function Manipulator( radius, color, options ) {

    var mainColor = Color.toColor( color );
    options = _.extend( {

      // ShadedSphereNode options
      mainColor: mainColor,
      highlightColor: Color.WHITE,
      shadowColor: mainColor.darkerColor(),
      haloAlpha: 0.5, // alpha channel of the halo, 0.0 - 1.0
      lineWidth: 1,
      stroke: mainColor.darkerColor(),

      // Node options
      cursor: 'pointer',
      mouseArea: Shape.circle( 0, 0, 1.5 * radius ),
      touchArea: Shape.circle( 0, 0, 1.5 * radius )

    }, options );

    Node.call( this );

    // add a halo only if alpha it will be visible, useful for creating non-interactive manipulator icons
    if ( options.haloAlpha !== 0 ) {

      var haloNode = new Circle( 1.75 * radius, {
        fill: mainColor.withAlpha( options.haloAlpha ),
        pickable: false,
        visible: false
      } );
      this.addChild( haloNode );

      // halo visibility
      this.addInputListener( new ButtonListener( {
        up: function( event ) { haloNode.visible = false; },
        down: function( event ) { haloNode.visible = true; },
        over: function( event ) { haloNode.visible = true; }
      } ) );
    }

    var sphereNode = new ShadedSphereNode( 2 * radius, options );
    this.addChild( sphereNode );

    this.mutate( options );
  }

  graphingLines.register( 'Manipulator', Manipulator );

  return inherit( Node, Manipulator, {}, {

    /**
     * Creates a non-interactive manipulator icon.
     * @param {number} radius radius of the sphere
     * @param {Color|String} color base color used to shade the sphere
     * @param {Object} options - see constructor
     * @returns {Manipulator}
     */
    createIcon: function( radius, color, options ) {

      // turn off options related to interactivity, see constructor
      options = _.extend( {}, options, {
        haloAlpha: 0,
        pickable: false,
        mouseArea: null,
        touchArea: null
      } );

      return new Manipulator( radius, color, options );
    }
  } );
} );