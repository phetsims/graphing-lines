// Copyright 2013-2023, University of Colorado Boulder

// @ts-nocheck
/**
 * Model for 'Make the Equation' challenges.
 * In this challenge, the user is given a graphed line and must make the equation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingLines from '../../graphingLines.js';
import GraphingLinesStrings from '../../GraphingLinesStrings.js';
import MakeTheEquationNode from '../view/MakeTheEquationNode.js';
import Challenge from './Challenge.js';

export default class MakeTheEquation extends Challenge {

  /**
   * @param {string} description brief description of the challenge, visible in dev versions
   * @param {Line} answer  the correct answer
   * @param {EquationForm} equationForm specifies the form of the equation
   * @param {ManipulationMode} manipulationMode indicates which properties of a line the user is able to change
   * @param {dot.Range} xRange range of the graph's x-axis
   * @param {dot.Range} yRange range of the graph's y-axis
   */
  constructor( description, answer, equationForm, manipulationMode, xRange, yRange ) {
    super(
      Challenge.createTitle( GraphingLinesStrings.makeTheEquation, manipulationMode ),
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
   * @override
   * @param {LineGameModel} model the game model
   * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
   * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
   * @returns {MakeTheEquationNode}
   * @public
   */
  createView( model, challengeSize, audioPlayer ) {
    return new MakeTheEquationNode( this, model, challengeSize, audioPlayer );
  }

  /**
   * Updates the collection of lines that are 'seen' by the point tools.
   * Order is important here! See https://github.com/phetsims/graphing-lines/issues/89
   * @override
   * @protected
   */
  updateGraphLines() {
    this.graph.lines.clear();
    this.graph.lines.push( this.answer );
    if ( this.answerVisible ) {
      this.graph.lines.push( this.guessProperty.get() );
    }
  }
}

graphingLines.register( 'MakeTheEquation', MakeTheEquation );