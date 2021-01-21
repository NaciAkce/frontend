import zopfli from '@gfx/zopfli';
import CompressPlugin from 'compression-webpack-plugin';

const config = {
    compressionOptions: {
        numiterations: 15,
    },
    algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
    },
};

export const compressPlugin = new CompressPlugin(config);
