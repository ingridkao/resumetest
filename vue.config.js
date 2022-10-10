const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //https://cli.vuejs.org/config/#outputdir
  publicPath: process.env.NODE_ENV === 'production'
    ? '/resumetest/'
    : '/'
  })
