// Copyright 2002-2013, University of Colorado Boulder

/**
 * Tool that displays the (x,y) coordinates of a grid-point on the graph.
 * Origin is at the tip of the tool (bottom center.)
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'common/GLColors' );
  var GLImages = require( 'common/GLImages' );
  var GLStrings = require( 'common/GLStrings' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );

  // constants
  var NUMBER_OF_DECIMAL_PLACES = 0;
  var COORDINATES_Y_CENTER = 21; // center of the display area, measured from the top of the unscaled image file  //TODO used where?

  /**
   * @param {PointTool} pointTool
   * @param {ModelViewTransform2} mvt
   * @param {Graph} graph
   * @param {Bounds2} dragBounds
   * @param {Property<Boolean>} linesVisible
   * @constructor
   */
  function PointToolNode( pointTool, mvt, graph, dragBounds, linesVisible ) {

    var thisNode = this;
    Node.call( thisNode );

     // tool body
    var bodyNode = new Image( GLImages.getImage( "point_tool_body.png" ) );

    /*
     * Pointy tip, separate from the body and not pickable.
     * Because picking bounds are rectangular, making the tip pickable made it difficult
     * to pick a line manipulator when the tip and manipulator were on the same grid point.
     * Making the tip non-pickable was determined to be an acceptable and "natural feeling" solution.
     */
    var tipNode = new Image( GLImages.getImage( "point_tool_tip.png" ), { pickable: false } );

    // background behind the displayed value, shows through a transparent hole in the display area portion of the body image
    var BACKGROUND_MARGIN = 5;
    var backgroundNode = new Rectangle( 0, 0, bodyNode.width - ( 2 * BACKGROUND_MARGIN ), bodyNode.height - ( 2 * BACKGROUND_MARGIN ), { pickable: false } );

    // displayed value
    var valueNode = new Text( "?", { font: new PhetFont( { size: 15, weight: 'bold' } ), pickable: false } );

    // rendering order
    thisNode.addChild( tipNode );
    thisNode.addChild( backgroundNode );
    thisNode.addChild( bodyNode );
    thisNode.addChild( valueNode );

    // orientation
    if ( pointTool.orientation === 'down' ) {
      tipNode.centerX = 0;
      tipNode.bottom = 0;
      bodyNode.centerX = tipNode.centerX;
      bodyNode.bottom = tipNode.top;
      backgroundNode.centerX = bodyNode.centerX;
      backgroundNode.top = bodyNode.top + BACKGROUND_MARGIN;
      valueNode.centerX = backgroundNode.centerX;
      valueNode.centerY = backgroundNode.centerY;
    }
    else if ( pointTool.orientation === 'up' ) {
      tipNode.rotation = Math.PI;
      tipNode.centerX = 0;
      tipNode.top = 0;
      bodyNode.centerX = tipNode.centerX;
      bodyNode.top = tipNode.bottom;
      backgroundNode.centerX = bodyNode.centerX;
      backgroundNode.top = bodyNode.top + BACKGROUND_MARGIN;
      valueNode.centerX = backgroundNode.centerX;
      valueNode.centerY = backgroundNode.centerY;
    }
    else {
      throw new Error( 'unsupported point tool orientation: ' + pointTool.orientation );
    }

    // things needed by prototype functions
    this._bodyNode = bodyNode;
    this._backgroundNode = backgroundNode;
    this._valueNode = valueNode;

    // initial state
    this._setCoordinatesVector2( pointTool.location.get() );
    this._setBackground( GLColors.POINT_TOOL_BACKGROUND_NORMAL_COLOR );

    // location and display
    var update = function() {

      // move to location
      var location = pointTool.location.get();
      thisNode.translation = mvt.modelToViewPosition( location );

      // display value and highlighting
      if ( graph.contains( location ) ) {
        thisNode._setCoordinatesVector2( location );
        if ( linesVisible.get() ) {
          // use the line's color to highlight
          var onLine = pointTool.onLine.get();
          thisNode._setForeground( !onLine ? GLColors.POINT_TOOL_FOREGROUND_NORMAL_COLOR : GLColors.POINT_TOOL_FOREGROUND_HIGHLIGHT_COLOR );
          thisNode._setBackground( !onLine ? GLColors.POINT_TOOL_BACKGROUND_NORMAL_COLOR : onLine.color );
        }
        else {
          thisNode._setForeground( GLColors.POINT_TOOL_FOREGROUND_NORMAL_COLOR );
          thisNode._setBackground( GLColors.POINT_TOOL_BACKGROUND_NORMAL_COLOR );
        }
      }
      else {
        thisNode._setCoordinatesString( GLStrings["point.unknown"] );
        thisNode._setForeground( GLColors.POINT_TOOL_FOREGROUND_NORMAL_COLOR );
        thisNode._setBackground( GLColors.POINT_TOOL_BACKGROUND_NORMAL_COLOR );
      }
    };
    pointTool.location.link( update );
    pointTool.onLine.link( update );
    linesVisible.link( update );

    //TODO addInputListener( new PointToolDragHandler ), see below
  }

  return inherit( Node, PointToolNode, {

    // Sets the displayed value to a point
    _setCoordinatesVector2: function( p ) {
      this._setCoordinatesString( StringUtils.format( GLStrings["point.xy"], Util.toFixed( p.x, NUMBER_OF_DECIMAL_PLACES ), Util.toFixed( p.y, NUMBER_OF_DECIMAL_PLACES ) ) );
    },

    // Sets the displayed value to an arbitrary string
    _setCoordinatesString: function( s ) {
      this._valueNode.text = s;
      this._valueNode.centerX = this._bodyNode.centerX;  // horizontally centered
    },

    // Sets the foreground, the color of the displayed value
    _setForeground: function( color ) {
      this._valueNode.fill = color;
    },

    // Sets the background, the color of the display area behind the value
    _setBackground: function( color ) {
      this._backgroundNode.fill = color;
    }
  } );
} );

