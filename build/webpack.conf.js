var path = require('path')
var outputRoot = path.join(__dirname, '../output');
var srcRoot = path.join(__dirname, '../src');

module.exports = {
  entry: {
    bundle: path.join(srcRoot,'./main.js')
  },
  output: {
    path: outputRoot,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
            {loader: 'babel-loader'}
        ],
        include: srcRoot
      },
      {
          test: /\.css$/,
          use: [
              {loader: 'style-loader'},
              {loader: 'css-loader'}
          ],
          
      }
    ]
  }
}
