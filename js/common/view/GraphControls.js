// Copyright 2002-2013, University of Colorado

/**
 * Controls for various features related to the graph.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var CheckBox = require( 'SUN/CheckBox' );
  var GLStrings = require( 'common/GLStrings' );
  var GraphNode = require( 'common/view/GraphNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'common/model/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var SlopeToolNode = require( 'common/view/SlopeToolNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // constants
  var CONTROL_FONT = new PhetFont( 14 );
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
    var positiveCheckBox = CheckBox.createTextCheckBox( Y_EQUALS_X, TEXT_OPTIONS, yEqualsXVisible, { icon: GraphNode.createYEqualsXImage( ICON_SIZE ) } );
    var negativeCheckBox = CheckBox.createTextCheckBox( Y_EQUALS_NEGATIVE_X, TEXT_OPTIONS, yEqualsNegativeXVisible, { icon: GraphNode.createYEqualsNegativeXImage( ICON_SIZE ) } );
    var slopeCheckBox = CheckBox.createTextCheckBox( GLStrings.slope, TEXT_OPTIONS, slopeVisible, { icon: SlopeToolNode.createImage( ICON_SIZE ) } );

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

    // Add/remove standard line "y = x"
    yEqualsXVisible.link( function( visible ) {
      if ( visible ) {
        standardLines.add( Line.Y_EQUALS_X_LINE );
      }
      else {
        standardLines.remove( Line.Y_EQUALS_X_LINE );
      }
    } );

    // Add/remove standard line "y = -x"
    yEqualsNegativeXVisible.link( function( visible ) {
      if ( visible ) {
        standardLines.add( Line.Y_EQUALS_NEGATIVE_X_LINE );
      }
      else {
        standardLines.remove( Line.Y_EQUALS_NEGATIVE_X_LINE );
      }
    } );

    // Select/deselect appropriate check boxes when standard lines are added/removed.
    standardLines.addListener( function( added, removed, list ) {

      // select
      added.forEach( function( line ) {
        if ( line === Line.Y_EQUALS_X_LINE ) {
          yEqualsXVisible.set( true );
        }
        else if ( line === Line.Y_EQUALS_NEGATIVE_X_LINE ) {
          yEqualsNegativeXVisible.set( true );
        }
      } );

      // deselect
      removed.forEach( function( line ) {
        if ( line === Line.Y_EQUALS_X_LINE ) {
          yEqualsXVisible.set( false );
        }
        else if ( line === Line.Y_EQUALS_NEGATIVE_X_LINE ) {
          yEqualsNegativeXVisible.set( false );
        }
      } );
    } );
  }

  return inherit( Panel, GraphControls );
} );