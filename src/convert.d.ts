export const convert: (imageData: {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray;
}) => Uint8Array;
