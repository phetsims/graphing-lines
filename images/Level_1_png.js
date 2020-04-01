/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
