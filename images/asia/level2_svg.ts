/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><defs><style>.cls-1{fill:#2f308a}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-8,.cls-9{stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px}.cls-8{fill:#fff}.cls-12{stroke-miterlimit:10}.cls-2{fill:#d6ae29}.cls-3{fill:#c81f46}.cls-4{fill:#d18f6a}.cls-5{fill:#36b2a8}.cls-12,.cls-9{fill:none}.cls-12{stroke:#000}.cls-13{stroke-width:0}</style></defs><g id="Grid"><path d="M29.3 29.3h241.5v241.5H29.3zm0 229.3h241.4m-241.4-12h241.4M29.3 234.5h241.4m-241.4-12h241.4M29.3 210.4h241.4M29.3 198.3h241.4M29.3 186.2h241.4m-241.4-12h241.4M29.3 162.1h241.4M29.3 150h241.4M29.3 137.9h241.4M29.3 125.8h241.4m-241.4-12h241.4M29.3 101.7h241.4M29.3 89.6h241.4M29.3 77.5h241.4m-241.4-12h241.4M29.3 53.4h241.4m-241.4-12h241.4m-12.1-12.1v241.4m-12-241.4v241.4M234.5 29.3v241.4m-12-241.4v241.4M210.4 29.3v241.4M198.3 29.3v241.4M186.2 29.3v241.4m-12-241.4v241.4M162.1 29.3v241.4M150 29.3v241.4M137.9 29.3v241.4M125.8 29.3v241.4m-12-241.4v241.4M101.7 29.3v241.4M89.6 29.3v241.4M77.5 29.3v241.4m-12-241.4v241.4M53.4 29.3v241.4m-12-241.4v241.4" style="stroke:#58595b;stroke-width:.2px;fill:#fff;stroke-miterlimit:10"/><path d="M23.9 150h252.2" class="cls-12"/><path d="m24.7 152.5-4.3-2.5 4.3-2.5zm250.6 0 4.3-2.5-4.3-2.5z" class="cls-13"/><path d="M150 23.9v252.2" class="cls-12"/><path d="m147.5 24.7 2.5-4.3 2.5 4.3zm0 250.6 2.5 4.3 2.5-4.3z" class="cls-13"/></g><path id="Lines" d="m281.1 152.4 11.7-12.5-16.8-3.3 1.8 5.6-257.1 83.2-1.8-5.6-11.7 12.5 16.8 3.3-1.8-5.6 257.1-83.2z" style="stroke-width:0;fill:#27b04b"/><g id="Asia"><path d="M126 52.1c-.4-.9-.7-1.3-1.3-3.1 1.3-6.2 1.1-9.5-.2-11.4-1.3.7-2.3 0-4 .6-2 .8-3.6.8-5.6 4.9-.5.9-2.3 5.9-4.1 5.3-.7-.2-2-1.6-2.2-2.3-1.3-1-3.3-.4-4.2 1.2-.9 1.5-.6 3.7.4 5.1.3.4.6.8 1 1.1h0c-.9 2.6-1.1 6.1-2.5 8 3.3.4 8.7 8.4 11.6 12.7 1.3 1.9 2.1 3.1 2.2 2.6h.3c-.5-2.3-1.2-4.8-2.2-7.4h0c-.9-1.3-.8-4.7.5-6.8h0c.9.3 1.7.7 2.6 1.1 2.3.8 4.1 1.6 4.7-4.5-.1.2-1.5 1.2-3.9-3 1.3.7 3.1 1.2 4.5 1.2.3-.2.5-1.2.6-2 .6 0 1.2-.3 1.6-.9.6-.8.7-1.6.3-2.5Zm-3.7-3c0 1.1-.3 2-.6 1.9-.3 0-.5-.9-.4-2 0-1.1.3-2 .6-1.9.3 0 .5.9.4 2m2.1-3.7c-.6.4-1-.2-1.9-.3-1.2-.2-2.4.4-3.5 0 2.1-1.4 2.2-1.9 4.3-1.4h0s.2 0 .2.2h0s0 0 0 0c.4.2.7.4.9.7.3.3.3.7 0 1Z" class="cls-4"/><path d="M134.8 134.9s0 0 0 0c-.8 9.3-13.7 6.5-21.2 5.9h-.5c0-.7-.3-2.2-.8-4.2-.1-.5-.3-1-.4-1.6.4-.9 1.2-1.7 2.2-1.8 1.3-.2 2.5.4 3.8.7s2.9 0 3.4-1.1c.3-.7.1-1.5.2-2.2.2-1.8 2.1-3.1 4-3.3 1.8-.2 3.5.4 5.2 1 .2.3.5.6.7.8 1.8 2.2 3.1 4.2 3.3 5.7Z" class="cls-1"/><path d="M134.8 135.4c0 2.8-.1 6.6-.3 10.9h0c-1.9 7.7-13.9 5.1-21 4.6h-.5v-10h.5c7.5.6 20.4 3.4 21.2-5.9v.4Z" class="cls-5"/><path d="M134.8 134.9s0 0 0 0" class="cls-8"/><path d="M134.6 146.3c0 2.3-.2 4.8-.2 7.3-1.9 2.6-3.8 5.3-5.8 7.9-1.9-1.8-3.8-3.5-5.6-5.3l-4.2 7.2c-2-1.8-4-3.7-6-5.5.1-1.9.2-3.7.3-5.7h0v-1.5h.5c7.1.6 19.1 3.1 21-4.6Z" class="cls-1"/><path d="M134.3 153.6c-.1 2.9-.2 5.9-.4 8.8-2.2 2.9-3.9 6.1-5 9.6-2.1-1.6-4.1-3.3-6.2-4.9-1.3 2.6-2.7 5.3-4 7.9-.2.4-.5.9-1 .9-.3 0-.6-.3-.9-.5-1.8-2-3.6-4-5.3-6.1.3-2.3.6-4.7.8-7 .1-1.4.2-2.8.3-4.3 2 1.8 4 3.7 6 5.5l4.2-7.2c1.9 1.8 3.8 3.5 5.6 5.3 1.9-2.6 3.8-5.3 5.8-7.9Z" class="cls-2"/><path d="M134 162.4c-.4 8.1-.8 15.4-1.1 18.6 0 .3-.1.5-.2.8-1.2 2.2-6 3.9-8 5.1-.8.5-1.7.9-2.6 1.2-4.5 1.6-9.8 1.2-14.5-.2 1.2-4.3 2.2-8.3 3-12.2h0l.1-.1h-.1c.4-2.1.8-4.2 1.1-6.3 1.8 2 3.6 4 5.3 6.1.2.3.5.5.9.5.5 0 .7-.5 1-.9 1.4-2.6 2.7-5.3 4-7.9 2.1 1.6 4.1 3.3 6.2 4.9 1.1-3.5 2.8-6.8 5-9.6Zm-22.2-27.3c-.1.3-.2.6-.3 1-1.4-1.3-3.7-1.5-5.2-.3-1.3 1-2 2.9-3.7 3.2-1.4.3-2.7-.7-4-1.3-2.1-1-4.6-1.2-6.8-.4-2.2.7-4 2.4-5.1 4.5H86c.6-3.6 1-6.8 1.4-9.6h.3c1.7-3 6.1-4.3 9.1-2.5 1 .6 2 1.5 3.1 1.1.9-.3 1.3-1.2 2-1.9 1.1-1.1 2.9-1.2 4.4-.8 1.1.4 2.2 1 3.1 1.8.2.5.6 1 1 1.1h0c.4 1.4.8 2.8 1.2 4.1Z" class="cls-3"/><path d="M113 150.8v1.4h0c-.7 9.8-19.2 7-29.9 6.4H83c.7-3.5 1.4-6.8 1.9-9.9 10.9.8 27.5 2.8 28.1-6.6h0z" class="cls-5"/><path d="M110.5 175.6c-.8 4-1.8 8-3 12.2-.3 1-.6 2-.9 3.1-1.1 2.5-4.2 4.6-9.1 6.1-4 1.2-9.3 2.1-15.7 2.3-1.8 0-3.8-.2-5-1.5-.7-.7-.6-3.9-.1-7.8h.5c.7-2.3 5.7-11.1 7.2-9.3.8.9 4 5.1 5.2 4.9.5 0 .9-.5 1.2-.9 2.4-2.8 4.8-5.6 7.3-8.4 1.9 1.6 7.1 5.9 7.9 5.9 1.4 0 3.3-5.6 4.6-6.6Z" class="cls-3"/><path d="M98.2 200.1c0 1.6-11.5 5.3-17.4 6.4-1 .2-2 .5-2.9.2-1.4-.5-2.2-2-2.3-3.5 0-1.5.7-3.9 1.2-5.3 1.3 1.3 3.2 1.6 5 1.5 6.4-.3 11.7-1.1 15.7-2.3.6.7.7 2.2.7 3.1ZM141 185c.1 3.4-16.2 7.7-17.2 7.3-1.2-.5-1.6-3.2-1.8-4.2.9-.3 1.8-.7 2.6-1.2 2-1.2 6.8-2.9 8-5.1 5.9 0 8.3 2.8 8.4 3.3Z" style="stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;fill:#dad1da"/><path d="M104.5 77.7s-.1.2-.2.3" class="cls-8"/><path d="M121.4 108.5c-1.7.9-3.3 2.2-4.5 3.6-.5.5-.9 1.2-1 1.9-.2-.2-.4-.3-.4-.3-.9-1-1.5-2.3-1.9-3.7-.3-1.3-.5-2.7-.5-4.1 0-1.3 0-2.6.2-3.9.3-2.5.9-5 1.6-7.3.2-.7.4-1.3.6-1.9.5-1.7 1.1-3.1 1.6-4.3 1.1-3.6 1.2-7.4.3-11.7-.5-2.3-1.2-4.7-2.2-7.3v-.2c7.4 4.1 3.1 33 3.6 36.6.7.6 1.6 1.5 2.6 2.7Z" class="cls-1"/><path d="M130.7 121.3c-.2 1-1.8 2.2-2.9 3.8-3-3.1-6.5-6.1-8.9-8.3-.2-.2-.4-.4-.6-.5-1.1-1-2-1.8-2.4-2.3.1-.7.6-1.3 1-1.9q1.95-2.25 4.5-3.6c3.3 3.8 7.8 9.8 9.2 12.1.1.2.2.5 0 .8ZM98 125.1c-2.3.9-4.1-.8-5.9-2.4-.9-.8-.1-2.2-.3-3.4-.4-1.8-1.2-3.4-2.5-4.7-.6-.7-1.3-1.2-2.1-1.6 1.4-1.1 3-3.3 4.2-5.2h.3c1 1.5 2 2.9 3.1 4.3 1 1.3 2.1 2.5 3.2 3.6 2.3.2 3.8 2 4.4 4.3.6 2.4-2 4.2-4.3 5.1Z" class="cls-4"/><path d="M87.2 113s0 0 0 0" class="cls-8"/><path d="M131.5 129.2c-.2-.3-.5-.6-.7-.8-.9-1.1-1.9-2.2-3-3.2h0c1.2-1.6 2.7-2.8 2.9-3.8h0c.9-.9 3.5 2 3.8 3.2.5 3-.2 3.5-3 4.7Z" class="cls-4"/><path d="M104.3 78c-1 1.3-2.7 3.8-4.5 6.7-.2-3.9-.3-7.8-.5-11.6-1.5.6-7.5 3.2-8.6 5.4l-.4-.2s0 0 0 0c.6-1.1 1.3-2.4 2.4-4.2 1.4-2.1 3.3-5.6 5.8-6.7l.2.4c2.3 0 4.7 1.3 5.8 3.4 1.2 2.1 1.1 4.9-.2 6.9Z" class="cls-3"/><path d="M99.8 84.7c-1.8 2.8-3.7 5.9-5.3 8.7-.4.7-.8 1.3-1.1 1.9-1.9 3.2-3.3 5.5-3.3 5.5.5 1.1 1.2 1.9 1.8 2.6s1 1.3.8 1.9c-.3.6-.7 1.5-1.3 2.5-1.1 1.9-2.7 4.1-4.2 5.2-.5.4-.9.6-1.3.7-7.1-8-6.9-13.5-5.2-16.4 1.5-2.4 3.1-6.7 5.5-10.1l.3-.8c2.1-4 2.6-5.7 3.8-8.2l.4.2c-.1.3-.2.6-.2.9.2 1.1 3.7 2 4.6 2.5.7.4 4.4 2.1 4.7 2.9" class="cls-1"/><path d="M117.1 88.5c-.5 1.2-1.1 2.6-1.6 4.3-.6-4.6-2.2-9.1-4.7-13.1-3.1 5.1-6.3 10.2-9.6 15.2v.4c-2.1-.3-4.1-.8-6.7-2 1.7-2.8 3.6-5.9 5.3-8.7q0 0 0 0h0c1.8-3 3.5-5.5 4.5-6.8h0c1.3-2.1 1.4-4.8.2-6.9-1.2-2-3.5-3.4-5.8-3.4l-.2-.4c.1 0 .2 0 .3-.1 1.1-.7 1.7-1.2 2.2-1.7 4.2.6 7.7 3.5 10.9 6.2 1 .8 2 1.7 3 2.5h0c1.3 1.8 2.1 3 2.2 2.6h.3c.9 4.2.8 8-.3 11.6Z" class="cls-1"/><path d="M124.4 45.4c-.6.4-1-.2-1.9-.3-1.2-.2-2.4.4-3.5 0 2.1-1.4 2.2-1.9 4.3-1.4-.4 0 0 0 .3.2h0s0 0 0 0c.4.2.7.4.9.7.3.3.3.7 0 1Zm.2-8v.2c-1.4.7-2.4 0-4.1.6-2 .8-3.6.8-5.6 4.9-.5.9-2.3 5.9-4.1 5.3-.7-.2-2-1.6-2.2-2.3-1.3-1-3.3-.4-4.2 1.2-.9 1.5-.6 3.7.4 5.1.3.4.6.8 1 1.1h0c-.9 2.6-1.1 6.1-2.5 8-.8.5-7.2 1.6-8.4-2-1.2-3.4.5-12.2.7-15.8s2.2-8.2 5.1-10.4c4.1-3.1 11.2-4.2 16.1-2.8 3.6 1.1 8.6 2.6 7.8 6.8Z" style="stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;fill:#322b2c"/><path d="M110.4 57.9c1.5 2.6 3.4 3.8 5.3 4.7" class="cls-9"/><path d="M108.9 54.8c-1.1-.1-2.2-.6-3.2-1.4m17.9-9.7s0 0 0 0m.6 11.8c-.3 0-.5 0-.8-.2" class="cls-8"/><path d="M122.3 49.1c0 1.1-.3 2-.6 1.9-.3 0-.5-.9-.4-2 0-1.1.3-2 .6-1.9.3 0 .5.9.4 2" style="stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px"/><path d="m123.6 57.5-.6 1.8c-.1.2-1.5 1.2-3.9-3 1.3.7 3.1 1.2 4.5 1.2" class="cls-8"/><path d="M108.4 48.1c-.8-.3-1.8 0-2.4.6s-.7 1.6-.4 2.4" class="cls-9"/><path d="M106 48.9c.9.6 1.6 1.4 2.1 2.3m7.7 62.8s0 0 0 0m0 .8v-.7" class="cls-8"/><path d="M113.1 142.2c-.5 9.4-17.2 7.3-28.1 6.6.5-2.5.8-4.9 1.2-7.1h.7c1-2 2.9-3.6 5.1-4.3 2.2-.8 4.7-.6 6.8.4 1.3.6 2.6 1.6 4 1.3 1.6-.4 2.4-2.2 3.7-3.2 1.5-1.2 3.8-1 5.2.3.2.2.5.5.6.8v-.2c.5 1.9.8 3.5.8 4.1h0v1.4Zm-.1 10.1q0 2.85-.3 5.7c0 1.4-.2 2.9-.3 4.3-1.8 3.4-3.5 6.9-5.3 10.3-2-1.8-3.9-3.6-5.9-5.4-.5-.4-1-.9-1.6-.9-1 0-1.7.7-2.3 1.5-2.1 2.6-4.3 5.2-6.4 7.8-1.5-2.4-2.9-4.8-4.4-7.1-3.3 2.1-4.9 4-7.3 7.1.5-2.4.9-4.2 1.1-5.2q1.5-6.15 2.7-11.7h.1c10.7.6 29.1 3.5 29.9-6.3Z" class="cls-1"/><path d="M112.4 162.2c-.2 2.4-.5 4.7-.8 7-.3 2.1-.6 4.2-1.1 6.3q0 0 0 0h0c-1.3 1-3.2 6.6-4.6 6.6-.8 0-6-4.3-7.9-5.9-2.4 2.8-4.8 5.6-7.3 8.4-.3.4-.7.8-1.2.9-1.2.2-4.4-4-5.2-4.9-1.6-1.9-6.5 7-7.2 9.3h-.5c.6-4.7 1.7-10.4 2.5-14.6 2.3-3.2 4-5 7.3-7.1 1.5 2.4 2.9 4.8 4.4 7.1 2.1-2.6 4.3-5.2 6.4-7.8.6-.7 1.4-1.5 2.3-1.5.6 0 1.2.5 1.6.9 2 1.8 3.9 3.6 5.9 5.4 1.8-3.4 3.5-6.9 5.3-10.3Z" class="cls-2"/><path d="M115 74.2c-1-.8-2-1.7-3-2.5-3.2-2.8-6.8-5.6-10.9-6.2 1-1.1 1-2 2.3-4 3.3.4 8.7 8.4 11.6 12.7" class="cls-1"/><path d="M115.5 92.8c-.2.6-.4 1.2-.6 1.9-2.9 2.1-6.1 1.5-9.7 1.1-1.4-.2-2.8-.3-4.1-.5v-.4c3.4-5 6.6-10.1 9.7-15.2 2.5 4 4.1 8.4 4.7 13.1" class="cls-2"/><path d="M114.9 94.7c-.7 2.3-1.2 4.8-1.6 7.3h-.1c-6.7 1.8-14.1 1.2-20.4-1.6h-.3l.9-5.1h0c.4-.6.8-1.3 1.1-1.9 2.6 1.2 4.7 1.7 6.7 2 1.3.2 2.7.3 4.1.5 3.6.4 6.8 1 9.7-1.1Z" class="cls-5"/><path d="M113.3 102c-.2 1.3-.3 2.6-.2 3.9h0c-6.2 2.5-14 1.2-20.4-.5.2-.6-.2-1.2-.8-1.9.2-.9.4-2.2.6-3.1h.3c6.4 2.9 13.7 3.4 20.4 1.6z" class="cls-1"/><path d="M93.4 95.3c-.3 1.7-.6 3.4-.9 5-.2.9-.4 2.2-.6 3.1-.6-.7-1.3-1.5-1.8-2.6 0 0 1.4-2.3 3.3-5.5" class="cls-8"/><path d="M113.6 109.9c-5.6 2.3-12.7 2.4-18.8 2.2-1.1-1.4-2.2-2.8-3.1-4.2h-.3c.6-1.1 1.1-2 1.3-2.6 6.5 1.7 14.2 3 20.4.5h0c0 1.5.2 2.9.5 4.1" class="cls-5"/><path d="M115.6 93.3v-.5" class="cls-8"/><path d="M99.8 84.7s0 0 0 0c-.3-.8-4-2.5-4.7-2.9-.9-.5-4.4-1.4-4.6-2.5 0-.3 0-.6.2-.9 1.1-2.2 7.1-4.8 8.6-5.4.2 3.9.3 7.8.5 11.6Z" class="cls-5"/><path d="M99.8 84.7q0 0 0 0t0 0m-1.2-17h-.2m14.1 94.4s0 0 0 0m.5-9.9v.1m21.9-17.9v.5m-24.4-4.2c-.3-.2-.6-.5-.9-.7m1.4 1.1h-.3m11.4-11.3-.2-.2" class="cls-8"/><path d="M121.8 119.6c-1.1-.7-2.5-.7-3.6 0-1.1.8-1.6 2.3-1.2 3.6.2.5.4 1 .3 1.4s-.6.7-1 .8h-1.4c-1.6 0-3.1.6-4.3 1.6-.4.3-.7.8-.9 1.2-.1.3-.2.6-.2 1v.6c-1-.8-2-1.4-3.1-1.8-1.5-.5-3.3-.4-4.4.8-.7.6-1.1 1.6-2 1.9-1.1.3-2.1-.5-3.1-1.1-3-1.8-7.4-.6-9.1 2.5h-.3c1.5-11.1 1.7-17.6 1.7-17.6 1.3 1.3 2.2 2.9 2.5 4.7.2 1.2-.6 2.6.3 3.4 1.8 1.6 3.6 3.3 5.9 2.4s4.9-2.7 4.3-5.1-2.1-4.1-4.4-4.3c-1.1-1.1-2.2-2.3-3.2-3.6 6.1.2 13.2 0 18.8-2.2.4 1.4 1 2.7 1.9 3.7l.4.4h0c.5.5 1.4 1.3 2.4 2.2.2.2.4.3.6.5.9.9 2 1.9 3 2.8Z" class="cls-1"/><path d="M130.8 128.4c-1.7-.6-3.4-1.2-5.2-1-1.9.2-3.8 1.4-4 3.3-.1.8 0 1.6-.2 2.2-.5 1.2-2.2 1.4-3.4 1.1-1.3-.3-2.5-.9-3.8-.7-1 .2-1.8.9-2.2 1.8-.4-1.3-.8-2.7-1.2-4.1h0c-.3-.9-.6-1.8-.9-2.6.2-.4.6-.9.9-1.2 1.2-1.1 2.7-1.6 4.3-1.6h1.4c.5 0 .9-.4 1-.8.1-.5-.1-1-.3-1.4-.4-1.3 0-2.8 1.2-3.6 1-.7 2.5-.7 3.6 0q0 0 0 0c3 2.8 5.9 5.5 5.9 5.5 1.1 1.1 2.1 2.2 3 3.2Z" class="cls-3"/><path d="M107.3 123.7c.7.4 1.6 2.3 2.4 4.8" class="cls-9"/></g></svg>')}`;
export default image;