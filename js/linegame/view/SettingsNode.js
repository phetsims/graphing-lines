// Copyright 2002-2013, University of Colorado Boulder

/**
 * Portion of the scenegraph that corresponds to the "settings" game phase. (See GamePhase.SETTINGS)
 * The displays a panel with controls used to configure a game.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var GamePhase = require( 'GRAPHING_LINES/linegame/model/GamePhase' );
  var GameSettingsPanel = require( 'GRAPHING_LINES/linegame/view/GameSettingsPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineGameConstants = require( 'GRAPHING_LINES/linegame/LineGameConstants' );
  var Node = require( 'PATH/Node' );

  /**
   * @param {LineGameModel} model
   * @param {Dimension2} playAreaSize //TODO change to ScreenView.layoutBounds?
   * @constructor
   */
  function SettingsNode( model, playAreaSize ) {
    Node.call( this );

    this.addChild( new GameSettingsPanel( model.settings, function() {
      model.gamePhaseProperty.set( GamePhase.PLAY );
    }, {
      startButtonColor: LineGameConstants.BUTTON_COLOR,
      centerX: playAreaSize.width / 2,
      centerY: playAreaSize.height / 2
    } ) );
  }

  return inherit( Node, SettingsNode );
} );

