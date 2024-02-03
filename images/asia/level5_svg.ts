/* eslint-disable */
import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><defs><style>.cls-2{fill:#fff}.cls-3{stroke-miterlimit:10}.cls-4{fill:#433232}.cls-2,.cls-4,.cls-5,.cls-6,.cls-7{stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px}.cls-5{fill:#c19a8e}.cls-6{fill:#eaeaeb}.cls-3,.cls-7{fill:none}.cls-3{stroke:#000}.cls-9{stroke-width:0}</style></defs><g id="Grid"><path d="M29.3 29.3h241.5v241.5H29.3zm0 229.3h241.4m-241.4-12h241.4M29.3 234.5h241.4m-241.4-12h241.4M29.3 210.4h241.4M29.3 198.3h241.4M29.3 186.2h241.4m-241.4-12h241.4M29.3 162.1h241.4M29.3 150h241.4M29.3 137.9h241.4M29.3 125.8h241.4m-241.4-12h241.4M29.3 101.7h241.4M29.3 89.6h241.4M29.3 77.5h241.4m-241.4-12h241.4M29.3 53.4h241.4m-241.4-12h241.4m-12.1-12.1v241.4m-12-241.4v241.4M234.5 29.3v241.4m-12-241.4v241.4M210.4 29.3v241.4M198.3 29.3v241.4M186.2 29.3v241.4m-12-241.4v241.4M162.1 29.3v241.4M150 29.3v241.4M137.9 29.3v241.4M125.8 29.3v241.4m-12-241.4v241.4M101.7 29.3v241.4M89.6 29.3v241.4M77.5 29.3v241.4m-12-241.4v241.4M53.4 29.3v241.4m-12-241.4v241.4" style="stroke:#58595b;stroke-width:.2px;fill:#fff;stroke-miterlimit:10"/><path d="M23.9 150h252.2" class="cls-3"/><path d="m24.7 152.5-4.3-2.5 4.3-2.5zm250.6 0 4.3-2.5-4.3-2.5z" class="cls-9"/><path d="M150 23.9v252.2" class="cls-3"/><path d="m147.5 24.7 2.5-4.3 2.5 4.3zm0 250.6 2.5 4.3 2.5-4.3z" class="cls-9"/></g><path id="Lines" d="m192.2 25.7 5.5 2.2-2.1-17-13.3 10.7 5.4 2.3L86.1 274.3l-5.4-2.2 2 17L96 278.4l-5.4-2.3z" style="stroke-width:0;fill:#27b04b"/><g id="Asia"><path d="M141.7 150c-.3 1.8-.8 3.7-2 5.2s-3.5 1-5.4.3c-.4-.1-.9-.5-1.4-.9-2.3-1.9-5.4-5.9-5.4-5.9-3.5-2.3-9-7.7-12-10.1-7.2-7.6-10.6-11.2-12.1-17.1h0s0 0 0 0c0-.3-.2-.7-.2-1l-.2-.3c3.2-1.6 7-2.2 10.5-1.5h0c.7 1.6 3.5 6.3 6 11.2.3.7.7 1.4 1 2.1 2.4 4.2 7.4 9 11.3 12 1.8.9 1.4-.5 3.4-.6 2 0 4.4-.7 5.8.7 1.4 1.5 1.3 3.8.9 5.8Zm33.6-82.6c-.2 2-4.1 2.2-6.2 2.9-4.9 3.6-6.8 6.2-10 8-7.3 6.3-12.7 7.6-16.1 9.8 0-3.3-1.2-7.4-3.3-8.8 7.3-2.3 12-3.6 17.1-6.8 4.8-2.5 3.6-1.9 8.4-5 1.8-2.2.3-3.6 2.5-5.5 1.2-1 5.5-1.1 6.8.5.8 1 1 3.6.8 4.8Z" class="cls-5"/><path d="M103.3 121.5h-.1 0" class="cls-7"/><path d="M147.7 124c-1.2 5.1-5.4 14.3-6.7 19.7 0 .2 0 .4-.1.5-1.3-1.4-3.7-.8-5.8-.7-2.1 0-1.6 1.4-3.4.6-3.9-3-8.9-7.8-11.3-12-.3-.7-.7-1.4-1-2.1-2.4-4.9-5.2-9.6-6-11.1h0c-3.5-.8-7.3-.2-10.5 1.4l-.6.3c-.3-1.6.9-9.4 3.2-16.9.8-2.6 1.7-5.1 2.7-7.4 1.9-6.1 3.5-8.6 4.9-10.2 0-.4.5-.7 1.2-.8 2.2-.6 7 0 9.2 2.4.8.6 1.9.8 2.8.5 1-.2 1.8-.6 2.3-1.5v-.1h0c1.8 3.2 2.8 5.9 3.2 8.2 1.4 8.5-5 13.4-8.2 28.5h.2c1.8-2.8 16.3-13.2 19.8-13.1 1.7 0 4.3 3 5.3 4.2.8 1 0 6.5-1 9.5Z" class="cls-6"/><path d="M114.6 119c1.2-3.7 4.8-13.5 5.8-20.3" class="cls-7"/><path d="M132.8 154.6c-2 2.2-4.8 5.2-5.7 8.2h0c0 .3-.1.5-.2.8-.6 3.2-2.3 7.7-3.4 10.8-.4.4-.8.7-1.3 1-4 2.9-9.4 4-14.2 2.8 1.3-3.1 2.4-6.4 3-10.2-1.7-7.3-5.9-10.9-8.4-18-2.6-7.1-3.2-11.2-1-21.4q0 0 0 0c0-.3 1.6-6.8 1.6-7.1 1.6 5.9 5 9.5 12.1 17.1 3 2.4 8.5 7.8 12 10.1 0 0 3.2 4 5.4 5.9Z" class="cls-6"/><path d="M122.3 175.4c-5.2 14.7-8 15.4-13.9 27.7-4.6-.2-3.7-.5-6.8-3.3.4-.7.7-1.3 1-1.9q0 0 0 0c3.7-7.5 2.3-12.7 4.9-18.6.2-.4.3-.7.5-1.1 4.8 1.2 10.2 0 14.2-2.8Z" class="cls-5"/><path d="M101.6 199.8c-.1.2-.2.3-.3.5" class="cls-7"/><path d="M110.2 214.7c0 1.8-1.2 2.1-3 2.7-1.4.5-2.9 0-4.3-.5-1.2-.5-5-4.5-5.2-6.1-.4-4.1.7-7.4 3.6-11.3.1 0 .2.2.3.3 3.1 2.8 2.2 3.1 6.8 3.3-.9 1.5 1.8 9.9 1.8 11.7Z" class="cls-2"/><path d="M102.6 197.9c-.5.6-.9 1.1-1.3 1.7" class="cls-7"/><path d="M143 88.2v1c-2.3 1.5-5.1 2.7-11.4 5.5-.4-2.4-1.4-5-3.2-8.2h0c-.3-1.2-.6-2.3-.8-3.4h.2c6-2.4 10.1-2.7 11.9-3.7 2.1 1.4 3.3 5.5 3.3 8.8" class="cls-6"/><path d="M114.1 85.2v.1" class="cls-7"/><path d="M130.5 63.5c-.5-.8-1.2-1.5-2-2.3-.7-.8-1.4-1.8-1.8-2.9-.4-1.2-.7-1.7-1.5-2.7 0 .1-.3.3-.7.7l-1.4 1.4c-.4.3-1 0-1.1-.5 0-.6 2.4-1.7 2.8-1.7h.3c-.1-.2-.3-.3-.4-.5-2.7-2.9-15.6-7.6-13.4 11.7 0 .6 0 1.6-.5 2.1-.4.5-1.1.7-1.6.4-.6-.3-1.4 0-1.9.3-.5.4-.7 1.1-.6 1.7s.3 1.2.7 1.8c.6.9 2.7 2.4 3.7 2.6h1.1v.2c1.5 2 2.3 6.9 2.1 9.5 2.2-.6 7 0 9.2 2.4.8.6 1.9.8 2.8.5 1-.2 1.8-.6 2.3-1.5v-.1c-.3-1.2-.6-2.3-.8-3.4s-.4-2.3-.4-4l-1.4-.5c.7 0 1.3 0 1.7-.1 1.9-.4 3.7 0 4.7-3.2 1-3 0-9.2-1.6-11.9Zm-16-.6c-.5-.4 2-2.9 2.6-3.5.7-.5 2.2-1.1 1.9.3 0 .5-.8.8-1.2 1s-3.3 2.1-3.3 2.1Zm5.9 2.9c-.3.2-1-.2-1.4-1-.4-.7-.5-1.5-.2-1.7s.9.2 1.4 1c.4.7.5 1.5.2 1.7m5-6.6c.3-.2.9.3 1.3 1s.6 1.5.3 1.6c-.3.2-.9-.3-1.3-1s-.6-1.5-.3-1.7Zm3.4 14c-1.8 1.2-4.7-.6-4.8-1.1 1.6-.4 5.3-2.5 6.4-3.4.6.9.6 3.1-1.6 4.5" class="cls-5"/><path d="M118.4 78c1.2.3 4.9.6 7.3.6" class="cls-7"/><path d="m129.2 61-.7.2c-.7-.8-1.4-1.8-1.8-2.9-.4-1.2-.7-1.7-1.5-2.7 0 0 0-.1-.1-.1h0c-.1-.2-.3-.3-.4-.5-2.7-2.9-15.6-7.6-13.4 11.7 0 .6 0 1.6-.5 2.1-.4.5-1.1.7-1.6.4-.6-.3-1.4 0-1.9.3-.5.4-.7 1.1-.6 1.7s.3 1.2.7 1.8c.6.9 2.7 2.4 3.7 2.6h1.1v.2c1.5 2 2.3 6.9 2.1 9.5-.7.2-1.1.5-1.2.8-1.3 1.6-3 4.1-4.9 10.2-1 2.2-1.9 4.8-2.7 7.4-4.2-.2-3.9-21.2-4.8-25.9-1.6-8.9-1.8-15.1-.6-17.6 1.4-2.9 4.2-6.4 6.5-8.8 3.5-3.7 9.3-4.3 13.9-1.9 4.5 2.3 7.5 6.8 8.8 11.6Z" class="cls-4"/><path d="M129.3 61.4c0-.1 0-.3-.1-.4" class="cls-7"/><path d="M130 170c-.7 2.1-3.3 2.1-5.5 2.9v.3h.4c-.4.4-.8.9-1.3 1.2 1.1-3.1 2.8-7.6 3.4-10.8 0-.2.1-.5.2-.8h.3c1.4 1.9 3.2 5 2.5 7.1Z" class="cls-2"/><path d="M125.9 63.8c1.1 1.4 2.5 1.8 2.7 2.1.9 1.5-2.1 3.1-2.7 3" class="cls-7"/><path d="M120.4 65.8c-.3.2-1-.2-1.4-1-.4-.7-.5-1.5-.2-1.7s.9.2 1.4 1c.4.7.5 1.5.2 1.7m6.6-4c-.3.2-.9-.3-1.3-1s-.6-1.5-.3-1.7.9.3 1.3 1 .6 1.5.3 1.6Z" style="stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px"/><path d="M128.8 73.2c-1.8 1.2-4.7-.6-4.8-1.1 1.6-.4 5.3-2.5 6.4-3.4.6.9.6 3.1-1.6 4.5" class="cls-2"/><path d="M119 59.8c0 .5-.8.8-1.2 1s-3.3 2.1-3.3 2.1c-.5-.4 2-2.9 2.6-3.5.7-.5 2.2-1.1 1.9.3Z" class="cls-4"/><path d="M113.5 74.4c-.3.6-.8 1-1.4 1.1" class="cls-7"/><path d="M125.1 55.5c0 .1-.3.3-.7.7l-1.4 1.4c-.4.3-1 0-1.1-.5 0-.6 2.4-1.7 2.8-1.7h.3z" class="cls-4"/><path d="m125.1 55.5-.1-.1c.1 0 .1 0 .1.1m-22.9 65-.3.2m12.7-1.7-1.2-.3m28.1 24.9c-.4.1-.9.1-1.3 0m-15.7 29.5h-.2m-16.2 5.1c-.2 0-.3 0-.5-.1m25.3-23.6-.1.1m-10.6-24.8c.3-2.4.7-4.5 1.1-6.5" class="cls-7"/></g></svg>')}`;
export default image;