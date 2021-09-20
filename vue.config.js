const path = require('path')

module.exports = {
  // 设置跟路径
  // webpack将producttion作为默认值
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: process.env.OUT_PUT_DIR, // 默认dist
  // assetsDir: 'assets',
  // pages: {},
  indexPath: 'index.html',
  lintOnSave: false,
  // 解决安装 less 以及 less-loader 后报错，JavaScript 不被允许使用
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  // 配置跨域
  devServer: {
    port: 8080, // 默认的打开端口号
    open: true, // 自动打开浏览器
    host: 'localhost', // 本地地址
    proxy: {
      // 在此配置跨域
      // '/api' 这里是你需要配置的接口地址域名后跟的后缀，
      // 即为地址后的/api,例如这个地址http://www.xxxxxx.com/api
      '/api': {
        target: 'http://localhost:3000/', // 后端的接口地址
        changeOrigin: true, // 开启跨域
        pathRewrite: {
          '^/api': '' // 这里即为重写后的地址，baseURL里的地址要换成这个
        },
        ws: false
      }
    }
  },

  // https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  chainWebpack: config => {
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))

    // 配置别名
    config.resolve.alias
      .set('@$', path.join(__dirname, 'src'))
      .set('@/components', path.join(__dirname, 'src/components'))
      .set('@/mixins', path.join(__dirname, 'src/mixins'))
      .set('@/store', path.join(__dirname, 'src/store'))
  }
}

// 自动导入公共样式
// function addStyleResource (rule) {
//   rule.use('style-resource')
//     .loader('style-resources-loader')
//     .options({
//       patterns: [
//         path.resolve(__dirname, './src/styles/imports.styl'),
//       ]
//     })
// }
