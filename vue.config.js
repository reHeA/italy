const prodConfig = require('./prod.config');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
module.exports = {
  lintOnSave: true, // lint检查
  publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
  outputDir: 'dist', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: 8080, // 端口
    open: false, // 启动后打开浏览器
    disableHostCheck: true, // 绕过主机检查，解决Invalid Host header问题
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    // proxy: {
    //   "": {
    //     target: `http://aip.italyvirtualtour.cn/`,
    //     changeOrigin: true,
    //   },

    //   // "/js": {
    //   //   target: `http://www.italyvirtualtour.cn/`,
    //   //   changeOrigin: true,
    //   // },
    // }
  },
  configureWebpack: config => {
    // 生产环境配置
    if (IS_PROD) {
      config['performance'] = {
        //打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      };
    }
  },
  chainWebpack: config => {
    // ts-import-plugin 配置
    prodConfig.mergeConfig(config);
    // 别名
    prodConfig.resolveAlias(config);
    // 生产环境
    config.when(IS_PROD, config => {
      // 单独打包第三方模块
      prodConfig.optimization(config);
      // gZip压缩
      // prodConfig.assetsGzip(config);
      // 代码压缩
      prodConfig.codeUglify(config);
    });
  }
};
