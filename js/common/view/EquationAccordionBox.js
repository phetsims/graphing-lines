// Copyright 2013-2018, University of Colorado Boulder

/**
 * Accordion box that contains the interactive equation and related controls
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AccordionBox = require( 'SUN/AccordionBox' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var eraseLinesString = require( 'string!GRAPHING_LINES/eraseLines' );
  var saveLineString = require( 'string!GRAPHING_LINES/saveLine' );

  // constants
  var BUTTON_FONT = new GLFont( 18 );

  /**
   * @param {Node} titleNode
   * @param {Node} interactiveEquationNode
   * @param {Property.<Line>} interactiveLineProperty
   * @param {ObservableArray.<Line>} savedLines
   * @param {Property.<boolean>} expandedProperty
   * @param {Object} [options]
   * @constructor
   */
  function EquationAccordionBox( titleNode, interactiveEquationNode, interactiveLineProperty, savedLines,
                                 expandedProperty, options ) {

    options = _.extend( {
      fill: GLColors.CONTROL_PANEL_BACKGROUND,
      titleXSpacing: 5,
      titleYMargin: 10,
      contentXMargin: 10,
      contentYMargin: 10,
      contentYSpacing: 0,
      buttonLength: 30,
      buttonXMargin: 10,
      buttonYMargin: 10
    }, options );

    assert && assert( !options.titleNode, 'EquationAccordionBox sets titleNode' );
    options.titleNode = titleNode;
    
    assert && assert( !options.expandedProperty, 'EquationAccordionBox sets expandedProperty' );
    options.expandedProperty = expandedProperty;

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
    var buttonGroup = new HBox( {
      spacing: 20,
      maxWidth: 320,
      children: [ saveLineButton, eraseLinesButton ]
    } );

    // Disable eraseLinesButton when there are no saved lines. unlink not needed.
    savedLines.lengthProperty.link( function( length ) {
      eraseLinesButton.enabled = ( length > 0 );
    } );

    const separatorWidth = Math.max( interactiveEquationNode.width, buttonGroup.width );
    const separatorOptions = { stroke: 'rgb( 212, 212, 212 )' };

    var contentNode = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        new HSeparator( separatorWidth, separatorOptions ),
        interactiveEquationNode,
        new HSeparator( separatorWidth, separatorOptions ),
        buttonGroup
      ]
    } );

    AccordionBox.call( this, contentNode, options );
  }

  graphingLines.register( 'EquationAccordionBox', EquationAccordionBox );

  return inherit( AccordionBox, EquationAccordionBox );
} );