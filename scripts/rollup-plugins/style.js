import scss from 'rollup-plugin-scss';
import * as sass from 'sass-embedded';
import autoprefixer from 'autoprefixer';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';

// 创建一个 require 函数，用于适配 ESM 环境中需要使用 CJS 模块的情况
const require = createRequire(import.meta.url);

// 创建 dist/styles 目录（如果不存在）
const ensureStylesDir = () => {
  const stylesDir = path.resolve(process.cwd(), 'dist/styles');
  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }
  return stylesDir;
};

// 创建一个对象，包含插件需要的方法
const sassCompiler = {
  // 异步渲染方法
  render: (options, callback) => {
    try {
      // 使用新的 compileString API
      const result = sass.compileString(options.data, {
        loadPaths: options.includePaths || [],
        style: options.outputStyle === 'compressed' ? 'compressed' : 'expanded'
      });
      
      // 将结果转换为插件期望的格式
      callback(null, { css: Buffer.from(result.css) });
    } catch (error) {
      callback(error);
    }
  },
  
  // 同步渲染方法 - 插件需要这个方法
  renderSync: (options) => {
    try {
      // 使用新的 compileString API
      const result = sass.compileString(options.data, {
        loadPaths: options.includePaths || [],
        style: options.outputStyle === 'compressed' ? 'compressed' : 'expanded'
      });
      
      // 返回插件期望的格式
      return { css: Buffer.from(result.css) };
    } catch (error) {
      throw error;
    }
  }
};

export default [
  scss({
    // 明确指定 sass 编译器，防止插件尝试加载 node-sass
    sass: sassCompiler,
    
    // 处理器（添加浏览器前缀等）
    processor: css => {
      // 这里可以使用 postcss 和 autoprefixer 处理 CSS
      // 由于配置简单，这里不引入完整的 postcss 处理流程
      return css;
    },
    
    // 取消注入，改为输出到文件
    inject: false,
    
    // 输出函数，将生成的 CSS 保存到 dist/styles 目录
    output: function(styles, styleNodes) {
      if (!styles) return;
      
      // 确保输出目录存在
      const stylesDir = ensureStylesDir();
      
      // 简化输出逻辑：直接保存合并后的 CSS 到 bundle.css
      const outputPath = path.join(stylesDir, 'styles.css');
      fs.writeFileSync(outputPath, styles);
      console.log(`CSS 文件已生成: ${outputPath}`);
      
      // 获取入口模块名称 (styleNodes 可能不是数组)
      if (styleNodes && typeof styleNodes === 'object') {
        // 尝试获取样式节点的 ID
        try {
          // 如果 styleNodes 是一个对象映射而不是数组
          Object.keys(styleNodes).forEach(key => {
            const node = styleNodes[key];
            if (node && node.id && node.content) {
              // 从路径中提取模块名
              let fileName = path.basename(node.id, path.extname(node.id));
              
              // 获取模块所在目录名
              const dirName = path.basename(path.dirname(node.id));
              
              // 如果父目录不是 src，则将目录名添加到文件名前
              if (dirName !== 'src') {
                fileName = `${dirName}-${fileName}`;
              }
              
              // 构建输出文件路径
              const moduleCssPath = path.join(stylesDir, `${fileName}.css`);
              
              // 写入单独的样式文件
              fs.writeFileSync(moduleCssPath, node.content);
              console.log(`模块 CSS 文件已生成: ${moduleCssPath}`);
            }
          });
        } catch (err) {
          console.warn('无法处理单独的样式节点:', err);
        }
      }
    },
    
    // 是否压缩 CSS
    outputStyle: 'compressed',
    
    // 明确禁用 node-sass 查找
    failOnError: true
  }),
];
