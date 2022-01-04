import build from './build';

export default Object.assign(build, {
    input: 'entry/entry-chat.js',
    output: Object.assign(build.output, {
        file: 'dist/js/chat/courier.js',
        format: 'umd',
        inlineDynamicImports: true
    }),
});
