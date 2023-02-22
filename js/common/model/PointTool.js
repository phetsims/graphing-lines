// Copyright 2013-2023, University of Colorado Boulder

/**
 * Model of the point tool. Highlights when it is placed on one of the lines.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import graphingLines from '../../graphingLines.js';

export default class PointTool {

  /**
   * @param {Vector2} position initial position of the tool
   * @param {string} orientation direction that the tip points, either 'up', 'down'
   * @param {ObservableArrayDef.<Line>} lines Lines that the tool might intersect
   * @param {Bounds2} dragBounds tool can be dragged within these bounds
   */
  constructor( position, orientation, lines, dragBounds ) {

    assert && assert( _.includes( [ 'up', 'down' ], orientation ) );

    // @public position of the point tool
    this.positionProperty = new Vector2Property( position );

    // @public {Property.<Line|null> line that the tool is on, null if it's not on a line
    this.onLineProperty = new Property( null );

    this.orientation = orientation; // @public
    this.dragBounds = dragBounds; // @public

    // Update when the point tool moves or the lines change.
    // unmultilink unneeded because PointTool either exists for sim lifetime, or is owned by a Challenge that
    // doesn't require dispose.
    Multilink.multilink( [ this.positionProperty, lines.lengthProperty ],
      () => {
        let line;
        for ( let i = 0; i < lines.length; i++ ) {
          line = lines.get( i );
          if ( this.isOnLine( line ) ) {
            this.onLineProperty.set( line );
            return;
          }
        }
        this.onLineProperty.set( null );
      }
    );
  }

  // @public
  reset() {
    this.positionProperty.reset();
    this.onLineProperty.reset();
  }

  /**
   * Determines if the point tool is on the specified line.
   * @param {Line} line
   * @returns {boolean}
   * @public
   */
  isOnLine( line ) {
    return line.onLinePoint( this.positionProperty.get() );
  }
}

graphingLines.register( 'PointTool', PointTool );