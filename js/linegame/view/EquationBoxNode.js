// Copyright 2013-2019, University of Colorado Boulder

/**
 * Box around an equation in the 'Line Game'.
 * Has an icon that indicates 'correct' (check mark) or 'incorrect' (red 'X').
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

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
    this.correctIconNode = new FontAwesomeNode( 'check', {
      scale: 1.5,
      fill: LineGameConstants.ANSWER_COLOR
    } );
    this.incorrectIconNode = new FontAwesomeNode( 'times', {
      scale: 1.5,
      fill: PhetColorScheme.RED_COLORBLIND
    } );

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