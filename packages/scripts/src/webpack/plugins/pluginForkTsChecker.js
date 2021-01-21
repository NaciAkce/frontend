import { join } from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { rootDir } from '../config/paths.js';
import { isDev } from '../config/env.js';

export const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin(
    {
        async: isDev,
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
