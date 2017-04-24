// Copyright 2013-2015, University of Colorado Boulder

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
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var saveLineString = require( 'string!GRAPHING_LINES/saveLine' );
  var eraseLinesString = require( 'string!GRAPHING_LINES/eraseLines' );

  // constants
  var BUTTON_FONT = new GLFont( 18 );
  var TITLE_X_SPACING = 5;
  var Y_SPACING = 10;

  /**
   * @param {Node} titleNode
   * @param {Property.<Line>} interactiveLineProperty
   * @param {ObservableArray.<Line>} savedLines
   * @param {Property.<boolean>} maximizedProperty
   * @param {Property.<boolean>} linesVisibleProperty
   * @param {Node} interactiveEquationNode
   * @param {Object} [options]
   * @constructor
   */
  function EquationControls( titleNode, interactiveLineProperty, savedLines, maximizedProperty, linesVisibleProperty, interactiveEquationNode, options ) {

    options = _.extend( {
      fill: GLColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 10,
      yMargin: 10
    }, options );

    // Expand/collapse button
    var expandCollapseButton = new ExpandCollapseButton( maximizedProperty, { sideLength: 30 } );

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

    // horizontal layout of buttons
    var buttons = new HBox( {
      spacing: 20,
      maxWidth: 320,
      children: [ saveLineButton, eraseLinesButton ]
    } );

    // Sets the enabled states of the Save and Erase buttons
    // unmultilink is unnecessary since EquationControls exists for the lifetime of the sim.
    Property.multilink( [ savedLines.lengthProperty, linesVisibleProperty ],
      function() {
        saveLineButton.enabled = linesVisibleProperty.get();
        eraseLinesButton.enabled = ( linesVisibleProperty.get() && ( savedLines.length > 0 ) );
      }
    );

    var contentWidth = Math.max( buttons.width, interactiveEquationNode.width, ( expandCollapseButton.width + titleNode.width + TITLE_X_SPACING ) );

        // Stuff that is hidden when minimized must be attached to this node.
    var separatorColor = 'rgb( 212, 212, 212 )';
    var subContent = new VBox( {
      spacing: Y_SPACING,
      align: 'center',
      children: [
        new Line( 0, 0, contentWidth, 0, { stroke: separatorColor } ),
        interactiveEquationNode,
        new Line( 0, 0, contentWidth, 0, { stroke: separatorColor } ),
        buttons
      ]
    } );

    // Top-level content, with strut to prevent panel from resizing
    var content = new Node( {
      children: [ new HStrut( contentWidth ), expandCollapseButton, titleNode, subContent  ]
    } );
    titleNode.centerX = contentWidth / 2;
    titleNode.centerY = expandCollapseButton.centerY;
    subContent.top = Math.max( expandCollapseButton.bottom, titleNode.bottom ) + Y_SPACING;

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

  graphingLines.register( 'EquationControls', EquationControls );

  return inherit( Panel, EquationControls );
} );