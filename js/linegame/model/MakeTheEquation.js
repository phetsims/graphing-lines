// Copyright 2013-2019, University of Colorado Boulder

/**
 * Model for 'Make the Equation' challenges.
 * In this challenge, the user is given a graphed line and must make the equation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Challenge = require( 'GRAPHING_LINES/linegame/model/Challenge' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MakeTheEquationNode = require( 'GRAPHING_LINES/linegame/view/MakeTheEquationNode' );

  // strings
  const makeTheEquationString = require( 'string!GRAPHING_LINES/makeTheEquation' );

  /**
   * @param {string} description brief description of the challenge, visible in dev versions
   * @param {Line} answer  the correct answer
   * @param {EquationForm} equationForm specifies the form of the equation
   * @param {ManipulationMode} manipulationMode indicates which properties of a line the user is able to change
   * @param {Range} xRange range of the graph's x axis
   * @param {Range} yRange range of the graph's y axis
   * @constructor
   */
  function MakeTheEquation( description, answer, equationForm, manipulationMode, xRange, yRange ) {
    Challenge.call( this,
      Challenge.createTitle( makeTheEquationString, manipulationMode ),
      description,
      answer,
      equationForm,
      manipulationMode,
      xRange,
      yRange
    );
  }

  graphingLines.register( 'MakeTheEquation', MakeTheEquation );

  return inherit( Challenge, MakeTheEquation, {

    /**
     * Creates the view for this challenge.
     * @override
     * @param {LineGameModel} model the game model
     * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
     * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
     * @returns {MakeTheEquationNode}
     * @public
     */
    createView: function( model, challengeSize, audioPlayer ) {
      return new MakeTheEquationNode( this, model, challengeSize, audioPlayer );
    },

    /**
     * Updates the collection of lines that are 'seen' by the point tools.
     * Order is important here! See https://github.com/phetsims/graphing-lines/issues/89
     * @override
     * @protected
     */
    updateGraphLines: function() {
      this.graph.lines.clear();
      this.graph.lines.push( this.answer );
      if ( this.answerVisible ) {
        this.graph.lines.push( this.guessProperty.get() );
      }
    }
  } );
} );

