// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for interactive-equation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ExpandCollapseButton = require( 'SUN/ExpandCollapseButton' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );

  // strings
  var saveLineString = require( 'string!GRAPHING_LINES/saveLine' );
  var eraseLinesString = require( 'string!GRAPHING_LINES/eraseLines' );

  // constants
  var BUTTON_FONT = new GLFont( 18 );

  /**
   * @param {Node} titleNode
   * @param {Property<Line>} interactiveLineProperty
   * @param {ObservableArray<Line>} savedLines
   * @param {Property<Boolean>} maximizedProperty
   * @param {Property<Boolean>} linesVisibleProperty
   * @param {Node} interactiveEquationNode
   * @param {*} options
   * @constructor
   */
  function EquationControls( titleNode, interactiveLineProperty, savedLines, maximizedProperty, linesVisibleProperty, interactiveEquationNode, options ) {

    options = _.extend( {
      fill: GLColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 10,
      yMargin: 10
    }, options );

    // Expand/collapse button
    var expandCollapseButton = new ExpandCollapseButton( 30, maximizedProperty );

    // Save Line button
    var saveLineButton = new TextPushButton( saveLineString, {
      listener: function() { savedLines.add( interactiveLineProperty.get().withColor( GLColors.SAVED_LINE_NORMAL ) ); },
      font: BUTTON_FONT,
      baseColor: 'white',
      xMargin: 10
    } );

    // Erase Lines button
    var eraseLinesButton = new TextPushButton( eraseLinesString, {
      listener: function() { savedLines.clear(); },
      font: BUTTON_FONT,
      baseColor: 'white',
      xMargin: 10
    } );

    // Sets the enabled states of the Save and Erase buttons
    var enableButtons = function() {
      saveLineButton.enabled = linesVisibleProperty.get();
      eraseLinesButton.enabled = ( linesVisibleProperty.get() && ( savedLines.length > 0 ) );
    };
    savedLines.lengthProperty.link( enableButtons.bind( this ) );
    linesVisibleProperty.link( enableButtons.bind( this ) );

    // Top-level content
    var content = new Node();
    content.addChild( titleNode );
    content.addChild( expandCollapseButton );

    // Stuff that is hidden when minimized must be attached to this node.
    var subContent = new Node();
    content.addChild( subContent );
    subContent.addChild( interactiveEquationNode );
    subContent.addChild( saveLineButton );
    subContent.addChild( eraseLinesButton );

    // horizontal separators, resized later
    var separatorColor = 'rgb( 212, 212, 212 )';
    var titleSeparator = new Line( 0, 0, 1, 0, { stroke: separatorColor } );
    var buttonsSeparator = new Line( 0, 0, 1, 0, { stroke: separatorColor } );
    subContent.addChild( titleSeparator );
    subContent.addChild( buttonsSeparator );

    // do vertical layout first, don't care about horizontal positions here
    var xSpacing = 10;
    var ySpacing = 10;
    var titleHeight = Math.max( titleNode.height, expandCollapseButton.height );
    expandCollapseButton.x = 0;
    expandCollapseButton.centerY = titleHeight / 2;
    titleNode.left = expandCollapseButton.right + xSpacing;
    titleNode.centerY = titleHeight / 2;
    titleSeparator.x = 0;
    titleSeparator.top = titleHeight + ySpacing;
    interactiveEquationNode.x = 0;
    interactiveEquationNode.top = titleSeparator.bottom + ySpacing;
    buttonsSeparator.x = 0;
    buttonsSeparator.top = interactiveEquationNode.bottom + ySpacing;
    saveLineButton.x = 0;
    saveLineButton.top = buttonsSeparator.bottom + ySpacing;
    eraseLinesButton.x = 0;
    eraseLinesButton.top = buttonsSeparator.bottom + ySpacing;

    // Horizontal strut, to prevent control panel from resizing when minimized.  Do this after vertical layout!
    var panelWidth = content.width + 5;
    var strutNode = new HStrut( panelWidth );
    content.addChild( strutNode );
    strutNode.moveToBack();

    // Set width of separators
    titleSeparator.setLine( 0, 0, panelWidth, 0 );
    buttonsSeparator.setLine( 0, 0, panelWidth, 0 );

    // now do horizontal layout
    titleNode.centerX = content.centerX;
    if ( titleNode.left <= expandCollapseButton.right ) {
      titleNode.left = expandCollapseButton.right + xSpacing;
    }
    interactiveEquationNode.centerX = content.centerX;
    saveLineButton.right = content.centerX - ( xSpacing / 2 );
    eraseLinesButton.left = content.centerX + ( xSpacing / 2 );

    maximizedProperty.link( function( maximized ) {
      if ( maximized && content.indexOfChild( subContent ) === -1 ) {
        content.addChild( subContent );
      }
      else if ( !maximized && content.indexOfChild( subContent ) !== -1 ) {
        content.removeChild( subContent );
      }
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, EquationControls );
} );