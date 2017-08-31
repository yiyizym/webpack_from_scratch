'use strict';

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('./webpack.dev.conf');
const compiler = Webpack(webpackDevConfig);
const server = new WebpackDevServer(compiler, {
  contentBase: '/output',
  publicPath: '/',
  stats: {
    colors: true
  },
  hot: true
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080');
});