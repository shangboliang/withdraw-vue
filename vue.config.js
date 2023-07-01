const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  },
  devServer: {
    port: 8081,
    // bian用spai开头
    proxy: {
      '/sapi': {//接口
        target: 'https://api.binance.com',//要访问的源
        changeOrigin: true,//允许跨域
        pathRewrite: { '^/sapi': '/sapi' }
      },
      '/okxapi': {
        target: 'https://www.okx.com',//要访问的源
        changeOrigin: true,//允许跨域
        pathRewrite: { '^/okxapi': '' },
      }
    }

  },
})

