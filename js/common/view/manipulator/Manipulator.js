// Copyright 2013-2019, University of Colorado Boulder

/**
 * Base type for all line manipulators.
 * A pseudo-3D sphere with a halo that appears during interactions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ButtonListener = require( 'SCENERY/input/ButtonListener' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const Color = require( 'SCENERY/util/Color' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  const Shape = require( 'KITE/Shape' );

  /**
   * @param {number} radius radius of the sphere
   * @param {Color|String} color base color used to shade the sphere
   * @param {Object} [options]
   * @constructor
   */
  function Manipulator( radius, color, options ) {

    const mainColor = Color.toColor( color );
    options = merge( {

      // Alpha channel of the halo, 0.0 - 1.0. Setting this to 0 results in no halo.
      haloAlpha: 0.5,

      // ShadedSphereNode options
      mainColor: mainColor,
      highlightColor: Color.WHITE,
      shadowColor: mainColor.darkerColor(),
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

      const haloNode = new Circle( 1.75 * radius, {
        fill: mainColor.withAlpha( options.haloAlpha ),
        pickable: false,
        visible: false,
        renderer: 'canvas' // Workaround for Firefox graphics artifacts, see phetsims/graphing-lines/issues/119
      } );
      this.addChild( haloNode );

      // halo visibility
      this.addInputListener( new ButtonListener( {
        up: function( event ) { haloNode.visible = false; },
        down: function( event ) { haloNode.visible = true; },
        over: function( event ) { haloNode.visible = true; }
      } ) );
    }

    const sphereNode = new ShadedSphereNode( 2 * radius, {
      mainColor: options.mainColor,
      highlightColor: options.highlightColor,
      shadowColor: options.shadowColor,
      lineWidth: options.lineWidth,
      stroke: options.stroke
    } );
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
     * @public
     * @static
     */
    createIcon: function( radius, color, options ) {

      // turn off options related to interactivity, see constructor
      options = merge( {}, options, {
        haloAlpha: 0,
        pickable: false,
        mouseArea: null,
        touchArea: null
      } );

      return new Manipulator( radius, color, options );
    }
  } );
} );