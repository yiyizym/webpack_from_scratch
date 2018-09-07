const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require('./conf.js');
var webpackConfig = require('./webpack.conf.js');
var webpackProdConfig = {
  mode: 'production',
  output: {
    path: config.distRoot,
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  devtool: '#source-map'
}
let plugins = [
  new ExtractTextPlugin({ filename: "styles.[chunkhash].css", allChunks: true }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common', // 将公共模块提取,生成名为`common`的chunk
    minChunks: 2 // 提取至少2个模块共有的部分
  })
]
webpackConfig.plugins.push.apply(webpackConfig.plugins, plugins);
module.exports = merge(webpackConfig, webpackProdConfig);