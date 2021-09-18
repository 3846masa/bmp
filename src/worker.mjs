const workerScript = () => {
  const BMP_HEADER_BASE64 =
    'Qk0AAAAAAAAAAHoAAABsAAAAAAAAAAAAAAABACAAAwAAAAAAAADDDgAAww4AAAAAAAAAAAAA/wAAAAD/AAAAAP8AAAAA/0JHUnM';
  const BMP_HEADER = Uint8Array.from(atob(BMP_HEADER_BASE64), (c) => c.charCodeAt(0));
  const BMP_HEADER_LENGTH = 122;

  const BMP_FILESIZE_OFFSET = 2;
  const BMP_WIDTH_OFFSET = 18;
  const BMP_HEIGHT_OFFSET = 22;
  const BMP_IMAGESIZE_OFFSET = 34;
  const BMP_RED_BITFIELDS_OFFSET = 54;
  const BMP_GREEN_BITFIELDS_OFFSET = 62;

  const IS_WIN = 'navigator' in globalThis && /Trident|Edge/.test(navigator.userAgent);

  /**
   * @param {ImageData} imageData
   * @returns {Uint8Array}
   */
  const convert = ({ width, height, data }) => {
    const dataLength = data.byteLength;
    const fileSize = BMP_HEADER_LENGTH + dataLength;

    const uint8Array = new Uint8Array(fileSize);
    const dataView = new DataView(uint8Array.buffer);
    const setUint32 = (offset, value) => dataView.setUint32(offset, value, true);

    uint8Array.set(BMP_HEADER);
    setUint32(BMP_FILESIZE_OFFSET, fileSize);
    setUint32(BMP_WIDTH_OFFSET, width);
    setUint32(BMP_HEIGHT_OFFSET, -height);
    setUint32(BMP_IMAGESIZE_OFFSET, dataLength);

    uint8Array.set(data, BMP_HEADER_LENGTH);
    if (IS_WIN) {
      // RGBA -> BGRA
      setUint32(BMP_RED_BITFIELDS_OFFSET, 0x00ff0000);
      setUint32(BMP_GREEN_BITFIELDS_OFFSET, 0x000000ff);
      for (let offset = 0; offset < dataLength; offset += 4) {
        uint8Array[BMP_HEADER_LENGTH + offset] = data[offset + 2];
        uint8Array[BMP_HEADER_LENGTH + 2 + offset] = data[offset];
      }
    }

    return uint8Array;
  };

  onmessage = ({ data: [key, width, height, buffer] }) => {
    try {
      const result = convert({ width, height, data: new Uint8Array(buffer) });
      postMessage([key, result.buffer], [result.buffer]);
    } catch (err) {
      postMessage([key, undefined, err]);
    }
  };
};

const workerUrl = URL.createObjectURL(new Blob([`(${workerScript})()`]));
const worker = new Worker(workerUrl);

const callbackStore = new Map();

worker.onmessage = ({ data: [key, arrayBuffer, errObj] }) => {
  const [resolve, reject] = callbackStore.get(key);
  callbackStore.delete(key);

  if (arrayBuffer) {
    resolve(new Uint8Array(arrayBuffer));
  } else {
    reject(Object.assign(new Error(), errObj));
  }
};

/**
 * @param {ImageData} imageData
 * @returns {Promise<Uint8Array>}
 */
const convert = ({ width, height, data }) => {
  return new Promise((resolve, reject) => {
    const key = '' + Date.now() + Math.random();
    callbackStore.set(key, [resolve, reject]);
    worker.postMessage([key, width, height, data.buffer], [data.buffer]);
  });
};

export { convert };
