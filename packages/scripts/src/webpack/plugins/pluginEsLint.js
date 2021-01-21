import { join } from 'path';

import ESLintPlugin from 'eslint-webpack-plugin';

import { appSrc } from '../config/paths.js';

const config = {
    context: appSrc,
    extensions: ['js', 'jsx', 'ts', 'tsx'],
};

export const esLintPlugin = new ESLintPlugin(config);
