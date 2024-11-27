// Copyright 2023-2024, University of Colorado Boulder

/**
 * ManipulatorDragListener is the base class for DragListeners that are associated with Manipulators.
 * It is responsible for behavior that is common to all manipulators, including sounds associated with
 * grabbing and releasing a manipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../../phet-core/js/types/StrictOmit.js';
import SoundDragListener, { SoundDragListenerOptions } from '../../../../../scenery-phet/js/SoundDragListener.js';
import graphingLines from '../../../graphingLines.js';

type SelfOptions = EmptySelfOptions;

type ManipulatorDragListenerOptions = SelfOptions &
  StrictOmit<SoundDragListenerOptions, 'allowTouchSnag'>;

export default class ManipulatorDragListener extends SoundDragListener {

  protected constructor( providedOptions: ManipulatorDragListenerOptions ) {

    const options = optionize<ManipulatorDragListenerOptions, SelfOptions, SoundDragListenerOptions>()( {

      // DragListenerOptions
      allowTouchSnag: true
    }, providedOptions );

    super( options );
  }
}

graphingLines.register( 'ManipulatorDragListener', ManipulatorDragListener );