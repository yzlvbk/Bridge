module.exports = {
  devServer: {
    proxy: { // 配置跨域
      '/v10': {
        target: 'http://118.190.216.205:8005/bridgeWeb/v10/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/v10': ''// 请求的时候使用这个api就可以
        }
      }
    }
  }
}
