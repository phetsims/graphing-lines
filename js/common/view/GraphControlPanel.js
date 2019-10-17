// Copyright 2013-2019, University of Colorado Boulder

/**
 * Control panel for various features related to the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Checkbox = require( 'SUN/Checkbox' );
  const GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  const GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  const GLIconFactory = require( 'GRAPHING_LINES/common/view/GLIconFactory' );
  const GLSymbols = require( 'GRAPHING_LINES/common/GLSymbols' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const GridCheckbox = require( 'SCENERY_PHET/GridCheckbox' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  const Line = require( 'GRAPHING_LINES/common/model/Line' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const merge = require( 'PHET_CORE/merge' );
  const Panel = require( 'SUN/Panel' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const slopeString = require( 'string!GRAPHING_LINES/slope' );

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

  return inherit( Panel, GraphControlPanel );
} );