// https://cn.rollupjs.org
import rollupPluginTypeScript from "@rollup/plugin-typescript";
import rollupPluginTerser from '@rollup/plugin-terser';
import rollupPluginCommonJs from '@rollup/plugin-commonjs'
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve'


export default [
  {
    input: 'src/main.ts',
    output: [
      {
        name: 'vuone',
        file: './dist/vuone.common.js',
        format: 'cjs'
      },
      {
        name: 'vuone',
        file: './dist/vuone.esm.js',
        format: 'es'
      },
      // {
      //   name: 'vuone',
      //   file: './dist/vuone.min.js',
      //   format: 'iife',
      // },
      {
        name: 'vuone',
        file: './dist/vuone.js',
        format: 'umd',
      },
    ],
    plugins: [
      rollupPluginNodeResolve(),
      rollupPluginCommonJs(),
      rollupPluginTypeScript(),
      rollupPluginTerser({
        compress: true,
        ecma: true,
        ie8: true,
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
    ],
    logLevel: 'debug', // type LogLevel = 'warn' | 'info' | 'debug';
  },
]
