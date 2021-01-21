import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import WebpackLogPlugin from './hooks/WebpackLogPlugin.js';

// https://www.robinwieruch.de/webpack-babel-s     setup-tutorial
// https://www.robinwieruch.de/minimal-react-webpack-babel-setup

import {
    publicPath,
    publicFolder,
    devServerConfig,
    appJs,
} from './config/index.js';

const config = {
    mode: 'development',
    entry: [appJs],
    devtool: 'cheap-module-source-map',
    output: {
        path: publicFolder,
        publicPath,
        filename: '[name].[fullhash].js',
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new WebpackLogPlugin(),
    ],
    stats: {
        colors: true,
        assets: false,
    },
    infrastructureLogging: {
        level: 'info',
    },
    devServer: devServerConfig(),
    watchOptions: {},
};

export default config;
