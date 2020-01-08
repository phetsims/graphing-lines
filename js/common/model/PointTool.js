// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model of the point tool. Highlights when it is placed on one of the lines.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  /**
   * @param {Vector2} position initial position of the tool
   * @param {string} orientation direction that the tip points, either 'up', 'down'
   * @param {ObservableArray.<Line>} lines Lines that the tool might intersect
   * @param {Bounds2} dragBounds tool can be dragged within these bounds
   * @constructor
   */
  function PointTool( position, orientation, lines, dragBounds ) {

    assert && assert( _.includes( [ 'up', 'down' ], orientation ) );

    const self = this;

    // @public position of the point tool
    this.positionProperty = new Vector2Property( position );

    // @public {Property.<Line|null> line that the tool is on, null if it's not on a line
    this.onLineProperty = new Property( null );
    
    this.orientation = orientation; // @public
    this.dragBounds = dragBounds; // @public

    // Update when the point tool moves or the lines change.
    // unmultilink unneeded because PointTool either exists for sim lifetime, or is owned by a Challenge that
    // doesn't require dispose.
    Property.multilink( [ this.positionProperty, lines.lengthProperty ],
      function() {
        let line;
        for ( let i = 0; i < lines.length; i++ ) {
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
      this.positionProperty.reset();
      this.onLineProperty.reset();
    },

    /**
     * Determines if the point tool is on the specified line.
     * @param {Line} line
     * @returns {boolean}
     * @public
     */
    isOnLine: function( line ) {
      return line.onLinePoint( this.positionProperty.get() );
    }
  } );
} );

