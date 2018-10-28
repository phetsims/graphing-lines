// Copyright 2018, University of Colorado Boulder

/**
 * Checkbox for showing/hiding grid lines for the graph.
 * See https://github.com/phetsims/graphing-lines/issues/91.
 * 
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Checkbox = require( 'SUN/Checkbox' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  var ICON_SIZE = 30;

  /**
   * @param {BooleanProperty} property
   * @param {Object} [options]
   * @constructor
   */
  function GridCheckbox( property, options ) {

    options = _.extend( {
      spacing: 10
    }, options );

    var iconShape = new Shape()
      .moveTo( ICON_SIZE / 4, 0 )
      .lineTo( ICON_SIZE / 4, ICON_SIZE )
      .moveTo( ICON_SIZE / 2, 0 )
      .lineTo( ICON_SIZE / 2, ICON_SIZE )
      .moveTo( ICON_SIZE * 3 / 4, 0 )
      .lineTo( ICON_SIZE * 3 / 4, ICON_SIZE )
      .moveTo( 0, ICON_SIZE / 4 )
      .lineTo( ICON_SIZE, ICON_SIZE / 4 )
      .moveTo( 0, ICON_SIZE / 2 )
      .lineTo( ICON_SIZE, ICON_SIZE / 2 )
      .moveTo( 0, ICON_SIZE * 3 / 4 )
      .lineTo( ICON_SIZE, ICON_SIZE * 3 / 4 );
    var iconNode = new Path( iconShape, {
      stroke: 'rgb( 100, 100, 100 )'
    } );

    Checkbox.call( this, iconNode, property, options );
  }

  graphingLines.register( 'GridCheckbox', GridCheckbox );

  return inherit( Checkbox, GridCheckbox );
} );