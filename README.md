# @3846masa/bmp

[![npm-badge]][npm]
[![mit-license-badge]][mit-license]

Create a BMP (w/ alpha channel) binary from RGBA raw bytes like ImageData.

- faster than other libraries (e.g. bmp-js)
- tiny size (basic: ~ 500 bytes, webworker: ~ 700 bytes)
- supports alpha channel

## Table of Contents

- [Usage](#usage)
  - [CDN](#cdn)
  - [Using via bundler](#using-via-bundler)
- [API](#api)
  - [`convert({ width, height, data })`](#convert-width-height-data)
  - [`HTMLCanvasElement.prototype.toBlob(callback, type)`](#htmlcanvaselementprototypetoblobcallback-type)
- [Contributing](#contributing)
- [License](#license)

## Usage

### CDN

#### Basic

![basic](https://flat.badgen.net/badgesize/gzip/https/unpkg.com/@3846masa/bmp/lib/convert.mjs)
[![codesandbox-badge]](https://codesandbox.io/s/github/3846masa/bmp/tree/master/examples/basic)

See [./examples/basic](./examples/basic).

```html
<script type="module">
  import { convert } from 'https://unpkg.com/@3846masa/bmp/lib/convert.mjs';

  const canvas = document.getElementById('canvas');
  const bmpImg = document.getElementById('bmp');

  function main() {
    const ctx = canvas.getContext('2d');

    const raw = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const bmpBinary = convert(raw);
    const blob = new Blob([bmpBinary], { type: 'image/bmp' });

    bmpImg.src = URL.createObjectURL(blob);
  }

  main();
</script>
```

#### WebWorker

![webworker](https://flat.badgen.net/badgesize/gzip/https/unpkg.com/@3846masa/bmp/lib/worker.mjs)
[![codesandbox-badge]](https://codesandbox.io/s/github/3846masa/bmp/tree/master/examples/webworker)

See [./examples/webworker](./examples/webworker).

```html
<script type="module">
  import { convert } from 'https://unpkg.com/@3846masa/bmp/lib/worker.mjs';

  const canvas = document.getElementById('canvas');
  const bmpImg = document.getElementById('bmp');

  async function main() {
    const ctx = canvas.getContext('2d');

    const raw = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const bmpBinary = await convert(raw);
    const blob = new Blob([bmpBinary], { type: 'image/bmp' });

    bmpImg.src = URL.createObjectURL(blob);
  }

  main().catch(console.error);
</script>
```

#### No module

![no-module](https://flat.badgen.net/badgesize/gzip/https/unpkg.com/@3846masa/bmp/lib/polyfill.js)
[![codesandbox-badge]](https://codesandbox.io/s/github/3846masa/bmp/tree/master/examples/canvas-to-blob)

See [./examples/canvas-to-blob](./examples/canvas-to-blob).

```html
<script src="https://unpkg.com/@3846masa/bmp/lib/polyfill.js"></script>
<script>
  const canvas = document.getElementById('canvas');
  const bmpImg = document.getElementById('bmp');

  function main() {
    canvas.toBlob(callback, 'image/bmp');

    function callback(blob) {
      const blobUrl = URL.createObjectURL(blob);
      bmpImg.addEventListener('load', () => URL.revokeObjectURL(blobUrl), { once: true });
      bmpImg.addEventListener('error', () => URL.revokeObjectURL(blobUrl), { once: true });
      bmpImg.src = blobUrl;
    }
  }

  main();
</script>
```

### Using via bundler

![bundlephobia](https://flat.badgen.net/bundlephobia/minzip/@3846masa/bmp?label=gzip%20size)

```sh
npm i @3846masa/bmp
```

```js
import { convert } from '@3846masa/bmp';
```

## API

### `convert({ width, height, data })`

Convert RGBA raw bytes like ImageData to a BMP binary.

In `worker.mjs`, this function returns Promise.

|          |                                       |
| :------- | :------------------------------------ |
| `width`  | `number`                              |
| `height` | `number`                              |
| `data`   | `Uint8Array` \| `Uint8ClampedArray`   |
| Returns  | `Uint8Array` \| `Promise<Uint8Array>` |

### `HTMLCanvasElement.prototype.toBlob(callback, type)`

|            |                       |
| :--------- | :-------------------- |
| `callback` | `(blob: Blob) => any` |
| `type`     | `'image/bmp'`         |

## Contributing

PRs accepted.

## License

[MIT (c) 3846masa][mit-license]

[npm-badge]: https://flat.badgen.net/npm/v/@3846masa/bmp?icon=npm
[npm]: https://www.npmjs.com/package/@3846masa/bmp
[mit-license-badge]: https://flat.badgen.net/badge/license/MIT/blue
[mit-license]: https://3846masa.mit-license.org
[codesandbox-badge]: https://flat.badgen.net/badge/codesandbox/try%20it/black
