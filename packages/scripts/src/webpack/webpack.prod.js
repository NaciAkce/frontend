import TerserJSPlugin from 'terser-webpack-plugin';

import * as plugins from './plugins/index.js';
// https://www.robinwieruch.de/webpack-babel-s     etup-tutorial
// https://www.robinwieruch.de/minimal-react-webpack-babel-setup
import { publicPath, buildFolder } from './config/index.js';

const config = {
    mode: 'production',
    output: {
        path: buildFolder,
        publicPath: publicPath,
        filename: '[name].[contenthash].js',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserJSPlugin({})],
    },
    plugins: [
        plugins.cleanWebpackPlugin,
        plugins.miniCssExtractPlugin,
        plugins.compressPlugin,
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },

    devtool: 'source-map',
};

export default config;
