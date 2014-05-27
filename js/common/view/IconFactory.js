// Copyright 2002-2014, University of Colorado Boulder

//TODO should these icons be converted to images?
/**
 * Factory for creating icons that appear in control panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Range = require( 'DOT/Range' );
  var Shape = require( 'KITE/Shape' );
  var SlopeInterceptModel = require( 'GRAPHING_LINES/slopeintercept/model/SlopeInterceptModel' );
  var SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );
  var Vector2 = require( 'DOT/Vector2' );

  return {

    // Creates an icon for the slope-tool feature
    createSlopeToolIcon: function( width ) {

      var parentNode = new Node();

      var model = new SlopeInterceptModel();
      model.interactiveLine = Line.createSlopeIntercept( 1, 2, 0 ); // bigger values will make slope tool look smaller in icon

      // slope tool
      var slopeToolNode = new SlopeToolNode( model.interactiveLineProperty, model.mvt );
      parentNode.addChild( slopeToolNode );

      // dashed line where the line would be, tweaked visually
      var lineNode = new Path( Shape.lineSegment( slopeToolNode.left + ( 0.4 * slopeToolNode.width ), slopeToolNode.bottom,
        slopeToolNode.right, slopeToolNode.top + ( 0.5 * slopeToolNode.height ) ),
        { lineWidth: 1,
          lineDash: [ 6, 6 ],
          stroke: 'black'
        } );
      parentNode.addChild( lineNode );

      parentNode.scale( width / parentNode.width );
      return parentNode;
    },

    // Creates an icon that shows a line on a graph.
    createGraphIcon: function( width, color, x1, y1, x2, y2 ) {
      var axisRange = new Range( -3, 3 );
      var graph = new Graph( axisRange, axisRange );
      var mvt = ModelViewTransform2.createOffsetXYScaleMapping( new Vector2( 0, 0 ), 15, -15 );
      var graphNode = new GraphNode( graph, mvt );
      var p1 = mvt.modelToViewPosition( new Vector2( x1, y1 ) );
      var p2 = mvt.modelToViewPosition( new Vector2( x2, y2 ) );
      graphNode.addChild( new Path( Shape.lineSegment( p1.x, p1.y, p2.x, p2.y ), {
        stroke: color, lineWidth: 4
      } ) );
      graphNode.scale( width / graphNode.width );
      return graphNode;
    }
  };
} );