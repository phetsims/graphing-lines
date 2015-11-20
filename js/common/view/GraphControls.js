// Copyright 2013-2015, University of Colorado Boulder

/**
 * Controls for various features related to the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var GLFont = require( 'GRAPHING_LINES/common/GLFont' );
  var GLIconFactory = require( 'GRAPHING_LINES/common/view/GLIconFactory' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
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
  var Y_EQUALS_X = StringUtils.format( '{0} = {1}', symbolYString, symbolXString );  // y = x
  var Y_EQUALS_NEGATIVE_X = StringUtils.format( '{0} = -{1}', symbolYString, symbolXString ); // y = -x

  /**
   * @param {Property.<boolean>} linesVisibleProperty are lines visible on the graph?
   * @param {Property.<boolean>} gridVisibleProperty is grid visible on the graph?
   * @param {Property.<boolean>} slopeToolVisibleProperty is the slope tool visible on the graphed interactive line?
   * @param {ObservableArray.<Lines>} standardLines standard lines (y = x, y = -x) that are available for viewing
   * @param {Object} [options] should check boxes for standard lines be accessible?
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

    var thisNode = this;

    // private properties for standard-line check boxes
    var yEqualsXVisibleProperty = new Property( standardLines.contains( Line.Y_EQUALS_X_LINE ) );
    var yEqualsNegativeXVisibleProperty = new Property( standardLines.contains( Line.Y_EQUALS_NEGATIVE_X_LINE ) );

    // private properties for 'Hide' check boxes, where 'visible' needs to be inverted
    var notLinesVisibleProperty = new Property( !linesVisibleProperty.get() );
    var notGridVisibleProperty = new Property( !gridVisibleProperty.get() );

    // check boxes
    var TEXT_OPTIONS = { font: new GLFont( 18 ) };
    var ICON_SIZE = 60;

    // 'Slope' check box
    var slopeCheckBox = CheckBox.createTextCheckBox( slopeString, TEXT_OPTIONS, slopeToolVisibleProperty,
      { icon: GLIconFactory.createSlopeToolIcon( ICON_SIZE ) } );

    // 'y = x' check box
    var yEqualsXCheckBox = CheckBox.createTextCheckBox( Y_EQUALS_X, TEXT_OPTIONS, yEqualsXVisibleProperty,
      { icon: GLIconFactory.createGraphIcon( ICON_SIZE, GLColors.Y_EQUALS_X, -3, -3, 3, 3 ) } );

    // 'y = -x' check box
    var yEqualsNegativeXCheckBox = CheckBox.createTextCheckBox( Y_EQUALS_NEGATIVE_X, TEXT_OPTIONS, yEqualsNegativeXVisibleProperty,
      { icon: GLIconFactory.createGraphIcon( ICON_SIZE, GLColors.Y_EQUALS_NEGATIVE_X, -3, 3, 3, -3 ) } );

    // 'Hide lines' check box
    var hideLinesCheckBox = CheckBox.createTextCheckBox( hideLinesString, TEXT_OPTIONS, notLinesVisibleProperty );
    hideLinesCheckBox.touchArea = hideLinesCheckBox.localBounds.dilatedXY( 15, 10 );

    // 'Hide grid' check box
    var hideGridCheckBox = CheckBox.createTextCheckBox( hideGridString, TEXT_OPTIONS, notGridVisibleProperty );
    hideGridCheckBox.touchArea = hideGridCheckBox.localBounds.dilatedXY( 15, 10 );

    // vertical layout
    var contentNode = new LayoutBox( {
      children: ( options.includeStandardLines ) ?
        [ slopeCheckBox, yEqualsXCheckBox, yEqualsNegativeXCheckBox, hideLinesCheckBox, hideGridCheckBox ] :
        [ slopeCheckBox, hideLinesCheckBox, hideGridCheckBox ],
      orientation: 'vertical',
      spacing: 20,
      align: 'left'
    } );

    Panel.call( thisNode, contentNode, options );

    // when lines are not visible, hide related controls
    linesVisibleProperty.link( function( visible ) {
      notLinesVisibleProperty.set( !visible );
      yEqualsXCheckBox.enabled = visible;
      yEqualsNegativeXCheckBox.enabled = visible;
      slopeCheckBox.enabled = visible;
    } );

    notLinesVisibleProperty.link( function( visible ) {
      linesVisibleProperty.set( !visible );
    } );

    gridVisibleProperty.link( function( visible ) {
      notGridVisibleProperty.set( !visible );
    } );

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
    yEqualsXVisibleProperty.link( function( visible ) {
      setStandardLineVisible( visible, Line.Y_EQUALS_X_LINE );
    } );

    // Add/remove standard line 'y = -x'
    yEqualsNegativeXVisibleProperty.link( function( visible ) {
      setStandardLineVisible( visible, Line.Y_EQUALS_NEGATIVE_X_LINE );
    } );

    // Select appropriate check boxes when standard lines are added.
    standardLines.addItemAddedListener( function( line ) {
      if ( line === Line.Y_EQUALS_X_LINE ) {
        yEqualsXVisibleProperty.set( true );
      }
      else if ( line === Line.Y_EQUALS_NEGATIVE_X_LINE ) {
        yEqualsNegativeXVisibleProperty.set( true );
      }
    } );

    // Deselect appropriate check boxes when standard lines are removed.
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