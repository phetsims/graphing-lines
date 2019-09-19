// Copyright 2013-2019, University of Colorado Boulder

/**
 * Base type for graph nodes in game challenges.
 * Renders the answer line, guess line, and slope tool.
 * Everything on the graph is hidden by default, it's up to subclasses and clients to determine what they want to see.
 * Optional manipulators are provided by subclasses.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const GraphNode = require( 'GRAPHING_LINES/common/view/GraphNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'GRAPHING_LINES/common/model/Line' );
  const LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  const LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  const PlottedPointNode = require( 'GRAPHING_LINES/common/view/PlottedPointNode' );
  const Property = require( 'AXON/Property' );
  const SlopeToolNode = require( 'GRAPHING_LINES/common/view/SlopeToolNode' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Challenge} challenge
   * @param {Object} [options]
   * @constructor
   */
  function ChallengeGraphNode( challenge, options ) {

    options = _.extend( {
      answerLineVisible: false,
      answerPointVisible: false,
      guessLineVisible: false,
      guessPointVisible: false,
      slopeToolVisible: false,
      slopeToolEnabled: true
    }, options );

    const self = this;

    GraphNode.call( this, challenge.graph, challenge.modelViewTransform );

    // To reduce brain damage during development, show the answer as a translucent gray line.
    if ( phet.chipper.queryParameters.showAnswers ) {
      this.addChild( new LineNode( new Property( challenge.answer.withColor( 'rgba( 0, 0, 0, 0.1 )' ) ), challenge.graph, challenge.modelViewTransform ) );
    }

    const pointRadius = challenge.modelViewTransform.modelToViewDeltaX( LineGameConstants.POINT_RADIUS );

    // @private answer
    this.answerLineNode = new LineNode( new Property( challenge.answer ), challenge.graph, challenge.modelViewTransform );
    this.answerPointNode = new PlottedPointNode( pointRadius, LineGameConstants.ANSWER_COLOR );
    this.answerPointNode.translation = challenge.modelViewTransform.modelToViewXY( challenge.answer.x1, challenge.answer.y1 );

    // @private guess
    this.guessLineNode = new LineNode( challenge.guessProperty, challenge.graph, challenge.modelViewTransform );
    this.guessPointNode = new PlottedPointNode( pointRadius, LineGameConstants.GUESS_COLOR );

    // @private slope tool
    if ( options.slopeToolEnabled ) {
      this.slopeToolNode = new SlopeToolNode( challenge.guessProperty, challenge.modelViewTransform );
    }

    // Rendering order: lines behind points, guess behind answer
    // See https://github.com/phetsims/graphing-lines/issues/115
    this.addChild( this.guessLineNode );
    this.addChild( this.answerLineNode );
    this.addChild( this.guessPointNode );
    this.addChild( this.answerPointNode );
    if ( this.slopeToolNode ) {
      this.addChild( this.slopeToolNode );
    }

    // Sync with the guess
    const guessObserver = function( line ) {
      if ( line instanceof Line ) {
        // plot (x1,y1)
        self.guessPointNode.translation = challenge.modelViewTransform.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
      }
    };
    challenge.guessProperty.link( guessObserver ); // unlink in dispose

    // initial state
    this.setAnswerLineVisible( options.answerLineVisible );
    this.setAnswerPointVisible( options.answerPointVisible );
    this.setGuessLineVisible( options.guessLineVisible );
    this.setGuessPointVisible( options.guessPointVisible );
    this.setSlopeToolVisible( options.slopeToolVisible );

    // @private called by dispose
    this.disposeChallengeGraphNode = function() {
      self.guessLineNode.dispose();
      self.slopeToolNode && self.slopeToolNode.dispose();
      challenge.guessProperty.unlink( guessObserver );
    };
  }

  graphingLines.register( 'ChallengeGraphNode', ChallengeGraphNode );

  return inherit( GraphNode, ChallengeGraphNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeChallengeGraphNode();
      GraphNode.prototype.dispose.call( this );
    },

    // @public Sets the visibility of the answer line.
    setAnswerLineVisible: function( visible ) {
      this.answerLineNode.visible = visible;
    },

    // @public Sets the visibility of (x1,y1) for the answer.
    setAnswerPointVisible: function( visible ) {
      this.answerPointNode.visible = visible;
    },

    // @public Sets the visibility of the guess line.
    setGuessLineVisible: function( visible ) {
      this.guessLineNode.visible = visible;
    },

    // @public Sets the visibility of (x1,y1) for the guess.
    setGuessPointVisible: function( visible ) {
      this.guessPointNode.visible = visible;
    },

    // @public Sets the visibility of the slope tool for the guess.
    setSlopeToolVisible: function( visible ) {
      if ( this.slopeToolNode ) {
        this.slopeToolNode.visible = visible;
      }
    }
  } );
} );