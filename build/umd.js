import build from './build';

export default Object.assign(build, {
    input: 'entry/entry-complete.js',
    output: Object.assign(build.output, {
        file: 'dist/js/courier.js',
        format: 'umd',
        inlineDynamicImports: true
    }),
});
