const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');
const webpack = require('webpack');

var devWebpackConfig = merge(baseConfig, {
  mode: 'development',
  output: {
    path: '/dist',
    filename: 'devUpload.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
});

module.exports = devWebpackConfig;