import build from './build.js';

export default Object.assign(build, {
    input: 'entry/entry-popup.js',
    output: Object.assign(build.output, {
        // file: 'dist/js/courier.esm.js',
        dir: 'dist/js/esm/popup/',
        entryFileNames: 'courier.esm.js', // [name]
        chunkFileNames: '[hash].js',
        format: 'es',
    }),
    // preserveModules: true
});
