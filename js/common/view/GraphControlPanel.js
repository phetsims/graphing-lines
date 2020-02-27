// Copyright 2013-2019, University of Colorado Boulder

/**
 * Control panel for various features related to the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import GridCheckbox from '../../../../scenery-phet/js/GridCheckbox.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import LayoutBox from '../../../../scenery/js/nodes/LayoutBox.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import graphingLinesStrings from '../../graphing-lines-strings.js';
import graphingLines from '../../graphingLines.js';
import GLColors from '../GLColors.js';
import GLFont from '../GLFont.js';
import GLSymbols from '../GLSymbols.js';
import Line from '../model/Line.js';
import GLIconFactory from './GLIconFactory.js';

const slopeString = graphingLinesStrings.slope;

// constants
// y = x
const Y_EQUALS_X = GLSymbols.y + ' ' + MathSymbols.EQUAL_TO + ' ' + GLSymbols.x;
// y = -x
const Y_EQUALS_NEGATIVE_X = GLSymbols.y + ' ' + MathSymbols.EQUAL_TO + ' ' + MathSymbols.UNARY_MINUS + GLSymbols.x;

/**
 * @param {Property.<boolean>} gridVisibleProperty is grid visible on the graph?
 * @param {Property.<boolean>} slopeToolVisibleProperty is the slope tool visible on the graphed interactive line?
 * @param {ObservableArray.<Lines>} standardLines standard lines (y = x, y = -x) that are available for viewing
 * @param {Object} [options] should checkboxes for standard lines be accessible?
 * @constructor
 */
function GraphControlPanel( gridVisibleProperty, slopeToolVisibleProperty, standardLines, options ) {

  options = merge( {
    fill: GLColors.CONTROL_PANEL_BACKGROUND,
    stroke: 'black',
    lineWidth: 1,
    xMargin: 20,
    yMargin: 15,
    cornerRadius: 10,
    maxWidth: 400, // determined empirically
    includeStandardLines: true // if true, includes visibility controls for 'y = x' and 'y = -x'
  }, options );

  // private properties for standard-line checkboxes
  const yEqualsXVisibleProperty = new BooleanProperty( standardLines.contains( Line.Y_EQUALS_X_LINE ) );
  const yEqualsNegativeXVisibleProperty = new BooleanProperty( standardLines.contains( Line.Y_EQUALS_NEGATIVE_X_LINE ) );

  // checkboxes
  const TEXT_OPTIONS = {
    font: new GLFont( 18 ),
    maxWidth: 150 // determined empirically
  };
  const ICON_SIZE = 60;
  const ICON_SPACING = 15;

  // 'Slope' checkbox
  const slopeCheckbox = new Checkbox( new HBox( {
    spacing: ICON_SPACING,
    children: [
      new Text( slopeString, TEXT_OPTIONS ),
      GLIconFactory.createSlopeToolIcon( ICON_SIZE )
    ]
  } ), slopeToolVisibleProperty );

  // 'y = x' checkbox
  const yEqualsXCheckbox = new Checkbox( new HBox( {
    spacing: ICON_SPACING,
    children: [
      new RichText( Y_EQUALS_X, TEXT_OPTIONS ),
      GLIconFactory.createGraphIcon( ICON_SIZE, GLColors.Y_EQUALS_X, -3, -3, 3, 3 )
    ]
  } ), yEqualsXVisibleProperty );

  // 'y = -x' checkbox
  const yEqualsNegativeXCheckbox = new Checkbox( new HBox( {
    spacing: ICON_SPACING,
    children: [
      new RichText( Y_EQUALS_NEGATIVE_X, TEXT_OPTIONS ),
      GLIconFactory.createGraphIcon( ICON_SIZE, GLColors.Y_EQUALS_NEGATIVE_X, -3, 3, 3, -3 )
    ]
  } ), yEqualsNegativeXVisibleProperty );

  // Grid checkbox
  const gridCheckbox = new GridCheckbox( gridVisibleProperty );
  gridCheckbox.touchArea = gridCheckbox.localBounds.dilatedXY( 15, 10 );

  // vertical layout
  const contentNode = new LayoutBox( {
    children: ( options.includeStandardLines ) ?
      [ slopeCheckbox, yEqualsXCheckbox, yEqualsNegativeXCheckbox, gridCheckbox ] :
      [ slopeCheckbox, gridCheckbox ],
    orientation: 'vertical',
    spacing: 20,
    align: 'left'
  } );

  Panel.call( this, contentNode, options );

  const setStandardLineVisible = function( visible, line ) {
    if ( visible && !standardLines.contains( line ) ) {
      standardLines.add( line );
    }
    else if ( !visible && standardLines.contains( line ) ) {
      standardLines.remove( line );
    }
  };

  // Add/remove standard line 'y = x'
  // unlink is unnecessary since GraphControlPanel exists for the lifetime of the sim.
  yEqualsXVisibleProperty.link( function( visible ) {
    setStandardLineVisible( visible, Line.Y_EQUALS_X_LINE );
  } );

  // Add/remove standard line 'y = -x'
  // unlink is unnecessary since GraphControlPanel exists for the lifetime of the sim.
  yEqualsNegativeXVisibleProperty.link( function( visible ) {
    setStandardLineVisible( visible, Line.Y_EQUALS_NEGATIVE_X_LINE );
  } );

  // Select appropriate checkboxes when standard lines are added.
  // removeItemAddedListener is unnecessary since GraphControlPanel exists for the lifetime of the sim.
  standardLines.addItemAddedListener( function( line ) {
    if ( line === Line.Y_EQUALS_X_LINE ) {
      yEqualsXVisibleProperty.set( true );
    }
    else if ( line === Line.Y_EQUALS_NEGATIVE_X_LINE ) {
      yEqualsNegativeXVisibleProperty.set( true );
    }
  } );

  // Deselect appropriate checkboxes when standard lines are removed.
  // removeItemRemovedListener is unnecessary since GraphControlPanel exists for the lifetime of the sim.
  standardLines.addItemRemovedListener( function( line ) {
    if ( line === Line.Y_EQUALS_X_LINE ) {
      yEqualsXVisibleProperty.set( false );
    }
    else if ( line === Line.Y_EQUALS_NEGATIVE_X_LINE ) {
      yEqualsNegativeXVisibleProperty.set( false );
    }
  } );
}

graphingLines.register( 'GraphControlPanel', GraphControlPanel );

inherit( Panel, GraphControlPanel );
export default GraphControlPanel;