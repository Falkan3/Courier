import build from './build.js';

export default Object.assign(build, {
    input: 'entry/entry-modular.js',
    output: Object.assign(build.output, {
        // file: 'dist/js/courier.modular.esm.js',
        dir: 'dist/js/esm/modular/',
        entryFileNames: 'courier.esm.js', // [name]
        chunkFileNames: '[hash].js',
        format: 'es',
    }),
    // preserveModules: true
});
