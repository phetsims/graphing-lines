// Copyright 2013-2020, University of Colorado Boulder

/**
 * Accordion box that contains the interactive equation and related controls
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox } from '../../../../scenery/js/imports.js';
import { VBox } from '../../../../scenery/js/imports.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import TextPushButton from '../../../../sun/js/buttons/TextPushButton.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import graphingLines from '../../graphingLines.js';
import graphingLinesStrings from '../../graphingLinesStrings.js';
import GLColors from '../GLColors.js';

// constants
const BUTTON_FONT = new PhetFont( 18 );

class EquationAccordionBox extends AccordionBox {

  /**
   * @param {Node} titleNode
   * @param {Node} interactiveEquationNode
   * @param {Property.<Line>} interactiveLineProperty
   * @param {ObservableArrayDef.<Line>} savedLines
   * @param {Property.<boolean>} expandedProperty
   * @param {Object} [options]
   */
  constructor( titleNode, interactiveEquationNode, interactiveLineProperty, savedLines, expandedProperty, options ) {

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
    const saveLineButton = new TextPushButton( graphingLinesStrings.saveLine, {
      listener: () => savedLines.add( interactiveLineProperty.get().withColor( GLColors.SAVED_LINE_NORMAL ) ),
      font: BUTTON_FONT,
      baseColor: 'white',
      xMargin: 10
    } );

    // Erase Lines button
    const eraseLinesButton = new TextPushButton( graphingLinesStrings.eraseLines, {
      listener: () => savedLines.clear(),
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
    savedLines.lengthProperty.link( length => {
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

    super( contentNode, options );
  }
}

graphingLines.register( 'EquationAccordionBox', EquationAccordionBox );

export default EquationAccordionBox;