// Copyright 2002-2013, University of Colorado Boulder

//TODO add button color change for 'over' and 'down'
//TODO add enabled/disabled, probably via options.enabledProperty
/**
 * Button for expanding/collapsing something.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Number} length square button, length of one side
   * @param {Property<Boolean>} expandedProperty
   * @constructor
   */
  function ExpandCollapseButton( length, expandedProperty, options ) {

    options = _.extend( {}, options );

    var thisButton = this;
    Node.call( thisButton );

    // configure the button shape
    var cornerRadius = 0.1 * length;
    var buttonShape = Shape.roundRectangle( 0, 0, length, length, cornerRadius, cornerRadius );

    // configure the +/- symbol on the button
    var symbolLength = 0.6 * length;
    var symbolLineWidth = 0.15 * length;
    var symbolOptions = {
      lineWidth: symbolLineWidth,
      stroke: 'white',
      centerX: length / 2,
      centerY: length / 2
    };

    // Expand '+' button
    var expandButton = new Path( buttonShape, { fill: 'rgb(0, 179, 0 )', stroke: 'black', lineWidth: 0.5 } );
    var plusSymbolShape = new Shape()
      .moveTo( symbolLength / 2, 0 )
      .lineTo( symbolLength / 2, symbolLength )
      .moveTo( 0, symbolLength / 2 )
      .lineTo( symbolLength, symbolLength / 2 );
    expandButton.addChild( new Path( plusSymbolShape, symbolOptions ) );

    // Collapse '-' button
    var collapseButton = new Path( buttonShape, { fill: 'rgb( 255, 85, 0 )', stroke: 'black', lineWidth: 0.5 } );
    var minusSymbolShape = new Shape()
      .moveTo( -symbolLength / 2, 0 )
      .lineTo( symbolLength / 2, 0 );
    collapseButton.addChild( new Path( minusSymbolShape, symbolOptions ) );

    // rendering order
    thisButton.addChild( expandButton );
    thisButton.addChild( collapseButton );

    // click to toggle
    thisButton.cursor = 'pointer';
    thisButton.addInputListener( new ButtonListener( {
      fire: function() {
        expandedProperty.set( !expandedProperty.get() );
      }
    } ) );

    // sync with property
    expandedProperty.link( function( expanded ) {
      expandButton.visible = !expanded;
      collapseButton.visible = expanded;
    } );

    thisButton.mutate( options );
  }

  return inherit( Node, ExpandCollapseButton );
} );
