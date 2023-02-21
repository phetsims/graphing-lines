// Copyright 2013-2020, University of Colorado Boulder

/**
 * Base type for graph nodes in game challenges.
 * Renders the answer line, guess line, and slope tool.
 * Everything on the graph is hidden by default, it's up to subclasses and clients to determine what they want to see.
 * Optional manipulators are provided by subclasses.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import Line from '../../common/model/Line.js';
import GraphNode from '../../common/view/GraphNode.js';
import LineNode from '../../common/view/LineNode.js';
import PlottedPointNode from '../../common/view/PlottedPointNode.js';
import SlopeToolNode from '../../common/view/SlopeToolNode.js';
import graphingLines from '../../graphingLines.js';
import LineGameConstants from '../LineGameConstants.js';

export default class ChallengeGraphNode extends GraphNode {

  /**
   * @param {Challenge} challenge
   * @param {Object} [options]
   */
  constructor( challenge, options ) {

    options = merge( {
      answerLineVisible: false,
      answerPointVisible: false,
      guessLineVisible: false,
      guessPointVisible: false,
      slopeToolVisible: false,
      slopeToolEnabled: true
    }, options );

    super( challenge.graph, challenge.modelViewTransform );

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
    const guessObserver = line => {
      if ( line instanceof Line ) {
        // plot (x1,y1)
        this.guessPointNode.translation = challenge.modelViewTransform.modelToViewPosition( new Vector2( line.x1, line.y1 ) );
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
    this.disposeChallengeGraphNode = () => {
      this.guessLineNode.dispose();
      this.slopeToolNode && this.slopeToolNode.dispose();
      challenge.guessProperty.unlink( guessObserver );
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeChallengeGraphNode();
    super.dispose();
  }

  // @public Sets the visibility of the answer line.
  setAnswerLineVisible( visible ) {
    this.answerLineNode.visible = visible;
  }

  // @public Sets the visibility of (x1,y1) for the answer.
  setAnswerPointVisible( visible ) {
    this.answerPointNode.visible = visible;
  }

  // @public Sets the visibility of the guess line.
  setGuessLineVisible( visible ) {
    this.guessLineNode.visible = visible;
  }

  // @public Sets the visibility of (x1,y1) for the guess.
  setGuessPointVisible( visible ) {
    this.guessPointNode.visible = visible;
  }

  // @public Sets the visibility of the slope tool for the guess.
  setSlopeToolVisible( visible ) {
    if ( this.slopeToolNode ) {
      this.slopeToolNode.visible = visible;
    }
  }
}

graphingLines.register( 'ChallengeGraphNode', ChallengeGraphNode );