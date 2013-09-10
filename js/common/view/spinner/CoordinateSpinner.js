// Copyright 2002-2013, University of Colorado

/**
 * Spinner for one coordinate of a 2D point.
 * It prevents the point from having the same value as some other point,
 * so that we don't end up with with an undefined line because (x1,y1) == (x2,y2).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Spinner = require( 'GRAPHING_LINES/common/view/spinner/Spinner' );

  /**
   * @param {Property<Number>} a1 the coordinate that this spinner changes
   * @param {Property<Number>} b1 the other coordinate of the point that has coordinate a1
   * @param {Property<Number>} a2 the coordinate in the second point that is on the same axis as a1
   * @param {Property<Number>} b2 the coordinate in the second point that is on the same axis as b1
   * @param {Property<Range>} range
   * @param {*} options
   * @constructor
   */
  function CoordinateSpinner( a1, b1, a2, b2, range, options ) {

    options = _.extend( {
      color: GLColors.POINT_X1_Y1
    }, options );

    // computes value when 'up' button is pressed
    options.upFunction = function() {
      var x1New = a1.get() + 1;
      if ( x1New === a2.get() && b1.get() === b2.get() ) { // will points be the same?
        x1New++;
        if ( x1New > range.get().max ) { // did we skip too far?
          x1New = a1.get();
        }
      }
      return x1New;
    };

    // computes value when 'down' button is pressed
    options.downFunction = function() {
      var x1New = a1.get() - 1;
      if ( x1New === a2.get() && b1.get() === b2.get() ) { // will points be the same?
        x1New--;
        if ( x1New < range.get().min ) { // did we skip too far?
          x1New = a1.get();
        }
      }
      return x1New;
    };

    Spinner.call( this, a1, range, options );
  }

  return inherit( Spinner, CoordinateSpinner );
} );