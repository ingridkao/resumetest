const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //https://cli.vuejs.org/config/#outputdir
  publicPath: process.env.NODE_ENV === 'production'
    ? '/resumetest/'
    : '/',
  devServer: {
    proxy: {
      '/travelapi': {
        // target: 'https://www.travel.taipei/open-api/zh-tw/Attractions/All?page=1',
        target: 'https://www.travel.taipei/open-api/',
        changeOrigin: true,
        pathRewrite: {
          '^/travelapi': ''
        }
      }
    }
  }
})
