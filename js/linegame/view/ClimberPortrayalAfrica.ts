// Copyright 2024, University of Colorado Boulder

/**
 * This file instantiates the Africa region and culture portrayals.
 *
 * @author Luisa Vargas
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { AFRICA_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import level1_svg from '../../../images/africa/level1_svg.js';
import level2_svg from '../../../images/africa/level2_svg.js';
import level3_svg from '../../../images/africa/level3_svg.js';
import level4_svg from '../../../images/africa/level4_svg.js';
import level5_svg from '../../../images/africa/level5_svg.js';
import level6_svg from '../../../images/africa/level6_svg.js';
import ClimberPortrayal from './ClimberPortrayal.js';

const africaStringProperty = JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.africaStringProperty;

const ClimberPortrayalAfrica = new ClimberPortrayal(
  africaStringProperty,
  level1_svg,
  level2_svg,
  level3_svg,
  level4_svg,
  AFRICA_REGION_AND_CULTURE_ID,
  level5_svg,
  level6_svg
);

export default ClimberPortrayalAfrica;