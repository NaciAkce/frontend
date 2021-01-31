import { join } from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { rootDir } from '../config/paths.js';

export const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin(
    {
        typescript: {
            configFile: join(rootDir, '/tsconfig.json'),
        },
        eslint: {
            enabled: true,
            files: join(rootDir, '/src/**/*.{ts,tsx,js,jsx}'),
        },
        logger: {
            infrastructure: 'silent',
            issues: 'console',
            devServer: true,
        },
    },
);
