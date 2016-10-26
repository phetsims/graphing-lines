// Copyright 2013-2015, University of Colorado Boulder

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

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var GLQueryParameters = require( 'GRAPHING_LINES/common/GLQueryParameters' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlottedPointNode = require( 'GRAPHING_LINES/common/view/PlottedPointNode' );
  var Property = require( 'AXON/Property' );
  var SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Challenge} challenge
   * @param {Object} [options]
   * @constructor
   */
  function ChallengeGraphNode( challenge, options ) {

    options = _.extend( {
      answerVisible: false,
      answerPointVisible: false,
      guessVisible: false,
      guessPointVisible: false,
      slopeToolVisible: false,
      slopeToolEnabled: true
    }, options );

    GraphNode.call( this, challenge.graph, challenge.modelViewTransform );

    // To reduce brain damage during development, show the answer as a translucent gray line.
    if ( GLQueryParameters.dev ) {
      this.addChild( new LineNode( new Property( challenge.answer.withColor( 'rgba( 0, 0, 0, 0.1 )' ) ), challenge.graph, challenge.modelViewTransform ) );
    }

    var pointRadius = challenge.modelViewTransform.modelToViewDeltaX( LineGameConstants.POINT_RADIUS );

    // @private answer
    this.answerParentNode = new Node(); // to maintain rendering order of stuff related to answer
    var answerNode = new LineNode( new Property( challenge.answer ), challenge.graph, challenge.modelViewTransform );
    this.answerParentNode.addChild( answerNode );

    // @private point (x1,y1) for answer
    this.answerPointNode = new PlottedPointNode( pointRadius, LineGameConstants.ANSWER_COLOR );
    this.answerParentNode.addChild( this.answerPointNode );
    this.answerPointNode.translation = challenge.modelViewTransform.modelToViewXY( challenge.answer.x1, challenge.answer.y1 );

    // @private guess
    this.guessParentNode = new Node(); // to maintain rendering order of stuff related to guess
    this.guessParentNode.addChild( new LineNode( challenge.guessProperty, challenge.graph, challenge.modelViewTransform ) );
    this.guessPointNode = new PlottedPointNode( pointRadius, LineGameConstants.GUESS_COLOR );
    this.guessParentNode.addChild( this.guessPointNode );
    this.guessPointVisible = true;

    // @private slope tool
    if ( options.slopeToolEnabled ) {
      this.slopeToolNode = new SlopeToolNode( challenge.guessProperty, challenge.modelViewTransform );
    }

    // rendering order
    this.addChild( this.guessParentNode );
    this.addChild( this.answerParentNode );
    if ( this.slopeToolNode ) {
      this.addChild( this.slopeToolNode );
    }

    // Sync with the guess
    var self = this;
    challenge.guessProperty.link( function( line ) {
      if ( line instanceof Line ) {
        // plot (x1,y1)
        self.guessPointNode.visible = self.guessPointVisible;
        self.guessPointNode.translation = challenge.modelViewTransform.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
      }
    } );

    // initial state
    this.setAnswerVisible( options.answerVisible );
    this.setAnswerPointVisible( options.answerPointVisible );
    this.setGuessVisible( options.guessVisible );
    this.setGuessPointVisible( options.guessPointVisible );
    this.setSlopeToolVisible( options.slopeToolVisible );
  }

  graphingLines.register( 'ChallengeGraphNode', ChallengeGraphNode );

  return inherit( GraphNode, ChallengeGraphNode, {

    // @public Sets the visibility of the answer.
    setAnswerVisible: function( visible ) { this.answerParentNode.visible = visible; },

    // @public Sets the visibility of the guess.
    setGuessVisible: function( visible ) { this.guessParentNode.visible = visible; },

    // @public Sets the visibility of (x1,y1) for the answer.
    setAnswerPointVisible: function( visible ) { this.answerPointNode.visible = visible; },

    // @public Sets the visibility of (x1,y1) for the guess.
    setGuessPointVisible: function( visible ) {
      this.guessPointVisible = visible;
      if ( this.guessPointNode ) {
        this.guessPointNode.visible = visible;
      }
    },

    // @public Sets the visibility of the slope tool for the guess.
    setSlopeToolVisible: function( visible ) {
      if ( this.slopeToolNode ) {
        this.slopeToolNode.visible = visible;
      }
    }
  } );
} );