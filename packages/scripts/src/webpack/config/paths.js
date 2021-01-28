import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { getPublicPath } from '../utils/getPublicPath.js';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath =>
    resolve(appDirectory, relativePath);

export const webpackDir = join(
    new URL('../', import.meta.url).pathname,
);
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const env = resolveApp('.env');
export const rootDir = resolveApp('.');
export const babelRc = resolveApp('babel.config.js');
export const postCssConfig = resolveApp('postcss.config.js');
export const buildFolder = resolveApp('build');
export const publicFolder = resolveApp('public');
export const appHtml = resolveApp('public/index.html');
export const appJs = resolveApp('src/index');
export const appSrc = resolveApp('src');
export const appTsConfig = resolveApp('tsconfig.json');
export const appModules = resolveApp('node_modules');
export const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
];
// public url
export const packageJson = resolveApp('package.json');
export const webpackConfig = resolveApp('webpack.config.js');
export const publicPath = getPublicPath(
    process.env.NODE_ENV === 'development',
    packageJson.homepage,
    process.env.PUBLIC_URL,
);
