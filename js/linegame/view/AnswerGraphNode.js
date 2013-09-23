// Copyright 2002-2013, University of Colorado Boulder

/**
 * Challenge graph that initially shows the answer, but not the user's guess.
 * This graph is not interactive, has no manipulators, and is used in "Make the Equation" challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var ChallengeGraphNode = require( 'PATH/ChallengeGraphNode' );

  /**
   * @param {Challenge} challenge
   * @constructor
   */
  function AnswerGraphNode( challenge ) {
    ChallengeGraphNode.call( this, challenge, true /* slopeToolEnabled */ );
    this.setAnswerVisible( true );
  }

  return inherit( ChallengeGraphNode, AnswerGraphNode );
} );

