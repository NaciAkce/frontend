'use strict';
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

import '../webpack/config/env.js';
import webpack from 'webpack';

import config from '../webpack/webpack.config.js';

const webpackConfig = config();
const compiler = webpack(webpackConfig);

async function build() {
    await new Promise((resolve, reject) => {
        compiler.run((err, res) => {
            if (err) {
                return reject(err);
            }
            console.log(
                res.toString({
                    colors: true,
                }),
            );
            resolve(res);
        });
    });
}

build();
