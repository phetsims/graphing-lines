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
  var Property = require( 'AXON/Property' );

  /**
   * @param {Vector} location location of the tool, in model coordinate frame
   * @param {String} orientation, 'up' or 'down'
   * @param {ObservableArray} lines Lines that the tool might intersect, provided in the order that they would be rendered
   * @constructor
   */
  function PointTool( location, orientation, lines ) {

    assert && assert( orientation === 'up' || orientation === 'down' );

    var thisTool = this;

    thisTool.location = new Property( location );
    thisTool.orientation = orientation;
    thisTool.onLine = new Property( null ); // line that the tool is on, null if it's not on a line

    // Update when the point tool moves or the lines change.
    var updateOnLine = function() {
      var line;
      // Lines are in rendering order, reverse iterate so we get the one that's on top.
      for ( var i = lines.length - 1; i >= 0; i-- ) {
        line = lines.get( i );
        if ( thisTool.isOnLine( line ) ) {
          thisTool.onLine.set( line );
          return;
        }
      }
      thisTool.onLine.set( null );
    };
    thisTool.location.link( updateOnLine() );
    lines.addListener( updateOnLine() );
  }

  PointTool.prototype = {

    reset: function() {
      this.location.reset();
      this.onLine.reset();
    },

    /**
     * Determines if the point tool is on the specified line.
     * @param {Line} line
     * @returns {boolean}
     */
    isOnLine: function( line ) {
      if ( line.run === 0 && this.location.get().x === line.x1 ) {
        // slope is undefined, tool is on the line
        return true;
      }
      else if ( line.rise === 0 && this.location.get().y === line.y1 ) {
        // slope is zero, tool is on the line
        return true;
      }
      else if ( line.run !== 0 && line.rise !== 0 && this.location.get().y === line.solveY( this.location.get().x ) ) {
        // not one of the 2 special cases above, and the tool is on the line
        return true;
      }
      return false;
    }
  };

  return PointTool;
} );

