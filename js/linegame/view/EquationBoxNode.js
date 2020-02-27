// Copyright 2013-2019, University of Colorado Boulder

/**
 * Box around an equation in the 'Line Game'.
 * Has an icon that indicates 'correct' (check mark) or 'incorrect' (red 'X').
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import FontAwesomeNode from '../../../../sun/js/FontAwesomeNode.js';
import GLFont from '../../common/GLFont.js';
import graphingLines from '../../graphingLines.js';
import LineGameConstants from '../LineGameConstants.js';

// constants
const X_MARGIN = 20;
const Y_MARGIN = 10;

/**
 * @param {string} title
 * @param {Color|String} titleColor
 * @param {Dimension2} boxSize
 * @param {Node} equationNode
 * @constructor
 */
function EquationBoxNode( title, titleColor, boxSize, equationNode ) {

  Node.call( this );

  // @private icons for 'correct' and 'incorrect'
  this.correctIconNode = new FontAwesomeNode( 'check', {
    scale: 1.5,
    fill: LineGameConstants.ANSWER_COLOR
  } );
  this.incorrectIconNode = new FontAwesomeNode( 'times', {
    scale: 1.5,
    fill: PhetColorScheme.RED_COLORBLIND
  } );

  const titleNode = new Text( title, {
    fill: titleColor,
    font: new GLFont( { size: 24, weight: 'bold' } ),
    maxWidth: boxSize.width - ( 2 * X_MARGIN ) - Math.max( this.correctIconNode.width, this.incorrectIconNode.width )
  } );

  const boxNode = new Rectangle( 0, 0, boxSize.width, boxSize.height, 20, 20, {
    fill: 'rgb( 238, 238, 238 )',
    stroke: 'black',
    lineWidth: 1
  } );

  equationNode.maxWidth = boxSize.width - ( 2 * X_MARGIN ); // constrain width for i18n

  // rendering order
  this.addChild( boxNode );
  this.addChild( titleNode );
  this.addChild( equationNode );
  this.addChild( this.correctIconNode );
  this.addChild( this.incorrectIconNode );

  // layout
  // title in upper left
  titleNode.left = X_MARGIN;
  titleNode.top = Y_MARGIN;
  // equation left-justified, vertically centered in space below title
  equationNode.left = X_MARGIN;
  equationNode.centerY = titleNode.bottom + ( ( boxNode.bottom - titleNode.bottom ) / 2 );
  // icons in upper-right corner
  this.correctIconNode.right = boxNode.right - X_MARGIN;
  this.correctIconNode.top = boxNode.top + Y_MARGIN;
  this.incorrectIconNode.right = boxNode.right - X_MARGIN;
  this.incorrectIconNode.top = boxNode.top + Y_MARGIN;

  // icons are initially hidden
  this.correctIconNode.visible = false;
  this.incorrectIconNode.visible = false;
}

graphingLines.register( 'EquationBoxNode', EquationBoxNode );

export default inherit( Node, EquationBoxNode, {

  // @public Sets the visibility of the correct icon (green check mark).
  setCorrectIconVisible: function( visible ) {
    this.correctIconNode.visible = visible;
  },

  // @public Sets the visibility of the incorrect icon (red X).
  setIncorrectIconVisible: function( visible ) {
    this.incorrectIconNode.visible = visible;
  }
} );