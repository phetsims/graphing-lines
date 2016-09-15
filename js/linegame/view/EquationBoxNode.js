// Copyright 2013-2015, University of Colorado Boulder

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
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
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

    Node.call( this );

    // @private icons for 'correct' and 'incorrect'
    var iconFont = new GLFont( 72 );
    this.correctIconNode = new ShadowText( '\u2713', { fill: 'rgb(137,244,0)', font: iconFont } ); // @private check mark
    this.incorrectIconNode = new ShadowText( '\u2718', { fill: 'rgb(252,104,0)', font: iconFont } ); // @private heavy ballot X

    var titleNode = new Text( title, {
      fill: titleColor,
      font: new GLFont( { size: 24, weight: 'bold' } ),
      maxWidth: boxSize.width - ( 2 * X_MARGIN ) - Math.max( this.correctIconNode.width, this.incorrectIconNode.width )
    } );

    var boxNode = new Rectangle( 0, 0, boxSize.width, boxSize.height, 20, 20, {
      fill: 'rgb( 238, 238, 238 )',
      stroke: 'black',
      lineWidth: 1
    } );

    equationNode.maxWidth = boxSize.width - ( 2 * X_MARGIN ); // constrain with for i18n

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
    var iconXMargin = 5;
    var iconYMargin = 1;
    this.correctIconNode.right = boxNode.right - iconXMargin;
    this.correctIconNode.top = boxNode.top + iconYMargin;
    this.incorrectIconNode.right = boxNode.right - iconXMargin;
    this.incorrectIconNode.top = boxNode.top + iconYMargin;

    // icons are initially hidden
    this.correctIconNode.visible = false;
    this.incorrectIconNode.visible = false;
  }

  graphingLines.register( 'EquationBoxNode', EquationBoxNode );

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