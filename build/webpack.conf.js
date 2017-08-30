var path = require('path');
var webpack = require('webpack');
var outputRoot = path.join(__dirname, '../output');
var srcRoot = path.join(__dirname, '../src');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.join(srcRoot, './main.js')
    },
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
        new ExtractTextPlugin("styles.[chunkhash].css"),
        new HtmlWebpackPlugin({
            template: path.join(srcRoot, './index.html'),
            inject: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
