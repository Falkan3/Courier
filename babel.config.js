module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [
        'add-module-exports',
        '@babel/plugin-transform-object-assign',
        '@babel/plugin-proposal-class-properties',
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@src': './src',
                    '@libs': './src/libs',
                    '@components': './src/components',
                    '@core': './src/core',
                    '@utils': './src/utils',
                    '@assets': './src/assets'
                }
            }
        ]
    ]
};
