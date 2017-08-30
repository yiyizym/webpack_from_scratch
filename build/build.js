var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = require('./webpack.conf');

var srcRoot = path.join(__dirname, '../src');


let filenames = fs.readdirSync(path.join(srcRoot, 'tpl'));

filenames.forEach(function(filename){
    let stats = fs.statSync(path.join(srcRoot, 'tpl', filename));
    if(stats.isFile()){
        let extension = path.extname(filename);
        let name = filename.substring(0,filename.lastIndexOf(extension));
        console.log('>>> ', name);
        webpackConfig.entry[name] = path.join(srcRoot, 'js', name + '.js')
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            filename: name + '.html',
            template: path.join(srcRoot, 'tpl', name + '.html'),
            inject: true,
            chunks: ['common', name] //只包含 common 以及自己的那一个 chunk
        }));
    }
});


webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})