// Copyright 2002-2013, University of Colorado Boulder

/**
 * Factory for creating icons that appear in control panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GLColors = require( 'GRAPHING_LINES/common/GLColors' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SlopeInterceptModel = require( 'GRAPHING_LINES/slopeintercept/model/SlopeInterceptModel' );
  var SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );

  //TODO this should go away
  var createRectangleIcon = function( width, fill, stroke ) {
    var Rectangle = require( 'SCENERY/nodes/Rectangle' );
    var icon = new Rectangle( 0, 0, width, width, { fill: fill, stroke: stroke } );
    icon.setEnabled = function( enabled ) {
      icon.fill = enabled ? fill : 'rgb(220,220,220)';
      icon.stroke = enabled ? stroke : 'rgb(180,180,180)';
    };
    return icon;
  };

  return {

    // Creates an icon for the slope-tool feature
    createSlopeToolIcon: function( width ) {

      var parentNode = new Node();

      var model = new SlopeInterceptModel();
      model.interactiveLineProperty.set( Line.createSlopeIntercept( 1, 2, 0 ) ); // bigger values will make slope tool look smaller in icon

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
      return parentNode;//TODO convert to image
    },

    // Creates an icon for the "y = +x" feature
    createYEqualsXIcon: function( width ) {
      //TODO placeholder, port this from java.GraphNode
      return createRectangleIcon( width, GLColors.Y_EQUALS_X, 'black' );
    },

    // Creates an icon for the "y = -x" feature
    createYEqualsNegativeXIcon: function( width ) {
      //TODO placeholder, port this from java.GraphNode
      return createRectangleIcon( width, GLColors.Y_EQUALS_NEGATIVE_X, 'black' );
    }
  };
} );