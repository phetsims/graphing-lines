/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><defs><style>.cls-10,.cls-3,.cls-5,.cls-6,.cls-7,.cls-8{stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px}.cls-8{fill:#fff}.cls-14{stroke-miterlimit:10}.cls-3{fill:#1c1c1c}.cls-5{fill:#7fa2d1}.cls-6{fill:#8fb7df}.cls-7{fill:#9c725e}.cls-10,.cls-14{fill:none}.cls-14{stroke:#000}.cls-15,.cls-17{stroke-width:0}.cls-17{fill:#292825}</style></defs><g id="Grid"><path d="M29.3 29.3h241.5v241.5H29.3zm0 229.3h241.4m-241.4-12h241.4M29.3 234.5h241.4m-241.4-12h241.4M29.3 210.4h241.4M29.3 198.3h241.4M29.3 186.2h241.4m-241.4-12h241.4M29.3 162.1h241.4M29.3 150h241.4M29.3 137.9h241.4M29.3 125.8h241.4m-241.4-12h241.4M29.3 101.7h241.4M29.3 89.6h241.4M29.3 77.5h241.4m-241.4-12h241.4M29.3 53.4h241.4m-241.4-12h241.4m-12.1-12.1v241.4m-12-241.4v241.4M234.5 29.3v241.4m-12-241.4v241.4M210.4 29.3v241.4M198.3 29.3v241.4M186.2 29.3v241.4m-12-241.4v241.4M162.1 29.3v241.4M150 29.3v241.4M137.9 29.3v241.4M125.8 29.3v241.4m-12-241.4v241.4M101.7 29.3v241.4M89.6 29.3v241.4M77.5 29.3v241.4m-12-241.4v241.4M53.4 29.3v241.4m-12-241.4v241.4" style="stroke:#58595b;stroke-width:.2px;fill:#fff;stroke-miterlimit:10"/><path d="M23.9 150h252.2" class="cls-14"/><path d="m24.7 152.5-4.3-2.5 4.3-2.5zm250.6 0 4.3-2.5-4.3-2.5z" class="cls-15"/><path d="M150 23.9v252.2" class="cls-14"/><path d="m147.5 24.7 2.5-4.3 2.5 4.3zm0 250.6 2.5 4.3 2.5-4.3z" class="cls-15"/></g><path id="Lines" d="m300.1 54.9-15-8.3v5.9H14.9v-5.9L0 54.9l14.9 8.3v-5.8h270.2v5.8z" style="stroke-width:0;fill:#27b04b"/><g id="Africa"><path d="M153.2 80.5c0-.1-.2-.2-.3-.1q0 0 0 0t0 0 0 0h-.2c-.3 0-.5.2-.7.4q0 0 0 0c-.2.3-.2.6-.3 1v.9c0 .2.1.3.2.4v.1c0 .8-.2 1.6-.5 2.8 0 0 0 .3.2.8v.2q0 0 0 0c.2 1 .3 2.6-.1 4.4 0 .4-.2.7-.3 1.1-1.6 4.1-3.1 6.2-4.2 7.4-.9 1.1-1.9 2.2-3 3-.7.5-1.4 1-2.2 1.3h0c-2.5.9-5.7.2-10.5-3.7l-1.8-1.5c-2.1-2.6-3.1-4.1-4-7.3-.3 0-.5.1-.8 0-1.5-.3-3.2-2.4-3-3.8.2-1.7 2.6-2.7 4-1.8-.1-.4-.2-.8-.3-1.3-.3.2-.6.4-1 .4s-.8 0-1.1.1c-.3 0-.6.2-.9.3q0 0 0 0c-.2-.5-.4-1-.5-1.5q0 0 0 0c0-.4-.2-.7-.2-1.1h0c-.2-1.1-.3-2.3-.2-3.5h0c0-.6 0-1.2.2-1.7.2-1.1.4-2.1.8-3.1h0s0 0 0 0c.3-.7.6-1.3.9-2q0 0 0 0c.5-.9 1.1-1.8 1.8-2.6q0 0 0 0c.4-.5.8-.9 1.3-1.3q0 0 0 0c.4-.3.7-.6 1.1-.9.3-.2.7-.5 1.1-.7q0 0 0 0c.7-.4 1.5-.8 2.3-1.1h.1q1.8-.6 3.6-.9h.1c.5 0 1-.1 1.6-.1h.1c1.8 0 3.5.1 5.2.6h.2c.4.1.9.3 1.3.5h.2c1.3.5 2.4 1.1 3.5 1.9 0 0 .1 0 .2.1 0 0 .2.1.3.2.6.5 1.1.9 1.6 1.5h0l.1.1c1 1.1 1.8 2.3 2.4 3.7v.1c.3.6.5 1.2.7 1.9q0 0 0 0c.3.9.5 1.8.6 2.8v.1c0 .7.1 1.4.1 2Z" class="cls-7"/><path d="M153.2 80.5c0-.1-.2-.2-.3-.1h-.2c-.3 0-.5.2-.7.4 0-.4 0-.9-.3-1.5-.2-.6-.5-1.3-.9-2v-.1c-.3-.6-.7-1.2-1.1-1.8-.2-.3-.5-.6-.7-.9 0 0 0-.1-.2-.2-.5-.6-1-1.1-1.6-1.6-.6-.6-1.3-1.1-2-1.5h-.1c-.5-.3-.9-.5-1.4-.7h-.2c-.9-.4-1.9-.6-2.9-.7h-2.4c-1 0-1.8.3-2.6.5h-.1c-.6.2-1.3.5-2 .8h-.1c-.5.2-1 .4-1.6.7-.2 0-.4.2-.6.4q-.75.6-1.5 1.8c-.4.5-.7 1.2-1.1 1.8-.2.3-.3.7-.5 1-.3.7-.6 1.4-.9 2.2-.2.5-.3.9-.5 1.4v.2c0 .3-.2.6-.3.9v.2c-.2.8-.3 1.5-.4 2.2V85c-.3.2-.6.4-1 .4s-.8 0-1.1.1c-.3 0-.6.2-.9.3-.2-.5-.4-1-.5-1.5 0-.4-.2-.7-.2-1.1-.2-1.1-.3-2.3-.2-3.5 0-.6 0-1.2.2-1.7.2-1.1.4-2.1.8-3.1.3-.7.6-1.3.9-2 .5-.9 1.1-1.8 1.8-2.6.4-.5.8-.9 1.3-1.3.4-.3.7-.6 1.1-.9.3-.2.7-.5 1.1-.7.7-.4 1.5-.8 2.3-1.1h.1q1.8-.6 3.6-.9h.1c.5 0 1-.1 1.6-.1h.1c1.8 0 3.5.1 5.2.6h.2c.4.1.9.3 1.3.5h.2c1.3.5 2.4 1.1 3.5 1.9 0 0 .1 0 .2.1 0 0 .2.1.3.2.6.5 1.1.9 1.6 1.5s0 0 .1.1c1 1.1 1.8 2.3 2.4 3.7v.1c.3.6.5 1.2.7 1.9.3.9.5 1.8.6 2.8v.1c0 .7.1 1.4.1 2Z" class="cls-17"/><path d="M130.9 106.3s0 0 0 0m17.2-20.2c0 .9-.4 1.6-.8 1.6s-.8-.7-.8-1.6.4-1.6.8-1.6.8.7.8 1.6m-13.4.2c0 1-.4 1.9-1 1.9s-1-.8-1-1.9.4-1.9 1-1.9 1 .8 1 1.9m9.4 5.6c-.3 2.8-3.7 1.5-5.5 1.7" class="cls-10"/><path d="M126.7 249.9c-1 4.7-6.9 5.3-10.6 1.9-1.1-1 .5-10.2.7-11.4.2-1.4 1-4.2 1.6-5.3.4-.8.3 1.1 3.4 1.2 2.3 0 3-2.1 3.3-1.3.5 1 1.9 13.7 1.6 15Z" class="cls-8"/><path d="M163.1 199.7c-.4.3-.9.6-1.3.8-1.2.6-2.6 1.1-4.3 1.5-1.9.4-4.2.8-7 1.1-1.9.2-4 .5-6.4.7-1.8.2-3.7.4-5.8.6h0-.7c-2.1 0-4.5-.3-7.1-.9-2.3-.5-4.7-1.2-7.1-2-2-.6-3.9-1.4-5.8-2.1-1.9-.8-3.7-1.5-5.3-2.2 0 0 .1-1.3.3-3.6.4-4.2 1.2-11.6 2.1-18.7.1-1.1.3-2.3.4-3.4 0-.5.1-1.1.2-1.6.1-.9.2-1.7.4-2.5.7-4.6 1.4-8.4 2.1-10.2 0 0 .5-1.8 1-3.7s1.1-3.9 1.1-3.9c2.1.9 5.8 1.2 9.2 1.3h5.6c.1-4.3.1-7.5 0-10.6 4.2.8 5.6.9 9.8.2.1 3.3.3 6.6.4 9.7 3.8.4 5.4 0 8-1.1h0c1.3 2.1 2.9 9.3 4.5 17.6.5 2.8 1.1 5.7 1.6 8.5 1 6 2 11.9 2.7 16.4.6 3.8 1.1 6.7 1.3 7.8Z" style="fill:#4b618e;stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px"/><path d="M130.5 203.6c-.6 8.4-5.4 22.7-5.4 31.3-.3-.8-1 1.4-3.3 1.3-3-.1-3-2-3.4-1.2.2-10.3-3.1-25.5-.8-35.4 1.8.7 3.8 1.4 5.8 2.1 2.4.8 4.8 1.5 7.1 2Zm13-85.9c-3.3 1.9-7 1.3-9.8 0-.8-3.8-5.9-9.5-2.9-11.4.1-1.3.4-3.8.4-5.7 4.8 3.9 8 4.5 10.5 3.7 0 .3-.2 2.7 1.1 3.8.2.7.5 4.4.7 9.7Z" class="cls-7"/><path d="M144.6 140.8c-4.2.7-5.5.6-9.8-.2-.1-4.7-.3-8.8 0-15.3V123h0c-.2-1.8-.5-3.6-.9-5.3 2.8 1.3 6.5 1.9 9.8 0 0 1.5.2 3.1.2 4.8.2 5.5.5 12 .8 18.3Z" style="stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;fill:#313d5b"/><path d="M122.7 86.3c0-.2-.2-.4-.2-.6m14.4-5.2c-.1.4-.6.8-1.1.8s-1-.1-1.5-.2c-1.4-.3-3.3-.3-4.7.2-.4.2-.8-.3-.5-.7.2-.2.4-.4.6-.7.6-.6 1.4-.9 2.3-1.1 1.3-.3 5.5-.4 4.9 1.5Zm12.8.9c-.2.2-.4.2-.6.2s-.4-.1-.6-.2c-.6-.2-1.3-.2-1.9 0-.5.2-.9.5-1.4.5-.6 0-1.2-.6-1.2-1.2s.5-1.1 1.1-1.3c1.5-.6 3.2 0 4.3 1 .2.1.3.3.4.5v.6Z" class="cls-10"/><path d="M154.4 234.9c-.3.1-.9 1.3-3.5 1.4-2.1 0-3-1.4-3.4-1.5h0c0-8.6-2.8-22.5-3.4-30.9 2.4-.3 4.5-.5 6.4-.7 2.8-.3 5.1-.7 7-1.1 2.3 9.9-3.3 22.6-3.1 32.9Z" class="cls-7"/><path d="M157.5 202s0 0 0 0m-26.6-95.8s0 0 0 0m3.7 16.8s0 0 0 0m-18.8 44.6s0 0 0 0m-1.1 7.5s0 0 0 0m47.2 16.8s0 0 0 0m-43-38.1" class="cls-10"/><path d="M122 199.7c.8.6 1.6 1 1.4 1.9-2-.6-3.9-1.4-5.8-2.1-1.9-.8-3.7-1.5-5.3-2.2 0 0 .1-1.3.3-3.6h0c1.2-.5 2.2 0 3 .8 0-1-.1-.9 0-1.9.2-1 1.1-2 2.3-2s2.1.8 2.4 1.8 0 1.5-.1 2.5c1.5-1.1 4-.5 4.6 1.1.7 1.6-1.1 3.5-2.9 3.7Z" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;fill:#f2f0f1;stroke:#231f20"/><path d="M163.1 199.7c-.4.3-.9.6-1.3.8-.5-.8-.3-1.1-.4-2-.9 1.2-2.9 1.1-3.9-.2-.9-1.3-.1-3.3 1.3-3.7-.9-.5-1.9-1.5-1.8-2.6 0-1 .9-1.9 1.9-1.9s2.3 1.3 3 1.8c.6 3.8 1.1 6.7 1.3 7.8Zm-4-24.2c-.8.6-.3.4-1.1.8-.9.5-2.1.3-2.7-.5s-.4-1.9.2-2.7 1.1-.8 2-1.3c-1.6-.5-2.4-2.5-1.5-3.8.4-.7.8-1.2 1.6-1.1.5 2.8 1.1 5.7 1.6 8.5Zm-9.1-17.6c-.2.8-1 1.4-1.9 1.4s-1.2-.2-2-.5c.6 1.3-.3 2.9-1.7 3.2-1.4.2-2.6-1.4-2.5-2.8-.7.6-2 .9-2.8.4s-1.1-1.6-.7-2.4 2.2-1.1 2.8-1.5c-.7-.7-1.5-1.2-1.5-2.3s.8-2.2 1.9-2.2c1.7 0 2.7 2.3 2.7 2.3 1-1.9 2.5-2.7 3.8-.7.7 1.1-.2 2.3-1 2.8.9.2.8 0 1.6.3s1.4 1.2 1.2 2Zm-25.3 16.6c-.8 1.1-2.3.7-3.1.1.2.8.2.8.2 1.6s-.6 1.7-1.5 1.9-1.7-.4-2.1-1.2-.2-1.2-.2-2c-.9.9-2.4 1.1-3.3.3.1-1.1.3-2.3.4-3.4.3-.5.6-.7 1-.8-.4-.2-.5-.5-.8-.8.1-.9.2-1.7.4-2.5.3-.2.6-.4.9-.4 1 0 1.9 1.5 2.5 2 .4-.8.6-1.8 1.7-2.2 1-.4 2.4-.1 2.9.9.7 1.5-1.2 3.3-1.2 3.3 2.2.2 3.6 1.3 2.1 3.2Zm19.8 6.8c.7.8 1.2 2.1.7 3s-1.7 1.4-2.6 1c-1-.4-1.5-2.3-1.9-3-.7.8-1.2 1.8-2.4 1.9-1.2 0-2.5-.7-2.7-1.9-.2-1.9 2.3-3.2 2.3-3.2-2.1-.9-3.3-2.6-1.1-4.2 1.2-.9 2.6 0 3.2.9 0-1 0-.9.2-1.8s1.2-1.7 2.1-1.6c.9 0 1.6 1 1.8 2 .1.9-.1 1.4-.4 2.3 1.3-.8 3.3 0 3.7 1.6.4 1.5-1.3 3.1-2.8 3Zm-15.3-30.1v.3c0 .6-.1 1-.6 1.4-1.4 1.3-4.1.1-4.1.1.7 2.3-3.6 4.9-5.6.8.5-1.9 1.1-3.9 1.1-3.9 2.1.9 5.8 1.2 9.2 1.3m21.3 51.9c-1.9.2-4 .5-6.4.7-1.8.2-3.7.4-5.8.6h0c-.6-1-.7-2.6.3-3.3 1.5-1.1 3.9.3 3.9.3-.3-2.2.6-3.9 3.1-2.9 1.4.5 1.3 2.1.8 3.1.9-.4.8-.4 1.7-.7s2 .1 2.4.9c.3.5.3 1 0 1.4Z" style="stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;fill:#f2f0f1"/><path d="M138.4 204.5s0 0 0 0m12.1-1.4v.1" class="cls-10"/><path d="M149.7 113.5c0 .5-5.2 2-5.8 8.9h-.1c0-1.7-.2-3.3-.2-4.7-.3-5.2-.5-9-.7-9.7-1.2-1-1-3.5-1.1-3.8h0c.8-.3 1.6-.7 2.2-1.3 3.1.4 5.7 3.6 8.1 5.4-2.3.5-5.5 1.4-6.6 2.3 1.3.4 4.4 2 4.2 2.9" class="cls-6"/><path d="M153.6 108.5v.2c.5 8.2-1.7 17.1-1.9 19-.4 3.8-.4 8.2 2.3 21.2-.3.2-.7.3-1 .4-2.6 1.2-4.2 1.5-8 1.1-.2-3.1-.3-6.4-.4-9.7-.3-6.3-.5-12.8-.8-18.3h.1c.6-6.9 5.7-8.5 5.8-8.9.2-.9-2.9-2.5-4.2-2.9 1.1-.9 4.3-1.7 6.6-2.3-2.4-1.8-5-5.1-8.1-5.4 1.1-.9 2-1.9 3-3 1.1-1.3 2.6-3.4 4.2-7.4.1-.4.2-.7.3-1.1.4.1.2.1.6 0 .5-.2 1.3-1 1.5-1.5s.3-1 .4-1.5c.1-.6.2-1.3 0-1.9s0-1.2-.7-1.4c-.3 0-.6-.1-.9 0 .2-.7.4-1.3.5-2 .1 0 .2-.2.3-.3q.3-.45.3-.9c0-.3.1-.6 0-.9 0-.2-.2-.4-.3-.5 0-.7 0-1.4-.1-2 .5-.3.6-1 .4-1.6-.1-.4-.4-.8-.7-1.1 0-4-1.4-11.9-1.3-15.7h.5c1.9.1 3.9 0 5.7-.3h.4c1.7 12.6 2.2 18 .2 34.1-.6 4.6-4.3 10.1-4.7 14.7Z" class="cls-5"/><path d="M158.1 59.6v-.2m-42.1.2" class="cls-10"/><path d="M154 88.4c0 .5-.2 1-.4 1.5s-1 1.2-1.5 1.5c-.4.2-.2.2-.6 0 .4-1.8.3-3.4.1-4.4v-.2c0-1 .4-1.5.8-1.7.3-.2.7-.2.9 0 .6.2.5.8.7 1.4s0 1.3 0 1.9" class="cls-7"/><path d="M143.3 70.6c-.3.5-.5.7-1.1.9-.4.1-.9 0-1.3-.2-.7-.5-.6-1.3-.6-2.1v-.6c-.1-.8-.7-1.5-1.4-2.1s-1.4-1-2.1-1.6c0 0-.1 0-.2-.1-.3-.3-.6-.7-.4-1.1s.7-.6 1.1-.6c1.8-.2 3.6.9 4.6 2.3q0 0 0 0c.6.9.9 1.8 1.1 2.8 0 .6.1.6.2 1.7v.6Zm-14 5.2c-.5 0-.9-.1-1.3-.3-.1 0-.3-.1-.4-.2-1.5-.9-2.9-1.7-4.4-2.6h-.2c-.3-.2-.1.1-.3-.2-.4-.5-.4-1.3 0-1.8 0-.2.2-.3.4-.4.7-.5 1.3-.5 2.1-.2h.2c.5.3 2.7 2 4 3.4 1 1.1 1.4 2.1.2 2.3Zm8.6-5c-.5.6-1.2.7-1.8.3-.5-.3-.8-.8-1-1.3 0 0-.1-.2-.2-.3-.3-.6-.5-1.2-1-1.7-.6-.6-1.4-.9-2.1-1.3-.3-.2-.5-.4-.8-.7-.3-.4-.5-.9-.4-1.3.2-.7 1-1.1 1.7-1.1.8 0 1.4.5 1.9 1 .2.2.3.3.4.5l.9 1.2c.6.7 1.3 1.3 1.7 2.1.2.3.3.7.4 1.1v1.5Zm-10.1 7.8c-.4.2-.8.2-1.2.2h0c-1.6 0-3.2-.3-4.7-.9h-.3c-.2 0-.2 0-.4-.2-.3-.3-.5-.8-.5-1.3 0-.6.2-1.5.8-1.6h1c.2 0 .4 0 .6.1.5 0 3.1.8 4.5 1.7 1.1.6 1.6 1.4.3 2Zm19.6-7c-.1.3-.3.5-.5.8-.3.3-.6.4-1 .5-1.5 0-1.2-1.1-1.1-2v-.2c.2-1.1 0-2.1-.6-3.1-.3-.5-.6-1-.8-1.5q0 0 0 0c-.1-.6.3-.6.9-.9.4-.2.9 0 1.2.2s.6.6.8 1q.6 1.05.9 1.8c.2.5.2 1 .3 1.6 0 .7.1 1.4-.1 2Zm4.6 1.2c0 .3-.2.6-.4.9-.5.7-1.3 1.2-2.2 1.5h-.3c-.3 0-.5-.4-.5-1.1 0-1.5.5-4.1.5-4.3q0 0 0 0c0-.2 0-.3.2-.4.3-.3 1 0 1.3.2 1.1.8 1.7 2.1 1.4 3.2m.9 5.6s-.1 0-.2.1c-.4.2-.9.4-1.3.5s-.8.1-1-.3c-.2-.5-.1-1.1.1-1.7.4-.9 1.2-1.7 1.7-1.6.1 0 .2 0 .4.2h0c.3.3.6.7.7 1.1.2.6 0 1.3-.4 1.6Zm-27.2 3.1c-.6.5-1.4.8-1.9 1-.7.2-1.6.6-2.3.6-.2 0-.4 0-.6-.1-.8-.4-1-1.4-.7-2.3.2-.5.5-.9 1.1-1.1h.3c.8-.1 3.9 0 4.5.7q0 0 0 0c.3.5 0 .9-.4 1.3Zm7.7-9.6c-.5 1-2.1.2-2.7 0-1-.6-2-1.2-2.9-1.8-.5-.4-1-.8-1.4-1.3-.2-.2-.3-.4-.4-.7-.3-.5 0-.9.6-1.3.5-.3 1.2 0 1.7.2.1 0 .2.1.4.2 1.5.7 2.5 1.5 3.6 2.8.2.2.5.5.8.9s.5.9.4 1.2Zm-8.1 13c-.3.2-.6.4-1 .4s-.8 0-1.1.1c-.3 0-.6.2-.9.3-.1 0-.2 0-.3.1-.4 0-1 0-1.1-.4-.1-.3 0-.7.3-.9.1-.1.4-.2.6-.4 1-.4 2.5-.8 3.2-.6.2 0 .3 0 .4.1.6.3.4.8 0 1.2Z" class="cls-3"/><path d="M153.5 81.9c0 .3-.1.7-.3.9 0 .1-.2.2-.3.3-.1.7-.3 1.4-.5 2-.4.2-.8.7-.8 1.7 0-.5-.2-.8-.2-.8.3-1.2.4-2 .5-2.8 0 0 .2 0 .3.1.2 0 .4 0 .6-.2.1 0 .2-.2.3-.3q.3-.45.3-.9c0-.3.1-.6 0-.9 0-.2-.2-.4-.3-.5 0 0 0-.1-.2-.1.1 0 .2 0 .3.1.1.2.2.4.3.5.1.3 0 .6 0 .9" class="cls-17"/><path d="M153.4 81.9c0 .3-.1.7-.3.9 0 .1-.2.2-.3.3-.2.1-.4.2-.6.2-.1 0-.2 0-.3-.1l-.1-.1c-.1-.1-.2-.2-.2-.4-.1-.3 0-.6 0-.9s0-.7.3-1q0 0 0 0l.1-.1c.2-.2.4-.3.7-.3h.1q0 0 0 0t0 0h.1s.1 0 .2.1c.1.2.2.4.3.5.1.3 0 .6 0 .9" class="cls-3"/><path d="M148.1 86.1c0 .9-.4 1.6-.8 1.6s-.8-.7-.8-1.6.4-1.6.8-1.6.8.7.8 1.6m-13.4.2c0 1-.4 1.9-1 1.9s-1-.8-1-1.9.4-1.9 1-1.9 1 .8 1 1.9" style="stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;fill:#010101"/><path d="M136.9 80.5c-.1.4-.6.8-1.1.8s-1-.1-1.5-.2c-1.4-.3-3.3-.3-4.7.2-.4.2-.8-.3-.5-.7.2-.2.4-.4.6-.7.6-.6 1.4-.9 2.3-1.1 1.3-.3 5.5-.4 4.9 1.5Zm12.8.9c-.2.2-.4.2-.6.2s-.4-.1-.6-.2c-.6-.2-1.3-.2-1.9 0-.5.2-.9.5-1.4.5-.6 0-1.2-.6-1.2-1.2s.5-1.1 1.1-1.3c1.5-.6 3.2 0 4.3 1 .2.1.3.3.4.5v.6Z" style="stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;fill:#131312"/><path d="M145 96.4c-.8 1.5-1.7 2.3-3.6 2.6-1.2.2-3.1-.3-4.2-1s-1.1-.3-2.4-2.3c.7.7 7.1 2.1 10.3.7Z" class="cls-8"/><path d="M134.7 151.2h-5.6c-3.4-.1-7.1-.5-9.2-1.3.2-2.3 2.7-17.9 2.5-20.6-.1-1.2-2.5-15.9-2.5-14.8-1.1-5.3-1.7-10.5-3.1-15.4-1-3.5-2.3-13.9-2.2-17.2.3-8.2 0-11.2 1.3-22.2 2 .8 4.2 1.1 6.3 1.1 0 3.2.2 5 .4 10-.3.5-.3 1.4 0 1.8.2.3 0 0 .3.2h.2c-.4.7-.7 1.3-.9 2h-1c-.5.1-.7 1.1-.8 1.6 0 .5.2.9.5 1.3.2.2.3.2.4.2 0 .6-.2 1.1-.2 1.7-.5.2-.8.5-1.1 1.1-.4.8-.2 1.8.7 2.3.2 0 .4.1.6.1 0 .4.2.8.3 1.1-.3.1-.5.2-.6.4-.3.2-.4.6-.3.9.2.4.7.5 1.1.4.1 0 .2 0 .3-.1.3-.1.6-.3.9-.3.4 0 .8 0 1.1-.1.4 0 .8-.2 1-.4 0 .5.1.9.3 1.3-1.5-1-3.8 0-4 1.8-.2 1.4 1.5 3.5 3 3.8.5 2 .7 3.3 1.7 6.4 1.6 1.2 2.1 1.5 3.9 2.6-3.9 1.2-5.5 5.2-8.5 8.3 2.3.2 4.1.8 6.2 1.7-.9.7-3.5 2.4-2.9 3 1 1 9 5.6 9.6 9.2h0c0 .8.1 1.6 0 2.3-.2 6.5 0 10.7 0 15.3v10.6Z" class="cls-5"/><path d="M134.6 122.9c-.6-3.7-8.6-8.2-9.6-9.2-.6-.6 2-2.2 2.9-3-2.1-.9-3.9-1.5-6.2-1.7 3.1-3.1 4.6-7.1 8.5-8.3h0c.3-.1.7-.2 1-.2 0 1.9-.3 4.4-.4 5.7-3.1 1.9 2.1 7.6 2.9 11.4.4 1.7.7 3.5.9 5.3" class="cls-6"/><path d="M152.8 75.7v.5m-1.3-16.5v.3m6.8-.4h-.2m-6.6.4h-.1" class="cls-10"/><path d="M122.3 60.6c-2.1 0-4.3-.3-6.3-1.1q0 0 0 0v-.2c-.6-.9-.6-6-.8-7-.1-1 .2-2.2 1.1-2.7.5-.4 1.2-.4 1.9-.4 1.5 0 2.7-.4 3.9.4 1 .7 1.7 1.9 1.8 3.2.1 1.2-.6 7-1.5 7.9Zm35.4-.9q-2.85.6-5.7.3h0c-1.3-.9-2.3-7.2-1.4-8.5s2.6-1.8 4.2-1.6c1.1.1 2.2.6 2.7 1.5.8 1.3.9 7 .2 8.3" class="cls-7"/><path d="M157.2 251.8c-4.1 3.3-10.6 2.8-11.7-1.9-.3-1.3 1.2-13.9 1.8-15 0-.1.1-.2.2-.2.4 0 1.3 1.6 3.4 1.5 2.6 0 3.1-1.2 3.5-1.4 0 0 .2 0 .3.2.6 1.1 1.5 4 1.7 5.3.2 1.2 2 10.4.8 11.4Z" class="cls-8"/><path d="m146.5 141.7 4.8 4.2c.1 0 .2.2.3.3 0 .3-.3.6-.6.8l-1.5-1.2m-20-5.4c-1.8 2-3.5 4-5.3 6 .4.2.7.4 1.1.6.5-1 1.3-1.9 2.3-2.6" class="cls-10"/></g></svg>')}`;
export default image;