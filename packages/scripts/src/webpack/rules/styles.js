import {
    cssLoader,
    sassLoader,
    miniCssExtractLoader,
    postCssLoader,
    resolveUrlLoader,
} from './useLoaderRuleItems.js';

/** css **/
export const cssRule = {
    test: /\.css$/,
    use: [
        miniCssExtractLoader,
        cssLoader,
        postCssLoader,
        resolveUrlLoader,
    ],
};

export const sassRule = {
    test: /\.s([ca])ss$/,
    use: [
        miniCssExtractLoader,
        cssLoader,
        postCssLoader,
        resolveUrlLoader,
        sassLoader,
    ],
};
