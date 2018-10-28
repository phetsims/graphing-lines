// Copyright 2013-2017, University of Colorado Boulder

/**
 * Controls for various features related to the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Checkbox = require( 'SUN/Checkbox' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var GLIconFactory = require( 'GRAPHING_LINES/common/view/GLIconFactory' );
  var GLSymbols = require( 'GRAPHING_LINES/common/GLSymbols' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GridCheckbox = require( 'GRAPHING_LINES/common/view/GridCheckbox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var hideLinesString = require( 'string!GRAPHING_LINES/hideLines' );
  var slopeString = require( 'string!GRAPHING_LINES/slope' );

  // constants
  // y = x
  var Y_EQUALS_X = GLSymbols.y + ' ' + MathSymbols.EQUAL_TO + ' ' + GLSymbols.x;
  // y = -x
  var Y_EQUALS_NEGATIVE_X = GLSymbols.y + ' ' + MathSymbols.EQUAL_TO + ' ' + MathSymbols.UNARY_MINUS + GLSymbols.x;

  /**
   * @param {Property.<boolean>} linesVisibleProperty are lines visible on the graph?
   * @param {Property.<boolean>} gridVisibleProperty is grid visible on the graph?
   * @param {Property.<boolean>} slopeToolVisibleProperty is the slope tool visible on the graphed interactive line?
   * @param {ObservableArray.<Lines>} standardLines standard lines (y = x, y = -x) that are available for viewing
   * @param {Object} [options] should checkboxes for standard lines be accessible?
   * @constructor
   */
  function GraphControls( linesVisibleProperty, gridVisibleProperty, slopeToolVisibleProperty, standardLines, options ) {

    options = _.extend( {
      fill: GLColors.CONTROL_PANEL_BACKGROUND,
      stroke: 'black',
      lineWidth: 1,
      xMargin: 20,
      yMargin: 15,
      cornerRadius: 10,
      includeStandardLines: true // if true, includes visibility controls for 'y = x' and 'y = -x'
    }, options );

    // private properties for standard-line checkboxes
    var yEqualsXVisibleProperty = new Property( standardLines.contains( Line.Y_EQUALS_X_LINE ) );
    var yEqualsNegativeXVisibleProperty = new Property( standardLines.contains( Line.Y_EQUALS_NEGATIVE_X_LINE ) );

    // private Property for 'Hide' checkboxes, which needs to be inverted
    var notLinesVisibleProperty = new Property( !linesVisibleProperty.get() );

    // checkboxes
    var TEXT_OPTIONS = { font: new GLFont( 18 ) };
    var ICON_SIZE = 60;
    var ICON_SPACING = 15;

    // 'Slope' checkbox
    var slopeCheckbox = new Checkbox( new HBox( {
      spacing: ICON_SPACING,
      children: [
        new Text( slopeString, TEXT_OPTIONS ),
        GLIconFactory.createSlopeToolIcon( ICON_SIZE )
      ]
    } ), slopeToolVisibleProperty );

    // 'y = x' checkbox
    var yEqualsXCheckbox = new Checkbox( new HBox( {
      spacing: ICON_SPACING,
      children: [
        new RichText( Y_EQUALS_X, TEXT_OPTIONS ),
        GLIconFactory.createGraphIcon( ICON_SIZE, GLColors.Y_EQUALS_X, -3, -3, 3, 3 )
      ]
    } ), yEqualsXVisibleProperty );

    // 'y = -x' checkbox
    var yEqualsNegativeXCheckbox = new Checkbox( new HBox( {
      spacing: ICON_SPACING,
      children: [
        new RichText( Y_EQUALS_NEGATIVE_X, TEXT_OPTIONS ),
        GLIconFactory.createGraphIcon( ICON_SIZE, GLColors.Y_EQUALS_NEGATIVE_X, -3, 3, 3, -3 )
      ]
    } ), yEqualsNegativeXVisibleProperty );

    // 'Hide lines' checkbox
    var hideLinesCheckbox = new Checkbox( new Text( hideLinesString, TEXT_OPTIONS ), notLinesVisibleProperty );
    hideLinesCheckbox.touchArea = hideLinesCheckbox.localBounds.dilatedXY( 15, 10 );

    // Grid checkbox
    var gridCheckbox = new GridCheckbox( gridVisibleProperty );
    gridCheckbox.touchArea = gridCheckbox.localBounds.dilatedXY( 15, 10 );

    // vertical layout
    var contentNode = new LayoutBox( {
      children: ( options.includeStandardLines ) ?
        [ slopeCheckbox, yEqualsXCheckbox, yEqualsNegativeXCheckbox, hideLinesCheckbox, gridCheckbox ] :
        [ slopeCheckbox, hideLinesCheckbox, gridCheckbox ],
      orientation: 'vertical',
      spacing: 20,
      align: 'left'
    } );

    Panel.call( this, contentNode, options );

    // when lines are not visible, hide related controls
    // unlink is unnecessary since GraphControls exists for the lifetime of the sim.
    linesVisibleProperty.link( function( visible ) {
      notLinesVisibleProperty.set( !visible );
      yEqualsXCheckbox.enabled = visible;
      yEqualsNegativeXCheckbox.enabled = visible;
      slopeCheckbox.enabled = visible;
    } );

    // unlink is unnecessary since GraphControls exists for the lifetime of the sim.
    notLinesVisibleProperty.link( function( visible ) {
      linesVisibleProperty.set( !visible );
    } );

    var setStandardLineVisible = function( visible, line ) {
      if ( visible && !standardLines.contains( line ) ) {
        standardLines.add( line );
      }
      else if ( !visible && standardLines.contains( line ) ) {
        standardLines.remove( line );
      }
    };

    // Add/remove standard line 'y = x'
    // unlink is unnecessary since GraphControls exists for the lifetime of the sim.
    yEqualsXVisibleProperty.link( function( visible ) {
      setStandardLineVisible( visible, Line.Y_EQUALS_X_LINE );
    } );

    // Add/remove standard line 'y = -x'
    // unlink is unnecessary since GraphControls exists for the lifetime of the sim.
    yEqualsNegativeXVisibleProperty.link( function( visible ) {
      setStandardLineVisible( visible, Line.Y_EQUALS_NEGATIVE_X_LINE );
    } );

    // Select appropriate checkboxes when standard lines are added.
    // removeItemAddedListener is unnecessary since GraphControls exists for the lifetime of the sim.
    standardLines.addItemAddedListener( function( line ) {
      if ( line === Line.Y_EQUALS_X_LINE ) {
        yEqualsXVisibleProperty.set( true );
      }
      else if ( line === Line.Y_EQUALS_NEGATIVE_X_LINE ) {
        yEqualsNegativeXVisibleProperty.set( true );
      }
    } );

    // Deselect appropriate checkboxes when standard lines are removed.
    // removeItemRemovedListener is unnecessary since GraphControls exists for the lifetime of the sim.
    standardLines.addItemRemovedListener( function( line ) {
      if ( line === Line.Y_EQUALS_X_LINE ) {
        yEqualsXVisibleProperty.set( false );
      }
      else if ( line === Line.Y_EQUALS_NEGATIVE_X_LINE ) {
        yEqualsNegativeXVisibleProperty.set( false );
      }
    } );
  }

  graphingLines.register( 'GraphControls', GraphControls );

  return inherit( Panel, GraphControls );
} );