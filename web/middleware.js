import webpackMiddleware from 'koa-webpack-dev-middleware';
import webpack from 'webpack';

import config from './webpack.config.dev';

const serverConfig = {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    chunks: false,
  },
};

export default () => {
  return webpackMiddleware(webpack(config), serverConfig);
};
