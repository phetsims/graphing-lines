// Copyright 2002-2013, University of Colorado Boulder

/**
 * Base type for graph nodes in game challenges.
 * Renders the answer line, guess line, and slope tool.
 * Everything on the graph is hidden by default, it's up to subclasses and clients to determine what they want to see.
 * Optional manipulators are provided by subclasses.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlottedPointNode = require( 'GRAPHING_LINES/common/view/PlottedPointNode' );
  var SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Challenge} challenge
   * @param {boolean} slopeToolEnabled //TODO make this an option?
   * @constructor
   */
  function ChallengeGraphNode( challenge, slopeToolEnabled ) {

    var thisNode = this;
    GraphNode.call( thisNode, challenge.graph, challenge.mvt );

    // To reduce brain damage during development, show the answer as a translucent gray line.
    if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
      thisNode.addChild( new LineNode( challenge.answer.withColor( new Color( 0, 0, 0, 0.1 ) ), challenge.graph, challenge.mvt ) );
    }

    var pointDiameter = challenge.mvt.modelToViewDeltaX( LineGameConstants.POINT_DIAMETER );

    // answer
    {
      thisNode.answerParentNode = new Node(); //TODO eliminate parent?
      var answerNode = new LineNode( challenge.answer, challenge.graph, challenge.mvt );
      thisNode.answerParentNode.addChild( answerNode );

      // point (x1,y1) for answer
      thisNode.answerPointNode = new PlottedPointNode( pointDiameter, challenge.answer.color );
      thisNode.answerParentNode.addChild( thisNode.answerPointNode );
      thisNode.answerPointNode.translation = challenge.mvt.modelToViewPosition( new Vector2( challenge.answer.x1, challenge.answer.y1 ) );
    }

    // guess
    thisNode.guessParentNode = new Node(); //TODO eliminate parent?
    thisNode.guessPointVisible = true;

    // slope tool
    thisNode.slopeToolNode = slopeToolEnabled ? new SlopeToolNode( challenge.guess, challenge.mvt ) : new Node();

    // rendering order
    thisNode.addChild( thisNode.guessParentNode );
    thisNode.addChild( thisNode.answerParentNode );
    thisNode.addChild( thisNode.slopeToolNode );

    // Sync with the guess
    challenge.guess.link( function( line ) {

      thisNode.guessParentNode.removeAllChildren();
      thisNode.guessPointNode = null;
      if ( line ) {

        // draw the line
        thisNode.guessParentNode.addChild( new LineNode( line, challenge.graph, challenge.mvt ) );

        // plot (x1,y1)
        thisNode.guessPointNode = new PlottedPointNode( pointDiameter, line.color );
        thisNode.guessPointNode.visible = thisNode.guessPointVisible;
        thisNode.guessParentNode.addChild( thisNode.guessPointNode );
        thisNode.guessPointNode.translation = challenge.mvt.modelToViewPosition( line.x1, line.y1 );
      }
    } );

    // invisible by default
    thisNode.setAnswerVisible( false );
    thisNode.setAnswerPointVisible( false );
    thisNode.setGuessVisible( false );
    thisNode.setGuessPointVisible( false );
    thisNode.setSlopeToolVisible( false );
  }

  return inherit( GraphNode, ChallengeGraphNode, {

    // Sets the visibility of the answer.
    setAnswerVisible: function( visible ) { this.answerParentNode.visible = visible; },

    // Sets the visibility of the guess.
    setGuessVisible: function( visible ) { this.guessParentNode.visible = visible; },

    // Sets the visibility of (x1,y1) for the answer.
    setAnswerPointVisible: function( visible ) { this.answerPointNode.visible = visible; },

    // Sets the visibility of (x1,y1) for the guess.
    setGuessPointVisible: function( visible ) {
      this.guessPointVisible.visible = visible;
      if ( this.guessPointNode ) {
        this.guessPointNode.visible = visible;
      }
    },

    // Sets the visibility of the slope tool for the guess.
    setSlopeToolVisible: function( visible ) { this.slopeToolNode.visible = visible; }
  } );
} );