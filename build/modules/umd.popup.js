import build from './build';

export default Object.assign(build, {
    input: 'entry/entry-popup.js',
    output: Object.assign(build.output, {
        file: 'dist/js/popup/courier.js',
        format: 'umd',
        inlineDynamicImports: true
    }),
});
