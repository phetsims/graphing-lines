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

  public readonly levelImages: HTMLImageElement[];

  public constructor( regionAndCultureID: RegionAndCultureID,
                      label: LocalizedStringProperty,
                      levelImages: HTMLImageElement[] ) {

    super( label, regionAndCultureID, {} );

    this.levelImages = levelImages;
  }
}

graphingLines.register( 'ClimberPortrayal', ClimberPortrayal );