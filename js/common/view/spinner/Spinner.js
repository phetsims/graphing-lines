// Copyright 2002-2013, University of Colorado Boulder

/**
 * Spinner for a number value, with up and down arrows.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var assert = require( 'ASSERT/assert' )( 'graphing-lines' );
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // creates a vertical gradient where with color1 at the top and bottom, color2 in the center
  var createBackgroundGradient = function( color1, color2, height ) {
    return new LinearGradient( 0, 0, 0, height )
      .addColorStop( 0, color1 )
      .addColorStop( 0.5, color2 )
      .addColorStop( 1, color1 );
  };

  //-------------------------------------------------------------------------------------------

  /**
   * @param {Property<Boolean>} stateProperty
   * @param {Property<Boolean>} enabledProperty
   * @param {Function} fireFunction
   * @constructor
   */
  function SpinnerListener( stateProperty, enabledProperty, fireFunction ) {
    ButtonListener.call( this, {
      up: function() {
        stateProperty.set( 'up' );
      },
      over: function() {
        stateProperty.set( 'over' );
      },
      down: function() {
        stateProperty.set( 'down' );
      },
      out: function() {
        stateProperty.set( 'out' );
      },
      fire: function() {
        if ( enabledProperty.get() ) {
          fireFunction();
        }
      }
    } );
  }

  inherit( ButtonListener, SpinnerListener );

  //-------------------------------------------------------------------------------------------

  /**
   * @param {Property<Number>} valueProperty
   * @param {Property<Range>} rangeProperty
   * @param {Function} upFunction returns the value for 'up' button
   * @param {Function} downFunction return the value for 'down' button
   * @param {*} options
   * @constructor
   */
  function Spinner( valueProperty, rangeProperty, upFunction, downFunction, options ) {

    options = _.extend( {
      color: 'blue',
      decimalPlaces: 0,
      font: new PhetFont( 24 )
    }, options );

    var thisNode = this;
    Node.call( thisNode );

    // properties for the "up" (increment) control
    var upStateProperty = new Property( 'up' );
    var upEnabledProperty = new DerivedProperty( [ valueProperty, rangeProperty ], function( value, range ) {
      return value < range.max;
    } );

    // properties for the "down" (decrement) control
    var downStateProperty = new Property( 'up' );
    var downEnabledProperty = new DerivedProperty( [ valueProperty, rangeProperty ], function( value, range ) {
      return value > range.min;
    } );

    var textNode = new Text( "", { font: options.font, pickable: false } );

    // compute max width of text based on value range
    textNode.text = Util.toFixed( rangeProperty.get().min, options.decimalPlaces );
    var maxWidth = textNode.width;
    textNode.text = Util.toFixed( rangeProperty.get().max, options.decimalPlaces );
    maxWidth = Math.max( maxWidth, textNode.width );

    // compute shape of the background behind the numeric value
    var xMargin = 3;
    var yMargin = 3;
    var backgroundWidth = maxWidth + ( 2 * xMargin );
    var backgroundHeight = textNode.height + ( 2 * yMargin );
    var backgroundOverlap = 0.5;
    var backgroundCornerRadius = 10;

    // compute colors
    var arrowColors = {
      up: options.color,
      over: options.color,
      down: options.color.darkerColor(),
      out: options.color,
      disabled: 'rgb(176,176,176)'
    };
    var centerColor = 'white';
    var highlightGradient = createBackgroundGradient( options.color, centerColor, backgroundHeight );
    var pressedGradient = createBackgroundGradient( options.color.darkerColor(), centerColor, backgroundHeight );
    var backgroundColors = {
      up: 'white',
      over: highlightGradient,
      down: pressedGradient,
      out: pressedGradient,
      disabled: 'white'
    };

    // callbacks for changing the value
    var fireUp = function() {
      valueProperty.set( upFunction() );
    };
    var fireDown = function() {
      valueProperty.set( downFunction() );
    };

    // top half of the background, for "up"
    var upBackground = new Path( Shape.rectangle( 0, 0, backgroundWidth, backgroundHeight / 2 ) ); //TODO use CAG to round top corners
    upBackground.addInputListener( new SpinnerListener( upStateProperty, upEnabledProperty, fireUp ) );

    // bottom half of the background, for "down"
    var downBackground = new Path( Shape.rectangle( 0, backgroundHeight / 2, backgroundWidth, backgroundHeight / 2 ) ); //TODO use CAG to round top corners
    downBackground.addInputListener( new SpinnerListener( downStateProperty, downEnabledProperty, fireDown ) );

    // compute size of arrows
    var arrowButtonSize = new Dimension2( 0.5 * backgroundWidth, 0.1 * backgroundWidth );

    // 'up' arrow
    var arrowOptions = { fill: 'white', stroke: 'black', lineWidth: 0.25 };
    var upArrowShape = new Shape()
      .moveTo( arrowButtonSize.width / 2, 0 )
      .lineTo( arrowButtonSize.width, arrowButtonSize.height )
      .lineTo( 0, arrowButtonSize.height )
      .close();
    var upArrow = new Path( upArrowShape, arrowOptions );
    upArrow.addInputListener( new SpinnerListener( upStateProperty, upEnabledProperty, fireUp ) );

    // 'down' arrow
    var downArrowShape = new Shape()
      .moveTo( arrowButtonSize.width / 2, arrowButtonSize.height )
      .lineTo( 0, 0 )
      .lineTo( arrowButtonSize.width, 0 )
      .close();
    var downArrow = new Path( downArrowShape, arrowOptions );
    downArrow.addInputListener( new SpinnerListener( downStateProperty, downEnabledProperty, fireDown ) );

    // rendering order
    thisNode.addChild( upBackground );
    thisNode.addChild( downBackground );
    thisNode.addChild( upArrow );
    thisNode.addChild( downArrow );
    thisNode.addChild( textNode );

    // layout, background nodes are already drawn in the local coordinate frame
    var ySpacing = 3;
    textNode.x = 0;
    textNode.centerY = backgroundHeight / 2;
    upArrow.centerX = upBackground.centerX;
    upArrow.bottom = upBackground.top - ySpacing;
    downArrow.centerX = downBackground.centerX;
    downArrow.top = downBackground.bottom + ySpacing;

    // Update text to match the value
    valueProperty.link( function( value ) {
      // displayed value
      textNode.text = Util.toFixed( value, options.decimalPlaces );
      // horizontally centered
      textNode.x = ( backgroundWidth - textNode.width ) / 2;
    } );

    // Update button colors
    var updateColors = function( stateProperty, enabledProperty, background, arrow ) {
      if ( enabledProperty.get() ) {
        arrow.stroke = 'black';
        var state = stateProperty.get();
        if ( state === 'up' ) {
          background.fill = backgroundColors.up;
          arrow.fill = arrowColors.up;
        }
        else if ( state === 'over' ) {
          background.fill = backgroundColors.over;
          arrow.fill = arrowColors.over;
        }
        else if ( state === 'down' ) {
          background.fill = backgroundColors.down;
          arrow.fill = arrowColors.down;
        }
        else if ( state === 'out' ) {
          background.fill = backgroundColors.out;
          arrow.fill = arrowColors.out;
        }
        else {
          throw new Error( 'unsupported state: ' + state );
        }
      }
      else {
        background.fill = backgroundColors.disabled;
        arrow.fill = arrowColors.disabled;
        arrow.stroke = arrowColors.disabled; // stroke so that arrow size will look the same when it's enabled/disabled
      }
    };
    var updateUpColors = function() {
      updateColors( upStateProperty, upEnabledProperty, upBackground, upArrow );
    };
    var updateDownColors = function() {
      updateColors( downStateProperty, downEnabledProperty, downBackground, downArrow );
    };
    upStateProperty.link( updateUpColors );
    upEnabledProperty.link( updateUpColors );
    downStateProperty.link( updateDownColors );
    downEnabledProperty.link( updateDownColors );

    thisNode.mutate( options );
  }

  return inherit( Node, Spinner );
} );
