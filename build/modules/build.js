/* eslint-disable import/no-extraneous-dependencies */
// import url from '@rollup/plugin-url';
import babel from '@rollup/plugin-babel';
import banner from './banner.js';

export default {
    output: {
        name: 'Courier',
        banner,
    },
    treeshake: true,
    plugins: [
        // url({
        //     // by default, rollup-plugin-url will not handle font files
        //     include: ['**/*.woff2', '**/*.ttf'],
        //     // setting infinite limit will ensure that the files
        //     // are always bundled with the code, not copied to /dist
        //     limit: Infinity,
        // }),
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
