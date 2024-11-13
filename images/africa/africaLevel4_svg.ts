/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><defs><style>.cls-1{fill:#79a3c3}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6,.cls-8{stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px}.cls-5{fill:#fff}.cls-10{stroke-miterlimit:10}.cls-2{fill:#e0bcaa}.cls-3{fill:#91bed4}.cls-4{fill:#f6aecd}.cls-6{fill:#f0d0de}.cls-10,.cls-8{fill:none}.cls-10{stroke:#000}.cls-11{stroke-width:0}</style></defs><g id="Grid"><path d="M29.3 29.3h241.5v241.5H29.3zm0 229.3h241.4m-241.4-12h241.4M29.3 234.5h241.4m-241.4-12h241.4M29.3 210.4h241.4M29.3 198.3h241.4M29.3 186.2h241.4m-241.4-12h241.4M29.3 162.1h241.4M29.3 150h241.4M29.3 137.9h241.4M29.3 125.8h241.4m-241.4-12h241.4M29.3 101.7h241.4M29.3 89.6h241.4M29.3 77.5h241.4m-241.4-12h241.4M29.3 53.4h241.4m-241.4-12h241.4m-12.1-12.1v241.4m-12-241.4v241.4M234.5 29.3v241.4m-12-241.4v241.4M210.4 29.3v241.4M198.3 29.3v241.4M186.2 29.3v241.4m-12-241.4v241.4M162.1 29.3v241.4M150 29.3v241.4M137.9 29.3v241.4M125.8 29.3v241.4m-12-241.4v241.4M101.7 29.3v241.4M89.6 29.3v241.4M77.5 29.3v241.4m-12-241.4v241.4M53.4 29.3v241.4m-12-241.4v241.4" style="stroke:#58595b;stroke-width:.2px;fill:#fff;stroke-miterlimit:10"/><path d="M23.9 150h252.2" class="cls-10"/><path d="m24.7 152.5-4.3-2.5 4.3-2.5zm250.6 0 4.3-2.5-4.3-2.5z" class="cls-11"/><path d="M150 23.9v252.2" class="cls-10"/><path d="m147.5 24.7 2.5-4.3 2.5 4.3zm0 250.6 2.5 4.3 2.5-4.3z" class="cls-11"/></g><path id="Lines" d="m240.9 61.8 2.9-16.8-15.8 6.4 4.6 3.7-168.9 211-4.6-3.7-2.9 16.9 15.8-6.5-4.6-3.7 168.9-211z" style="stroke-width:0;fill:#27b04b"/><g id="Africa"><path d="M121.2 118.2c.1 6.1 1.8 10.8 2.3 17.5 0 1.1 4.4 4.9 6.2 5.4.7.2 1.3.4 1.9.5 3.1.9 5.4 1.6 7.9 2.2-2.7 1.9-4.4 4.8-3.9 7.9h0c-6-1.7-13.9-4.5-17.5-7.8-.3.6-1.3 2-3.5 4.9-1.2 1.7-3 3.2-3.7 3.3-1 0-3.5-1.3-5-2.2-2.9-1.8-11.3-7.1-13.7-9.4 3.7-7.5 6-11.7 8.7-15.7 2.5-3.7 5.3-7.3 9.9-13.3 2.4-3.5 8.2-5.4 11-6-1.9.7-5.3 2.6-5.9 5.8 3.7.4 7.3 1.5 10.5 3.4-.9.2-1.8.6-2.7 1.1-.2.1-.5.4-.6.6" class="cls-4"/><path d="M123.3 116.2c.5.6 4.9 2.4 5.7 3.6.7 1.1 1 2.5.7 3.8 0 .3-.1.5-.2.8 0 .3-.3.8-.4 1 2.6-3.9 6.3-7.2 10.5-9.5-.6-.5-1.3-1-1.9-1.6-.7-.5-.8-.7-1.5-1.3 1.4-1 2.8-1.9 4.3-2.6.1.2 1.2 2.3 1.5 6.1.3 3.6 1.7 16.7 1.7 16.7 1.2.2 3.2.7 7.3 1.2h0c-2.4 1.9-2.6 5.1-1.2 6.9-3.9-.2-7.8-.3-11.9-.2-.8-.6-4.1-10-4.3-13.1-3.1 3.9-8.1 3.9-10.1 7.6-.5-6.7-2.1-11.3-2.3-17.5" class="cls-4"/><path d="M142.8 88.6c-1-4.8-2.6-8.5-5.6-8.6.9 4.1-2.2 8-4.8 9.5-2.1 1.2-7.6 5-8.8 3.1-.3-1.1-1.4-1.5-2.2-1.2s-1 .6-1.2 1.1-.2 1.1-.3 1.6c0 .7.1 1.3.3 2.1.2.7.4 1.4 1.1 1.6h.4c0 2.2.8 4.3 2.1 6 2.5 3.5 6.8 5.9 8.9 6.3h1.1c1.8 0 3.2-.7 4.3-1.7 1.7-1.5 2.8-3.6 3.6-5.3 1.2-2.5 1.6-2.8 2.1-5.6h0c-.3-3-.6-6.3-1.2-9.2Zm-7 16.9c-1.1 0-3.1.5-5.2-2.4-.4-.5 7.3-.2 8.5-.8-.5 1.7-1.4 3-3.2 3.2Z" class="cls-2"/><path d="M140 153.1c-.7.4-1.4.7-2.1 1-9.6 4-17.3 4.4-27.6 6.6 4.8 8 6 12.2 7.3 16.3.3 1 .6 1.9.9 2.9 1.2 3.4-3.6 12.6-9.8 21.9h-.1c-3.1-1.9-7.1-5-9.4-7.9 1.3-3.7 2.8-7 6.1-13.1-2.6-5.6-7.6-9.7-12.1-16.4-3.5-5.2-9.4-9.8-.7-24.1 2.4 2.3 10.8 7.7 13.7 9.4 1.4.9 3.9 2.3 5 2.2.8 0 2.5-1.6 3.7-3.3 2.1-3 3.1-4.3 3.5-4.9 3.6 3.3 11.5 6.1 17.5 8 1.7.5 3.2.9 4.4 1.3Z" class="cls-1"/><path d="M110.2 160.7c-1.2-2-2.7-4.3-4.4-6.9" class="cls-8"/><path d="M108.6 201.8c-1.2 1.7-2.4 3.5-3.6 5.2-.6 0-1.1-.2-1.6-.4-3.1-1-5.3-3.3-6.4-6.4.8-2.5 1.4-4.5 2.1-6.3 2.2 2.8 6.3 6 9.4 7.8h.1Z" class="cls-3"/><path d="M110.2 160.7h-.2" class="cls-8"/><path d="M150.7 156.6c-1.2 1.5-4 4.6-6.1 7.1h0c0-.1-6.6-3.8-8.9-6.7h-.5c.8-1.1 1.7-2 2.7-2.8h0c.7-.3 1.4-.7 2.1-1h0c1 .2 1.8.4 2.3.6 0-.6 0-1.1.1-1.7h.1c3.2.6 5.9 3.1 8.1 4.5Z" class="cls-1"/><path d="M144.6 163.6c-1.1 1.2-2 2.3-2.5 2.9-.2.3-.8.2-1.6-.2-2.4-1.1-6.4-4.6-7.6-6.1.7-1.2 1.5-2.3 2.3-3.4h.5c2.4 3 8.9 6.6 8.9 6.7h0Z" class="cls-3"/><path d="M155.2 146c-3.1.2-6.7.2-9.5 0 .3-.3.5-.5.8-.7-2.8-.5-5-1-7-1.5-2.5-.6-4.8-1.4-7.9-2.2h0c2.1-.2 4.2-.4 6.3-.4 4-.1 8 0 11.9.2.8 0 1.7 0 2.5.2 2 .9 3.2 3.8 2.9 4.5Z" class="cls-1"/><path d="M140.5 166.4c-4.3 3.8-7.4 5.1-10.4 8.1q0 0 0 0s-3.9-1.3-5-1.5c3.1-4.1 5.3-8.8 7.9-12.8 1.2 1.5 5.3 5 7.6 6.1Z" class="cls-2"/><path d="m99.1 193.9-.3-.4m4.6 13.1s0 0 0 0" class="cls-8"/><path d="M137.5 178.6c-3.6 4.6-6.7 7.3-10.6 6.6s-5.6-4.9-7.1-8.4v-.1c-.3-1.4 3.7-4 5.2-3.5 1 .2 4.9 1.5 5 1.5q0 0 0 0c1.8 5.2 7.6-.3 7.5 4.1Z" class="cls-5"/><path d="M130 174.5s0 0 0 0m-18.7-55.7c1.1 6.5 3.2 16.6 5.1 22.5.3.9.9 1.7 1.8 2.5m3-25.6s0 0 0 0m14.6 4.4c-.4 2.4-1.2 4.2-2.2 5.5" class="cls-8"/><path d="M158.1 135.2c-.3.2-.6.3-.8.4-.5.3-.6.4-1.3 1.2-.9 1-.9 2.8-.5 4.4 0 .2 0 .4.2.5-1.1 0-2.3-.2-3.4-.2-.8 0-1.7-.1-2.5-.2-1.3-1.8-1.2-5 1.2-6.8h0c1.9.1 4.2.4 7.1.6Z" class="cls-6"/><path d="M165.8 143.6c-3 1.4-6.5-3.1-10.3-2.3-.4-1.6-.4-3.4.5-4.4.8-.8.8-1 1.3-1.2 3.8-.2 13.3-2 13.4.4.3 4.8-3.7 7-4.9 7.6Zm-5.4 6.7c-1.9 3.9-1.9 4.6-5.2 7.1-1.3 1-2.8.4-4.4-.7-2.3-1.5-4.9-3.9-8.1-4.5h-.1c.3-2.3 1.5-4.5 3.2-6.1h0c2.8.2 6.4.3 9.5 0 .5 0 1 0 1.5-.1.6 0 1.2 0 1.7.2.7.4 2.4 3.5 2 4.2Z" class="cls-2"/><path d="M143.7 133.2c-1.7-.2-3.2-.2-4.5 1.5" class="cls-8"/><path d="M146.5 145.2c-.3.2-.6.5-.8.7h0c-1.7 1.6-2.8 3.8-3.2 6.1 0 .5-.1 1.1-.1 1.7-.5-.1-1.4-.4-2.3-.6-1.2-.3-2.7-.8-4.4-1.3h0c-.5-3.3 1.2-6.1 3.9-8 2 .5 4.2 1 7 1.5Z" class="cls-6"/><path d="M149.8 141.4s0 0 0 0" class="cls-8"/><path d="M129.7 123.6c.2-1.3 0-2.7-.7-3.8-.8-1.3-5.1-3-5.7-3.6h0v-.1c0-.3.3-.4.6-.6.8-.5 1.7-.9 2.7-1.1-3.2-1.8-6.8-3-10.5-3.4.5-3.2 3.9-5 5.9-5.8q0 0 0 0c.6-.2 1-.2 1.2-.3 5 7.3 8.4 15.1 6.5 18.6Z" class="cls-6"/><path d="M133.9 110.3c-.2 3.1-1.4 9.8-4.4 14.1 0-.3.2-.5.2-.8 1.9-3.5-1.4-11.3-6.5-18.6h0c.4-.3.7-.5.5-1h.1c2.5 3.4 6.8 5.8 8.9 6.2h1.1Z" class="cls-2"/><path d="M137.3 94c-.3 1.7.6 3.5 2.2 4.3-.9 1-2.3 1.6-3.6 1.4m2.4-10.6c1-1.4 3.3-1.6 4.5-.5M123 97q-.3.9-1.2.9" class="cls-8"/><path d="M145.9 117.7c-.1.5-.9.4-.9-.1 0-4.9-.1-8.6-.6-14.3-.1-1.6-.3-3.5-.4-5.5-.3-3-.6-6.3-1.2-9.2-1-4.8-2.6-8.5-5.6-8.6.9 4.1-2.2 8-4.8 9.5-2.1 1.2-7.6 5-8.8 3.1-.3-1.1-1.4-1.5-2.2-1.2s-1 .6-1.2 1.1-.2 1.1-.3 1.6c0 .7.1 1.3.3 2.1.2.7.4 1.4 1.1 1.6h.4c0 2.2.8 4.3 2.1 6h-.1c.2.6 0 .8-.5 1.1 0-.1-.5 0-1.3.3q0 0 0 0c-2.7.7-8.5 2.6-11 6-4.6 6-7.5 9.6-9.9 13.3-1.9-2.3-.2-6.2 1.4-8.8 2.9-4.9 6.2-7.8 7.5-11.2 2.8-7.4-.3-10.5 4-20.6 3.2-7.8 9.8-10.4 18.4-11.2 4.4-.3 9 2.4 11.8 5.7 2.8 3.2 3.8 10.6 4 14.8.6 13.9-.9 20.4-2.1 24.5Z" style="stroke:#010101;stroke-linecap:round;stroke-linejoin:round;stroke-width:.5px;fill:#eccc87"/><path d="M132.9 110.3h-.1" class="cls-8"/><path d="M140.4 110.4c-1.5.8-2.9 1.6-4.3 2.6.7.5.8.7 1.5 1.3.6.5 1.3 1.1 1.9 1.6-4.2 2.3-7.9 5.6-10.5 9.5.1-.2.3-.8.4-1 3-4.3 4.2-11 4.4-14.1h0c1.8 0 3.2-.7 4.3-1.7 1.2 0 1.9 1 3 1.5-.2.1-.5.2-.7.4Z" class="cls-6"/><path d="M139 102.4c-.5 1.7-1.4 3-3.2 3.2-1.1 0-3.1.5-5.2-2.4-.4-.5 7.3-.2 8.5-.8Z" class="cls-5"/><path d="M130.9 95.6c-.6 0-1.2-.8-1.3-1.8 0-1 .4-1.9 1-2 .6 0 1.2.8 1.3 1.8 0 1-.4 1.9-1 2m10.2-.7c-.5 0-1-1-1.1-2.2 0-1.3.2-2.3.8-2.4.5 0 1 1 1.1 2.2 0 1.3-.3 2.3-.8 2.4" style="stroke-width:0;fill:#010101"/><path d="M100.2 224.7c-1 2.7-5 7.1-7.8 7.1-2.2-.5-4.5-1.5-4.9-8.2-.2-3 .3-8.6.6-10.5.1-.9 1.4-2.8 2-3.5.9-.9 2.5-2.6 3.7-2.6h.1c-.5 1.2-1 2.3-1.4 3v.2c0 .6 0 1.2.3 1.8.2.6.7 1.1 1.3 1.2 1 .2 1.9-.6 2.9-.8.7-.1 1.4 0 1.9.6-1.1 8.6 2.2 9 1.2 11.7Z" class="cls-5"/><path d="M103.4 206.7c-1.5 2.4-2 2.9-4.4 6.3-.5-.5-1.2-.7-1.9-.6-1 .2-1.9 1-2.9.8-.6-.1-1.1-.6-1.3-1.2s-.3-1.2-.4-1.8v-.2c.4-.7.9-1.8 1.4-3h0c1.1-2.4 2.5-5.3 3.2-6.9 1.1 3.1 3.3 5.4 6.4 6.4Z" class="cls-2"/></g></svg>')}`;
export default image;