//
//
//    // Drag handler for the point tool, constrained to the range of the graph, snaps to integer grid.
//    private static class PointToolDragHandler extends SimSharingDragHandler {
//
//        private final PNode dragNode;
//        private final Property<Vector2D> point;
//        private final ModelViewTransform mvt;
//        private final Graph graph;
//        private final Rectangle2D dragBounds; // drag bounds, in view coordinate frame
//        private double clickXOffset, clickYOffset; // offset of mouse click from dragNode's origin, in parent's coordinate frame
//
//        public PointToolDragHandler( PNode dragNode, Property<Vector2D> point, ModelViewTransform mvt, Graph graph, Rectangle2D dragBounds ) {
//            super( UserComponents.pointTool, UserComponentTypes.sprite, true );
//            this.dragNode = dragNode;
//            this.point = point;
//            this.mvt = mvt;
//            this.graph = graph;
//            this.dragBounds = dragBounds;
//        }
//
//        @Override protected void startDrag( PInputEvent event ) {
//            super.startDrag( event );
//            // Note the mouse-click offset when dragging starts.
//            Point2D pMouse = event.getPositionRelativeTo( dragNode.getParent() );
//            clickXOffset = pMouse.getX() - mvt.modelToViewX( point.get().getX() );
//            clickYOffset = pMouse.getY() - mvt.modelToViewY( point.get().getY() );
//            // Move the tool that we're dragging to the foreground.
//            dragNode.moveToFront();
//        }
//
//        // Translate the model's location. Snap to integer grid if the location is inside the bounds of the graph.
//        @Override protected void drag( final PInputEvent event ) {
//            super.drag( event );
//            Point2D pMouse = event.getPositionRelativeTo( dragNode.getParent() );
//            final double viewX = pMouse.getX() - clickXOffset;
//            final double viewY = pMouse.getY() - clickYOffset;
//            Vector2D pView = constrainToBounds( viewX, viewY );
//            point.set( mvt.viewToModel( pView ) );
//            Vector2D pModel = mvt.viewToModel( pView );
//            if ( graph.contains( point.get() ) ) {
//                // snap to the grid
//                point.set( new Vector2D( MathUtil.roundHalfUp( pModel.getX() ), MathUtil.roundHalfUp( pModel.getY() ) ) );
//            }
//            else {
//                point.set( pModel );
//            }
//        }
//
//        // Sim-sharing parameters
//        @Override public ParameterSet getParametersForAllEvents( PInputEvent event ) {
//            return new ParameterSet().
//                    with( ParameterKeys.x, COORDINATES_FORMAT.format( point.get().getX() ) ).
//                    with( ParameterKeys.y, COORDINATES_FORMAT.format( point.get().getY() ) ).
//                    with( super.getParametersForAllEvents( event ) );
//        }
//
//        /*
//         * Constrains xy view coordinates to be within some view bounds.
//         * Assumes the origin is at the bottom center of the drag node.
//         */
//        private Vector2D constrainToBounds( double x, double y ) {
//            return new Vector2D( MathUtil.clamp( dragBounds.getMinX(), x, dragBounds.getMaxX() ),
//                                 MathUtil.clamp( dragBounds.getMinY(), y, dragBounds.getMaxY() ) );
//        }
//    }

