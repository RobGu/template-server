const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './web/index.js',
  output: {
    path: path.resolve('www'),
    publicPath: '/',
    filename: 'bundle.min.js?[chunkhash]',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.(jsx|js)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          autoprefixer({ browsers: ['> 0.04%'] });
        },
      },
    }),
    new CleanWebpackPlugin(['www'], { root: path.resolve() }),
    new webpack.DefinePlugin({
      'process.env': {
          // This can reduce react lib size and disable some dev feactures like props validation
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'React Koa',
      template: 'web/template.html',
      filename: 'index.html',
      hash: true,
    }),
    function () {
        this.plugin('done', function (stats) { // eslint-disable-line
          if (stats.compilation.errors && stats.compilation.errors.length) {
            console.log(stats.compilation.errors); // eslint-disable-line
            process.exit(1);
          }
        });
    },
  ],
};
