// Copyright 2024, University of Colorado Boulder

/**
 * This file instantiates the Oceania region and culture portrayals.
 *
 * @author Luisa Vargas
 */

import ClimberPortrayal from './ClimberPortrayal.js';
import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { OCEANIA_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import level1_svg from '../../../images/asia/level1_svg.js';
import level2_svg from '../../../images/asia/level2_svg.js';
import level3_svg from '../../../images/oceania/level3_svg.js';
import level4_svg from '../../../images/asia/level4_svg.js';
import level5_svg from '../../../images/oceania/level5_svg.js';
import level6_svg from '../../../images/asia/level6_svg.js';

const ClimberPortrayalOceania = new ClimberPortrayal(
  JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.oceaniaStringProperty,
  OCEANIA_REGION_AND_CULTURE_ID,
  [ level1_svg, level2_svg, level3_svg, level4_svg, level5_svg, level6_svg ]
);

export default ClimberPortrayalOceania;