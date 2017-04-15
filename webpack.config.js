var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  watch: false,
  output: {
    filename: 'menu.js',
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
      },
      { // regular css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
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
    }),
    new ExtractTextPlugin({ filename: 'menu.css', disable: false, allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
