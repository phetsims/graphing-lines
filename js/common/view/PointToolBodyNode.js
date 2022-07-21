// Copyright 2021-2022, University of Colorado Boulder

/**
 * PointToolBodyNode is the body portion of the point tool. It includes everything except the tool's probe.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ShadedRectangle from '../../../../scenery-phet/js/ShadedRectangle.js';
import { Color, LinearGradient, Node, Rectangle, RichText, VBox } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';
import graphingLinesStrings from '../../graphingLinesStrings.js';
import GLColors from '../GLColors.js';

// constants
const COORDINATES_SIDE_VALUES = [ 'left', 'right' ];
const DEFAULT_FONT = new PhetFont( { size: 15, weight: 'bold' } );
const NUMBER_OF_GRIPS = 3;

class PointToolBodyNode extends Node {

  /**
   * @param {Property.<Vector2>} coordinatesProperty
   * @param {Object} [options]
   */
  constructor( coordinatesProperty, options ) {

    options = merge( {

      // The side where the client intends to add a probe, see COORDINATES_SIDE_VALUES
      coordinatesSide: 'left',

      // For both the body and text background
      cornerRadius: 8,

      // body
      bodyWidth: 130,
      bodyHeight: 48,
      bodyColor: GLColors.POINT_TOOL_COLOR,
      bodyXMargin: 7,

      // text background
      backgroundWidth: 70,
      backgroundHeight: 35,
      backgroundFill: 'white',
      backgroundStroke: Color.grayColor( 185 ),
      backgroundXMargin: 4,
      backgroundYMargin: 2,

      // text
      font: DEFAULT_FONT,
      textFill: 'black',
      decimals: 1
    }, options );

    assert && assert( COORDINATES_SIDE_VALUES.includes( options.coordinatesSide ) );

    // The main rectangle
    const bodyRectangle = new ShadedRectangle( new Bounds2( 0, 0, options.bodyWidth, options.bodyHeight ), {
      baseColor: options.bodyColor,
      lightOffset: 0.95,
      cornerRadius: options.cornerRadius
    } );

    // The background rectangle that appears behind the coordinates
    const background = new Rectangle( 0, 0, options.backgroundWidth, options.backgroundHeight, {
      cornerRadius: options.cornerRadius,
      lineWidth: 2,
      fill: options.backgroundFill,
      stroke: options.backgroundStroke,
      centerY: bodyRectangle.centerY
    } );

    // The text that displays the coordinates
    const textNode = new RichText( '', {
      font: options.font,
      fill: options.textFill,
      maxWidth: options.backgroundWidth - ( 2 * options.backgroundXMargin ),
      maxHeight: options.backgroundHeight - ( 2 * options.backgroundYMargin )
    } );

    // Horizontal 'grip' bars that cue the user to drag the tool
    const gripWidth = bodyRectangle.width - background.width - ( 3 * options.bodyXMargin );
    const gripHeight = 4;
    const gripFill = new LinearGradient( 0, 0, 0, gripHeight )
      .addColorStop( 0, 'white' )
      .addColorStop( 0.5, options.bodyColor )
      .addColorStop( 1, Color.grayColor( 20 ) );
    const gripStroke = Color.grayColor( 140 );
    const grips = [];
    for ( let i = 0; i < NUMBER_OF_GRIPS; i++ ) {
      grips.push( new Rectangle( 0, 0, gripWidth, gripHeight, {
        cornerRadius: gripHeight / 2,
        fill: gripFill,
        stroke: gripStroke,
        lineWidth: 0.5
      } ) );
    }
    const gripsBox = new VBox( {
      children: grips,
      spacing: 6,
      centerY: bodyRectangle.centerY
    } );

    // Layout
    if ( options.coordinatesSide === 'left' ) {
      background.left = bodyRectangle.left + options.bodyXMargin;
      gripsBox.right = bodyRectangle.right - options.bodyXMargin;
    }
    else {
      background.right = bodyRectangle.right - options.bodyXMargin;
      gripsBox.left = bodyRectangle.left + options.bodyXMargin;
    }

    assert && assert( !options.children );
    options.children = [ bodyRectangle, background, textNode, gripsBox ];

    super( options );

    // Update the displayed coordinates. Use toFixedNumber so that trailing zeros are removed.
    const coordinatesListener = coordinates => {
      if ( coordinates ) {
        const x = Utils.toFixedNumber( coordinates.x, options.decimals );
        const y = Utils.toFixedNumber( coordinates.y, options.decimals );
        textNode.text = StringUtils.format( graphingLinesStrings.point.XY, x, y );
      }
      else {
        textNode.text = graphingLinesStrings.point.unknown;
      }
    };
    coordinatesProperty.link( coordinatesListener );

    // Keep the coordinates centered in the background.
    textNode.boundsProperty.link( () => {
      textNode.center = background.center;
    } );

    // @private
    this.disposePointToolBodyNode = () => {
      if ( coordinatesProperty.hasListener( coordinatesListener ) ) {
        coordinatesProperty.unlink( coordinatesListener );
      }
    };

    // @private
    this.background = background;
    this.textNode = textNode;
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposePointToolBodyNode();
    super.dispose();
  }

  /**
   * Sets the fill for the text.
   * @param {ColorDef} fill
   * @public
   */
  setTextFill( fill ) {
    this.textNode.fill = fill;
  }

  /**
   * Sets the fill for the text background.
   * @param {ColorDef} fill
   * @public
   */
  setBackgroundFill( fill ) {
    this.background.fill = fill;
  }
}

graphingLines.register( 'PointToolBodyNode', PointToolBodyNode );
export default PointToolBodyNode;