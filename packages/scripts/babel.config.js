module.exports = api => {
    api && api.cache(true);
    return {
        presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
            '@babel/preset-react',
        ],
        plugins: [
            [
                '@babel/plugin-transform-react-jsx',
                {
                    runtime: 'automatic',
                },
            ],
            [
                '@babel/plugin-proposal-class-properties',
                {
                    loose: true,
                },
            ],
            '@babel/plugin-syntax-dynamic-import',
            [
                '@babel/plugin-transform-runtime',
                {
                    regenerator: true,
                },
            ],
            [
                'babel-plugin-transform-imports',
                {
                    '@material-ui/core': {
                        transform: '@material-ui/core/${member}',
                        preventFullImport: true,
                    },
                    '@material-ui/icons': {
                        transform: '@material-ui/icons/${member}',
                        preventFullImport: true,
                    },
                },
            ],
        ],
        env: {
            test: {
                presets: [
                    [
                        '@babel/preset-env',
                        { targets: { node: 'current' } },
                    ],
                ],
            },
        },
    };
};
