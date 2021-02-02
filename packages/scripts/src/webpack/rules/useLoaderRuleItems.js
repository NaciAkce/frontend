import { join, resolve } from 'path';
import { createRequire } from 'module';
import fs from 'fs';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import {
    rootDir,
    webpackDir,
    isDev,
    isProd,
    babelRc,
    postCssConfig,
} from '../config/index.js';

const require = createRequire(import.meta.url);

export const cssLoader = {
    loader: require.resolve('css-loader'),
};

export const sassLoader = {
    loader: require.resolve('sass-loader'),
    options: {
        sourceMap: isDev,
    },
};

const plugins = () =>
    [
        require.resolve('postcss-preset-env'),
        isProd ? require.resolve('cssnano') : null,
    ].filter(Boolean);

const postcss = fs.existsSync(postCssConfig) ? postCssConfig : false;

export const postCssLoader = {
    loader: require.resolve('postcss-loader'),
    options: {
        postcssOptions: {
            config: postcss,
            plugins: plugins,
        },
        sourceMap: isDev,
    },
};

/***
 * Using MiniCssExtractPlugin in production or style-loader in development
 * @see https://webpack.js.org/plugins/mini-css-extract-plugin/#root
 * @see https://webpack.js.org/loaders/style-loader/#root
 */
export const miniCssExtractLoader = isProd
    ? {
          loader: MiniCssExtractPlugin.loader,
          options: {
              esModule: false,
          },
      }
    : {
          loader: require.resolve('style-loader'),
          options: {
              esModule: false,
          },
      };

/**
 * Using to convert CSS modules from css-loader to TypeScript typings
 * @see https://github.com/TeamSupercell/typings-for-css-modules-loader
 */
export const typingsCssModulesLoader = {
    loader: require.resolve(
        '@teamsupercell/typings-for-css-modules-loader',
    ),
    options: {
        banner:
            '// autogenerated by typings-for-css-modules-loader. \n// Please do not change this file!',
        formatter: 'prettier',
    },
};

/**
 * @see https://webpack.js.org/loaders/sass-loader/#problems-with-url
 */
export const resolveUrlLoader = {
    loader: require.resolve('resolve-url-loader'),
    options: {
        sourceMap: isDev,
    },
};

export const babelLoader = {
    loader: require.resolve('babel-loader'),
    options: {
        configFile: fs.existsSync(babelRc)
            ? babelRc
            : require.resolve('../../../babel.config.js'),
        include: resolve(rootDir, 'src'),
        plugins: [
            isDev && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
    },
};

export const cssModulesSupportLoaderItems = [
    miniCssExtractLoader,
    typingsCssModulesLoader,
    {
        ...cssLoader,
        options: {
            esModule: false,
            modules: {
                exportLocalsConvention: 'camelCaseOnly',
                localIdentName: '[local]__[contenthash:base64:5]',
            },
        },
    },
];

export const cssLoaderItems = [miniCssExtractLoader, cssLoader];
