/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><defs><style>.cls-3{stroke-miterlimit:10}.cls-4{fill:#cb9686}.cls-10,.cls-4,.cls-5,.cls-6{stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px}.cls-10,.cls-3,.cls-4,.cls-5,.cls-6{stroke:#000}.cls-5{fill:#423b38}.cls-6{fill:#1d273d}.cls-10,.cls-3{fill:none}.cls-11{stroke-width:0}</style></defs><g id="Grid"><path d="M29.3 29.3h241.5v241.5H29.3zm0 229.3h241.4m-241.4-12h241.4M29.3 234.5h241.4m-241.4-12h241.4M29.3 210.4h241.4M29.3 198.3h241.4M29.3 186.2h241.4m-241.4-12h241.4M29.3 162.1h241.4M29.3 150h241.4M29.3 137.9h241.4M29.3 125.8h241.4m-241.4-12h241.4M29.3 101.7h241.4M29.3 89.6h241.4M29.3 77.5h241.4m-241.4-12h241.4M29.3 53.4h241.4m-241.4-12h241.4m-12.1-12.1v241.4m-12-241.4v241.4M234.5 29.3v241.4m-12-241.4v241.4M210.4 29.3v241.4M198.3 29.3v241.4M186.2 29.3v241.4m-12-241.4v241.4M162.1 29.3v241.4M150 29.3v241.4M137.9 29.3v241.4M125.8 29.3v241.4m-12-241.4v241.4M101.7 29.3v241.4M89.6 29.3v241.4M77.5 29.3v241.4m-12-241.4v241.4M53.4 29.3v241.4m-12-241.4v241.4" style="stroke:#58595b;stroke-width:.2px;fill:#fff;stroke-miterlimit:10"/><path d="M23.9 150h252.2" class="cls-3"/><path d="m24.7 152.5-4.3-2.5 4.3-2.5zm250.6 0 4.3-2.5-4.3-2.5z" class="cls-11"/><path d="M150 23.9v252.2" class="cls-3"/><path d="m147.5 24.7 2.5-4.3 2.5 4.3zm0 250.6 2.5 4.3 2.5-4.3z" class="cls-11"/></g><path id="Lines" d="m259.5 87.6 6.3-15.9-16.8 3.1 3.7 4.5-208.5 172-3.7-4.5-6.3 15.9 16.8-3.1-3.7-4.6L255.8 83z" style="stroke-width:0;fill:#27b04b"/><g id="Oceania"><path d="M136.9 158.7s-1.2.4-3.2.9h-.2c-2.1.4-5 .8-8.2.9h-.5c-2-5.6-1.5-11.6 1.9-24.4v-.2c-7.9 2.6-17.3 5.1-24.9 6.4-5.4 24.4-13.1 57-13.9 55.2-.5.3-1 .5-1.5.7-.6.2-1.2.4-1.8.5-3.2.5-6.4-.4-9.1-1.8-.4-.2-.7-.4-1.1-.6-3.8-2 .4-10.2 4.3-24.2 4.1-14.8-.3-24.4 1.9-38.7 0-.2.2-4 .7-7.6 8.3-1 18.2-2.3 24.1 1.6 1-1.6 1.5-3 1.9-4.1l.4.2c5.5-1.8 16.5-2.8 24.2-2.4 4.3.2 7.7.8 8.4 2 0 13.5-3.9 20.5-3.5 35.7Z" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;stroke:#000;fill:#003580"/><path d="M102.6 138.4c-.3 1.3-.6 2.6-.9 4m0-.1h-.3m30.9-8.4c-1.8.7-3.7 1.3-5.7 2" class="cls-10"/><path d="M134.6 51c-.2-.4-.4-.9-.7-1.3h0c-2.4-.8-7.7-1.3-9.2 3.2-.1.3-.4 1-.8 1.7.3.4.4 1.1.2 1.6s-.8 1.2-1.3 1c-.2.6-.4 1.1-.9 1.6-.4.4-1.1.7-1.6.4-.4-.2-.6-.6-.5-1-.4.5-1.1.7-1.6.4-.7-.3-1-1.2-.7-1.8h0l-.1-.1c-.4 0-.9-.2-1.1-.6v-.2c-.3-.1-.6-.2-.8 0-.8.4-1.3 1.2-1.7 2-.4.9-.8 1.9-.8 2.8s.3 2 1.1 2.7h-.1c-1.3.8-2.8 1.1-4.2 1.2h-.2v.3c-.8 1.4 1 6.6 1.8 7.8 2.1 3 3.4 7.8 3.3 11.8h.1c3.1 10.7 6.3 6.3 5.9 2h0c-.5-2.3-1.4-5-1.9-9.4-.5-1.7 1.8-2.3 1.8-2.3l.4-.2c2.8 2.7 4.9 3 5.6 3.1 1.8.2 1.4-1.2 2-2.3.5-1 2-2.3 2-2.5 0-.3-.1-.4-.3-.4h-.5c-2.1-.5-1.7-1.9-1.8-3.6.3.2 2 1.1 3.8 1.9.1 0 .2 0 .4.2.3-.7.2-1.2.8-2.6.9 0 1.8-.4 1.8-1.4 0-1.7-1.4-4.3-.7-7.8.2-.5.4-1.3.5-1.7h-2.3c-.4 0-.9.2-.8-.2.3-.8 2-1.2 2.9-1.3.3 0 .6 0 .7.1.1-2 .2-3.4-.4-4.8Zm-2.3 7.7c.4 0 .6.9.5 1.8-.2.9-.6 1.6-1.1 1.6-.4 0-.6-.9-.5-1.8s.6-1.6 1.1-1.6" class="cls-4"/><path d="M120.8 93c-.2 1.2-1.1 2.9-2.2 4.9-2.3 4.2-5.7 9.3-7.2 12.2-3.5 7.1-2.8 9.4-4 13.2-.4 1.2-.9 2.5-1.9 4.1-5.9-3.9-15.9-2.5-24.1-1.6.2-1.3.5-2.6.7-3.7 1.2 1.1 2.5 1.8 4.1 1.7 2.7-.3 4.9-1.4 5.2-4.1.2-2.4-1.5-5.6-3.7-6.7h0c7.2-10 7.9-20.7 9.2-23.7h0c1.1-.4 2.1-.8 2.9-1.1 2.1-.8 9.2-3.7 10.2-4.4h1.1c-.2 1.5-.4 3-.5 4.3-.2 4.3-2.2 8.2-2.2 12.3 0 2.2-.6 4.3 1.5 4.8 3.7 1.5 3.7-12.5 4.7-19.4 0-.4.1-.9.1-1.4h.1c3.1 10.7 6.3 6.3 5.9 2 .5 2.1.7 4 .2 6.7Z" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;stroke:#000;fill:#e9f3f6"/><path d="M132 120.6v.5c-7.8-.4-18.8.6-24.2 2.4l-.4-.2c1.2-3.7.5-6 4-13.2 1.4-2.9 4.8-8 7.2-12.2h.1c-1.9 7.8-.7 7.9-2.3 15.8 2.6 2.2 12.5 5.6 15.7 6.8Zm-46.4 91.9c.4 2-.5 4.1-1.9 5.5-1.5 1.4-3.5 2.1-5.5 2.4-2.2.3-4.5.1-6.6-.5h-.2c0-2.7 1.5-6.3 2.1-7.8 2.1-5 .7-10.7 1.8-15 2.7 1.4 5.9 2.4 9.1 1.8l2-.6c-1.7 3.4-4.7 10.7-4.6 14.5 1.2-.3 2.5-.5 3.7-.6v.3Z" class="cls-4"/><path d="M75.4 196.8v.1" class="cls-10"/><path d="M94.3 212.4c-.5.6-1 1.2-1.7 1.6s-1.6.6-2.3.2-1.2-1.6-.8-2.3h0c1.2-.2 2.2-.4 2.8-.8 1.3-.9 1.9-.1 1.9 1.3Z" class="cls-4"/><path d="M94.3 212.4c0 1.3-.8 3.2-2.2 4.6-2.2 2.3-7.1 4-9.6 4.7-5.1 1.3-7.7 1.5-9.4 1.1-1.3-.3-1.7-1.5-1.6-3h.2c2.1.7 4.4.9 6.6.5 2-.3 4-1 5.5-2.4s2.3-3.5 1.9-5.5v-.3c1.4-.1 2.8-.2 4-.3h0c-.5.7 0 2 .8 2.4.7.4 1.6.2 2.3-.2s1.2-1 1.7-1.6Z" class="cls-6"/><path d="M120.6 86.4v-.2" class="cls-10"/><path d="M135 50.9h-.4c-.2-.3-.4-.7-.7-1.2h0c-2.4-.8-7.7-1.3-9.2 3.2-.1.3-.4 1-.8 1.7 0 0 0-.1-.1-.2-.4-.4-1-.4-1.6-.5 0-.5.4-.8.2-1.4-.5-1.7-3.1-1.2-3.3 0 0 0-1.5-.7-2.1.3-.8 1.2 0 2 .2 1.9-.4.2-1.1.7-1.1 1.2-.3-.1-.6-.2-.8 0-.8.4-1.3 1.2-1.7 2-.4.9-.8 1.9-.8 2.8s.3 2 1.1 2.7h-.1c-1.3.8-2.8 1.1-4.2 1.2h-.2c-.7 0-1.5 0-2.2-.2h0c-.5-.2-.9-.6-1.3-.9-4.3-4.1-3.3-14.3-.2-18.6 3.4-4.8 11.8-6.7 17.6-5.7 3 .5 11.6 4.8 11.6 11.8Z" class="cls-5"/><path d="M135 55.9v.1m-.5 1.3" class="cls-10"/><path d="M131.7 70.5c-.2.5-1.1 1-1.5 1.8h-.5c-2.1-.5-1.7-1.9-1.8-3.6.3.2 2 1.1 3.8 1.9Z" style="fill:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;stroke:#000"/><path d="M111 84h-1.1c-1 .7-8.1 3.6-10.2 4.4-.8.3-1.8.6-2.9 1-4.2 1.4-10 3.2-13.1 4.2 1.2 5.4 1.5 14 3.2 19.3.2 0 .5.2.7.3 2.2 1.1 3.9 4.2 3.7 6.7-.2 2.7-2.5 3.8-5.2 4.1-1.6.2-2.9-.6-4.1-1.7s-1-5-.5-6.5c-2.6-8.9-5.8-11.9-7.7-18.3-2.4-8.4 1.4-9 4.2-11.5 11.4-5.9 14.8-6.8 22.5-10.5 3.2-1.7 4.3-1 6.6-1.6 1.1.5 2.3.7 3 1.7 1.4 2.3 1.2 5.4.8 8.5Z" class="cls-4"/><path d="M107.2 73.8s0 0 0 0" class="cls-10"/><path d="M138.8 172.6c-.2.3-.5.5-.8.8-3.6 2.6-7.5 4.7-11.6 6.2h0c-.9-2.9-.4-8.1.3-8.8-.6-3.1-.8-6.7-1.4-9.8v-.4c3.3 0 6.2-.5 8.2-.9v.6c-.8 2.4-.8 6 1.1 7.7.8.7 1.9.8 3 .6v.5c.5.5 1 1 1.3 1.6s.3 1.4 0 1.9Zm6.9-4.6v.4c-.3.5-1 .8-1.5.9q-.9 0-1.8-.6c-.5-.4-1.2-1-1.8-1.3 3.1-1.4 5.8-3.3 5.1.6" class="cls-4"/><path d="M145.6 168.4c-.8 3.8-4.5 5.8-8.8 8.7-2.1 1.5-5.5 3-8.1 4.2-1.2.5-1.9-.3-2.4-1.7h0c4.1-1.6 8.1-3.7 11.6-6.3.3-.2.6-.4.8-.8.4-.6.3-1.3 0-1.9s-.8-1.1-1.2-1.6v-.5c.9-.2 1.9-.6 2.9-1.1.6.3 1.2.9 1.8 1.3.5.4 1.1.7 1.8.6.5 0 1.2-.4 1.5-.9Z" class="cls-6"/><path d="M133.8 159.8c0 .1-.1.3-.2.4m-16.8-96.6c-.8.6-2 .5-2.8-.2m18.8 4.7c-.4 0-.8-.2-1.2-.4m-10.7 6.7c-.8-.8-1.6-1.7-2.5-2.9" class="cls-10"/><path d="M132.8 60.5c-.2.9-.6 1.6-1.1 1.6-.4 0-.6-.9-.5-1.8s.6-1.6 1.1-1.6c.4 0 .6.9.5 1.8" class="cls-11"/><path d="M135.1 56.5c0 .2-.1.3-.2.5 0 0 0 .2-.2.2h-2.5c-.4 0-.9.2-.8-.2.3-.8 2-1.2 2.9-1.3.3 0 .6 0 .7.1q0 0 0 0c.1.1 0 .3 0 .5Z" class="cls-5"/><path d="m109.7 64.7-.2.2" class="cls-10"/><path d="M114.6 84.4c0 .5 0 1-.1 1.4-.9 6.9-.9 20.9-4.7 19.4-2.1-.4-1.4-2.6-1.5-4.8 0-4 1.9-7.9 2.2-12.3 0-1.3.3-2.8.5-4.2.4-3 .6-6.2-.8-8.5-.6-1-1.9-1.2-3-1.7-.6-.3-1.2-.6-1.5-1.2-.9-2-1.5-6.5.2-9h0c.4.3.8.6 1.3.9h0c.7.1 1.4.2 2.2.2v.3c-.8 1.4 1 6.6 1.8 7.8 2.1 3 3.4 7.8 3.3 11.8Z" class="cls-5"/><path d="M94.4 212.3s0 0 0 0m51.3-44.3v.4" class="cls-10"/><path d="M124.1 56.2c-.2.5-.8 1.2-1.3 1-.2.6-.4 1.1-.9 1.6-.4.4-1.1.7-1.6.4-.4-.2-.6-1.1-.5-1.5-.4.5-1.1 1.1-1.6.9-.7-.3-1-1.2-.7-1.8h0l.4-.4-.5.3c-.4 0-.9-.2-1.1-.6v-.2c0-.5.6-1 1.1-1.2-.3.1-1-.7-.2-1.9.6-1 2.1-.3 2.1-.3.2-1.2 2.7-1.7 3.3 0 .2.7-.1.9-.2 1.4.6 0 1.2 0 1.6.5 0 0 0 .1.1.2.3.4.4 1.1.2 1.6Z" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;stroke:#000;fill:#ea1e79"/></g></svg>')}`;
export default image;