/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import banner from './banner';

export default {
    output: {
        name: 'Courier',
        banner,
    },
    plugins: [
        babel({
            plugins: [
                // '@babel/plugin-external-helpers',
                '@babel/plugin-transform-object-assign',
                '@babel/plugin-proposal-class-properties',
            ],
        }),
    ],
};
