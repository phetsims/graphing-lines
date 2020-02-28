// Copyright 2013-2020, University of Colorado Boulder

/**
 * Accordion box that contains the interactive equation and related controls
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import graphingLinesStrings from '../../graphing-lines-strings.js';
import graphingLines from '../../graphingLines.js';
import GLColors from '../GLColors.js';
import GLFont from '../GLFont.js';

const eraseLinesString = graphingLinesStrings.eraseLines;
const saveLineString = graphingLinesStrings.saveLine;

// constants
const BUTTON_FONT = new GLFont( 18 );

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

  options = merge( {
    fill: GLColors.CONTROL_PANEL_BACKGROUND,
    titleXSpacing: 5,
    titleYMargin: 10,
    contentXMargin: 10,
    contentYMargin: 10,
    contentYSpacing: 0,
    buttonXMargin: 10,
    buttonYMargin: 10,
    expandCollapseButtonOptions: {
      sideLength: 30
    }
  }, options );

  assert && assert( !options.titleNode, 'EquationAccordionBox sets titleNode' );
  options.titleNode = titleNode;

  assert && assert( !options.expandedProperty, 'EquationAccordionBox sets expandedProperty' );
  options.expandedProperty = expandedProperty;

  // Save Line button
  const saveLineButton = new TextPushButton( saveLineString, {
    listener: function() { savedLines.add( interactiveLineProperty.get().withColor( GLColors.SAVED_LINE_NORMAL ) ); },
    font: BUTTON_FONT,
    baseColor: 'white',
    xMargin: 10
  } );

  // Erase Lines button
  const eraseLinesButton = new TextPushButton( eraseLinesString, {
    listener: function() { savedLines.clear(); },
    font: BUTTON_FONT,
    baseColor: 'white',
    xMargin: 10
  } );

  // horizontal layout of buttons
  const buttonGroup = new HBox( {
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

  const contentNode = new VBox( {
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

inherit( AccordionBox, EquationAccordionBox );
export default EquationAccordionBox;