// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of a line, labeled with an equation in slope-intercept form.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );

  /**
   * @param {Line} line
   * @param {Graph} graph
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function SlopeInterceptLineNode( line, graph, mvt ) {
    LineNode.call( this, line, graph, mvt );
  }

  return inherit( LineNode, SlopeInterceptLineNode, {

    // Creates the line's equation in slope-intercept form.
    createEquationNode: function( line, fontSize, color ) {
      return SlopeInterceptEquationNode.createStaticEquation( line, fontSize, color );
    }
  } );
} );

