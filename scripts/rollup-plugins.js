import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import rollupPluginSummary from 'rollup-plugin-summary';

export const terserPlugin = terser({
  compress: true,
  keep_classnames: false,
  keep_fnames: false,
  format: {
    beautify: false,
    comments: false,
    keep_numbers: false,
    // width: 120,
    // max_line_len: 120,
    // indent_level: 2,
    preserve_annotations: false,
  },
});

export const commonPlugins = [
  commonjs(),
  nodeResolve(),
  // https://www.npmjs.com/package/@rollup/plugin-babel
  babel({ babelHelpers: 'bundled' }),
  terserPlugin,
  json(),
  typescript({
    tsconfig: './tsconfig.json',
    sourceMap: true,
    inlineSources: true,
  }),
  // 打包结果分析
  // rollupPluginSummary({
    // showBrotliSize: true,
    // showGzippedSize: true,
    // showMinifiedSize: true,
  // }),
];
