// Copyright 2002-2013, University of Colorado

/**
 * Controls for various features related to the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var CheckBox = require( 'SUN/CheckBox' );
  var GLStrings = require( 'GRAPHING_LINES/common/GLStrings' );
  var IconFactory = require( 'GRAPHING_LINES/common/view/IconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // constants
  var CONTROL_FONT = new PhetFont( 20 );
  var Y_EQUALS_X = StringUtils.format( "{0} = {1}", GLStrings["symbol.y"], GLStrings["symbol.x"] );
  var Y_EQUALS_NEGATIVE_X = StringUtils.format( "{0} = -{1}", GLStrings["symbol.y"], GLStrings["symbol.x"] );

  /**
   * @param {Property<Boolean>} linesVisible are lines visible on the graph?
   * @param {Property<Boolean>} slopeVisible are the slope (rise/run) brackets visible on the graphed line?
   * @param {ObservableArray<Lines>} standardLines standard lines (eg, y=x) that are available for viewing
   * @param {*} options should check boxes for standard lines be accessible?
   * @constructor
   */
  function GraphControls( linesVisible, slopeVisible, standardLines, options ) {

    options = _.extend( {
      includeStandardLines: true //TODO is this necessary? How about false if !standardLines?
    }, options );

    var thisNode = this;

    // private properties for standard-line check boxes
    var notLinesVisible = new Property( !linesVisible.get() );
    var yEqualsXVisible = new Property( standardLines.contains( Line.Y_EQUALS_X_LINE ) );
    var yEqualsNegativeXVisible = new Property( standardLines.contains( Line.Y_EQUALS_NEGATIVE_X_LINE ) );

    // check boxes
    var TEXT_OPTIONS = { font: CONTROL_FONT };
    var ICON_SIZE = 60;
    var hideLinesCheckBox = CheckBox.createTextCheckBox( GLStrings.hideLines, TEXT_OPTIONS, notLinesVisible );
    var positiveCheckBox = CheckBox.createTextCheckBox( Y_EQUALS_X, TEXT_OPTIONS, yEqualsXVisible, { icon: IconFactory.createYEqualsXIcon( ICON_SIZE ) } );
    var negativeCheckBox = CheckBox.createTextCheckBox( Y_EQUALS_NEGATIVE_X, TEXT_OPTIONS, yEqualsNegativeXVisible, { icon: IconFactory.createYEqualsNegativeXIcon( ICON_SIZE ) } );
    var slopeCheckBox = CheckBox.createTextCheckBox( GLStrings.slope, TEXT_OPTIONS, slopeVisible, { icon: IconFactory.createSlopeToolIcon( ICON_SIZE ) } );

    // brute-force vertical layout, because scenery.VBox was not production-quality when I wrote this
    var contentNode = new Node();
    var previousNode = hideLinesCheckBox;
    var ySpacing = 15;
    contentNode.addChild( hideLinesCheckBox );
    if ( options.includeStandardLines ) {
      contentNode.addChild( positiveCheckBox );
      positiveCheckBox.left = hideLinesCheckBox.left;
      positiveCheckBox.top = hideLinesCheckBox.bottom + ySpacing;
      negativeCheckBox.left = hideLinesCheckBox.left;
      negativeCheckBox.top = positiveCheckBox.bottom + ySpacing;
      contentNode.addChild( negativeCheckBox );
      previousNode = negativeCheckBox;
    }
    contentNode.addChild( slopeCheckBox );
    slopeCheckBox.left = hideLinesCheckBox.left;
    slopeCheckBox.top = previousNode.bottom + ySpacing;

    Panel.call( thisNode, contentNode, {
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      xMargin: 10,
      yMargin: 10,
      cornerRadius: 10
    } );

    thisNode.mutate( options );

    // when lines are not visible, hide related controls
    linesVisible.link( function( visible ) {
      notLinesVisible.set( !visible );
      slopeCheckBox.enabled = visible;
      positiveCheckBox.enabled = visible;
      negativeCheckBox.enabled = visible;
    } );

    notLinesVisible.link( function( visible ) {
       linesVisible.set( !visible );
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
    yEqualsXVisible.link( function( visible ) {
      setStandardLineVisible( visible, Line.Y_EQUALS_X_LINE );
    } );

    // Add/remove standard line "y = -x"
    yEqualsNegativeXVisible.link( function( visible ) {
      setStandardLineVisible( visible, Line.Y_EQUALS_NEGATIVE_X_LINE );
    } );

    // Select appropriate check boxes when standard lines are added.
    standardLines.addItemAddedListener( function( line ) {
      if ( line === Line.Y_EQUALS_X_LINE ) {
        yEqualsXVisible.set( true );
      }
      else if ( line === Line.Y_EQUALS_NEGATIVE_X_LINE ) {
        yEqualsNegativeXVisible.set( true );
      }
    } );

    // Deselect appropriate check boxes when standard lines are removed.
    standardLines.addItemRemovedListener( function( line ) {
      if ( line === Line.Y_EQUALS_X_LINE ) {
        yEqualsXVisible.set( false );
      }
      else if ( line === Line.Y_EQUALS_NEGATIVE_X_LINE ) {
        yEqualsNegativeXVisible.set( false );
      }
    } );
  }

  return inherit( Panel, GraphControls );
} );