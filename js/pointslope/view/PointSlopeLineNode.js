// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of a line, labeled with an equation in point-slope form.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );

  /**
   * @param {Line} line
   * @param {Graph} graph
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function PointSlopeLineNode( line, graph, mvt ) {
    LineNode.call( this, line, graph, mvt );
  }

  return inherit( LineNode, PointSlopeLineNode, {

    // Creates the line's equation in point-slope form.
    createEquationNode: function( line, font, color ) {
      return new PointSlopeEquationNode( line, font, color );
    }
  } );
} );

