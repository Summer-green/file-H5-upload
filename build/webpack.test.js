const path = require('path');
module.exports = {
  entry: {
    app: './src/fileUpload.js' // 入口文件
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  mode: 'production',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'file-h5-upload.min.js'
  },
  optimization: {
    minimize: true
  }
};
