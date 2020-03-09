const { join } = require('path')
const merge = require('webpack-merge')
const basicConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const resolve = dir => join(__dirname, '..', dir)

module.exports = merge(basicConfig, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: './src/main.js'
  },
  output: {
    path: resolve('docs'),
    publicPath: './',
    filename: 'index.js',
    library: 'vuetify-dupes-grid',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    libraryExport: 'default'
  },
  plugins: [
    new VuetifyLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      title: 'Vuetify Dupes Grid Demo'
    })
  ]
})
