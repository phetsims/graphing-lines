// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model for 'Graph the Line' challenges.
 * In this challenge, the user is given an equation and must graph the line.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Line from '../../common/model/Line.js';
import graphingLines from '../../graphingLines.js';
import graphingLinesStrings from '../../graphingLinesStrings.js';
import GraphTheLineNode from '../view/GraphTheLineNode.js';
import Challenge from './Challenge.js';

class GraphTheLine extends Challenge {

  /**
   * @param {string} description brief description of the challenge, visible in dev versions
   * @param {Line} answer  the correct answer
   * @param {EquationForm} equationForm specifies the form of the equation
   * @param {ManipulationMode} manipulationMode indicates which properties of a line the user is able to change
   * @param {Range} xRange range of the graph's x axis
   * @param {Range} yRange range of the graph's y axis
   */
  constructor( description, answer, equationForm, manipulationMode, xRange, yRange ) {
    super(
      Challenge.createTitle( graphingLinesStrings.graphTheLine, manipulationMode ),
      description,
      answer,
      equationForm,
      manipulationMode,
      xRange,
      yRange
    );
  }

  /**
   * Creates the view for this challenge.
   * @param {LineGameModel} model the game model
   * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
   * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
   * @returns {GraphTheLineNode}
   * @override
   * @public
   */
  createView( model, challengeSize, audioPlayer ) {
    return new GraphTheLineNode( this, model, challengeSize, audioPlayer );
  }

  /**
   * Updates the collection of lines that are 'seen' by the point tools.
   * Order is important here! See https://github.com/phetsims/graphing-lines/issues/89
   * @override
   * @protected
   */
  updateGraphLines() {

    this.graph.lines.clear();

    if ( this.answerVisible ) {
      this.graph.lines.push( this.answer );
    }

    // Account for guesses that might be NotALine (not a valid line).
    if ( this.guessProperty.get() instanceof Line ) {
      this.graph.lines.push( this.guessProperty.get() );
    }
  }
}

graphingLines.register( 'GraphTheLine', GraphTheLine );

export default GraphTheLine;