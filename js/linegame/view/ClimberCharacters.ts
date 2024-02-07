// Copyright 2024, University of Colorado Boulder

/**
 * The ClimberCharacters creates the images  of each version of the 'level' climber ( level 1, level 2, level 3, level 4,
 * level 5, and level 6 ), as well as defines the visibility of each individual image based on the
 * regionAndCulturePortrayalProperty.
 *
 * @author Luisa Vargas
 *
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { Image, Node } from '../../../../scenery/js/imports.js';
import graphingLines from '../../graphingLines.js';
import BaseGameModel from '../model/BaseGameModel.js';
import ClimberPortrayal from './ClimberPortrayal.js';

export default class ClimberCharacters {

  public climberNodes: Node[];

  public constructor( sceneModel: BaseGameModel, climberImages: { CLIMBER_PORTRAYALS: ClimberPortrayal[] } ) {

    const climberSets = climberImages.CLIMBER_PORTRAYALS;
    const regionAndCulturePortrayalProperty = sceneModel.regionAndCulturePortrayalProperty;

    const createVisibleProperty = ( set: ClimberPortrayal ) => {
      return new DerivedProperty( [ regionAndCulturePortrayalProperty ], portrayal => {
        return portrayal === set;
      } );
    };

    const levelOneImages = climberSets.map( set => new Image( set.levelOne,
      {
        visibleProperty: createVisibleProperty( set ),
        scale: 0.54
      } ) );
    const levelTwoImages = climberSets.map( set => new Image( set.levelTwo,
      {
        visibleProperty: createVisibleProperty( set ),
        scale: 0.54
      } ) );
    const levelThreeImages = climberSets.map( set => new Image( set.levelThree,
      {
        visibleProperty: createVisibleProperty( set ),
        scale: 0.54
      } ) );
    const levelFourImages = climberSets.map( set => new Image( set.levelFour,
      {
        visibleProperty: createVisibleProperty( set ),
        scale: 0.54
      } ) );

    const levelOneNode = new Node( { children: levelOneImages } );
    const levelTwoNode = new Node( { children: levelTwoImages } );
    const levelThreeNode = new Node( { children: levelThreeImages } );
    const levelFourNode = new Node( { children: levelFourImages } );

    this.climberNodes = [ levelOneNode, levelTwoNode, levelThreeNode, levelFourNode ];

    let levelFiveImages;
    let levelSixImages;
    let levelFiveNode;
    let levelSixNode;
    if ( climberSets[ 0 ].levelFive && climberSets[ 0 ].levelSix ) {

      levelFiveImages = climberSets.map( set => new Image( set.levelFive!,
        {
          visibleProperty: createVisibleProperty( set ),
          scale: 0.54
        } ) );
      levelSixImages = climberSets.map( set => new Image( set.levelSix!,
        {
          visibleProperty: createVisibleProperty( set ),
          scale: 0.54
        } ) );

      levelFiveNode = new Node( { children: levelFiveImages } );
      levelSixNode = new Node( { children: levelSixImages } );
      this.climberNodes.push( levelFiveNode );
      this.climberNodes.push( levelSixNode );
    }
  }
}

graphingLines.register( 'ClimberCharacters', ClimberCharacters );