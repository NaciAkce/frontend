import { createRequire } from 'module';
const require = createRequire(import.meta.url);
export default api => {
    return {
        presets: [
            require.resolve('@babel/preset-env'),
            require.resolve('@babel/preset-typescript'),
            require.resolve('@babel/preset-react'),
        ],
        plugins: [
            [
                require.resolve('@babel/plugin-transform-react-jsx'),
                {
                    runtime: 'automatic',
                },
            ],
            [
                require.resolve(
                    '@babel/plugin-proposal-class-properties',
                ),
                {
                    loose: true,
                },
            ],
            require.resolve('@babel/plugin-syntax-dynamic-import'),
            [
                '@babel/plugin-transform-runtime',
                {
                    regenerator: true,
                },
            ],
            [
                require.resolve('babel-plugin-transform-imports'),
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
                        require.resolve('@babel/preset-env'),
                        { targets: { node: 'current' } },
                    ],
                ],
            },
        },
    };
};
