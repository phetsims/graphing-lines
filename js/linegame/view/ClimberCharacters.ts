// Copyright 2024, University of Colorado Boulder

/**
 * The ClimberCharacters creates the images of each version of the game 'level' climber, as well as defines the
 * visibility of each individual image based on the regionAndCulturePortrayalProperty.
 *
 * @author Luisa Vargas
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { Image, Node } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';
import ClimberPortrayal from './ClimberPortrayal.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import RegionAndCulturePortrayal from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';

export default class ClimberCharacters {

  public readonly climberNodes: Node[];

  public constructor( regionAndCulturePortrayalProperty: TReadOnlyProperty<RegionAndCulturePortrayal>,
                      climberPortrayals: ClimberPortrayal[] ) {

    this.climberNodes = [];

    const imagesPerPortrayal = climberPortrayals[ 0 ].levelImages.length;

    // For each game level ...
    for ( let i = 0; i < imagesPerPortrayal; i++ ) {

      // Create a set of images for that game level, one of which will be visible based on regionAndCulturePortrayalProperty.
      const levelImages = climberPortrayals.map( climberPortrayal => new Image( climberPortrayal.levelImages[ i ], {
          visibleProperty: new DerivedProperty( [ regionAndCulturePortrayalProperty ],
            regionAndCulturePortrayal => ( regionAndCulturePortrayal === climberPortrayal ) ),
          scale: 0.54
        } ) );

      // Wrap the images for the level in a parent node.
      const levelNode = new Node( {
        children: levelImages
      } );

      this.climberNodes.push( levelNode );
    }
  }
}

graphingLines.register( 'ClimberCharacters', ClimberCharacters );