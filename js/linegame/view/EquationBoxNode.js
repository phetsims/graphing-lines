// Copyright 2002-2014, University of Colorado Boulder

/**
 * Box around an equation in the 'Line Game'.
 * Has an icon that indicates 'correct' (check mark) or 'incorrect' (red 'X').
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ShadowText = require( 'SCENERY_PHET/ShadowText' );

  // constants
  var X_MARGIN = 20;
  var Y_MARGIN = 10;

  /**
   * @param {string} title
   * @param {Color|String} titleColor
   * @param {Dimension2} boxSize
   * @param {Node} equationNode
   * @constructor
   */
  function EquationBoxNode( title, titleColor, boxSize, equationNode ) {

    var thisNode = this;
    Node.call( thisNode );

    // @private icons for 'correct' and 'incorrect'
    var iconFont = new GLFont( 72 );
    thisNode.correctIconNode = new ShadowText( '\u2713', { fill: 'rgb(137,244,0)', font: iconFont } ); // @private check mark
    thisNode.incorrectIconNode = new ShadowText( '\u2718', { fill: 'rgb(252,104,0)', font: iconFont } ); // @private heavy ballot X

    var titleNode = new Text( title, {
      fill: titleColor,
      font: new GLFont( { size: 24, weight: 'bold' } ),
      maxWidth: boxSize.width - ( 2 * X_MARGIN ) - Math.max( thisNode.correctIconNode.width, thisNode.incorrectIconNode.width )
    } );

    var boxNode = new Rectangle( 0, 0, boxSize.width, boxSize.height, 20, 20, {
      fill: 'rgb( 238, 238, 238 )',
      stroke: 'black',
      lineWidth: 1
    } );

    equationNode.maxWidth = boxSize.width - ( 2 * X_MARGIN ); // constrain with for i18n

    // rendering order
    thisNode.addChild( boxNode );
    thisNode.addChild( titleNode );
    thisNode.addChild( equationNode );
    thisNode.addChild( thisNode.correctIconNode );
    thisNode.addChild( thisNode.incorrectIconNode );

    // layout
    // title in upper left
    titleNode.left = X_MARGIN;
    titleNode.top = Y_MARGIN;
    // equation left-justified, vertically centered in space below title
    equationNode.left = X_MARGIN;
    equationNode.centerY = titleNode.bottom + ( ( boxNode.bottom - titleNode.bottom ) / 2 );
    // icons in upper-right corner
    var iconXMargin = 5;
    var iconYMargin = 1;
    thisNode.correctIconNode.right = boxNode.right - iconXMargin;
    thisNode.correctIconNode.top = boxNode.top + iconYMargin;
    thisNode.incorrectIconNode.right = boxNode.right - iconXMargin;
    thisNode.incorrectIconNode.top = boxNode.top + iconYMargin;

    // icons are initially hidden
    thisNode.correctIconNode.visible = false;
    thisNode.incorrectIconNode.visible = false;
  }

  return inherit( Node, EquationBoxNode, {

    // @public Sets the visibility of the correct icon (green check mark).
    setCorrectIconVisible: function( visible ) {
      this.correctIconNode.visible = visible;
    },

    // @public Sets the visibility of the incorrect icon (red X).
    setIncorrectIconVisible: function( visible ) {
      this.incorrectIconNode.visible = visible;
    }
  } );
} );