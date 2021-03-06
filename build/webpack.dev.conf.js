const config = require('./conf.js');
var webpackConfig = require('./webpack.conf.js');
const webpack = require('webpack');
const merge = require('webpack-merge');
var webpackDevConfig = {
  mode: 'development',
  output: {
    path: config.outputRoot,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: '#eval-source-map-inline'
}

let plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
]
webpackConfig.plugins.push.apply(webpackConfig.plugins, plugins);

module.exports = merge(webpackConfig, webpackDevConfig);