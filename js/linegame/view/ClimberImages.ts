// Copyright 2024, University of Colorado Boulder

/**
 * Responsible for all images for the Level Climber in Graphing Lines. Collects the images to support selecting a
 * different climber character for localization.
 *
 * @author Luisa Vargas
 */

import graphingLines from '../../graphingLines.js';
import ClimberPortrayalUSA from './ClimberPortrayalUSA.js';
import ClimberPortrayalAfrica from './ClimberPortrayalAfrica.js';
import ClimberPortrayalAfricaModest from './ClimberPortrayalAfricaModest.js';
import ClimberPortrayalAsia from './ClimberPortrayalAsia.js';
import ClimberPortrayalLatinAmerica from './ClimberPortrayalLatinAmerica.js';
import ClimberPortrayalOceania from './ClimberPortrayalOceania.js';

const ClimberImages = {
  CLIMBER_PORTRAYALS: [
    ClimberPortrayalAfrica,
    ClimberPortrayalAfricaModest,
    ClimberPortrayalAsia,
    ClimberPortrayalLatinAmerica,
    ClimberPortrayalOceania,
    ClimberPortrayalUSA
  ]
};

graphingLines.register( 'ClimberImages', ClimberImages );
export default ClimberImages;