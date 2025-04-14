// https://cn.rollupjs.org
import { getOutputs } from './scripts/get-outputs.js';
import { commonPlugins } from './scripts/rollup-plugins.js';

export default [
  {
    input: 'src/utils/index.ts',
    output: getOutputs('utils', { globalName: '$ByUtils' }),
    plugins: [...commonPlugins],
    logLevel: 'debug',
  },
  {
    input: 'src/dom/index.ts',
    output: getOutputs('dom', { globalName: '$ByDom' }),
    plugins: [...commonPlugins],
  },
  {
    input: 'src/bom/index.ts',
    output: getOutputs('bom', { globalName: '$ByBom' }),
    plugins: [...commonPlugins],
  },
  {
    input: 'src/sandbox/index.ts',
    output: getOutputs('sandbox', { globalName: "$BySandbox" }),
    plugins: [...commonPlugins],
  },
  {
    input: 'src/validate/index.ts',
    output: getOutputs('validate', { globalName: "$BySandbox" }),
    plugins: [...commonPlugins],
  },
  {
    input: 'src/math/index.ts',
    output: getOutputs('math', { globalName: "$ByMath" }),
    plugins: [...commonPlugins],
  },
  {
    input: 'src/time/index.ts',
    output: getOutputs('time', { globalName: "$ByTime" }),
    plugins: [...commonPlugins],
  },
  {
    input: 'src/request/index.ts',
    output: getOutputs('request', { globalName: "$ByRequest" }),
    plugins: [...commonPlugins],
  },
  {
    input: "src/sse/index.ts",
    output: getOutputs("sse", { globalName: "$BySse" }),
    plugins: [...commonPlugins],
  },
  {
    input: "src/canvas/index.ts",
    output: getOutputs("canvas", { globalName: "$ByCanvas" }),
    plugins: [...commonPlugins],
  },
  {
    input: "src/excel/index.ts",
    output: getOutputs("excel", { globalName: "$ByExcel" }),
    plugins: [...commonPlugins],
  }
];
