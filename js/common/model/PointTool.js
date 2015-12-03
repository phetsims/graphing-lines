// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model of the point tool. Highlights when it is placed on one of the lines.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @param {Vector2} location initial location of the tool
   * @param {string} orientation direction that the tip points, either 'up' or 'down'
   * @param {ObservableArray.<Line>} lines Lines that the tool might intersect, provided in the order that they would be rendered
   * @param {Bounds2} dragBounds tool can be dragged within these bounds
   * @constructor
   */
  function PointTool( location, orientation, lines, dragBounds ) {

    assert && assert( orientation === 'up' || orientation === 'down' );

    var thisTool = this;
    PropertySet.call( thisTool, {
      location: location,
      onLine: null // line that the tool is on, null if it's not on a line
    } );

    thisTool.orientation = orientation; // @public
    thisTool.dragBounds = dragBounds; // @public

    // Update when the point tool moves or the lines change.
    Property.multilink( [ thisTool.locationProperty, lines.lengthProperty ],
      function() {
        var line;
        // Lines are in rendering order, reverse iterate so we get the one that's on top.
        for ( var i = lines.length - 1; i >= 0; i-- ) {
          line = lines.get( i );
          if ( thisTool.isOnLine( line ) ) {
            thisTool.onLine = line;
            return;
          }
        }
        thisTool.onLine = null;
      }
    );
  }

  graphingLines.register( 'PointTool', PointTool );

  return inherit( PropertySet, PointTool, {

    /**
     * Determines if the point tool is on the specified line.
     * @param {Line} line
     * @returns {boolean}
     * @public
     */
    isOnLine: function( line ) {
      return line.onLinePoint( this.location );
    }
  } );
} );

