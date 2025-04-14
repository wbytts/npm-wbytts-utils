
export function getOutputs(name, options = {}) {
  const outputs = []

  outputs.push({
    file: `./dist/${name}.cjs.js`,
    format: 'cjs',
    sourcemap: true,
  })

  outputs.push({
    file: `./dist/${name}.esm.js`,
    format: 'es',
    sourcemap: true,
  })

  if(options.globalName) {
    outputs.push({
      name: options.globalName,
      file: `./dist/${name}.min.js`,
      format: 'iife',
      sourcemap: true,
    })
    outputs.push({
      name: options.globalName,
      file: `./dist/${name}.umd.js`,
      format: 'umd',
      sourcemap: true,
    })
  }

  return outputs
}
