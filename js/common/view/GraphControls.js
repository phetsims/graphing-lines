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
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var hideGridString = require( 'string!GRAPHING_LINES/hideGrid' );
  var hideLinesString = require( 'string!GRAPHING_LINES/hideLines' );
  var slopeString = require( 'string!GRAPHING_LINES/slope' );
  var symbolXString = require( 'string!GRAPHING_LINES/symbol.x' );
  var symbolYString = require( 'string!GRAPHING_LINES/symbol.y' );

  // constants
  // y = x
  var Y_EQUALS_X = StringUtils.format( '{0} {1} {2}', symbolYString, MathSymbols.EQUAL_TO, symbolXString );
  // y = -x
  var Y_EQUALS_NEGATIVE_X = StringUtils.format( '{0} {1} {2}{3}', symbolYString, MathSymbols.EQUAL_TO, MathSymbols.UNARY_MINUS, symbolXString );

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

    // private properties for 'Hide' checkboxes, where 'visible' needs to be inverted
    var notLinesVisibleProperty = new Property( !linesVisibleProperty.get() );
    var notGridVisibleProperty = new Property( !gridVisibleProperty.get() );

    // checkboxes
    var TEXT_OPTIONS = { font: new GLFont( 18 ) };
    var ICON_SIZE = 60;

    // 'Slope' checkbox
    var slopeCheckbox = Checkbox.createTextCheckbox( slopeString, TEXT_OPTIONS, slopeToolVisibleProperty,
      { icon: GLIconFactory.createSlopeToolIcon( ICON_SIZE ) } );

    // 'y = x' checkbox
    var yEqualsXCheckbox = Checkbox.createTextCheckbox( Y_EQUALS_X, TEXT_OPTIONS, yEqualsXVisibleProperty,
      { icon: GLIconFactory.createGraphIcon( ICON_SIZE, GLColors.Y_EQUALS_X, -3, -3, 3, 3 ) } );

    // 'y = -x' checkbox
    var yEqualsNegativeXCheckbox = Checkbox.createTextCheckbox( Y_EQUALS_NEGATIVE_X, TEXT_OPTIONS, yEqualsNegativeXVisibleProperty,
      { icon: GLIconFactory.createGraphIcon( ICON_SIZE, GLColors.Y_EQUALS_NEGATIVE_X, -3, 3, 3, -3 ) } );

    // 'Hide lines' checkbox
    var hideLinesCheckbox = Checkbox.createTextCheckbox( hideLinesString, TEXT_OPTIONS, notLinesVisibleProperty );
    hideLinesCheckbox.touchArea = hideLinesCheckbox.localBounds.dilatedXY( 15, 10 );

    // 'Hide grid' checkbox
    var hideGridCheckbox = Checkbox.createTextCheckbox( hideGridString, TEXT_OPTIONS, notGridVisibleProperty );
    hideGridCheckbox.touchArea = hideGridCheckbox.localBounds.dilatedXY( 15, 10 );

    // vertical layout
    var contentNode = new LayoutBox( {
      children: ( options.includeStandardLines ) ?
        [ slopeCheckbox, yEqualsXCheckbox, yEqualsNegativeXCheckbox, hideLinesCheckbox, hideGridCheckbox ] :
        [ slopeCheckbox, hideLinesCheckbox, hideGridCheckbox ],
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

    // unlink is unnecessary since GraphControls exists for the lifetime of the sim.
    gridVisibleProperty.link( function( visible ) {
      notGridVisibleProperty.set( !visible );
    } );

    // unlink is unnecessary since GraphControls exists for the lifetime of the sim.
    notGridVisibleProperty.link( function( visible ) {
      gridVisibleProperty.set( !visible );
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