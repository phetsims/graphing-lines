// Copyright 2002-2013, University of Colorado Boulder

//TODO i18n
//TODO add minWidth option
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var GameTimer = require( 'VEGAS/GameTimer' );
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
  var pattern_0label_1value = require( 'string!GRAPHING_LINES/pattern.0label.1value' );
  var pattern_0challenge_1max = require( 'string!GRAPHING_LINES/pattern.0challenge.1max' );
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
      levelNode.text = StringUtils.format( pattern_0label_1value, levelString, level + 1 );
    } );

    // Challenge number
    var challengeNumberNode = new Text( '', { font: options.font } );
    challengeIndexProperty.link( function( challengeIndex ) {
      challengeNumberNode.text = StringUtils.format( pattern_0challenge_1max, challengeIndex + 1, challengesPerGameProperty.get() );
    } );

    // Score
    var scoreNode = new Text( '', { font: options.font } );
    scoreProperty.link( function( score ) {
      scoreNode.text = StringUtils.format( pattern_0label_1value, scoreString, score );
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
      timeValue.text = GameTimer.formatTime( elapsedTime );
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

  return inherit( Panel, Scoreboard );
} );
