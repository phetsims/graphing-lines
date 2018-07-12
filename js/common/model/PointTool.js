// Copyright 2013-2017, University of Colorado Boulder

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

  /**
   * @param {Vector2} location initial location of the tool
   * @param {string} orientation direction that the tip points, either 'up' or 'down'
   * @param {ObservableArray.<Line>} lines Lines that the tool might intersect, provided in the order that they would be rendered
   * @param {Bounds2} dragBounds tool can be dragged within these bounds
   * @constructor
   */
  function PointTool( location, orientation, lines, dragBounds ) {

    assert && assert( orientation === 'up' || orientation === 'down' );

    var self = this;

    // @public {Vector2} location of the point tool
    this.locationProperty = new Property( location );

    // @public line that the tool is on, null if it's not on a line
    this.onLineProperty = new Property( null );
    
    this.orientation = orientation; // @public
    this.dragBounds = dragBounds; // @public

    // Update when the point tool moves or the lines change.
    // unmultilink unneeded because PointTool either exists for sim lifetime, or is owned by a Challenge that
    // doesn't require dispose.
    Property.multilink( [ this.locationProperty, lines.lengthProperty ],
      function() {
        var line;
        for ( var i = 0; i < lines.length; i++ ) {
          line = lines.get( i );
          if ( self.isOnLine( line ) ) {
            self.onLineProperty.set( line );
            return;
          }
        }
        self.onLineProperty.set( null );
      }
    );
  }

  graphingLines.register( 'PointTool', PointTool );

  return inherit( Object, PointTool, {

    // @public
    reset: function() {
      this.locationProperty.reset();
      this.onLineProperty.reset();
    },

    /**
     * Determines if the point tool is on the specified line.
     * @param {Line} line
     * @returns {boolean}
     * @public
     */
    isOnLine: function( line ) {
      return line.onLinePoint( this.locationProperty.get() );
    }
  } );
} );

