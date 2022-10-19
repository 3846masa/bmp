import { terser } from 'rollup-plugin-terser';

/** @type {Array<import('rollup').RollupOptions>} */
const config = [
  {
    input: './src/convert.mjs',
    output: {
      file: './lib/convert.js',
      format: 'commonjs',
    },
    plugins: [terser()],
  },
  {
    input: './src/convert.mjs',
    output: {
      file: './lib/convert.mjs',
      format: 'esm',
    },
    plugins: [terser()],
  },
  {
    input: './src/worker.mjs',
    output: {
      file: './lib/worker.mjs',
      format: 'esm',
    },
    plugins: [terser()],
  },
  {
    input: './src/polyfill.mjs',
    output: {
      file: './lib/polyfill.js',
      format: 'iife',
    },
    plugins: [terser()],
  },
];

export { config as default };
