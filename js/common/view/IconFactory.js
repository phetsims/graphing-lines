// Copyright 2002-2014, University of Colorado Boulder

/**
 * Factory for creating icons that appear in control panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PointSlopeEquationNode = require( 'GRAPHING_LINES/pointslope/view/PointSlopeEquationNode' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Shape = require( 'KITE/Shape' );
  var SlopeEquationNode = require( 'GRAPHING_LINES/slope/view/SlopeEquationNode' );
  var SlopeInterceptEquationNode = require( 'GRAPHING_LINES/slopeintercept/view/SlopeInterceptEquationNode' );
  var SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );
  var Vector2 = require( 'DOT/Vector2' );

  // Creates a screen icon, all of which have the same background.
  var createScreenIcon = function( contentNode, options ) {

    options = _.extend( {
      size: Screen.HOME_SCREEN_ICON_SIZE,
      xScaleFactor: 0.85,
      yScaleFactor: 0.85
    }, options );

    var background = new Rectangle( 0, 0, options.size.width, options.size.height, { fill: GLColors.CONTROL_PANEL_BACKGROUND } );

    contentNode.setScaleMagnitude( Math.min( options.xScaleFactor * background.width / contentNode.width, options.yScaleFactor * background.height / contentNode.height ) );
    contentNode.center = background.center;

    return new Node( { children: [ background, contentNode ], pickable: false } );
  };

  return {

    // Creates an icon for the 'Slope' screen
    createSlopeScreenIcon: function() {
      return createScreenIcon( new SlopeEquationNode( new Property( new Line( 1, 2, 3, 4 ) ) ), { xScaleFactor: 0.75 } );
    },

    // Creates an icon for the 'Slope-Intercept' screen
    createSlopeInterceptScreenIcon: function() {
      return createScreenIcon( new SlopeInterceptEquationNode( new Property( Line.createSlopeIntercept( 2, 3, 1 ) ) ), { xScaleFactor: 0.6 } );
    },

    // Creates an icon for the 'Point-Slope' screen
    createPointSlopeScreenIcon: function() {
      return createScreenIcon( new PointSlopeEquationNode( new Property( Line.createPointSlope( 1, 2, 3, 4 ) ) ), { xScaleFactor: 0.9 } );
    },

    // Creates an icon for the slope-tool feature
    createSlopeToolIcon: function( width ) {

      var parentNode = new Node();

      // slope tool
      var slopeToolNode = new SlopeToolNode( new Property( Line.createSlopeIntercept( 1, 2, 0 ) ),
        ModelViewTransform2.createOffsetXYScaleMapping( Vector2.ZERO, 26, -26 ) );
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
      var p1 = mvt.modelToViewXY( x1, y1 );
      var p2 = mvt.modelToViewXY( x2, y2 );
      graphNode.addChild( new Path( Shape.lineSegment( p1.x, p1.y, p2.x, p2.y ), {
        stroke: color, lineWidth: 5
      } ) );
      graphNode.scale( width / graphNode.width );
      return graphNode;
    }
  };
} );