// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of a line, labeled with slope.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var SlopeEquationNode = require( 'GRAPHING_LINES/slope/view/SlopeEquationNode' );

  /**
   * @param {Line} line
   * @param {Graph} graph
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function SlopeLineNode( line, graph, mvt ) {
    LineNode.call( this, line, graph, mvt );
  }

  return inherit( LineNode, SlopeLineNode, {

    /*
     * Creates the line's equation in slope form.
     * @override
     * @param {Line} line
     * @param {Number} fontSize
     * @param {Color} color
     */
    createEquationNode: function( line, fontSize, color ) {
      return SlopeEquationNode.createStaticEquation( line, fontSize, color );
    }
  } );
} );

