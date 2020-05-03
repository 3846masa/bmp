import { convert } from './worker';

const HTMLCanvasElement__prototype = HTMLCanvasElement.prototype;
const HTMLCanvasElement__prototype__toBlob = HTMLCanvasElement__prototype.toBlob;

HTMLCanvasElement__prototype.toBlob = function (callback, type, quality) {
  if (type.toLowerCase() !== 'image/bmp') {
    return HTMLCanvasElement__prototype__toBlob.call(this, callback, type, quality);
  }
  const { width, height } = this;

  let ctx = this.getContext('2d');
  if (!ctx) {
    const canvas = this.cloneNode(false);
    ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0);
  }

  const promise = convert(ctx.getImageData(0, 0, width, height));
  promise.then((uint8Array) => callback(new Blob([uint8Array], { type: 'image/bmp' })));
};
