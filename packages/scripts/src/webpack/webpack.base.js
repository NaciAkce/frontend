import * as path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as plugins from './plugins/index.js';
import * as rules from './rules/index.js';
import { rootDir, appJs, env } from './config/index.js';
import optimization from './config/optimization.js';

const argv = process.argv.slice(2);
const NODE_ENV = process.env.NODE_ENV;
const dotenvFile = `${env}.${NODE_ENV}`;

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
        plugins.htmlWebpackPlugin,
        plugins.forkTsCheckerWebpackPlugin,
        plugins.esLintPlugin,
        plugins.copyPlugin,
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(
                dotenvExpand(
                    dotenv.config({
                        path: dotenvFile,
                    }),
                ).parsed,
            ), // it will automatically pick up key values from .env file
        }),
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
