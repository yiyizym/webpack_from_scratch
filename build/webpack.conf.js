var path = require('path');
var webpack = require('webpack');
var outputRoot = path.join(__dirname, '../output');
var srcRoot = path.join(__dirname, '../src');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackCleanupPlugin  = require('webpack-cleanup-plugin');

var conf = {
    entry: {},
    output: {
        path: outputRoot,
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' }
                ],
                include: srcRoot
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new ExtractTextPlugin({filename: "styles.[chunkhash].css", allChunks: true}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 将公共模块提取,生成名为`common`的chunk
            minChunks: 2 // 提取至少3个模块共有的部分
        })
    ]
}

module.exports = conf;