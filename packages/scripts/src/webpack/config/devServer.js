import { publicFolder, publicPath } from './paths.js';
import { port, host, prettyHost, protocol } from './env.js';

export const devServerConfig = () => {
    return {
        publicPath: publicPath,
        port,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        hot: true,
        clientLogLevel: 'none',
        host,
        compress: true,
        overlay: false,
        quiet: true,
        contentBase: publicFolder,
        contentBasePublicPath: publicPath,
        watchContentBase: true,
        transportMode: 'ws',
        watchOptions: {
            awaitWriteFinish: true,
            ignored: /node_modules/,
        },
    };
    // return {
    //     dev: {
    //         publicPath: publicPath,
    //     },
    //     client: { progress: true, logging: 'warn' },
    //     port,
    //     historyApiFallback: true,
    //     headers: { 'Access-Control-Allow-Origin': '*' },
    //     hot: true,
    //     public: `${protocol}://${prettyHost}:${port}`,
    //     host,
    //     compress: true,
    //     overlay: true,
    //     static: [
    //         {
    //             directory: publicFolder,
    //             publicPath: publicPath,
    //             serveIndex: true,
    //             watch: {
    //                 awaitWriteFinish: true,
    //                 ignored: /node_modules/,
    //             },
    //         },
    //     ],
    // };
};
