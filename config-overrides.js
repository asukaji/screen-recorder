const {
  addWebpackAlias,
  fixBabelImports,
  addLessLoader,
  override,
} = require('customize-cra');

const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
  }),
  // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, //自动打包相关的样式 默认为 style:'css'
  }),
  // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      localIdentName: '[local]_[hash:base64:8]',
      noIeCompat: true,
    },
  }),
  //增加路径别名的处理
  addWebpackAlias({
    '@': path.resolve('./src'),
  }),
  //增加路径别名的处理
  addWebpackAlias({
    react: path.resolve('./node_modules/react'),
  })
);
