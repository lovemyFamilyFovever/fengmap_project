const {
  defineConfig
} = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      },
      'sockjs-node': {
        target: 'http://localhost:3000',
        ws: false,
        changeOrigin: true
      },
    }
  }

})