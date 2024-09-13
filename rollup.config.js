// https://cn.rollupjs.org
import rollupPluginTypeScript from "@rollup/plugin-typescript";
import rollupPluginTerser from "@rollup/plugin-terser";
import rollupPluginCommonJs from "@rollup/plugin-commonjs"
import rollupPluginNodeResolve from "@rollup/plugin-node-resolve"
import rollupPluginSummary from "rollup-plugin-summary"


export default [
  {
    input: "src/main.ts",
    output: [
      {
        name: "vuone",
        file: "./lib/vuone.cjs.js",
        format: "cjs"
      },
      {
        name: "vuone",
        file: "./lib/vuone.esm.js",
        format: "es"
      },
      {
        name: "vuone",
        file: "./lib/vuone.min.js",
        format: "iife",
      },
      {
        name: "vuone",
        file: "./lib/vuone.umd.js",
        format: "umd",
      },
    ],
    plugins: [
      rollupPluginNodeResolve(),
      rollupPluginCommonJs(),
      rollupPluginTypeScript({
        compilerOptions: {
          "declaration": false,
        }
      }),
      rollupPluginTerser({
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
        }
      }),
      // 打包结果分析
      rollupPluginSummary({
        showBrotliSize: true,
        showGzippedSize: true,
        showMinifiedSize: true,
      })
    ],
    logLevel: "debug", // type LogLevel = 'warn' | 'info' | 'debug';
  },
]
