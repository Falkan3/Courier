/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel';
import banner from './banner.js';

export default {
    output: {
        name: 'Courier',
        banner,
    },
    treeshake: true,
    plugins: [
        babel({
            exclude: 'node_modules/**',
            plugins: [
                // '@babel/plugin-external-helpers',
                '@babel/plugin-transform-object-assign',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import'
            ],
            babelHelpers: 'bundled'
            // runtimeHelpers: true,
        }),
    ],
};
