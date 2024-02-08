// Copyright 2024, University of Colorado Boulder

/**
 * The ClimberPortrayal defines what is needed for each portrayal in Graphing Lines and Graphing Slope Intercept.
 *
 * @author Luisa Vargas
 */

import RegionAndCulturePortrayal, { RegionAndCultureID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import graphingLines from '../../graphingLines.js';
import LocalizedStringProperty from '../../../../chipper/js/LocalizedStringProperty.js';

export default class ClimberPortrayal extends RegionAndCulturePortrayal {

  public readonly levelOne: HTMLImageElement;
  public readonly levelTwo: HTMLImageElement;
  public readonly levelThree: HTMLImageElement;
  public readonly levelFour: HTMLImageElement;
  public readonly levelFive?: HTMLImageElement;
  public readonly levelSix?: HTMLImageElement;

  public constructor( regionAndCultureID: RegionAndCultureID,
                      label: LocalizedStringProperty,
                      levelOne: HTMLImageElement, levelTwo: HTMLImageElement, levelThree: HTMLImageElement, levelFour: HTMLImageElement,
                      levelFive?: HTMLImageElement, levelSix?: HTMLImageElement ) {

    super( label, regionAndCultureID, {} );

    this.levelOne = levelOne;
    this.levelTwo = levelTwo;
    this.levelThree = levelThree;
    this.levelFour = levelFour;
    this.levelFive = levelFive;
    this.levelSix = levelSix;
  }
}

graphingLines.register( 'ClimberPortrayal', ClimberPortrayal );