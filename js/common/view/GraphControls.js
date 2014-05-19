// Copyright 2002-2014, University of Colorado Boulder

/**
 * Controls for various features related to the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var CheckBox = require( 'SUN/CheckBox' );
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var IconFactory = require( 'GRAPHING_LINES/common/view/IconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var hideLinesString = require( 'string!GRAPHING_LINES/hideLines' );
  var slopeString = require( 'string!GRAPHING_LINES/slope' );
  var symbolXString = require( 'string!GRAPHING_LINES/symbol.x' );
  var symbolYString = require( 'string!GRAPHING_LINES/symbol.y' );

  // constants
  var Y_EQUALS_X = StringUtils.format( "{0} = {1}", symbolYString, symbolXString );
  var Y_EQUALS_NEGATIVE_X = StringUtils.format( "{0} = -{1}", symbolYString, symbolXString );

  /**
   * @param {Property<Boolean>} linesVisibleProperty are lines visible on the graph?
   * @param {Property<Boolean>} slopeVisibleProperty are the slope (rise/run) brackets visible on the graphed line?
   * @param {ObservableArray<Lines>} standardLines standard lines (eg, y=x) that are available for viewing
   * @param {*} options should check boxes for standard lines be accessible?
   * @constructor
   */
  function GraphControls( linesVisibleProperty, slopeVisibleProperty, standardLines, options ) {

    options = _.extend( {
      includeStandardLines: true
    }, options );

    var thisNode = this;

    // private properties for standard-line check boxes
    var notLinesVisibleProperty = new Property( !linesVisibleProperty.get() );
    var yEqualsXVisibleProperty = new Property( standardLines.contains( Line.Y_EQUALS_X_LINE ) );
    var yEqualsNegativeXVisibleProperty = new Property( standardLines.contains( Line.Y_EQUALS_NEGATIVE_X_LINE ) );

    // check boxes
    var TEXT_OPTIONS = { font: new PhetFont( 18 ) };
    var ICON_SIZE = 60;
    var hideLinesCheckBox = CheckBox.createTextCheckBox( hideLinesString, TEXT_OPTIONS, notLinesVisibleProperty );
    hideLinesCheckBox.touchArea = hideLinesCheckBox.localBounds.dilatedXY( 15, 10 );
    var positiveCheckBox = CheckBox.createTextCheckBox( Y_EQUALS_X, TEXT_OPTIONS, yEqualsXVisibleProperty,
      { icon: IconFactory.createGraphIcon( ICON_SIZE, GLColors.Y_EQUALS_X, -3, -3, 3, 3 ) } );
    var negativeCheckBox = CheckBox.createTextCheckBox( Y_EQUALS_NEGATIVE_X, TEXT_OPTIONS, yEqualsNegativeXVisibleProperty,
      { icon: IconFactory.createGraphIcon( ICON_SIZE, GLColors.Y_EQUALS_NEGATIVE_X, -3, 3, 3, -3 ) } );
    var slopeCheckBox = CheckBox.createTextCheckBox( slopeString, TEXT_OPTIONS, slopeVisibleProperty,
      { icon: IconFactory.createSlopeToolIcon( ICON_SIZE ) } );

    // brute-force vertical layout, because scenery.VBox was not production-quality when I wrote this
    var contentNode = new Node();
    var previousNode = slopeCheckBox;
    var Y_SPACING = 20;
    contentNode.addChild( slopeCheckBox );
    if ( options.includeStandardLines ) {
      contentNode.addChild( positiveCheckBox );
      positiveCheckBox.left = slopeCheckBox.left;
      positiveCheckBox.top = slopeCheckBox.bottom + Y_SPACING;
      negativeCheckBox.left = slopeCheckBox.left;
      negativeCheckBox.top = positiveCheckBox.bottom + Y_SPACING;
      contentNode.addChild( negativeCheckBox );
      previousNode = negativeCheckBox;
    }
    contentNode.addChild( hideLinesCheckBox );
    hideLinesCheckBox.left = previousNode.left;
    hideLinesCheckBox.top = previousNode.bottom + Y_SPACING;

    Panel.call( thisNode, contentNode, {
      fill: GLColors.EQUATION_CONTROL_PANEL,
      stroke: 'black',
      lineWidth: 1,
      xMargin: 10,
      yMargin: 10,
      cornerRadius: 10
    } );

    thisNode.mutate( options );

    // when lines are not visible, hide related controls
    linesVisibleProperty.link( function( visible ) {
      notLinesVisibleProperty.set( !visible );
      positiveCheckBox.enabled = visible;
      negativeCheckBox.enabled = visible;
      slopeCheckBox.enabled = visible;
    } );

    notLinesVisibleProperty.link( function( visible ) {
       linesVisibleProperty.set( !visible );
    });

    var setStandardLineVisible = function( visible, line ) {
      if ( visible && !standardLines.contains( line ) ) {
        standardLines.add( line );
      }
      else if ( !visible && standardLines.contains( line ) ) {
        standardLines.remove( line );
      }
    };

    // Add/remove standard line "y = x"
    yEqualsXVisibleProperty.link( function( visible ) {
      setStandardLineVisible( visible, Line.Y_EQUALS_X_LINE );
    } );

    // Add/remove standard line "y = -x"
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

  return inherit( Panel, GraphControls );
} );