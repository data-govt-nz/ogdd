const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1;

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body',
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true,
  },
  compress: {
    screw_ie8: true,
    warnings: false,
  },
  comments: false,
});

const BundleAnalyzerPluginConfig = new BundleAnalyzerPlugin();

module.exports = {
  devServer: {
    host: 'localhost',
    port: '3000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    path.join(__dirname, '/src/index.js'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        // inline all images to solve path issues
        loader: 'url-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, './dist'),
    library: 'OGDD',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: dev ?
  [
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ] :
  [
    HTMLWebpackPluginConfig,
    DefinePluginConfig,
    UglifyJsPluginConfig,
    BundleAnalyzerPluginConfig,
    new LodashModuleReplacementPlugin(),
  ],
};
