const config = require('./conf.js');
var webpackConfig = require('./webpack.conf.js');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');
var webpackDevConfig = {
    entry: {
        devServer: "webpack/hot/dev-server"
    },
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
    new webpack.HotModuleReplacementPlugin()
]
webpackConfig.plugins.push.apply(webpackConfig.plugins, plugins);

module.exports = merge(webpackConfig, webpackDevConfig);