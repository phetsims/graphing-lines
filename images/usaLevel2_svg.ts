/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><defs><style>.cls-10,.cls-4,.cls-6,.cls-7,.cls-8{stroke-miterlimit:10}.cls-14,.cls-4,.cls-6,.cls-7,.cls-8{stroke-width:.5px}.cls-14,.cls-4,.cls-6{stroke:#231f20}.cls-10,.cls-14{fill:none}.cls-10,.cls-7,.cls-8{stroke:#000}.cls-4{fill:#987447}.cls-6{fill:#ddbda2}.cls-7{fill:#ccc}.cls-8{fill:#cd3543}.cls-15{stroke-width:0}</style></defs><g id="Grid"><path d="M29.3 29.3h241.5v241.5H29.3zm0 229.3h241.4m-241.4-12h241.4M29.3 234.5h241.4m-241.4-12h241.4M29.3 210.4h241.4M29.3 198.3h241.4M29.3 186.2h241.4m-241.4-12h241.4M29.3 162.1h241.4M29.3 150h241.4M29.3 137.9h241.4M29.3 125.8h241.4m-241.4-12h241.4M29.3 101.7h241.4M29.3 89.6h241.4M29.3 77.5h241.4m-241.4-12h241.4M29.3 53.4h241.4m-241.4-12h241.4m-12.1-12.1v241.4m-12-241.4v241.4M234.5 29.3v241.4m-12-241.4v241.4M210.4 29.3v241.4M198.3 29.3v241.4M186.2 29.3v241.4m-12-241.4v241.4M162.1 29.3v241.4M150 29.3v241.4M137.9 29.3v241.4M125.8 29.3v241.4m-12-241.4v241.4M101.7 29.3v241.4M89.6 29.3v241.4M77.5 29.3v241.4m-12-241.4v241.4M53.4 29.3v241.4m-12-241.4v241.4" style="stroke:#58595b;stroke-width:.2px;stroke-miterlimit:10;fill:#fff"/><path d="M23.9 150h252.2" class="cls-10"/><path d="m24.7 152.5-4.3-2.5 4.3-2.5zm250.6 0 4.3-2.5-4.3-2.5z" class="cls-15"/><path d="M150 23.9v252.2" class="cls-10"/><path d="m147.5 24.7 2.5-4.3 2.5 4.3zm0 250.6 2.5 4.3 2.5-4.3z" class="cls-15"/></g><path id="Lines" d="m281.1 152.4 11.7-12.5-16.8-3.3 1.8 5.6-257.1 83.2-1.8-5.6-11.7 12.5 16.8 3.3-1.8-5.6 257.1-83.2z" style="stroke-width:0;fill:#27b04b"/><g id="USA"><path d="M83.6 195s2.6 3 5.1 3.3 5.5-.9 6 2.8c.6 3.8-2.2 4.7-5.8 5.1-3.6.5-13.3-1.3-14.6-5-1.3-3.8 1.5-7.6 4-6.8s5.2.6 5.2.6Zm45.7-10.8s-3 1.5-2 5.3c.9 3.9 4.5 3.6 8.4 1.9s12.9-2.2 11.5-8.6c-1.4-6.5-12.5-.6-12.5-.6l-5.3 1.9Z" style="stroke-miterlimit:10;stroke-width:.5px;fill:#ef3a37;stroke:#000"/><path d="m101.3 155.4-4.4 19.5-12.7 21.3s1.9 1.7-1.6 1.9-6.1-1.8-4.9-3.9c1.2-2 3.5-9.3 3.6-11.7s3.3-8.5 6.5-9.2c0 0-2-12.6.6-21.7 0 0 9.7-5.8 13 3.9Zm24.4-11.8s7.9 10.6 8 12.3.7 25.5 1.4 26.5.9 1.3.2 1.9-5 3.3-6.9.9c0 0-.1-4.1-.6-6.5s-4.5-9.4-4.7-12.1c-.1-2.6 1.5-7.3 1.5-7.3l-6.7-6.3s-4.1-10.1 7.8-9.6Z" class="cls-6"/><path d="m91.4 130.2-5.3 22.2s1.9 4.9 6.8 5.6 10.8-.3 10.8-.3l4.9-18.6-1.5 6.5 11 10.4s3.1-1.6 5.4-4.2 4.4-7.3 4.4-7.3l-9.4-15.1-27.1.9Z" style="stroke-miterlimit:10;stroke-width:.5px;stroke:#000;fill:#ababab"/><path d="m95.9 131.9-6.2 24.9s1.9 1.3 2.6 1.1l5.3-25.1-1.8-.9Z" class="cls-7"/><path d="m108.5 141.3 12.5 12.9m-16.4-20.5s-2.6 8.7-8.7 7.2m19.6-9.1s4 5.3 6.1 2.6" style="stroke-miterlimit:10;stroke-width:.5px;fill:none;stroke:#000"/><path d="m108.4 133.2.2 6.1s1.6-.2 1.4-5.9l-1.5-.2Z" class="cls-7"/><path d="M121.8 97.3s-2.9 10.2-4.6 11.9-2.9-3.8-2.9-3.8l.2-11.8 7.3 3.6Z" class="cls-6"/><path d="M110.7 81.6s8.3 1.2 9.8 3.9 1.2 11.8 1.2 11.8-2 1-4.2.3l-.2-4.4s-.5 30.9 5.1 36.5c0 0-8.2 5.5-14.8 5.1-6.7-.3-17.6-2.4-17.6-2.4l4.4-35.8-8.4-6.1s9.6-9.2 11.3-8.4" class="cls-8"/><path d="M97.2 76.5s.2 7.5-1.9 8.7l6.3 4.6 8.6-.6 1.1-3.4-2.4-7.9-11.7-1.5Z" class="cls-6"/><path d="M96.7 82.4s-1.4.5-2.7 1.4c0 0 2.9 7 11.3 6.8 7-.1 8-3.2 5.5-8.5l-1.5-1.2-2.2-.2s5.9 5.9 2.6 7.7c-2.2 1.2-12.1 2.7-12.8-6Z" style="stroke-miterlimit:10;stroke-width:.5px;stroke:#000;fill:#83424f"/><path d="M96 98.8s7.2 9 9 15.9c0 0 1.7-.2 3.6.2 1.9.3 7.9 3.6 9.4 3.9s8.7-2 9.7-.2c1 1.9 1.2 6.1-.2 7.2-1.4 1-6 1.9-9.4-2.4 0 0-15.9-1-18.1-3.1-2.2-2-12.3-17.6-12.3-17.6s0-8.2 8.2-3.9Z" class="cls-6"/><path d="M87.4 89.7c-5.5 1.3-3.8 11.4 2 17.5 0 0 3.4-6.2 8.3-7.2 0 0-3.4-11.9-10.3-10.3Z" class="cls-8"/><path d="M123.4 57.9s-5.8 10-3.2 24.6c0 0-7.2 1.1-19.2-3.4 0 0-19.6-15-2.6-32.4 0 0 17.7-.8 24.9 11.2Z" class="cls-4"/><path d="M95.6 76.5s5.1 5.3 8.7 5.5 13-4.7 13.7-10.9c.6-6 .3-5.4.3-5.4s1.7-5.2 1.5-6.5c-.2-1.4-.4-9.2-6.2-10.3-5.9-1.1-13-6.1-17.6 7.1s-.2 20.4-.4 20.4Z" class="cls-6"/><path d="M126.3 63.5s-5.4-30.1-19.2-21.1c0 0-7.4-7.4-16.7 3.8-11.9 14.2-6.5 31.5-4.5 34.4 0 0 9.4 1.4 11.1-.8 0 0-5.9-10.4-1-23.9l7.8.6s2.3-4.2 1-7.2c0 0 2.5 3.3 1.7 7.5 0 0 9.1.2 15.6 3.4 1.7.8 3.2 1.8 4.3 3.1Z" class="cls-4"/><path d="M97.5 45.4s-4.9 3.7-4.6 10.3l3.5.2" class="cls-14"/><path d="M113.7 66.7c-.7 0-1.2-1-1.1-2.2 0-1.2.7-2.1 1.3-2 .7 0 1.1 1 1.1 2.2s-.7 2.1-1.3 2m-12.8-.6c-.7 0-1.2-1-1.1-2.2 0-1.2.7-2.1 1.3-2 .7 0 1.1 1 1.1 2.2s-.7 2.1-1.3 2" style="stroke-miterlimit:10;stroke-width:.5px;stroke:#231f20;fill:#010101"/><path d="M116.1 61.2s-.7-2-2.3-.7m-11.5-.5s-1.1-2.1-2.7.2" class="cls-14"/><path d="M112.6 74.2s-1.5 1-12.2-1.5c-1.7-.4 4.5 9.4 12.2 1.5Z" style="fill:#fff;stroke-width:.5px;stroke:#231f20"/><path d="M101.4 69.9c0 1.3-1.5 2.2-3.2 2.1s-2.9-1.2-2.9-2.5 1.5-2.2 3.2-2.1 2.9 1.2 2.9 2.5m15.1.8c0 1.3-1.5 2.2-3.2 2.1s-2.9-1.2-2.9-2.5 1.5-2.2 3.2-2.1 2.9 1.2 2.9 2.5" style="stroke-width:0;fill:#dcb1a3"/><path d="M107.5 67.6s.5 1 1.2 1c0 0-.3.9-1.4 1.4" style="stroke-miterlimit:10;stroke-width:.5px;stroke:#231f20;fill:none"/></g></svg>')}`;
export default image;