'use strict';
const path = require('path');
const Webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackDevConfig = require('./webpack.dev.conf');
const express = require('express');

const app = express();

const compiler = Webpack(webpackDevConfig);

app.use(middleware(compiler,{
  publicPath: '/',
  stats: {
    colors: true
  }
}));

app.listen(8080, () => {
  console.log('Starting server on http://localhost:8080');
});