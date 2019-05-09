const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');

var prodWebpackConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'file-h5-upload.js'
  },
  optimization: {
    minimize: true
  }
});

module.exports = prodWebpackConfig;
