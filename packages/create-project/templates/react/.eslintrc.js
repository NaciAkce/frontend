const path = require('path');

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'prettier/react', // disables react-specific linting rules that conflict with prettier
    ],
    parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        'react/prop-types': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/no-empty-interface': 'off',
        'react/require-render-return': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/require-default-props': 'off',
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
