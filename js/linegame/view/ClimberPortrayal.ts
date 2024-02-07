// Copyright 2024, University of Colorado Boulder

/**
 * The ClimberPortrayal defines what is needed for each portrayal in Graphing Lines and Graphing Slope Intercept.
 *
 * @author Luisa Vargas
 *
 */

import RegionAndCulturePortrayal, { RegionAndCultureID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import graphingLines from '../../graphingLines.js';
import LocalizedStringProperty from '../../../../chipper/js/LocalizedStringProperty.js';

export default class ClimberPortrayal extends RegionAndCulturePortrayal {

  public levelOne: HTMLImageElement;
  public levelTwo: HTMLImageElement;
  public levelThree: HTMLImageElement;
  public levelFour: HTMLImageElement;
  public levelFive: HTMLImageElement | undefined;
  public levelSix: HTMLImageElement | undefined;

  public constructor( label: LocalizedStringProperty,
                      levelOne: HTMLImageElement, levelTwo: HTMLImageElement, levelThree: HTMLImageElement,
                      levelFour: HTMLImageElement,
                      queryParameterValue: RegionAndCultureID,
                      levelFive?: HTMLImageElement, levelSix?: HTMLImageElement ) {

    super( label, queryParameterValue, {} );

    this.levelOne = levelOne;
    this.levelTwo = levelTwo;
    this.levelThree = levelThree;
    this.levelFour = levelFour;
    this.levelFive = levelFive;
    this.levelSix = levelSix;
  }
}

graphingLines.register( 'ClimberPortrayal', ClimberPortrayal );