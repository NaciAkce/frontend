'use strict';

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

process.on('unhandledRejection', err => {
    throw err;
});

import '../webpack/config/env.js';

import jest from 'jest';
import path from 'path';
import babelTransformJs from '../webpack/config/jest/babelTransform.js';
import cssTransformJs from '../webpack/config/jest/cssTransform.js';
import fileTransformJs from '../webpack/config/jest/fileTransform.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import {
    rootDir,
    moduleFileExtensions,
    __dirname,
    appModules,
} from '../webpack/config/paths.js';

const argv = process.argv.slice(2);

const config = {
    roots: ['<rootDir>/src'],

    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
    ],

    setupFiles: [require.resolve('react-app-polyfill/jsdom')],

    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
    testEnvironment: 'jsdom',
    testRunner: require.resolve('jest-circus/runner'),
    transform: {
        '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
        '^.+\\.css$': cssTransformJs.default,
        '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
            fileTransformJs.default,
        '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    modulePaths: [
        path.resolve(__dirname, '../..', 'node_modules'),
        appModules,
    ].filter(Boolean),
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@styles(.*)$': '<rootDir>/src/styles$1',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: [...moduleFileExtensions, 'node'].filter(
        ext => !ext.includes('mjs'),
    ),
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    resetMocks: true,
    rootDir: rootDir,
};

const defaultArgs = [
    '--config',
    JSON.stringify(config),
    argv.indexOf('--watchAll') !== -1 && '--watchAll',
    argv.indexOf('--coverage') !== -1 && '--coverage',
    argv.indexOf('--verbose') !== -1 && '--verbose',
    argv.indexOf('--watch') !== -1 && '--watch',
].filter(Boolean);

jest.run(defaultArgs);
