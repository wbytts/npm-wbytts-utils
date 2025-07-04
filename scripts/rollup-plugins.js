
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import summaryPlugin from './rollup-plugins/summary.js';
import yalcPushAfterBuild from './rollup-plugins/yalc-push-after-build.js';
import terserPlugin from './rollup-plugins/terser.js';
import typescriptPlugin from './rollup-plugins/typescript.js';
import babelPlugin from './rollup-plugins/babel.js';
import stylePlugins from './rollup-plugins/style.js'

export const commonPlugins = [
  commonjs(),
  nodeResolve(),
  json(),
  // ...stylePlugins,
  // babelPlugin,
  terserPlugin,
  typescriptPlugin,
  // summaryPlugin,
  // yalcPushAfterBuild
];
