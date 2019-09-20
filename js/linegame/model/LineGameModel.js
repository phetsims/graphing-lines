// Copyright 2013-2019, University of Colorado Boulder

/**
 * Model for the 'Line Game' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BaseGameModel = require( 'GRAPHING_LINES/linegame/model/BaseGameModel' );
  const ChallengeFactory1 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory1' );
  const ChallengeFactory2 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory2' );
  const ChallengeFactory3 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory3' );
  const ChallengeFactory4 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory4' );
  const ChallengeFactory5 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory5' );
  const ChallengeFactory6 = require( 'GRAPHING_LINES/linegame/model/ChallengeFactory6' );
  const graphingLines = require( 'GRAPHING_LINES/graphingLines' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function LineGameModel() {

    // a challenge factory for each level
    const challengeFactories = [
      new ChallengeFactory1(),
      new ChallengeFactory2(),
      new ChallengeFactory3(),
      new ChallengeFactory4(),
      new ChallengeFactory5(),
      new ChallengeFactory6()
    ];

    BaseGameModel.call( this, challengeFactories );
  }

  graphingLines.register( 'LineGameModel', LineGameModel );


  return inherit( BaseGameModel, LineGameModel );
} );
