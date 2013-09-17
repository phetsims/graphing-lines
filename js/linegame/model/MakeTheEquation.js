// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for "Make the Equation" challenges.
 * In this challenge, the user is given a graphed line and must make the equation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Challenge = require( 'GRAPHING_LINES/linegame/model/Challenge' );
  var GLStrings = require( 'GRAPHING_LINES/common/GLStrings' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MakeTheEquationNode = require( 'GRAPHING_LINES/linegame/view/MakeTheEquationNode' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {String} description brief description of the challenge, visible in dev versions
   * @param {Line} answer  the correct answer
   * @param {EquationForm} equationForm specifies the form of the equation
   * @param {ManipulationMode} manipulationMode indicates which properties of a line the user is able to change
   * @param {Range} xRange range of the graph's x axis
   * @param {Range} yRange range of the graph's y axis
   * @constructor
   */
  function MakeTheEquation( description, answer, equationForm, manipulationMode, xRange, yRange ) {
    Challenge.call( this,
      Challenge.createTitle( GLStrings.makeTheEquation, manipulationMode ),
      description,
      answer,
      equationForm,
      manipulationMode,
      xRange,
      yRange,
      new Vector2( 735, 300 ), /* origin offset */
      new Vector2( xRange.min + ( 0.65 * xRange.getLength() ), yRange.min - 1 ), /* point tool location 1 */
      new Vector2( xRange.min + ( 0.95 * xRange.getLength() ), yRange.min - 4 ) /* point tool location 2 */
    );
  }

  return inherit( Challenge, MakeTheEquation, {

    /**
     * Creates the view for this challenge.
     * @override
     * @param {LineGameModel} model the game model
     * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
     * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
     */
    createView: function( model, challengeSize, audioPlayer ) {
      return new MakeTheEquationNode( this, model, challengeSize, audioPlayer );
    },

    /**
     * Updates the collection of lines that are "seen" by the point tools.
     * @override
     */
    updateGraphLines: function() {
      this.graph.lines.clear();
      // add lines in the order that they would be rendered
      if ( this.answerVisible ) {
        this.graph.lines.add( this.guess.get() );
      }
      this.graph.lines.add( this.answer );
    }
  } );
} );

