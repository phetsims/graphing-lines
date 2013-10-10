// Copyright 2002-2013, University of Colorado Boulder

//TODO i18n
//TODO add minWidth option
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var SimpleClockIcon = require( 'GRAPHING_LINES/linegame/view/SimpleClockIcon' ); //TODO copied from BAA
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TextButton = require( 'SUN/TextButton' );

  // strings
  var levelString = require( 'string!GRAPHING_LINES/level' );
  var newGameString = require( 'string!GRAPHING_LINES/newGame' );
  var pattern_0label_1valueString = require( 'string!GRAPHING_LINES/pattern.0label.1value' );
  var patternChallengeNumberString = require( 'string!GRAPHING_LINES/pattern.challengeNumber' );
  var scoreString = require( 'string!GRAPHING_LINES/score' );

  function Scoreboard( challengeIndexProperty, challengesPerGameProperty, levelProperty, scoreProperty, elapsedTimeProperty, timerEnabledProperty, newGameCallback, options ) {

    var thisNode = this;

    //TODO revisit these, odd combination of supertype and composite options
    options = _.extend( {
      levelVisible: true,
      challengeNumberVisible: true,
      font: new PhetFont( 20 ),
      ySpacing: 40,
      xMargin: 20,
      yMargin: 10,
      fill: 'rgb( 180, 205, 255 )',
      stroke: 'black',
      lineWidth: 1,
      newGameButtonColor: new Color( 235, 235, 235 )
    }, options );

    // Level
    var levelNode = new Text( '', { font: options.font } );
    levelProperty.link( function( level ) {
      levelNode.text = StringUtils.format( pattern_0label_1valueString, levelString, level + 1 );
    } );

    // Challenge number
    var challengeNumberNode = new Text( '', { font: options.font } );
    challengeIndexProperty.link( function( challengeIndex ) {
      challengeNumberNode.text = StringUtils.format( patternChallengeNumberString, challengeIndex + 1, challengesPerGameProperty.get() );
    } );

    // Score
    var scoreNode = new Text( '', { font: options.font } );
    scoreProperty.link( function( score ) {
      scoreNode.text = StringUtils.format( pattern_0label_1valueString, scoreString, score );
    } );

    // Timer
    var timerNode = new Node();
    var clockIcon = new SimpleClockIcon( 15 ); //TODO grab from BAA
    var timeValue = new Text( '0', { font: options.font } );
    timerNode.addChild( clockIcon );
    timerNode.addChild( timeValue );
    timeValue.left = clockIcon.right + 8;
    timeValue.centerY = clockIcon.centerY;
    elapsedTimeProperty.link( function( elapsedTime ) {
      timeValue.text = formatTime( elapsedTime );
    } );
    timerEnabledProperty.link( function( timerEnabled ) {
      timerNode.visible = timerEnabled;
    } );

    // New Game button
    var newGameButton = new TextButton( newGameString, newGameCallback, {
      font: options.font,
      rectangleFillUp: options.newGameButtonColor,
      rectangleXMargin: 20,
      rectangleYMargin: 5 } );

    // Content for the panel. One row, vertically centered, evenly spaced
    var content = new Node();
    var nodes = [ levelNode, challengeNumberNode, scoreNode, timerNode, newGameButton ];
    if ( !options.levelVisible ) { nodes.splice( nodes.indexOf( levelNode ), 1 ); }
    if ( !options.challengeNumberVisible ) { nodes.splice( nodes.indexOf( challengeNumberNode ), 1 ); }
    for ( var i = 0; i < nodes.length; i++ ) {
      content.addChild( nodes[i] );
      if ( i > 0 ) {
        nodes[i].left = nodes[i - 1].right + options.ySpacing;
        nodes[i].centerY = nodes[i - 1].centerY
      }
    }

    Panel.call( thisNode, content, options );
  }

  //TODO move this somewhere more general
  //TODO does time format need to be localized?
  /**
   * Formats a value representing seconds into HH:MM:SS.
   * @param {Number} secs
   * @returns {string}
   */
  var formatTime = function( secs ) {
    var hours = Math.floor( secs / 3600 );
    var minutes = Math.floor( (secs - (hours * 3600)) / 60 );
    var seconds = Math.floor( secs - (hours * 3600) - (minutes * 60) );
    return ( hours > 0 ? hours + ':' : '' ) + hours > 0 && minutes < 10 ? '0' + minutes : minutes + ':' + ( seconds > 9 ? seconds : '0' + seconds );
  };

  return inherit( Panel, Scoreboard );
} );
