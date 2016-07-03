const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssnext = require('postcss-cssnext');
var postcssReporter = require('postcss-reporter');
const babelConfig = require('../package').babelConfig.client;

const SRC = path.resolve(__dirname, '../client');
const BUILD = path.resolve(__dirname, '../server', 'public');

module.exports = {
  context: SRC,
  entry: {
    main: './',
    vendor: ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react', 'mobx-react-devtools']
  },
  output: {
    path: BUILD,
    publicPath: '/assets/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: babelConfig
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'css?modules&localIdentName=[folder]__[local]--[hash:base64:5]&camelCase&importLoaders=1!postcss'
      )
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url?name=public/images/[name].[ext]&limit=10000'
    }, {
      test: /\.(ttf|eot|woff2?|otf)$/,
      loader: 'url?name=public/fonts/[name].[ext]&limit=10000'
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].bundle.js',
    }),
    new ExtractTextPlugin("styles.bundle.css", { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ],
  postcss: () => [
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css']
  }
}