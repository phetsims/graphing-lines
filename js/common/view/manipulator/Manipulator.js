// Copyright 2013-2020, University of Colorado Boulder

/**
 * Base type for all line manipulators.
 * A pseudo-3D sphere with a halo that appears during interactions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Shape from '../../../../../kite/js/Shape.js';
import merge from '../../../../../phet-core/js/merge.js';
import ShadedSphereNode from '../../../../../scenery-phet/js/ShadedSphereNode.js';
import ButtonListener from '../../../../../scenery/js/input/ButtonListener.js';
import Circle from '../../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Color from '../../../../../scenery/js/util/Color.js';
import graphingLines from '../../../graphingLines.js';

class Manipulator extends  Node {

  /**
   * @param {number} radius radius of the sphere
   * @param {Color|String} color base color used to shade the sphere
   * @param {Object} [options]
   */
  constructor( radius, color, options ) {

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

    super();

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
        up: () => { haloNode.visible = false; },
        down: () => { haloNode.visible = true; },
        over: () => { haloNode.visible = true; }
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

  /**
   * Creates a non-interactive manipulator icon.
   * @param {number} radius radius of the sphere
   * @param {Color|String} color base color used to shade the sphere
   * @param {Object} [options] - see constructor
   * @returns {Manipulator}
   * @public
   * @static
   */
  static createIcon( radius, color, options ) {

    // turn off options related to interactivity, see constructor
    options = merge( {}, options, {
      haloAlpha: 0,
      pickable: false,
      mouseArea: null,
      touchArea: null
    } );

    return new Manipulator( radius, color, options );
  }
}

graphingLines.register( 'Manipulator', Manipulator );

export default Manipulator;