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

export default class ClimberPortrayal extends RegionAndCulturePortrayal {

  public readonly levelImages: HTMLImageElement[];

  public constructor( labelProperty: LocalizedStringProperty,
                      regionAndCultureID: RegionAndCultureID,
                      levelImages: HTMLImageElement[] ) {

    super( labelProperty, regionAndCultureID );

    this.levelImages = levelImages;
  }
}

graphingLines.register( 'ClimberPortrayal', ClimberPortrayal );