import fs from 'fs';
import { merge } from 'webpack-merge';
import { createRequire } from 'module';

import base from './webpack.base.js';
import dev from './webpack.dev.js';
import prod from './webpack.prod.js';
import { isProd, webpackConfig } from './config/index.js';

const require = createRequire(import.meta.url);

export default () => {
    const config = isProd ? prod : dev;
    const localWebpackConfig = fs.existsSync(webpackConfig)
        ? require(webpackConfig)
        : {};
    return merge(base, config, localWebpackConfig);
};
