var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './index.js',
  watch: true,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),

  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }

    ]
  },
  plugins: [
    new BrowserSyncPlugin ({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      open: 'external',
      host: 'localhost',
      proxy: 'menus.mod',
      files: ['resources/js/*.js', 'resources/images/**']
    })
  ]
};
