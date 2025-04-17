import typescript from '@rollup/plugin-typescript';

export default typescript({
    tsconfig: './tsconfig.json',
    sourceMap: true,
    inlineSources: true,
});
