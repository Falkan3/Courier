import build from './build.js';

export default Object.assign(build, {
    input: 'entry/entry-complete.js',
    output: Object.assign(build.output, {
        // file: 'dist/js/courier.esm.js',
        dir: 'dist/js/esm/',
        entryFileNames: 'courier.esm.js', // [name]
        chunkFileNames: '[hash].js',
        format: 'es',
    }),
    // preserveModules: true
});
