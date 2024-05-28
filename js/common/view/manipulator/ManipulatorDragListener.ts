// Copyright 2023-2024, University of Colorado Boulder

/**
 * ManipulatorDragListener is the base class for DragListeners that are associated with Manipulators.
 * It is responsible for behavior that is common to all manipulators, including sounds associated with
 * grabbing and releasing a manipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingLines from '../../../graphingLines.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../../phet-core/js/types/StrictOmit.js';
import RichPointerDragListener, { RichPointerDragListenerOptions } from '../../../../../scenery-phet/js/RichPointerDragListener.js';

type SelfOptions = EmptySelfOptions;

type ManipulatorDragListenerOptions = SelfOptions &
  StrictOmit<RichPointerDragListenerOptions, 'allowTouchSnag'>;

export default class ManipulatorDragListener extends RichPointerDragListener {

  protected constructor( providedOptions: ManipulatorDragListenerOptions ) {

    const options = optionize<ManipulatorDragListenerOptions, SelfOptions, RichPointerDragListenerOptions>()( {

      // DragListenerOptions
      allowTouchSnag: true
    }, providedOptions );

    super( options );
  }
}

graphingLines.register( 'ManipulatorDragListener', ManipulatorDragListener );