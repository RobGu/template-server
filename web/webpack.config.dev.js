import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default {
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'sourcemap',
  entry: [
    './web/index.js',
  ],
  output: {
    publicPath: '/',
    filename: 'static/[name].min.js?[hash]',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
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
        debug: true,
      },
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Koa',
      template: 'web/template.html',
      inject: true,
    }),
  ],
};
