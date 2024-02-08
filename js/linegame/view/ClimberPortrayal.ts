// Copyright 2024, University of Colorado Boulder

/**
 * The ClimberPortrayal is the base class that defines what is needed for each portrayal used for the icons on the
 * level-selection buttons for game screens in Graphing Lines and Graphing Slope Intercept.
 *
 * @author Luisa Vargas
 */

import RegionAndCulturePortrayal, { RegionAndCultureID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import graphingLines from '../../graphingLines.js';
import LocalizedStringProperty from '../../../../chipper/js/LocalizedStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { Image, Node } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class ClimberPortrayal extends RegionAndCulturePortrayal {

  public readonly levelImages: HTMLImageElement[];

  public constructor( labelProperty: LocalizedStringProperty,
                      regionAndCultureID: RegionAndCultureID,
                      levelImages: HTMLImageElement[] ) {

    super( labelProperty, regionAndCultureID );

    this.levelImages = levelImages;
  }

  /**
   * Given a set of climber portrayals, creates a set of Nodes, each of which dynamically changes the image shown
   * to match regionAndCulturePortrayalProperty.  These Nodes are to be used on the level-selection buttons in Games,
   * and are in ascending order of game level.
   */
  public static createClimberNodes(
    regionAndCulturePortrayalProperty: TReadOnlyProperty<RegionAndCulturePortrayal>,
    climberPortrayals: ClimberPortrayal[] ): Node[] {

    const icons: Node[] = [];

    assert && assert( climberPortrayals.length > 0, 'There must be at least 1 element in climberPortrayals.' );
    const imagesPerPortrayal = climberPortrayals[ 0 ].levelImages.length;
    assert && assert( _.every( climberPortrayals, climberPortrayal => climberPortrayal.levelImages.length === imagesPerPortrayal ),
      `Every element in climberPortrayals must have ${imagesPerPortrayal} levelImages` );

    // For each game level ...
    for ( let i = 0; i < imagesPerPortrayal; i++ ) {

      // Create a set of images for that game level, one of which will be visible based on regionAndCulturePortrayalProperty.
      const levelImages = climberPortrayals.map( climberPortrayal => new Image( climberPortrayal.levelImages[ i ], {
        visibleProperty: new DerivedProperty( [ regionAndCulturePortrayalProperty ],
          regionAndCulturePortrayal => ( regionAndCulturePortrayal === climberPortrayal ) ),
        scale: 0.54
      } ) );

      // Wrap the images for the level in a parent node.
      const icon = new Node( {
        children: levelImages
      } );

      icons.push( icon );
    }

    return icons;
  }
}

graphingLines.register( 'ClimberPortrayal', ClimberPortrayal );