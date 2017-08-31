var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackCleanupPlugin  = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./conf.js');

var webpackConfig = {
    entry: {},
    output: {
        path: config.outputRoot,
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' }
                ],
                include: config.srcRoot
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
            minChunks: 2 // 提取至少2个模块共有的部分
        })
    ]
}


let filenames = fs.readdirSync(path.join(config.srcRoot, 'tpl'));

filenames.forEach(function(filename){
    let stats = fs.statSync(path.join(config.srcRoot, 'tpl', filename));
    if(stats.isFile()){
        let extension = path.extname(filename);
        let name = filename.substring(0,filename.lastIndexOf(extension));
        console.log('>>> ', name);
        webpackConfig.entry[name] = path.join(config.srcRoot, 'js', name + '.js')
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            filename: name + '.html',
            template: path.join(config.srcRoot, 'tpl', name + '.html'),
            inject: true,
            chunks: ['common', name] //只包含 common 以及自己的那一个 chunk
        }));
    }
});

module.exports = webpackConfig;