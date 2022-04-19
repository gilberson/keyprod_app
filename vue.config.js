const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.DEV_BASE_URL
    : process.env.PROD_BASE_URL
})
