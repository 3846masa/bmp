import { convert } from 'https://unpkg.com/@3846masa/bmp/lib/convert.mjs';

const img = document.getElementById('original');
const canvas = document.getElementById('canvas');
const bmpImg = document.getElementById('bmp');

if (img.complete) {
  main();
} else {
  img.addEventListener('load', main);
}

function main() {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const raw = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const bmpBinary = convert(raw);
  const blob = new Blob([bmpBinary], { type: 'image/bmp' });

  const blobUrl = URL.createObjectURL(blob);
  bmpImg.addEventListener('load', () => URL.revokeObjectURL(blobUrl), { once: true });
  bmpImg.addEventListener('error', () => URL.revokeObjectURL(blobUrl), { once: true });
  bmpImg.src = blobUrl;
}
