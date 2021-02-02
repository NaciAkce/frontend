import { createRequire } from 'module';
import ESLintPlugin from 'eslint-webpack-plugin';

import { appSrc, rootDir, __dirname } from '../config/paths.js';

const require = createRequire(import.meta.url);

const config = {
    context: appSrc,
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    eslintPath: require.resolve('eslint'),
    cache: true,
    // // ESLint class options
    cwd: rootDir,
    // resolvePluginsRelativeTo: __dirname,
};

export const esLintPlugin = new ESLintPlugin(config);
