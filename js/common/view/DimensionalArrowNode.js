// Copyright 2002-2014, University of Colorado Boulder

/**
 * Arrow like those shown in dimensional line drawings.
 * The arrow has a head at the tip, and there are delimiters (perpendicular lines) at the tip and tail.
 * The arrow head is different than scenery-phet.ArrowNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Number} tailX
   * @param {Number} tailY
   * @param {Number} tipX
   * @param {Number} tipY
   * @param {*} options
   */
  function DimensionalArrowNode( tailX, tailY, tipX, tipY, options ) {

    options = _.extend( {
      stroke: 'black',
      lineWidth: 1.25,
      arrowTipSize: new Dimension2( 6, 8 ), // use even-number dimensions, or tip will look asymmetrical due to rounding
      delimiterLength: 10
    }, options );

    this.arrowTipSize = options.arrowTipSize; // @private
    this.delimiterLength = options.delimiterLength; // @private

    // nodes with dummy initial shapes
    this.lineNode = new Line( 0, 0, 0, 1, options );  // @private
    this.tipNode = new Path( null, options ); // @private
    this.tipDelimiterNode = new Line( 0, 0, 0, 1, options ); // @private
    this.tailDelimiterNode = new Line( 0, 0, 0, 1, options ); // @private

    Node.call( this, { children: [ this.tipDelimiterNode, this.tailDelimiterNode, this.lineNode, this.tipNode ] } );

    // initialize
    this.setTailAndTip( tailX, tailY, tipX, tipY );
  }

  return inherit( Node, DimensionalArrowNode, {

    /**
     * Sets the tail and tip of the arrow.
     * @param {Number} tailX
     * @param {Number} tailY
     * @param {Number} tipX
     * @param {Number} tipY
     */
    setTailAndTip: function( tailX, tailY, tipX, tipY ) {

      this.lineNode.setLine( tailX, tailY, tipX, tipY );

      var tipWidth = this.arrowTipSize.width;
      var tipHeight = this.arrowTipSize.height;
      var tipShape = new Shape();
      if ( tailX === tipX ) {
        // vertical arrow
        if ( tipY > tailY ) {
          // pointing down
          tipShape.moveTo( tipX - ( tipWidth / 2 ), tipY - tipHeight );
          tipShape.lineTo( tipX, tipY );
          tipShape.lineTo( tipX + ( tipWidth / 2 ), tipY - tipHeight );
        }
        else {
          // pointing up
          tipShape.moveTo( tipX - ( tipWidth / 2 ), tipY + tipHeight );
          tipShape.lineTo( tipX, tipY );
          tipShape.lineTo( tipX + ( tipWidth / 2 ), tipY + tipHeight );
        }
        this.tipDelimiterNode.setLine( tipX - this.delimiterLength / 2, tipY, tipX + this.delimiterLength / 2, tipY );
        this.tailDelimiterNode.setLine( tailX - this.delimiterLength / 2, tailY, tailX + this.delimiterLength / 2, tailY );
      }
      else if ( tailY === tipY ) {
        // horizontal arrow
        if ( tailX > tipX ) {
          // pointing left
          tipShape.moveTo( tipX + tipHeight, tipY - ( tipWidth / 2 ) );
          tipShape.lineTo( tipX, tipY );
          tipShape.lineTo( tipX + tipHeight, tipY + ( tipWidth / 2 ) );
        }
        else {
          // pointing right
          tipShape.moveTo( tipX - tipHeight, tipY - ( tipWidth / 2 ) );
          tipShape.lineTo( tipX, tipY );
          tipShape.lineTo( tipX - tipHeight, tipY + ( tipWidth / 2 ) );
        }
        this.tipDelimiterNode.setLine( tipX, tipY - this.delimiterLength / 2, tipX, tipY + this.delimiterLength / 2 );
        this.tailDelimiterNode.setLine( tailX, tailY - this.delimiterLength / 2, tailX, tailY + this.delimiterLength / 2 );
      }
      else {
        //TODO if this is moved to common code, add support for general arrows
        throw new Error( "this implementation supports only horizontal and vertical arrows" );
      }
      this.tipNode.shape = tipShape;
    }
  } );
} );
