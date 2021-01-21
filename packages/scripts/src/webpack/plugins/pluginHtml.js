import HtmlWebpackPlugin from 'html-webpack-plugin';

import { appHtml } from '../config/paths.js';

export const htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: 'index.html',
    inject: 'head',
    scriptLoading: 'defer',
    template: appHtml,
});
