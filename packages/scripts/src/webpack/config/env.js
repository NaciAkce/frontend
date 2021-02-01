import dotenvExpand from 'dotenv-expand';
import dotenv from 'dotenv';
import { env } from './paths.js';

const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) throw new Error('NODE_ENV is not defined');

const dotenvFile = `${env}.${NODE_ENV}`;

dotenvExpand(
    dotenv.config({
        path: dotenvFile,
    }),
);

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;
export const port = parseInt(process.env.PORT, 10) || 3000;
export const host = process.env.HOST || '0.0.0.0';
export const prettyHost =
    host === '0.0.0.0' || host === '::' ? 'localhost' : host;
export const protocol =
    process.env.HTTPS === 'true' ? 'https' : 'http';
