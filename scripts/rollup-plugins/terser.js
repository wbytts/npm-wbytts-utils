import terser from '@rollup/plugin-terser';

export default terser({
    compress: {
      pure_funcs: [],  // 不移除任何函数
      drop_console: false,  // 不移除console语句
      drop_debugger: true,  // 可以移除debugger语句
    },
    keep_classnames: false,
    keep_fnames: false,
    format: {
      beautify: true,
      comments: false,
      keep_numbers: false,
      // width: 120,
      // max_line_len: 120,
      // indent_level: 2,
      preserve_annotations: false,
    },
  });
