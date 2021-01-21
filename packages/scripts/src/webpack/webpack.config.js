import fs from 'fs';
import { merge } from 'webpack-merge';
import base from './webpack.base.js';
import dev from './webpack.dev.js';
import prod from './webpack.prod.js';
import { isProd, webpackConfig } from './config/index.js';

const localWebpackConfig = fs.existsSync(webpackConfig)
    ? webpackConfig
    : {};

export default () => {
    const config = isProd ? prod : dev;
    return merge(base, config, localWebpackConfig);
};
