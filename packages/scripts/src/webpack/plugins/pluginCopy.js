import CopyPlugin from 'copy-webpack-plugin';

import { publicFolder } from '../config/paths.js';

const config = {
    patterns: [
        {
            from: '**/*',
            context: publicFolder,
            to: '.',
            globOptions: {
                ignore: ['**/*.html', '**/*.js'],
            },
        },
    ],
};

export const copyPlugin = new CopyPlugin(config);
