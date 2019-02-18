// Copyright 2013-2019, University of Colorado Boulder

/**
 * Model for 'Graph the Line' challenges.
 * In this challenge, the user is given an equation and must graph the line.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Challenge = require( 'GRAPHING_LINES/linegame/model/Challenge' );
  var graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  var GraphTheLineNode = require( 'GRAPHING_LINES/linegame/view/GraphTheLineNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'GRAPHING_LINES/common/model/Line' );

  // strings
  var graphTheLineString = require( 'string!GRAPHING_LINES/graphTheLine' );

  /**
   * @param {string} description brief description of the challenge, visible in dev versions
   * @param {Line} answer  the correct answer
   * @param {EquationForm} equationForm specifies the form of the equation
   * @param {ManipulationMode} manipulationMode indicates which properties of a line the user is able to change
   * @param {Range} xRange range of the graph's x axis
   * @param {Range} yRange range of the graph's y axis
   * @constructor
   */
  function GraphTheLine( description, answer, equationForm, manipulationMode, xRange, yRange ) {
    Challenge.call( this,
      Challenge.createTitle( graphTheLineString, manipulationMode ),
      description,
      answer,
      equationForm,
      manipulationMode,
      xRange,
      yRange
    );
  }

  graphingLines.register( 'GraphTheLine', GraphTheLine );

  return inherit( Challenge, GraphTheLine, {

    /**
     * Creates the view for this challenge.
     * @param {LineGameModel} model the game model
     * @param {Dimension2} challengeSize dimensions of the view rectangle that is available for rendering the challenge
     * @param {GameAudioPlayer} audioPlayer the audio player, for providing audio feedback during game play
     * @returns {GraphTheLineNode}
     * @override
     * @public
     */
    createView: function( model, challengeSize, audioPlayer ) {
      return new GraphTheLineNode( this, model, challengeSize, audioPlayer );
    },

    /**
     * Updates the collection of lines that are 'seen' by the point tools.
     * Order is important here! See https://github.com/phetsims/graphing-lines/issues/89
     * @override
     * @protected
     */
    updateGraphLines: function() {

      this.graph.lines.clear();

      if ( this.answerVisible ) {
        this.graph.lines.push( this.answer );
      }

      // Account for guesses that might be NotALine (not a valid line).
      if ( this.guessProperty.get() instanceof Line ) {
        this.graph.lines.push( this.guessProperty.get() );
      }
    }
  } );
} );