'use strict';
const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('./webpack.dev.conf');

const compiler = Webpack(webpackDevConfig, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  });
const server = new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname, 'src/tpl'),
  publicPath: '/',
  stats: {
    colors: true
  }
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080');
});