const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const config = require('./package').config;
const babelConfig = require('./package').babelConfig;

const SRC = path.resolve(__dirname, 'app');
const BUILD = path.resolve(__dirname, 'server/public');

module.exports = {
  context: SRC,
  entry: {
    main: './client',
    vendor: ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react']
  },
  output: {
    path: BUILD,
    publicPath: config.assetsPublicPath,
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: babelConfig.client
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'css?modules&camelCase&importLoaders=1!postcss'
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
    new webpack.optimize.OccurenceOrderPlugin(),
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
    root: [
      path.resolve(process.cwd(), 'app/shared')
    ],
    extensions: ['', '.js', '.jsx']
  }
}