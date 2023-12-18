// Copyright 2023, University of Colorado Boulder

/**
 * ManipulatorDragListener is the base class for DragListeners that are associated with Manipulators.
 * It is responsible for behavior that is common to all manipulators, including sounds associated with
 * grabbing and releasing a manipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingLines from '../../../graphingLines.js';
import { DragListener, DragListenerOptions, PressedDragListener } from '../../../../../scenery/js/imports.js';
import SoundClip from '../../../../../tambo/js/sound-generators/SoundClip.js';
import grab_mp3 from '../../../../../tambo/sounds/grab_mp3.js';
import release_mp3 from '../../../../../tambo/sounds/release_mp3.js';
import soundManager from '../../../../../tambo/js/soundManager.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../../phet-core/js/types/StrictOmit.js';
import GLConstants from '../../GLConstants.js';

type SelfOptions = EmptySelfOptions;

type ManipulatorDragListenerOptions = SelfOptions &
  StrictOmit<DragListenerOptions<PressedDragListener>, 'allowTouchSnag' | 'press' | 'release'>;

export default class ManipulatorDragListener extends DragListener {

  protected constructor( providedOptions: ManipulatorDragListenerOptions ) {

    // Sounds clips associated with dragging a manipulator
    const grabClip = new SoundClip( grab_mp3, GLConstants.GRAB_RELEASE_SOUND_CLIP_OPTIONS );
    const releaseClip = new SoundClip( release_mp3, GLConstants.GRAB_RELEASE_SOUND_CLIP_OPTIONS );
    soundManager.addSoundGenerator( grabClip );
    soundManager.addSoundGenerator( releaseClip );

    const options = optionize<ManipulatorDragListenerOptions, SelfOptions, DragListenerOptions<PressedDragListener>>()( {

      // DragListenerOptions
      allowTouchSnag: true,
      press: () => grabClip.play(),
      release: () => releaseClip.play()
    }, providedOptions );

    super( options );
  }
}

graphingLines.register( 'ManipulatorDragListener', ManipulatorDragListener );