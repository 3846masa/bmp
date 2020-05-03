export const convert: (imageData: {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray;
}) => Promise<Uint8Array>;
