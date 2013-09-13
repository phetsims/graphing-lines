// Copyright 2002-2013, University of Colorado

/**
 * Model of the point tool. Highlights when it is placed on one of the lines.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @param {Vector} location initial location of the tool
   * @param {String} orientation, 'up' or 'down'
   * @param {ObservableArray<Line>} lines Lines that the tool might intersect, provided in the order that they would be rendered
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

    thisTool.orientation = orientation;
    thisTool.dragBounds = dragBounds;

    // Update when the point tool moves or the lines change.
    var updateOnLine = function() {
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
    };
    thisTool.locationProperty.link( updateOnLine.bind( thisTool ) );
    lines.lengthProperty.link( updateOnLine.bind( thisTool ) );
  }

  return inherit( PropertySet, PointTool, {

    /**
     * Determines if the point tool is on the specified line.
     * @param {Line} line
     * @returns {boolean}
     */
    isOnLine: function( line ) {
      if ( line.run === 0 && this.location.x === line.x1 ) {
        // slope is undefined, tool is on the line
        return true;
      }
      else if ( line.rise === 0 && this.location.y === line.y1 ) {
        // slope is zero, tool is on the line
        return true;
      }
      else if ( line.run !== 0 && line.rise !== 0 && this.location.y === line.solveY( this.location.x ) ) {
        // not one of the 2 special cases above, and the tool is on the line
        return true;
      }
      return false;
    }
  } );
} );

