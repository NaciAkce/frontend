import * as path from 'path';
import Dotenv from 'dotenv-webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as plugins from './plugins/index.js';
import * as rules from './rules/index.js';
import { rootDir, webpackDir, isDev, appJs } from './config/index.js';
import optimization from './config/optimization.js';
// https://www.robinwieruch.de/webpack-babel-setup-tutorial
// https://www.robinwieruch.de/minimal-react-webpack-babel-setup
// https://www.robinwieruch.de/minimal-react-webpack-babel-setup
const argv = process.argv.slice(2);

const config = {
    context: rootDir,
    target: 'web',
    entry: appJs,
    module: {
        rules: [
            rules.typescriptRule,
            rules.htmlRule,
            rules.imagesRule,
            rules.fontsRule,
            rules.cssRule,
            rules.sassRule,
            ...rules.svgRules,
        ].filter(Boolean),
    },
    plugins: [
        new Dotenv(),
        plugins.htmlWebpackPlugin,
        plugins.forkTsCheckerWebpackPlugin,
        plugins.esLintPlugin,
        plugins.copyPlugin,
        argv.indexOf('--analyze-bundle') !== -1 &&
            new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['*', '.js', '.ts', '.tsx', '.jsx'],
    },
    optimization,
};

export default config;
