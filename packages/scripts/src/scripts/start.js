'use strict';
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

import '../webpack/config/env.js';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import kleur from 'kleur';
import config from '../webpack/webpack.config.js';
import internalIp from 'internal-ip';
// import os from 'os';

import { clearConsole } from '../webpack/utils/index.js';
import {
    port,
    host,
    prettyHost,
    protocol,
} from '../webpack/config/index.js';

const webpackConfig = config();
const compiler = webpack(webpackConfig);
const devServerOptions = webpackConfig.devServer;
const isInteractive = process.stdout.isTTY;

async function start() {
    try {
        const networkIp = await internalIp.v4();

        console.log(networkIp);
        await new Promise((resolve, reject) => {
            const devServer = new WebpackDevServer(
                compiler,
                devServerOptions,
            );

            devServer.listen(port, host, err => {
                if (err) {
                    return reject(err);
                }

                resolve();

                if (isInteractive) {
                    clearConsole();
                }
                console.log(kleur.bold().cyan('Compiling...'));
            });
        });
    } catch (err) {
        if (err && err.message) {
            console.log('something went wrong', err.message);
        }
        process.exit(1);
    }
}

start();
