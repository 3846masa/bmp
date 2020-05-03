# @3846masa/bmp

[![npm-badge]][npm]
[![mit-license-badge]][mit-license]

Create a BMP (w/ alpha channel) binary from RGBA raw bytes like ImageData.

- faster than other libraries (e.g. bmp-js)
- tiny size (~ 500 bytes)
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

```html
<script type="module">
  import { convert } from 'https://unpkg.com/@3846masa/bmp/lib/convert.mjs';

  const canvas = document.getElementById('#canvas');
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const uint8 = convert(imageData);
  const blob = new Blob([uint8], { type: 'image/bmp' });

  const img = new Image();
  img.src = URL.createObjectURL(blob);
  document.body.appendChild(img);
</script>
```

#### WebWorker

![webworker](https://flat.badgen.net/badgesize/gzip/https/unpkg.com/@3846masa/bmp/lib/worker.mjs)

```html
<script type="module">
  import { convert } from 'https://unpkg.com/@3846masa/bmp/lib/worker.mjs';

  async function main() {
    const canvas = document.getElementById('#canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const uint8 = await convert(imageData);
    const blob = new Blob([uint8], { type: 'image/bmp' });

    const img = new Image();
    img.src = URL.createObjectURL(blob);
    document.body.appendChild(img);
  }

  main().catch(console.error);
</script>
```

#### No module

![no-module](https://flat.badgen.net/badgesize/gzip/https/unpkg.com/@3846masa/bmp/lib/polyfill.mjs)

```html
<script src="https://unpkg.com/@3846masa/bmp/lib/polyfill.js"></script>
<script>
  async function main() {
    const canvas = document.getElementById('#canvas');
    const blob = new Promise((resolve) => canvas.toBlob(resolve, 'image/bmp'));

    const img = new Image();
    img.src = URL.createObjectURL(blob);
    document.body.appendChild(img);
  }

  main().catch(console.error);
</script>
```

### Using via bundler

![bundlephobia](https://flat.badgen.net/bundlephobia/min/@3846masa/bmp)

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
