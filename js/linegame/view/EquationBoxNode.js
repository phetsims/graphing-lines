// Copyright 2002-2013, University of Colorado Boulder

/**
 * Box around an equation in the "Line Game".
 * Has an icon that indicates "correct" (check mark) or "incorrect" (red "X").
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // images
  var correctImage = require( 'image!GRAPHING_LINES/../images/Check-Mark-u2713.png' );
  var incorrectImage = require( 'image!GRAPHING_LINES/../images/Heavy-Ballot-X-u2718.png' );

  // constants
  var X_MARGIN = 20;
  var Y_MARGIN = 10;

  /**
   * @param {String} title
   * @param {Color|String} titleColor
   * @param {Dimension2} boxSize
   * @param {Node} equationNode
   * @constructor
   */
  function EquationBoxNode( title, titleColor, boxSize, equationNode ) {

    var thisNode = this;
    Node.call( thisNode );

    // title, scale to fit in the box
    var titleNode = new Text( title, {
      fill: titleColor,
      font: new PhetFont( { size: 24, weight: 'bold' } )
    } );
    var maxTitleWidth = boxSize.width - ( 2 * X_MARGIN );
    if ( titleNode.width > maxTitleWidth ) {
      titleNode.scale = maxTitleWidth / titleNode.width;
    }

    var boxNode = new Rectangle( 0, 0, boxSize.width, boxSize.height, 20, 20, {
      fill: 'rgb( 238, 238, 238 )',
      stroke: 'black',
      lineWidth: 1
    } );

    // icons for 'correct' and 'incorrect'
    thisNode.correctIconNode = new Image( correctImage );
    thisNode.incorrectIconNode = new Image( incorrectImage );

    // rendering order
    thisNode.addChild( boxNode );
    thisNode.addChild( titleNode );
    thisNode.addChild( equationNode );
    thisNode.addChild( thisNode.correctIconNode );
    thisNode.addChild( thisNode.incorrectIconNode );

    // layout
    {
      // title in upper left
      titleNode.left = X_MARGIN;
      titleNode.top = Y_MARGIN;
      // equation left-justified, vertically centered in space below title
      equationNode.left = X_MARGIN;
      equationNode.centerY = titleNode.bottom + ( ( boxSize.height - titleNode.bottom ) / 2 );
      // icons in upper-right corner
      var iconXMargin = 10;
      var iconYMargin = 5;
      thisNode.correctIconNode.left = boxNode.right - iconXMargin;
      thisNode.correctIconNode.top = boxNode.top + iconYMargin;
      thisNode.incorrectIconNode.left = boxNode.right - iconXMargin;
      thisNode.incorrectIconNode.top = boxNode.top + iconYMargin;
    }

    // icons are initially hidden
    thisNode.correctIconNode.visible = false;
    thisNode.incorrectIconNode.visible = false;
  }

  return inherit( Node, EquationBoxNode, {

    // Sets the visibility of the correct icon (green check mark).
    setCorrectIconVisible: function( visible ) {
      this.correctIconNode.visible = visible;
    },

    // Sets the visibility of the incorrect icon (red X).
    setIncorrectIconVisible: function( visible ) {
      this.incorrectIconNode.visible = visible;
    }
  } );
} );