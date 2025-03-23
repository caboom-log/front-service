const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  outputDir: '/app/dist',
  publicPath: '/',
  devServer: {
    historyApiFallback: true
  }
})
