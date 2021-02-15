import { babelLoader } from './useLoaderRuleItems.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
/**
 * @see https://webpack.js.org/loaders/babel-loader
 */
export const typescriptRule = {
    test: /\.[jt]sx?$/,
    use: [babelLoader],
    exclude: /node_modules/,
};

/**
 * @see https://webpack.js.org/loaders/html-loader
 */
export const htmlRule = {
    test: /\.(html)$/,
    use: {
        loader: require.resolve('html-loader'),
        options: {
            sources: false,
        },
    },
};
/**
 * @see https://webpack.js.org/guides/asset-modules/
 */
export const imagesRule = {
    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
    loader: require.resolve('file-loader'),
    options: {
        name: '[name].[ext]',
    },
};
/**
 * @see https://webpack.js.org/guides/asset-modules/
 */
export const fontsRule = {
    test: /\.(woff(2)?|eot|ttf|otf|)$/,
    type: 'asset/inline',
};
