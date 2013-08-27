// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the 'Point-Slope' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'common/view/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {PointSlopeModel} model
   * @constructor
   */
  function PointSlopeView( model ) {

    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );

    // Reset All button
    var resetAllButton = new ResetAllButton( function() {
      model.reset();
    } );

    // rendering order
    thisView.addChild( resetAllButton );

    // layout
    resetAllButton.left = 100;
    resetAllButton.top = 100;

    //XXX test
    var GraphNode = require( 'common/view/GraphNode' );
    var Graph = require( 'common/model/Graph' );
    var Range = require( 'DOT/Range' );
    thisView.addChild( new GraphNode( new Graph( new Range( -10, 10 ), new Range( -10, 10 ) ), model.mvt ) );

    //XXX test
    var SlopeToolNode = require( 'common/view/SlopeToolNode' );
    var Property = require( 'AXON/Property' );
    var Line = require( 'common/model/Line');
    var lineProperty = new Property( new Line( 0, 0, 5, -5 ) );
    thisView.addChild( new SlopeToolNode( lineProperty, model.mvt ) );
  }

  return inherit( ScreenView, PointSlopeView, { layoutBounds: new Bounds2( 0, 0, 1100, 700 ) } );
} );