import dotenvExpand from 'dotenv-expand';
import dotenv from 'dotenv';
import { env } from './paths.js';
import isWindows from 'is-windows';

const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) throw new Error('NODE_ENV is not defined');

const devServerHost = isWindows() ? '127.0.0.1' : '0.0.0.0';

const dotenvFile = `${env}.${NODE_ENV}`;

dotenvExpand(
    dotenv.config({
        path: dotenvFile,
    }),
);

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;
export const port = parseInt(process.env.PORT, 10) || 3000;
export const host = process.env.HOST || devServerHost;
export const prettyHost =
    host === devServerHost || host === '::' ? 'localhost' : host;
export const protocol =
    process.env.HTTPS === 'true' ? 'https' : 'http';
