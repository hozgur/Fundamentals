module.exports = {
    devServer: {
      proxy: {
        '^/openai': {
          target: 'http://localhost:3080',
          changeOrigin: true
        },
      }
    }
  }